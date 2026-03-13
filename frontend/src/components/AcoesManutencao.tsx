"use client";

import { Trash2, Edit, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Veiculo {
  id: number;
  modelo?: string;
  placa?: string;
}

interface Manutencao {
  id: number;
  veiculoId: number;
  tipoServico: string;
  dataInicio: string;
  dataFinalizacao: string | null;
  custoEstimado: number;
  status: string;
}

export default function AcoesManutencao({ manutencao }: { manutencao: Manutencao }) {
  const router = useRouter();
  
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [tipoServico, setTipoServico] = useState(manutencao.tipoServico);
  const [dataInicio, setDataInicio] = useState(manutencao.dataInicio);
  const [custoEstimado, setCustoEstimado] = useState(manutencao.custoEstimado);
  const [status, setStatus] = useState(manutencao.status);
  const [dataFinalizacao, setDataFinalizacao] = useState(manutencao.dataFinalizacao || "");

  const handleExcluir = async () => {
    setCarregando(true);
    try {
      const res = await fetch(`/api/manutencoes/${manutencao.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro da API");
      toast.success("Manutenção excluída!");
      setModalExcluirAberto(false);
      router.refresh();
    } catch (error) {
      toast.error("Falha ao excluir.");
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
      status
    };

    try {
      const res = await fetch(`/api/manutencoes/${manutencao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Erro da API");

      toast.success("Manutenção atualizada com sucesso!");
      setModalEditarAberto(false);
      router.refresh();
    } catch (error) {
      toast.error("Falha ao atualizar a manutenção.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <button 
          onClick={() => setModalEditarAberto(true)}
          className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
          title="Editar Manutenção"
        >
          <Edit size={18} />
        </button>

        <button 
          onClick={() => setModalExcluirAberto(true)} 
          title="Excluir Manutenção"
          className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {modalExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Excluir Agendamento?</h3>
              <p className="text-sm text-slate-500 mb-6">Esta ação não poderá ser desfeita.</p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setModalExcluirAberto(false)} disabled={carregando} className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg cursor-pointer">Cancelar</button>
                <button onClick={handleExcluir} disabled={carregando} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg cursor-pointer">{carregando ? "..." : "Excluir"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalEditarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm text-left">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Editar Manutenção</h2>
              <button onClick={() => setModalEditarAberto(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={24} /></button>
            </div>

            <form onSubmit={handleEditar} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Serviço</label>
                <input type="text" required value={tipoServico} onChange={(e) => setTipoServico(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="AGENDADA">Agendada</option>
                    <option value="EM ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUÍDA">Concluída</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custo (R$)</label>
                  <input type="number" step="0.01" required value={custoEstimado} onChange={(e) => setCustoEstimado(Number(e.target.value))} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Início</label>
                  <input type="date" required value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Finalização</label>
                  <input type="date" value={dataFinalizacao} onChange={(e) => setDataFinalizacao(e.target.value)} disabled={status !== "CONCLUIDA"} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-slate-100 disabled:text-slate-400" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setModalEditarAberto(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer">Cancelar</button>
                <button type="submit" disabled={carregando} className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:bg-blue-400">{carregando ? "Salvando..." : "Salvar Alterações"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}