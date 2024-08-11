package com.revex.backend.service;

import com.revex.backend.model.TimelineItem;
import com.revex.backend.model.TimelineResponseModel;
import com.revex.backend.model.entity.LedgerBean;
import com.revex.backend.model.projection.TimelineItemProjection;
import com.revex.backend.model.repository.LedgerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class LedgerServiceImpl implements LedgerService {

    private final LedgerRepository ledgerRepository;

    public TimelineResponseModel getTimelineResponseModel(String period, Integer year, String departmentNameKey) {
        String logPrefix = "getTimelineResponseModel";

        List<TimelineItemProjection> revenueTimelineProjections = ledgerRepository.findLedgerSummariesByYearAndPeriodAndDescription(period, year, departmentNameKey, LedgerBean.LedgerDescriptionType.REVENUES.getDescription());
        List<TimelineItemProjection> expensesTimelineProjections = ledgerRepository.findLedgerSummariesByYearAndPeriodAndDescription(period, year, departmentNameKey, LedgerBean.LedgerDescriptionType.EXPENSES.getDescription());

        log.info(logPrefix + "revenueTimelineProjections : {}", revenueTimelineProjections);
        log.info(logPrefix + "expensesTimelineProjections : {}", expensesTimelineProjections);

        List<TimelineItem> revenueTimeline = mapToTimelineItems(revenueTimelineProjections);
        List<TimelineItem> expensesTimeline = mapToTimelineItems(expensesTimelineProjections);

        log.info(logPrefix + "revenueTimeline : {}", revenueTimeline);
        log.info(logPrefix + "expensesTimeline : {}", expensesTimeline);

        List<TimelineItem> surplusDeficitTimeline = calculateSurplusDeficit(revenueTimeline, expensesTimeline);
        log.info(logPrefix + "surplusDeficitTimeline : {}", surplusDeficitTimeline);

        TimelineResponseModel responseModel = new TimelineResponseModel();
        responseModel.setRevenueTimeline(revenueTimeline);
        responseModel.setExpensesTimeline(expensesTimeline);
        responseModel.setSurplusDeficitTimeline(surplusDeficitTimeline);

        log.info(logPrefix + "responseModel : {}", responseModel);

        return responseModel;
    }

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
