package com.revex.backend.model.projection;

import java.math.BigDecimal;

public interface TimelineItemProjection {
    String getPeriod();
    BigDecimal getAmount();
    String getLedgerDescription();
}
