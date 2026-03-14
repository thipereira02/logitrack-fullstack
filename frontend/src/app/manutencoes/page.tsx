import NovaManutencaoModal from '@/components/NovaManutencaoModal';
import TabelaManutencoes from '@/components/TabelaManutencoes';

async function getManutencoes() {
  try {
    const res = await fetch('http://localhost:8080/api/manutencoes', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Falha ao buscar dados');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ManutencoesPage() {
  const manutencoes = await getManutencoes();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-6xl space-y-6 duration-500">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Manutenções
          </h1>
          <p className="mt-1 text-slate-500">
            Gerencie o histórico e os agendamentos da frota.
          </p>
        </div>
        <NovaManutencaoModal />
      </div>

      <TabelaManutencoes manutencoes={manutencoes} />
    </div>
  );
}
