package com.logap.logitrack.repository;

import com.logap.logitrack.entity.Viagem;
import com.logap.logitrack.projection.RankingVeiculoProjection;
import com.logap.logitrack.projection.VolumeCategoriaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {

    @Query(value = "SELECT SUM(km_percorrida) FROM viagens", nativeQuery = true)
    BigDecimal calcularTotalKmFrota();

    @Query(value = "SELECT ve.tipo as tipo, COUNT(vi.id) as quantidade " +
                   "FROM viagens vi " +
                   "JOIN veiculos ve ON vi.veiculo_id = ve.id " +
                   "GROUP BY ve.tipo", nativeQuery = true)
    List<VolumeCategoriaProjection> contarViagensPorCategoria();

    @Query(value = "SELECT ve.placa as placa, ve.modelo as modelo, SUM(vi.km_percorrida) as totalKm " +
                   "FROM viagens vi " +
                   "JOIN veiculos ve ON vi.veiculo_id = ve.id " +
                   "GROUP BY ve.id, ve.placa, ve.modelo " +
                   "ORDER BY totalKm DESC LIMIT 1", nativeQuery = true)
    RankingVeiculoProjection buscarVeiculoMaiorKm();
}