package com.revex.backend.service;

import java.util.List;
import java.util.Map;

public interface DepartmentService {
    public List<Map<String, String>> getDepartmentNamesAndKeysAsMap();
}
