package com.revex.backend.service;

import com.revex.backend.model.TimelineResponseModel;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface AnalyticsService {
    List<Map<String, String>> getDepartmentNamesAndKeysAsMap();
    TimelineResponseModel getTimelineResponseModel(String period, Integer year, String departmentNameKey);
    List<Map<String, BigDecimal>> getExpensesBreakdown(Integer year, String departmentNameKey);
    List<Map<String, BigDecimal>> getRevenueAndExpensesBreakdown(Integer year, String departmentNameKey);
}
