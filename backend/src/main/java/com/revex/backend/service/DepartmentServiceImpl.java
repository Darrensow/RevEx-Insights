package com.revex.backend.service;

import com.revex.backend.model.projection.DepartmentProjection;
import com.revex.backend.model.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

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
}
