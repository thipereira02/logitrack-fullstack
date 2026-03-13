import NovaManutencaoModal from '@/components/NovaManutencaoModal';
import TabelaManutencoes from '@/components/TabelaManutencoes';

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manutenções</h1>
          <p className="text-slate-500 mt-1">Gerencie o histórico e os agendamentos da frota.</p>
        </div>
        <NovaManutencaoModal />
      </div>

      <TabelaManutencoes manutencoes={manutencoes} />
      
    </div>
  );
}