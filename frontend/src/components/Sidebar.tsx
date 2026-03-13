import Link from 'next/link';
import { LayoutDashboard, Wrench } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">
          Logi<span className="text-white">Track</span> <span className="text-xs align-top font-normal bg-blue-600 text-white px-1.5 py-0.5 rounded">PRO</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Gestão de Frotas</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="/manutencoes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
          <Wrench size={20} />
          <span className="font-medium">Manutenções</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        LogiTrack © 2026
      </div>
    </aside>
  );
}