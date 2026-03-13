package com.logap.logitrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ManutencaoRequestDTO(
        @NotNull(message = "O ID do veículo é obrigatório")
        Long veiculoId,
        
        @NotNull(message = "A data de início é obrigatória")
        @FutureOrPresent
        LocalDate dataInicio,
        
        LocalDate dataFinalizacao,
        
        @NotBlank(message = "O tipo de serviço é obrigatório")
        String tipoServico,
        
        @NotNull(message = "O custo estimado é obrigatório")
        @Positive(message = "O custo deve ser maior que zero")
        BigDecimal custoEstimado,
        
        String status
) {
}