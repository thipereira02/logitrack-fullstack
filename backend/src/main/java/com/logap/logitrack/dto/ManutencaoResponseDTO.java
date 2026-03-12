package com.logap.logitrack.dto;

import com.logap.logitrack.entity.Manutencao;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ManutencaoResponseDTO(
        Long id,
        Long veiculoId,
        String veiculoPlaca,
        LocalDate dataInicio,
        LocalDate dataFinalizacao,
        String tipoServico,
        BigDecimal custoEstimado,
        String status
) {
    public ManutencaoResponseDTO(Manutencao manutencao) {
        this(
                manutencao.getId(),
                manutencao.getVeiculo().getId(),
                manutencao.getVeiculo().getPlaca(),
                manutencao.getDataInicio(),
                manutencao.getDataFinalizacao(),
                manutencao.getTipoServico(),
                manutencao.getCustoEstimado(),
                manutencao.getStatus()
        );
    }
}