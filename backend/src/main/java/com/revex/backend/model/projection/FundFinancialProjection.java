package com.revex.backend.model.projection;

import java.math.BigDecimal;

public interface FundFinancialProjection {
    String getFundDescription();
    BigDecimal getRevenue();
    BigDecimal getExpenses();
}
