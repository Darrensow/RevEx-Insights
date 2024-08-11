package com.revex.backend.model.repository;

import com.revex.backend.model.entity.FundBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundRepository extends JpaRepository<FundBean, Integer> {
    // Additional custom query methods can be defined here if needed
}
