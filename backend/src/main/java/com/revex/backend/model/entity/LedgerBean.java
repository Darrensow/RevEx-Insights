package com.revex.backend.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "ledger")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LedgerBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "general_ledger_date")
    @Temporal(TemporalType.DATE)
    private Date generalLedgerDate;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "ledger_description")
    private String ledgerDescription;

    @Column(name = "fund_id")
    private String fund_id;

    @Column(name = "department_id")
    private String department_id;

    @Getter
    public enum LedgerDescriptionType {
        EXPENSES("Expenses"),
        REVENUES("Revenues"),
        SURPLUS_DEFICIT("Surplus/Deficit");

        private final String description;

        LedgerDescriptionType(String description) {
            this.description = description;
        }

    }
}