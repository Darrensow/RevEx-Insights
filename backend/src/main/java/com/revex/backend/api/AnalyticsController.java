package com.revex.backend.api;

import com.revex.backend.model.TimelineResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revex.backend.model.TimelineItem;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/analytics")
public class AnalyticsController implements AnalyticsApi {

    @Override
    @GetMapping("/get-timeline-data")
    public ResponseEntity<TimelineResponseModel> getTimelineData(@RequestParam BigDecimal year, @RequestParam String period, @RequestParam String department) {
        String logPrefix = "getTimelineData";
        log.info(logPrefix + "year : {}", year);
        log.info(logPrefix + "period : {}", period);
        log.info(logPrefix + "department : {}", department);
        // Create dummy data for expenses, revenue, and surplusDeficit timelines
        List<TimelineItem> expensesTimeline = createDummyTimelineItems("Expenses");
        List<TimelineItem> revenueTimeline = createDummyTimelineItems("Revenue");
        List<TimelineItem> surplusDeficitTimeline = createDummyTimelineItems("SurplusDeficit");

        // Create the TimelineResponseModel object
        TimelineResponseModel responseModel = new TimelineResponseModel();
        responseModel.setExpensesTimeline(expensesTimeline);
        responseModel.setRevenueTimeline(revenueTimeline);
        responseModel.setSurplusDeficitTimeline(surplusDeficitTimeline);

        // Return the response
        return new ResponseEntity<>(responseModel, HttpStatus.OK);
    }

    private List<TimelineItem> createDummyTimelineItems(String type) {
        List<TimelineItem> timelineItems = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            TimelineItem item = new TimelineItem();
            item.setTimelineItemType(type);
            item.setTimestamp(LocalDate.of(2024, i, 1)); // Setting the timestamp to the first day of each month in 2024
            item.setTimestampDisplay(getMonthName(i));
            item.setTimelineAmount(BigDecimal.valueOf(1000 + i * 100)); // Example amount
            timelineItems.add(item);
        }
        return timelineItems;
    }

    private String getMonthName(int month) {
        return LocalDate.of(2024, month, 1).getMonth().name();
    }

    @Override
    @GetMapping("/initiate-analytics-dashboard")
    public ResponseEntity<List<String>> initiateAnalyticsDashboard() {
        // Implement your logic here
        return null;
    }
}