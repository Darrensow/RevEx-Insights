package com.revex.backend.model.repository;

import com.revex.backend.model.entity.DepartmentBean;
import com.revex.backend.model.projection.DepartmentProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentBean, Integer> {
    List<DepartmentProjection> findAllProjectedBy();
}
