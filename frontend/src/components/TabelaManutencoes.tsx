"use client";

import { useState } from 'react';
import AcoesManutencao from './AcoesManutencao';
import { Wrench, Search } from 'lucide-react';
import { Manutencao } from '@/interfaces/Manutencao';

export default function TabelaManutencoes({ manutencoes }: { manutencoes: Manutencao[] }) {
  const [busca, setBusca] = useState("");

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const manutencoesFiltradas = manutencoes.filter((m) => {
    const termo = busca.toLowerCase();
    const placa = m.veiculoPlaca ? m.veiculoPlaca.toLowerCase() : "";
    const servico = m.tipoServico ? m.tipoServico.toLowerCase() : "";
    return placa.includes(termo) || servico.includes(termo);
  });

  const statusColors: Record<string, string> = {
    AGENDADA: "bg-blue-50 text-blue-700 border-blue-200",
    EM_ANDAMENTO: "bg-amber-50 text-amber-700 border-amber-200",
    CONCLUIDA: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELADA: "bg-red-50 text-red-700 border-red-200"
  };

  const statusLabels: Record<string, string> = {
    AGENDADA: "Agendada",
    EM_ANDAMENTO: "Em Andamento",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada",
    PENDENTE: "Pendente"
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      
      {/* Barra de Busca */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por placa ou serviço..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Veículo</th>
              <th className="px-6 py-4 font-semibold">Serviço</th>
              <th className="px-6 py-4 font-semibold">Data Início</th>
              <th className="px-6 py-4 font-semibold">Custo</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
            {manutencoesFiltradas.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Wrench size={32} className="text-slate-300 mb-3" />
                    <p className="font-medium text-slate-600">Nenhuma manutenção encontrada</p>
                    <p className="text-xs mt-1">
                      {busca ? "Tente buscar com outros termos." : 'Clique em "Nova Manutenção" para começar.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              manutencoesFiltradas.map((manutencao: Manutencao) => (
                <tr key={manutencao.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{manutencao.veiculoPlaca}</td>
                  <td className="px-6 py-4">{manutencao.tipoServico}</td>
                  <td className="px-6 py-4 text-slate-500">{formatarData(manutencao.dataInicio)}</td>
                  <td className="px-6 py-4 font-medium">{formatarMoeda(manutencao.custoEstimado)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${statusColors[manutencao.status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
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