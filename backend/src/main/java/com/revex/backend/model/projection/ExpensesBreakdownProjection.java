package com.revex.backend.model.projection;

import java.math.BigDecimal;

public interface ExpensesBreakdownProjection {
    BigDecimal getTotalAmount();
    String getFundDescription();
}
