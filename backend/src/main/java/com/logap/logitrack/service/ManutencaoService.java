package com.logap.logitrack.service;

import com.logap.logitrack.dto.ManutencaoRequestDTO;
import com.logap.logitrack.dto.ManutencaoResponseDTO;
import com.logap.logitrack.entity.Manutencao;
import com.logap.logitrack.entity.Veiculo;
import com.logap.logitrack.repository.ManutencaoRepository;
import com.logap.logitrack.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;
    private final VeiculoRepository veiculoRepository;

    @Transactional(readOnly = true)
    public List<ManutencaoResponseDTO> listarTodas() {
        return manutencaoRepository.findAll().stream()
                .map(ManutencaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ManutencaoResponseDTO buscarPorId(Long id) {
        Manutencao manutencao = manutencaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutenção não encontrada!"));
        return new ManutencaoResponseDTO(manutencao);
    }

    @Transactional
    public ManutencaoResponseDTO criar(ManutencaoRequestDTO dto) {
        Veiculo veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        Manutencao manutencao = new Manutencao();
        manutencao.setVeiculo(veiculo);
        manutencao.setDataInicio(dto.dataInicio());
        manutencao.setDataFinalizacao(dto.dataFinalizacao());
        manutencao.setTipoServico(dto.tipoServico());
        manutencao.setCustoEstimado(dto.custoEstimado());
        
        if (dto.status() != null && !dto.status().isBlank()) {
            manutencao.setStatus(dto.status());
        } else {
            manutencao.setStatus("PENDENTE");
        }

        Manutencao salva = manutencaoRepository.save(manutencao);
        return new ManutencaoResponseDTO(salva);
    }

    @Transactional
    public ManutencaoResponseDTO atualizar(Long id, ManutencaoRequestDTO dto) {
        Manutencao manutencao = manutencaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutenção não encontrada!"));

        manutencao.setDataInicio(dto.dataInicio());
        manutencao.setDataFinalizacao(dto.dataFinalizacao());
        manutencao.setTipoServico(dto.tipoServico());
        manutencao.setCustoEstimado(dto.custoEstimado());
        
        if (dto.status() != null && !dto.status().isBlank()) {
            manutencao.setStatus(dto.status());
        }

        return new ManutencaoResponseDTO(manutencaoRepository.save(manutencao));
    }

    @Transactional
    public void deletar(Long id) {
        Manutencao manutencao = manutencaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutenção não encontrada!"));
        manutencaoRepository.delete(manutencao);
    }
    
}