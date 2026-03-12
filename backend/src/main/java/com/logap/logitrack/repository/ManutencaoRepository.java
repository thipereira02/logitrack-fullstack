package com.logap.logitrack.repository;

import com.logap.logitrack.entity.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {

    @Query("SELECT SUM(m.custoEstimado) FROM Manutencao m WHERE EXTRACT(MONTH FROM m.dataInicio) = :mes AND EXTRACT(YEAR FROM m.dataInicio) = :ano")
    BigDecimal somarCustoManutencoesPorMesEAno(@Param("mes") int mes, @Param("ano") int ano);

    @Query(value = "SELECT * FROM manutencoes m WHERE m.status = 'PENDENTE' ORDER BY m.data_inicio ASC LIMIT 5", nativeQuery = true)
    List<Manutencao> buscarProximasManutencoes();
}