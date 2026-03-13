export interface Manutencao {
  id: number;
  veiculoId: number;
  veiculoPlaca: string; // Adicionamos a placa que vem do seu DTO para a tabela
  tipoServico: string;
  dataInicio: string;
  dataFinalizacao: string | null;
  custoEstimado: number;
  status: string;
}