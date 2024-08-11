package com.revex.backend.service;

import com.revex.backend.model.TimelineResponseModel;

public interface LedgerService {
    public TimelineResponseModel getTimelineResponseModel(String period, Integer year, String departmentNameKey);
}
