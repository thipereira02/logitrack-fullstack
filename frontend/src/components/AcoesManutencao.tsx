'use client';

import { Trash2, Edit, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Manutencao } from '@/interfaces/Manutencao';

export default function AcoesManutencao({
  manutencao,
}: {
  manutencao: Manutencao;
}) {
  const router = useRouter();

  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [tipoServico, setTipoServico] = useState(manutencao.tipoServico);
  const [dataInicio, setDataInicio] = useState(manutencao.dataInicio);
  const [custoEstimado, setCustoEstimado] = useState(manutencao.custoEstimado);
  const [status, setStatus] = useState(manutencao.status);
  const [dataFinalizacao, setDataFinalizacao] = useState(
    manutencao.dataFinalizacao || ''
  );

  const handleExcluir = async () => {
    setCarregando(true);
    try {
      const res = await fetch(`/api/manutencoes/${manutencao.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro da API');
      toast.success('Manutenção excluída!');
      setModalExcluirAberto(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Falha ao excluir.');
    } finally {
      setCarregando(false);
    }
  };

  const handleEditar = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCarregando(true);

    const payload = {
      veiculoId: manutencao.veiculoId,
      tipoServico,
      dataInicio,
      dataFinalizacao: dataFinalizacao ? dataFinalizacao : null,
      custoEstimado: Number(custoEstimado),
      status,
    };

    try {
      const res = await fetch(`/api/manutencoes/${manutencao.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro da API');

      toast.success('Manutenção atualizada com sucesso!');
      setModalEditarAberto(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Falha ao atualizar a manutenção.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setModalEditarAberto(true)}
          className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-blue-600"
          title="Editar Manutenção"
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => setModalExcluirAberto(true)}
          title="Excluir Manutenção"
          className="cursor-pointer p-2 text-slate-400 transition-colors hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {modalExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Excluir Agendamento?
              </h3>
              <p className="mb-6 text-sm text-slate-500">
                Esta ação não poderá ser desfeita.
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setModalExcluirAberto(false)}
                  disabled={carregando}
                  className="flex-1 cursor-pointer rounded-lg bg-slate-100 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExcluir}
                  disabled={carregando}
                  className="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700"
                >
                  {carregando ? '...' : 'Excluir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalEditarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 text-left backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800">
                Editar Manutenção
              </h2>
              <button
                onClick={() => setModalEditarAberto(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditar} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Serviço
                </label>
                <input
                  type="text"
                  required
                  value={tipoServico}
                  onChange={(e) => setTipoServico(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="AGENDADA">Agendada</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUÍDA">Concluída</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Custo (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={custoEstimado}
                    onChange={(e) => setCustoEstimado(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Data Início
                  </label>
                  <input
                    type="date"
                    required
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Data Finalização
                  </label>
                  <input
                    type="date"
                    value={dataFinalizacao}
                    onChange={(e) => setDataFinalizacao(e.target.value)}
                    disabled={status !== 'CONCLUIDA'}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalEditarAberto(false)}
                  className="cursor-pointer rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={carregando}
                  className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {carregando ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
