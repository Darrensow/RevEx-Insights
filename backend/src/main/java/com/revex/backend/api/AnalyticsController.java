package com.revex.backend.api;

import com.revex.backend.model.TimelineResponseModel;
import com.revex.backend.service.DepartmentService;
import com.revex.backend.service.LedgerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/analytics")
public class AnalyticsController implements AnalyticsApi {

    private final LedgerService ledgerService;
    private final DepartmentService departmentService;

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
    public ResponseEntity<List<Map<String, String>>> initiateAnalyticsDashboard() {
        String logPrefix = "initiateAnalyticsDashboard";
        List<Map<String, String>> departmentNamesAndKeysMap = departmentService.getDepartmentNamesAndKeysAsMap();
        log.info(logPrefix + " departmentNamesAndKeysMap : {}", departmentNamesAndKeysMap);
        return new ResponseEntity<>(departmentNamesAndKeysMap, HttpStatus.OK);
    }
}