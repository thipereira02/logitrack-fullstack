"use client";

import { Trash2, Edit, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AcoesManutencao({ id }: { id: number }) {
  const router = useRouter();
  const [deletando, setDeletando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const handleExcluir = async () => {
    setDeletando(true);
    try {
      const res = await fetch(`/api/manutencoes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro da API");

      toast.success("Manutenção excluída com sucesso!");
      
      setModalAberto(false);
      router.refresh();
      
    } catch (error) {
      toast.error("Falha ao excluir a manutenção. Verifique se ela existe.");
      setDeletando(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <button 
          className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
          title="Editar Manutenção"
        >
          <Edit size={18} />
        </button>

        <button 
          onClick={() => setModalAberto(true)} 
          disabled={deletando}
          title="Excluir Manutenção"
          className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 p-6">
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">Excluir Agendamento?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Tem certeza que deseja apagar esta manutenção? Essa ação não poderá ser desfeita.
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setModalAberto(false)}
                  disabled={deletando}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleExcluir}
                  disabled={deletando}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed flex justify-center"
                >
                  {deletando ? "Excluindo..." : "Sim, Excluir"}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}