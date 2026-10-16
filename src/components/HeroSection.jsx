import React from 'react'
import { TrendingUp, Wallet, AlertTriangle, Building2, Download, ArrowDown, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function HeroSection({ civicData, budgetData }) {
  const p25 = budgetData?.cities?.["Peixoto de Azevedo"]?.years?.["2025"] || {}

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[400px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold mb-6 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Auditoria Fiscal Cívica • Base Oficial PNCP & Tesouro Nacional SICONFI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Transparência Não é Ideologia. É Dinheiro no Seu Bolso.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Uma investigação materialista e estritamente técnica sobre Peixoto de Azevedo - MT. 
          Sem narrativas de direita ou de esquerda: cruzamos <span className="text-cyan-400 font-semibold">R$ 292 milhões em arrecadação</span>, 
          <span className="text-emerald-400 font-semibold"> 326 contratos públicos oficiais</span> e a realidade nas ruas para responder à pergunta que todo trabalhador faz: 
          <span className="text-white font-bold"> onde foi parar o seu dinheiro?</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/dossie-auditoria-peixoto.pdf"
            download="Dossie-Auditoria-Peixoto-de-Azevedo.pdf"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Dossiê Completo em PDF</span>
          </a>

          <a
            href="#diagnostico"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm hover:bg-slate-850 transition-all"
          >
            <span>Ver Raio-X dos Gastos</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* 4 Cards de Destaque Quantitativo */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-lg relative group hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Arrecadação Anual</span>
              <Wallet className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-3 text-2xl font-black text-white">R$ 292,2 Mi</div>
            <p className="mt-1 text-xs text-slate-400">
              Equivale a <b className="text-cyan-300">R$ 8.618/ano</b> (ou R$ 718/mês) por morador da cidade.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-lg relative group hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Liquidez de Caixa (TCE-MT)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3 text-2xl font-black text-emerald-400">R$ 10,78</div>
            <p className="mt-1 text-xs text-slate-400">
              Para cada R$ 1,00 de dívida imediata. <b>Dinheiro sobra no cofre</b> da prefeitura.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-lg relative group hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Urbanismo & Asfalto / Hab</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="mt-3 text-2xl font-black text-red-400">R$ 71,79</div>
            <p className="mt-1 text-xs text-slate-400">
              Por habitante/ano. A vizinha Guarantã investe <b className="text-red-300">R$ 668/hab</b> (9x mais).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-lg relative group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Concentração em Fornecedores</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3 text-2xl font-black text-amber-400">52,1%</div>
            <p className="mt-1 text-xs text-slate-400">
              Do total contratado foi absorvido por apenas <b className="text-amber-300">10 empresas privadas</b>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
