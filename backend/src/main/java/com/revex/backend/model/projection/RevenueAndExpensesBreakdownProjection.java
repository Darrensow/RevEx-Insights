package com.revex.backend.model.projection;

import java.math.BigDecimal;

public interface RevenueAndExpensesBreakdownProjection {
    BigDecimal getTotalAmount();
    String getLedgerDescription();
}
