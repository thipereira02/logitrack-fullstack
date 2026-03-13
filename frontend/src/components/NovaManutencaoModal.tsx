"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NovaManutencaoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [veiculoId, setVeiculoId] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [custoEstimado, setCustoEstimado] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetch("/api/veiculos")
        .then((res) => res.json())
        .then((data) => setVeiculos(data))
        .catch(() => toast.error("Não foi possível carregar a frota."));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      veiculo: { id: Number(veiculoId) },
      tipoServico,
      dataInicio,
      custoEstimado: Number(custoEstimado),
      status: "AGENDADA"
    };

    try {
      const res = await fetch("/api/manutencoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Erro da API");

      toast.success("Manutenção agendada com sucesso!");
      
      setIsOpen(false);
      setVeiculoId(""); setTipoServico(""); setDataInicio(""); setCustoEstimado("");
      
      router.refresh();
      
    } catch (error) {
      toast.error("Falha ao registrar a manutenção. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
      >
        <Plus size={20} />
        Nova Manutenção
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Agendar Manutenção</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Veículo</label>
                <select 
                  required value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Selecione um veículo...</option>
                  {Array.isArray(veiculos) && veiculos.map((v: any) => (
                    <option key={v.id} value={v.id}>{v.modelo} ({v.placa})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Serviço</label>
                <input 
                  type="text" required placeholder="Ex: Troca de Óleo"
                  value={tipoServico} onChange={(e) => setTipoServico(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Prevista</label>
                  <input 
                    type="date" required
                    value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custo Estimado (R$)</label>
                  <input 
                    type="number" step="0.01" required placeholder="0.00"
                    value={custoEstimado} onChange={(e) => setCustoEstimado(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 cursor-pointer disabled:cursor-not-allowed">
                  {loading ? "Salvando..." : "Salvar Agendamento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}