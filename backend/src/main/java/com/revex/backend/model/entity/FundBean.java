package com.revex.backend.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "fund")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FundBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fund_id")
    private Integer fundId;

    @Column(name = "fund_description")
    private String fundDescription;

    @Column(name = "fund_description_key")
    private String fundDescriptionKey;
}