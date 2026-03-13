import { Activity, CircleDollarSign, Trophy, Wrench } from 'lucide-react';

async function getDashboardData() {
  try {
    const res = await fetch('http://localhost:8080/api/dashboard', { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar dados');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 animate-in fade-in duration-500">
        <div className="p-6 bg-slate-100 rounded-full mb-4 shadow-sm border border-slate-200">
          <Wrench size={40} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-700 tracking-tight">Não foi possível carregar o painel</h2>
        <p className="mt-2 text-center max-w-md text-slate-500">
          Nossos serviços estão passando por uma instabilidade momentânea. Por favor, tente atualizar a página em alguns instantes.
        </p>
        <a 
          href="/"
          className="mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
        >
          Atualizar Página
        </a>
      </div>
    );
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">Visão geral e indicadores estratégicos da sua frota.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: KM Total */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Rodado da Frota</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{data.totalKmPercorrido} <span className="text-lg text-slate-500 font-medium">km</span></h3>
          </div>
        </div>

        {/* Card 2: Projeção Financeira (Manutenções do Mês) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 bg-red-50 text-red-600 rounded-xl">
            <CircleDollarSign size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Custo Previsto (Mês)</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{formatarMoeda(data.projecaoFinanceiraMesAtual)}</h3>
          </div>
        </div>

        {/* Card 3: Ranking - Veículo Mais Utilizado */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
            <Trophy size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Veículo Mais Utilizado</p>
            <h3 className="text-xl font-bold text-slate-800 mt-1">
              {data.rankingUtilizacao.modelo} <span className="text-slate-400 text-sm font-normal">({data.rankingUtilizacao.placa})</span>
            </h3>
            <p className="text-sm text-amber-600 font-medium mt-0.5">{data.rankingUtilizacao.totalKm} km rodados</p>
          </div>
        </div>

      </div>
    </div>
  );
}