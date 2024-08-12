package com.revex.backend.api;

import com.revex.backend.model.FinancialTableItem;
import com.revex.backend.model.TimelineResponseModel;
import com.revex.backend.service.AnalyticsService;
import com.revex.backend.service.RateLimiterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/analytics")
public class AnalyticsController implements AnalyticsApi {

    private final AnalyticsService analyticsService;
    private final RateLimiterService rateLimiterService;

    @GetMapping("/get-timeline-data")
    public ResponseEntity<TimelineResponseModel> getTimelineData(
            @RequestParam(required = false) String period,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String departmentNameKey
    ) {
        if (!rateLimiterService.isRequestAllowed()) {
            return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);
        }
        String logPrefix = "getTimelineData";
        log.info(logPrefix + " year : {}", year);
        log.info(logPrefix + " period : {}", period);
        log.info(logPrefix + " department : {}", departmentNameKey);

        TimelineResponseModel timelineResponseModel =  analyticsService.getTimelineResponseModel(period, year, departmentNameKey);

        return new ResponseEntity<>(timelineResponseModel, HttpStatus.OK);
    }

    @Override
    @GetMapping("/initiate-analytics-dashboard")
    public ResponseEntity<List<Map<String, String>>> initiateAnalyticsDashboard() {
        if (!rateLimiterService.isRequestAllowed()) {
            return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);
        }
        String logPrefix = "initiateAnalyticsDashboard";

        List<Map<String, String>> departmentNamesAndKeysMap = analyticsService.getDepartmentNamesAndKeysAsMap();
        log.info(logPrefix + " departmentNamesAndKeysMap : {}", departmentNamesAndKeysMap);

        return new ResponseEntity<>(departmentNamesAndKeysMap, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Map<String, BigDecimal>>> getExpensesBreakdown(Integer year, String departmentNameKey) {
        if (!rateLimiterService.isRequestAllowed()) {
            return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);
        }
        String logPrefix = "[AnalyticsController] getExpensesBreakdown";

        List<Map<String, BigDecimal>> expensesBreakdown = analyticsService.getExpensesBreakdown(year, departmentNameKey);
        log.info("{} expensesBreakdown: {}", logPrefix, expensesBreakdown);

        return new ResponseEntity<>(expensesBreakdown, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<List<Map<String, BigDecimal>>> getRevenueAndExpensesBreakdown(Integer year, String departmentNameKey) {
        if (!rateLimiterService.isRequestAllowed()) {
            return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);
        }
        String logPrefix = "[AnalyticsController] getRevenueAndExpensesBreakdown";

        List<Map<String, BigDecimal>> revenueAndExpensesBreakdown = analyticsService.getRevenueAndExpensesBreakdown(year, departmentNameKey);
        log.info("{} revenueAndExpensesBreakdown: {}", logPrefix, revenueAndExpensesBreakdown);

        return new ResponseEntity<>(revenueAndExpensesBreakdown, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<List<FinancialTableItem>> getFinancialTableData(Integer year, String departmentNameKey) {
        if (!rateLimiterService.isRequestAllowed()) {
            return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);
        }
        String logPrefix = "getFinancialTableData";

        List<FinancialTableItem> financialTableItems = analyticsService.getFinancialTableData(year, departmentNameKey);

        log.info("{} financialTableItems: {}", logPrefix, financialTableItems);

        return new ResponseEntity<>(financialTableItems, HttpStatus.OK);
    }
}