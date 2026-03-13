package com.logap.logitrack.controller;

import com.logap.logitrack.entity.Veiculo; 
import com.logap.logitrack.repository.VeiculoRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @GetMapping
    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }
}