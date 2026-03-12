package com.logap.logitrack.dto;

import com.logap.logitrack.entity.Manutencao;
import com.logap.logitrack.projection.RankingVeiculoProjection;
import com.logap.logitrack.projection.VolumeCategoriaProjection;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponseDTO(
        BigDecimal totalKmPercorrido,
        List<VolumeCategoriaProjection> volumePorCategoria,
        List<ManutencaoResponseDTO> proximasManutencoes,
        RankingVeiculoProjection rankingUtilizacao,
        BigDecimal projecaoFinanceiraMesAtual
) {
}