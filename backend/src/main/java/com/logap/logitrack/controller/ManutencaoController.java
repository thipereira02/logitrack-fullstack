package com.logap.logitrack.controller;

import com.logap.logitrack.dto.ManutencaoRequestDTO;
import com.logap.logitrack.dto.ManutencaoResponseDTO;
import com.logap.logitrack.service.ManutencaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manutencoes")
@RequiredArgsConstructor
public class ManutencaoController {

    private final ManutencaoService manutencaoService;

    @GetMapping
    public ResponseEntity<List<ManutencaoResponseDTO>> listarTodas() {
        return ResponseEntity.ok(manutencaoService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManutencaoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(manutencaoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ManutencaoResponseDTO> criar(@Valid @RequestBody ManutencaoRequestDTO dto) {
        ManutencaoResponseDTO criada = manutencaoService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManutencaoResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ManutencaoRequestDTO dto) {
        return ResponseEntity.ok(manutencaoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        manutencaoService.deletar(id);
        return ResponseEntity.noContent().build(); 
    }
}