import { Wrench, Plus, Search, FileEdit, Trash2 } from 'lucide-react';

async function getManutencoes() {
  try {
    const res = await fetch('http://localhost:8080/api/manutencoes', { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar dados');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ManutencoesPage() {
  const manutencoes = await getManutencoes();

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manutenções</h1>
          <p className="text-slate-500 mt-1">Gerencie o histórico e os agendamentos da frota.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={20} />
          Nova Manutenção
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por placa ou serviço..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow disabled:bg-slate-50 disabled:cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        {/* Tabela de Dados */}
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
              {manutencoes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Wrench size={32} className="text-slate-300 mb-3" />
                      <p className="font-medium text-slate-600">Nenhuma manutenção encontrada</p>
                      <p className="text-xs mt-1">Clique no botão "Nova Manutenção" para começar.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                manutencoes.map((manutencao: any) => (
                  <tr key={manutencao.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{manutencao.veiculoPlaca}</td>
                    <td className="px-6 py-4">{manutencao.tipoServico}</td>
                    <td className="px-6 py-4 text-slate-500">{formatarData(manutencao.dataInicio)}</td>
                    <td className="px-6 py-4 font-medium">{formatarMoeda(manutencao.custoEstimado)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                        manutencao.status === 'CONCLUIDA' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {manutencao.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar">
                          <FileEdit size={18} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}