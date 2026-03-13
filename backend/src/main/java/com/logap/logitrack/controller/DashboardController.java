package com.logap.logitrack.controller;

import com.logap.logitrack.dto.DashboardResponseDTO;
import com.logap.logitrack.dto.ManutencaoResponseDTO;
import com.logap.logitrack.repository.ManutencaoRepository;
import com.logap.logitrack.repository.ViagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class DashboardController {

    private final ViagemRepository viagemRepository;
    private final ManutencaoRepository manutencaoRepository;

    @GetMapping
    public ResponseEntity<DashboardResponseDTO> obterMétricas() {
        
        LocalDate hoje = LocalDate.now();
        
        List<ManutencaoResponseDTO> proximasManutencoesDto = manutencaoRepository.buscarProximasManutencoes()
                .stream()
                .map(ManutencaoResponseDTO::new)
                .collect(Collectors.toList());

        DashboardResponseDTO dashboard = new DashboardResponseDTO(
                viagemRepository.calcularTotalKmFrota(),
                viagemRepository.contarViagensPorCategoria(),
                proximasManutencoesDto,
                viagemRepository.buscarVeiculoMaiorKm(),
                manutencaoRepository.somarCustoManutencoesPorMesEAno(hoje.getMonthValue(), hoje.getYear())
        );

        return ResponseEntity.ok(dashboard);
    }
}