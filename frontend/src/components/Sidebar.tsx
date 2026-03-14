import Link from 'next/link';
import { LayoutDashboard, Wrench } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">
          Logi<span className="text-white">Track</span>{' '}
          <span className="rounded bg-blue-600 px-1.5 py-0.5 align-top text-xs font-normal text-white">
            PRO
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">Gestão de Frotas</p>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link
          href="/manutencoes"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Wrench size={20} />
          <span className="font-medium">Manutenções</span>
        </Link>
      </nav>

      <div className="border-t border-slate-800 p-4 text-center text-xs text-slate-500">
        LogiTrack © 2026
      </div>
    </aside>
  );
}
