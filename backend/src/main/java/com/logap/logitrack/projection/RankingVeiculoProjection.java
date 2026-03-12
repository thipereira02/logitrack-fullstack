package com.logap.logitrack.projection;

import java.math.BigDecimal;

public interface RankingVeiculoProjection {
    String getPlaca();
    String getModelo();
    BigDecimal getTotalKm();
}