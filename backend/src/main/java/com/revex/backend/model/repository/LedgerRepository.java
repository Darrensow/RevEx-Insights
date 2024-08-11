package com.revex.backend.model.repository;

import com.revex.backend.model.entity.LedgerBean;
import com.revex.backend.model.projection.ExpensesBreakdownProjection;
import com.revex.backend.model.projection.RevenueAndExpensesBreakdownProjection;
import com.revex.backend.model.projection.TimelineItemProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LedgerRepository extends JpaRepository<LedgerBean, Integer> {

    @Query(value = "SELECT " +
                "l.ledger_description AS ledgerDescription, " +
                "CASE " +
                "    WHEN COALESCE(:period, 'Yearly') = 'Yearly' THEN YEAR(l.general_ledger_date) " +
                "    WHEN COALESCE(:period, 'Quarterly') = 'Quarterly' THEN CONCAT(YEAR(l.general_ledger_date), ' Q', QUARTER(l.general_ledger_date)) " +
                "    WHEN COALESCE(:period, 'Monthly') = 'Monthly' THEN DATE_FORMAT(l.general_ledger_date, '%Y-%m') " +
                "END AS period, " +
                "SUM(l.amount) AS amount " +
            "FROM ledger l " +
                "JOIN fund f ON l.fund_id = f.fund_id " +
                "JOIN department d ON l.department_id = d.department_id " +
            "WHERE (:department_name_key IS NULL OR d.department_name_key = :department_name_key) " +
                "AND (:year IS NULL OR YEAR(l.general_ledger_date) = :year) " +
                "AND l.ledger_description = :ledger_description " +
            "GROUP BY period " +
            "ORDER BY period ASC", nativeQuery = true)
    List<TimelineItemProjection> findLedgerSummariesByYearAndPeriodAndDescription(
            @Param("period") String period,
            @Param("year") Integer year,
            @Param("department_name_key") String departmentNameKey,
            @Param("ledger_description") String ledgerDescription
    );

    @Query(value = "SELECT " +
            "SUM(l.amount) AS totalAmount, " +
            "l.ledger_description AS ledgerDescription " +
            "FROM ledger l " +
            "JOIN department d ON l.department_id = d.department_id " +
            "WHERE (:department_name_key IS NULL OR d.department_name_key = :department_name_key) " +
            "AND (:year IS NULL OR YEAR(l.general_ledger_date) = :year) " +
            "GROUP BY l.ledger_description", nativeQuery = true)
    List<RevenueAndExpensesBreakdownProjection> findRevenueAndExpensesBreakdownByYearAndDepartment(
            @Param("year") Integer year,
            @Param("department_name_key") String departmentNameKey
    );

    @Query(value = "SELECT " +
            "SUM(l.amount) AS totalAmount, " +
            "f.fund_description AS fundDescription " +
            "FROM ledger l " +
            "JOIN department d ON l.department_id = d.department_id " +
            "JOIN fund f ON l.fund_id = f.fund_id " +
            "WHERE (:department_name_key IS NULL OR d.department_name_key = :department_name_key) " +
            "AND (:year IS NULL OR YEAR(l.general_ledger_date) = :year) " +
            "AND l.ledger_description = 'Expenses' " +
            "GROUP BY f.fund_description " +
            "ORDER BY totalAmount DESC", nativeQuery = true)
    List<ExpensesBreakdownProjection> findExpensesBreakdownByYearAndDepartment(
            @Param("year") Integer year,
            @Param("department_name_key") String departmentNameKey
    );

}