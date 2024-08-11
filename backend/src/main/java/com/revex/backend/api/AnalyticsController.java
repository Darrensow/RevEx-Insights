package com.revex.backend.api;

import com.revex.backend.model.TimelineResponseModel;
import com.revex.backend.service.LedgerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/analytics")
public class AnalyticsController implements AnalyticsApi {

    private final LedgerService ledgerService;

    @GetMapping("/get-timeline-data")
    public ResponseEntity<TimelineResponseModel> getTimelineData(
            @RequestParam(required = false) String period,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String departmentNameKey
    ) {

        String logPrefix = "getTimelineData";
        log.info(logPrefix + " year : {}", year);
        log.info(logPrefix + " period : {}", period);
        log.info(logPrefix + " department : {}", departmentNameKey);

        TimelineResponseModel timelineResponseModel =  ledgerService.getTimelineResponseModel(period, year, departmentNameKey);

        return new ResponseEntity<>(timelineResponseModel, HttpStatus.OK);
    }

    @Override
    @GetMapping("/initiate-analytics-dashboard")
    public ResponseEntity<List<String>> initiateAnalyticsDashboard() {
        // Implement your logic here
        return null;
    }
}