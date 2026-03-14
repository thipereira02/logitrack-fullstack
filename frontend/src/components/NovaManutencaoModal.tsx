'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NovaManutencaoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [veiculoId, setVeiculoId] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [custoEstimado, setCustoEstimado] = useState('');

  const hoje = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen) {
      fetch('/api/veiculos')
        .then((res) => res.json())
        .then((data) => setVeiculos(data))
        .catch(() => toast.error('Não foi possível carregar a frota.'));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      veiculoId: Number(veiculoId),
      tipoServico,
      dataInicio,
      custoEstimado: Number(custoEstimado),
      status: 'AGENDADA',
    };

    try {
      const res = await fetch('/api/manutencoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro da API');

      toast.success('Manutenção agendada com sucesso!');

      setIsOpen(false);
      setVeiculoId('');
      setTipoServico('');
      setDataInicio('');
      setCustoEstimado('');

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Falha ao registrar a manutenção. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        <Plus size={20} />
        Nova Manutenção
      </button>

      {isOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm duration-200">
          <div className="animate-in zoom-in-95 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800">
                Agendar Manutenção
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
              ></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Veículo
                </label>
                <select
                  required
                  value={veiculoId}
                  onChange={(e) => setVeiculoId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecione um veículo...</option>
                  {Array.isArray(veiculos) &&
                    veiculos.map((v: any) => (
                      <option key={v.id} value={v.id}>
                        {v.modelo} ({v.placa})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Serviço
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Troca de Óleo"
                  value={tipoServico}
                  onChange={(e) => setTipoServico(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Data Prevista
                  </label>
                  <input
                    type="date"
                    required
                    min={hoje}
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Custo Estimado (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={custoEstimado}
                    onChange={(e) => setCustoEstimado(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                  {loading ? 'Salvando...' : 'Salvar Agendamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
