'use client';

import { useState } from 'react';
import AcoesManutencao from './AcoesManutencao';
import {
  Wrench,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Manutencao } from '@/interfaces/Manutencao';

type Ordenacao = {
  coluna: keyof Manutencao;
  direcao: 'asc' | 'desc';
} | null;

export default function TabelaManutencoes({
  manutencoes,
}: {
  manutencoes: Manutencao[];
}) {
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>(null);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor || 0);
  };

  const formatarData = (dataString: string | null) => {
    if (!dataString) return '-';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const statusColors: Record<string, string> = {
    PENDENTE: 'bg-purple-50 text-purple-700 border-purple-200',
    AGENDADA: 'bg-blue-50 text-blue-700 border-blue-200',
    EM_ANDAMENTO: 'bg-amber-50 text-amber-700 border-amber-200',
    CONCLUIDA: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CANCELADA: 'bg-red-50 text-red-700 border-red-200',
  };

  const statusLabels: Record<string, string> = {
    PENDENTE: 'Pendente',
    AGENDADA: 'Agendada',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDA: 'Concluída',
    CANCELADA: 'Cancelada',
  };

  const handleOrdenar = (coluna: keyof Manutencao) => {
    let novaDirecao: 'asc' | 'desc' = 'asc';

    if (ordenacao && ordenacao.coluna === coluna) {
      if (ordenacao.direcao === 'asc') {
        novaDirecao = 'desc';
      } else {
        setOrdenacao(null);
        return;
      }
    }
    setOrdenacao({ coluna, direcao: novaDirecao });
  };

  const renderIconeOrdenacao = (coluna: keyof Manutencao) => {
    if (ordenacao?.coluna !== coluna)
      return <ArrowUpDown size={14} className="ml-1 text-slate-300" />;
    return ordenacao.direcao === 'asc' ? (
      <ChevronUp size={14} className="ml-1 text-blue-600" />
    ) : (
      <ChevronDown size={14} className="ml-1 text-blue-600" />
    );
  };

  const dadosProcessados = manutencoes.filter((m) => {
    const termo = busca.toLowerCase();
    const placa = m.veiculoPlaca ? m.veiculoPlaca.toLowerCase() : '';
    const servico = m.tipoServico ? m.tipoServico.toLowerCase() : '';
    return placa.includes(termo) || servico.includes(termo);
  });

  if (ordenacao) {
    dadosProcessados.sort((a, b) => {
      let valorA = a[ordenacao.coluna];
      let valorB = b[ordenacao.coluna];

      if (valorA === null) return 1;
      if (valorB === null) return -1;

      // Se for Data, converte pra comparar corretamente
      if (ordenacao.coluna === 'dataInicio') {
        valorA = new Date(valorA as string).getTime();
        valorB = new Date(valorB as string).getTime();
      }

      if (valorA < valorB) return ordenacao.direcao === 'asc' ? -1 : 1;
      if (valorA > valorB) return ordenacao.direcao === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 p-4">
        <div className="relative max-w-md flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Buscar por placa ou serviço..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2 pr-4 pl-10 text-sm transition-shadow focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-xs tracking-wider text-slate-500 uppercase select-none">
              <th className="px-6 py-4 font-semibold">Veículo</th>
              <th className="px-6 py-4 font-semibold">Serviço</th>

              <th
                className="cursor-pointer px-6 py-4 font-semibold transition-colors hover:bg-slate-100"
                onClick={() => handleOrdenar('dataInicio')}
              >
                <div className="flex items-center">
                  Data Início {renderIconeOrdenacao('dataInicio')}
                </div>
              </th>
              <th
                className="cursor-pointer px-6 py-4 font-semibold transition-colors hover:bg-slate-100"
                onClick={() => handleOrdenar('custoEstimado')}
              >
                <div className="flex items-center">
                  Custo {renderIconeOrdenacao('custoEstimado')}
                </div>
              </th>
              <th
                className="cursor-pointer px-6 py-4 font-semibold transition-colors hover:bg-slate-100"
                onClick={() => handleOrdenar('status')}
              >
                <div className="flex items-center">
                  Status {renderIconeOrdenacao('status')}
                </div>
              </th>

              <th className="px-6 py-4 text-right font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {dadosProcessados.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Wrench size={32} className="mb-3 text-slate-300" />
                    <p className="font-medium text-slate-600">
                      Nenhuma manutenção encontrada
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              dadosProcessados.map((manutencao) => (
                <tr
                  key={manutencao.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {manutencao.veiculoPlaca}
                  </td>
                  <td className="px-6 py-4">{manutencao.tipoServico}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {formatarData(manutencao.dataInicio)}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {formatarMoeda(manutencao.custoEstimado)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${statusColors[manutencao.status] || 'border-slate-200 bg-slate-50 text-slate-700'}`}
                    >
                      {statusLabels[manutencao.status] || manutencao.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <AcoesManutencao manutencao={manutencao} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
