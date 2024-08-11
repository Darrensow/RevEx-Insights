package com.revex.backend.model.projection;

import java.math.BigDecimal;

public interface DepartmentFinancialProjection {
    String getDepartmentName();
    BigDecimal getRevenue();
    BigDecimal getExpenses();
}
