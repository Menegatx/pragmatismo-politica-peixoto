import React from 'react'
import { FileText, BarChart3, ExternalLink } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <BarChart3 className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">PEIXOTO TRANSPARENTE</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Auditoria Cívica
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">Pragmatismo Político & Análise Fiscal Materialista</p>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-300">
          <a href="#diagnostico" className="hover:text-cyan-400 transition-colors">Diagnóstico</a>
          <a href="#problemas-sociais" className="hover:text-cyan-400 transition-colors">Problemas (IDH)</a>
          <a href="#plano-governo" className="hover:text-cyan-400 transition-colors">Plano TSE</a>
          <a href="#fornecedores" className="hover:text-cyan-400 transition-colors">Fornecedores CNPJ</a>
          <a href="#midia-noticias" className="hover:text-cyan-400 transition-colors">Mídia & Fatos</a>
          <a href="#politicos" className="hover:text-cyan-400 transition-colors font-semibold text-cyan-300">Quem Cobrar</a>
          <a href="#veredito" className="hover:text-cyan-400 transition-colors text-amber-300 font-semibold">Veredito</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/dossie-auditoria-peixoto.pdf"
            download="Dossie-Auditoria-Peixoto-de-Azevedo.pdf"
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Baixar Dossiê PDF</span>
            <span className="sm:hidden">Dossiê PDF</span>
          </a>
        </div>
      </div>
    </header>
  )
}
