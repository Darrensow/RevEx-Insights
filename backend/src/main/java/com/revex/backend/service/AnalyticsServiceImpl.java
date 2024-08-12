package com.revex.backend.service;

import com.revex.backend.model.FinancialTableItem;
import com.revex.backend.model.TimelineItem;
import com.revex.backend.model.TimelineResponseModel;
import com.revex.backend.model.entity.LedgerBean;
import com.revex.backend.model.projection.*;
import com.revex.backend.model.repository.DepartmentRepository;
import com.revex.backend.model.repository.LedgerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final DepartmentRepository departmentRepository;
    private final LedgerRepository ledgerRepository;

    @Override
    public List<Map<String, String>> getDepartmentNamesAndKeysAsMap() {
        String logPrefix = "getDepartmentNamesAndKeysAsMap";
        List<DepartmentProjection> projections = departmentRepository.findAllProjectedBy();

        // Map the projection results to a List<Map<String, String>>
        List<Map<String, String>> departmentNamesAndKeysMap = projections.stream()
                .map(projection -> Map.of(projection.getDepartmentName(), projection.getDepartmentNameKey()))
                .collect(Collectors.toList());

        log.info(logPrefix + "departmentNamesAndKeysMap : {}", departmentNamesAndKeysMap);

        return departmentNamesAndKeysMap;
    }

    public TimelineResponseModel getTimelineResponseModel(String period, Integer year, String departmentNameKey) {
        String logPrefix = "getTimelineResponseModel";

        List<TimelineItemProjection> revenueTimelineProjections = ledgerRepository.findLedgerSummariesByYearAndPeriodAndDescription(period, year, departmentNameKey, LedgerBean.LedgerDescriptionType.REVENUES.getDescription());
        List<TimelineItemProjection> expensesTimelineProjections = ledgerRepository.findLedgerSummariesByYearAndPeriodAndDescription(period, year, departmentNameKey, LedgerBean.LedgerDescriptionType.EXPENSES.getDescription());

        List<TimelineItem> revenueTimeline = mapToTimelineItems(revenueTimelineProjections);
        List<TimelineItem> expensesTimeline = mapToTimelineItems(expensesTimelineProjections);

        List<TimelineItem> surplusDeficitTimeline = calculateSurplusDeficit(revenueTimeline, expensesTimeline);

        TimelineResponseModel responseModel = new TimelineResponseModel();
        responseModel.setRevenueTimeline(revenueTimeline);
        responseModel.setExpensesTimeline(expensesTimeline);
        responseModel.setSurplusDeficitTimeline(surplusDeficitTimeline);

        log.info(logPrefix + "responseModel : {}", responseModel);

        return responseModel;
    }

    @Override
    public List<Map<String, BigDecimal>> getExpensesBreakdown(Integer year, String departmentNameKey) {

        String logPrefix = "[AnalyticsServiceImpl] getExpensesBreakdown";

        List<ExpensesBreakdownProjection> breakdowns = ledgerRepository.findExpensesBreakdownByYearAndDepartment(year, departmentNameKey);

        List<Map<String, BigDecimal>> expensesBreakdownModel = breakdowns.stream()
                .map(projection -> Map.of(projection.getFundDescription(), projection.getTotalAmount()))
                .collect(Collectors.toList());

        log.info("{} expensesBreakdownModel : {}", logPrefix, expensesBreakdownModel);

        return expensesBreakdownModel;
    }

    @Override
    public List<Map<String, BigDecimal>> getRevenueAndExpensesBreakdown(Integer year, String departmentNameKey) {

        String logPrefix = "[AnalyticsServiceImpl] getRevenueAndExpensesBreakdown";

        List<RevenueAndExpensesBreakdownProjection> breakdowns = ledgerRepository.findRevenueAndExpensesBreakdownByYearAndDepartment(year, departmentNameKey);

        List<Map<String, BigDecimal>> revenueAndExpensesBreakdownModel = breakdowns.stream()
                .map(projection -> Map.of(projection.getLedgerDescription(), projection.getTotalAmount()))
                .collect(Collectors.toList());

        log.info(logPrefix + "revenueAndExpensesBreakdownModel : {}", revenueAndExpensesBreakdownModel);

        return revenueAndExpensesBreakdownModel;
    }

    @Override
    public List<FinancialTableItem> getFinancialTableData(Integer year, String departmentNameKey) {
        String logPrefix = "getFinancialTableData";

        List<FinancialTableItem> financialTableItems;

        if (StringUtils.isNotEmpty(departmentNameKey)) {
            // Use query 2
            List<FundFinancialProjection> fundData = ledgerRepository.findFundDescriptionFinancialDataByDepartmentAndYear(departmentNameKey, year);
            financialTableItems = fundData.stream()
                    .map(projection -> {
                        FinancialTableItem item = new FinancialTableItem();
                        item.setDescription(projection.getFundDescription());
                        item.setRevenue(projection.getRevenue());
                        item.setExpenses(projection.getExpenses());
                        return item;
                    })
                    .collect(Collectors.toList());
        } else {
            // Use query 1
            List<DepartmentFinancialProjection> departmentData = ledgerRepository.findDepartmentFinancialDataByYear(year);
            financialTableItems = departmentData.stream()
                    .map(projection -> {
                        FinancialTableItem item = new FinancialTableItem();
                        item.setDescription(projection.getDepartmentName());
                        item.setRevenue(projection.getRevenue());
                        item.setExpenses(projection.getExpenses());
                        return item;
                    })
                    .collect(Collectors.toList());
        }


        log.info("{} financialTableItems: {}", logPrefix, financialTableItems);

        return financialTableItems;
    }

    //////////////////////////////////////////  BELOW ARE HELPER FUNCTIONS  ///////////////////////////////////////////

    private List<TimelineItem> mapToTimelineItems(List<TimelineItemProjection> projections) {
        List<TimelineItem> timelineItems = new ArrayList<>();
        for (TimelineItemProjection projection : projections) {
            TimelineItem item = new TimelineItem();
            item.setPeriod(projection.getPeriod());
            item.setAmount(projection.getAmount());
            item.setLedgerDescription(projection.getLedgerDescription());
            timelineItems.add(item);
        }
        return timelineItems;
    }

    private List<TimelineItem> calculateSurplusDeficit(List<TimelineItem> revenueTimeline, List<TimelineItem> expensesTimeline) {
        List<TimelineItem> surplusDeficitTimeline = new ArrayList<>();

        Map<String, BigDecimal> revenueMap = new HashMap<>();
        for (TimelineItem revenueItem : revenueTimeline) {
            revenueMap.put(revenueItem.getPeriod(), revenueItem.getAmount());
        }

        for (TimelineItem expensesItem : expensesTimeline) {
            String period = expensesItem.getPeriod();
            BigDecimal revenue = revenueMap.getOrDefault(period, BigDecimal.ZERO);
            BigDecimal expenses = expensesItem.getAmount();
            BigDecimal surplusDeficit = revenue.subtract(expenses);

            TimelineItem surplusDeficitItem = new TimelineItem();
            surplusDeficitItem.setPeriod(period);
            surplusDeficitItem.setAmount(surplusDeficit);
            surplusDeficitItem.setLedgerDescription(LedgerBean.LedgerDescriptionType.SURPLUS_DEFICIT.getDescription());

            surplusDeficitTimeline.add(surplusDeficitItem);
        }

        return surplusDeficitTimeline;
    }
}
