import {
  Activity,
  Calendar,
  CircleDollarSign,
  Trophy,
  Wrench,
} from 'lucide-react';
import VolumeChart from '@/components/VolumeChart';

async function getDashboardData() {
  try {
    const res = await fetch('http://127.0.0.1:8080/api/dashboard', {
      cache: 'no-store',
    });
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
      <div className="animate-in fade-in flex h-[60vh] flex-col items-center justify-center text-slate-500 duration-500">
        <div className="mb-4 rounded-full border border-slate-200 bg-slate-100 p-6 shadow-sm">
          <Wrench size={40} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-700">
          Não foi possível carregar o painel
        </h2>
        <p className="mt-2 max-w-md text-center text-slate-500">
          Nossos serviços estão passando por uma instabilidade momentânea. Por
          favor, tente atualizar a página em alguns instantes.
        </p>
        <a
          href="/"
          className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
        >
          Atualizar Página
        </a>
      </div>
    );
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor || 0);
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-slate-500">
          Visão geral e indicadores estratégicos da sua frota.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Total Rodado da Frota
            </p>
            <h3 className="mt-1 text-3xl font-bold text-slate-800">
              {data.totalKmPercorrido}{' '}
              <span className="text-lg font-medium text-slate-500">km</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-red-50 p-4 text-red-600">
            <CircleDollarSign size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Custo Previsto (Mês)
            </p>
            <h3 className="mt-1 text-3xl font-bold text-slate-800">
              {formatarMoeda(data.projecaoFinanceiraMesAtual)}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-amber-50 p-4 text-amber-600">
            <Trophy size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Veículo Mais Utilizado
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-800">
              {data.rankingUtilizacao.modelo}{' '}
              <span className="text-sm font-normal text-slate-400">
                ({data.rankingUtilizacao.placa})
              </span>
            </h3>
            <p className="mt-0.5 text-sm font-medium text-amber-600">
              {data.rankingUtilizacao.totalKm} km rodados
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-1 text-lg font-bold text-slate-800">
            Volume por Categoria
          </h3>
          <p className="text-sm text-slate-500">
            Distribuição de viagens por tipo de veículo
          </p>
          <VolumeChart data={data.volumePorCategoria} />
        </div>

        {/* Bloco da Direita: Tabela (Ocupa 2 colunas) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Próximas Manutenções
              </h3>
              <p className="text-sm text-slate-500">
                Cronograma de serviços pendentes
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 text-slate-400">
              <Calendar size={20} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-sm text-slate-500">
                  <th className="pb-3 font-medium">Veículo</th>
                  <th className="pb-3 font-medium">Serviço</th>
                  <th className="pb-3 font-medium">Data</th>
                  <th className="pb-3 font-medium">Custo</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {data.proximasManutencoes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Nenhuma manutenção pendente no momento.
                    </td>
                  </tr>
                ) : (
                  data.proximasManutencoes.map((manutencao: any) => (
                    <tr
                      key={manutencao.id}
                      className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50"
                    >
                      <td className="py-4 font-medium text-slate-900">
                        {manutencao.veiculoPlaca}
                      </td>
                      <td className="py-4">{manutencao.tipoServico}</td>
                      <td className="py-4 text-slate-500">
                        {formatarData(manutencao.dataInicio)}
                      </td>
                      <td className="py-4 font-medium">
                        {formatarMoeda(manutencao.custoEstimado)}
                      </td>
                      <td className="py-4">
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-amber-700">
                          {manutencao.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
