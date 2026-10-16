import React from 'react'
import { Home, AlertCircle, Target, DollarSign, Newspaper, Users, Scale, LayoutGrid } from 'lucide-react'

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'TODOS', label: 'Visão Completa', icon: LayoutGrid },
    { id: 'DIAGNOSTICO', label: '1. Diagnóstico & A Casa', icon: Home },
    { id: 'PROBLEMAS', label: '2. Problemas (IDH / IBGE)', icon: AlertCircle },
    { id: 'PLANO', label: '3. Plano de Governo', icon: Target },
    { id: 'GASTOS', label: '4. Gastos & Fornecedores', icon: DollarSign },
    { id: 'MIDIA', label: '5. Mídia Plural & Notícias', icon: Newspaper },
    { id: 'POLITICOS', label: '6. Quem Cobrar (15 Políticos)', icon: Users },
    { id: 'VEREDITO', label: '7. Veredito Final', icon: Scale },
  ]

  return (
    <div className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  window.scrollTo({ top: 350, behavior: 'smooth' })
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all select-none text-[11px] sm:text-xs ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
