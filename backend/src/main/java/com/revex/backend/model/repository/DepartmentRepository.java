package com.revex.backend.model.repository;

import com.revex.backend.model.entity.DepartmentBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentBean, Integer> {
    // Additional custom query methods can be defined here if needed
}
