import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'
import { MapPin, TrendingUp, AlertTriangle, CheckCircle, Scale, Users } from 'lucide-react'

export default function RegionalBenchmarkSection({ budgetData }) {
  const [activeMetric, setActiveMetric] = useState('urbanismo')

  const reg = budgetData?.regional_comparison_2025 || {}
  const cities = budgetData?.cities || {}

  const urbanismoData = [
    { name: 'Peixoto de Azevedo', valor: 71.79, isCurrent: true, color: '#ef4444' },
    { name: 'Guarantã do Norte', valor: 243.01, isCurrent: false, color: '#06b6d4' },
    { name: 'Matupá', valor: 292.74, isCurrent: false, color: '#06b6d4' },
    { name: 'Média Mato Grosso', valor: 385.50, isCurrent: false, color: '#64748b' },
    { name: 'Média Brasil', valor: 312.40, isCurrent: false, color: '#475569' },
  ]

  const administracaoData = [
    { name: 'Peixoto de Azevedo', valor: 1017.50, isCurrent: true, color: '#ef4444' },
    { name: 'Guarantã do Norte', valor: 743.12, isCurrent: false, color: '#10b981' },
    { name: 'Matupá', valor: 1058.22, isCurrent: false, color: '#f59e0b' },
    { name: 'Média Mato Grosso', valor: 680.20, isCurrent: false, color: '#64748b' },
    { name: 'Média Brasil', valor: 610.15, isCurrent: false, color: '#475569' },
  ]

  const investimentoRatioData = [
    { name: 'Peixoto de Azevedo', valor: 6.09, isCurrent: true, color: '#ef4444' },
    { name: 'Guarantã do Norte', valor: 15.25, isCurrent: false, color: '#10b981' },
    { name: 'Matupá', valor: 17.86, isCurrent: false, color: '#10b981' },
    { name: 'Média Mato Grosso', valor: 14.80, isCurrent: false, color: '#64748b' },
    { name: 'Média Brasil', valor: 9.50, isCurrent: false, color: '#475569' },
  ]

  const currentChartData = 
    activeMetric === 'urbanismo' ? urbanismoData :
    activeMetric === 'administracao' ? administracaoData : investimentoRatioData

  const currentMetricLabel =
    activeMetric === 'urbanismo' ? 'Gasto Per Capita em Urbanismo & Asfalto (R$/hab/ano)' :
    activeMetric === 'administracao' ? 'Custo da Administração & Burocracia por Habitante (R$/hab/ano)' :
    'Taxa de Investimento Real em Obras (% da Despesa Total)'

  return (
    <section id="benchmark" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Auditoria Comparativa Regional</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Batalha Regional: Como Peixoto se Compara com os Vizinhos?
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Comparar com quem está ao lado é a forma mais justa de avaliar a eficiência de uma gestão. 
          Vejamos como Peixoto se comporta frente a Guarantã do Norte, Matupá e as médias de Mato Grosso e do Brasil.
        </p>
      </div>

      {/* Controles do Gráfico */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveMetric('urbanismo')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeMetric === 'urbanismo'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Urbanismo & Asfalto / Hab
          </button>
          <button
            onClick={() => setActiveMetric('administracao')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeMetric === 'administracao'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Burocracia / Hab
          </button>
          <button
            onClick={() => setActiveMetric('investimentos')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeMetric === 'investimentos'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Taxa de Obras Reais (%)
          </button>
        </div>
      </div>

      {/* Card do Gráfico Comparativo */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">{currentMetricLabel}</h3>
            <p className="text-xs text-slate-400">Dados consolidados do SICONFI (Tesouro Nacional) e IBGE Cidades.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Peixoto de Azevedo
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Vizinhos Imediatos
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> Médias de Referência
            </span>
          </div>
        </div>

        <div className="mt-8 h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentChartData} margin={{ top: 20, right: 30, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tickFormatter={(val) => activeMetric === 'investimentos' ? `${val}%` : `R$ ${val}`}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
                formatter={(val) => [activeMetric === 'investimentos' ? `${val}%` : `R$ ${val.toFixed(2)}`, 'Valor']}
              />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                {currentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Nota analítica embaixo do gráfico */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          {activeMetric === 'urbanismo' && (
            <p>
              <b className="text-red-400">Alerta Crítico:</b> Enquanto Peixoto de Azevedo aplicou míseros <b>R$ 71,79 por habitante</b> em urbanismo e drenagem em 2025, os municípios vizinhos de Guarantã e Matupá investiram entre <b>3 a 4 vezes mais</b> por cidadão, e a média dos municípios de Mato Grosso chega a <b>R$ 385,50</b>.
            </p>
          )}
          {activeMetric === 'administracao' && (
            <p>
              <b className="text-red-400">Inchaço Administrativo:</b> Peixoto gasta <b>R$ 1.017,50 por habitante</b> apenas na atividade-meio da prefeitura (gabinetes e burocracia administrativa), contra R$ 743,12 de Guarantã do Norte e R$ 680,20 da média do Estado. São mais de R$ 11 milhões a mais torrados na máquina!
            </p>
          )}
          {activeMetric === 'investimentos' && (
            <p>
              <b className="text-amber-400">Capacidade de Entrega Asfixiada:</b> Apenas <b>6,09%</b> de todo o orçamento de Peixoto vira obra pública tangível ou maquinário novo. A média dos municípios de MT é de <b>14,80%</b>, e cidades vizinhas chegam a aplicar quase 18% em investimentos.
            </p>
          )}
        </div>
      </div>

      {/* Tabela de Indicadores Sociais e Econômicos */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Matriz Comparativa de Desempenho e Indicadores Sociais</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Fontes: IBGE Cidades (Censo Oficial), TCE-MT e Tesouro Nacional SICONFI.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Indicador Oficial</th>
                <th className="py-4 px-6 text-red-400">Peixoto de Azevedo</th>
                <th className="py-4 px-6">Guarantã do Norte</th>
                <th className="py-4 px-6">Matupá</th>
                <th className="py-4 px-6">Média MT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">População Estimada (IBGE)</td>
                <td className="py-3.5 px-6 font-mono font-bold text-white">33.754 hab</td>
                <td className="py-3.5 px-6 font-mono">31.209 hab</td>
                <td className="py-3.5 px-6 font-mono">21.959 hab</td>
                <td className="py-3.5 px-6 font-mono">-</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">Gasto em Urbanismo & Asfalto / Hab</td>
                <td className="py-3.5 px-6 font-mono font-bold text-red-400">R$ 71,79</td>
                <td className="py-3.5 px-6 font-mono text-emerald-400">R$ 243,01</td>
                <td className="py-3.5 px-6 font-mono text-emerald-400">R$ 292,74</td>
                <td className="py-3.5 px-6 font-mono">R$ 385,50</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">Custo de Administração / Hab</td>
                <td className="py-3.5 px-6 font-mono font-bold text-red-400">R$ 1.017,50</td>
                <td className="py-3.5 px-6 font-mono text-emerald-400">R$ 743,12</td>
                <td className="py-3.5 px-6 font-mono text-amber-400">R$ 1.058,22</td>
                <td className="py-3.5 px-6 font-mono">R$ 680,20</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">Gasto em Saúde / Hab</td>
                <td className="py-3.5 px-6 font-mono font-bold text-white">R$ 2.133,54</td>
                <td className="py-3.5 px-6 font-mono">R$ 2.208,50</td>
                <td className="py-3.5 px-6 font-mono">R$ 1.963,00</td>
                <td className="py-3.5 px-6 font-mono">R$ 1.850,00</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">Taxa de Escolarização (6 a 14 anos)</td>
                <td className="py-3.5 px-6 font-mono font-bold text-amber-400">91,05% (~9% fora)</td>
                <td className="py-3.5 px-6 font-mono">96,80%</td>
                <td className="py-3.5 px-6 font-mono">97,40%</td>
                <td className="py-3.5 px-6 font-mono">96,20%</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">Mortalidade Infantil (óbitos / mil)</td>
                <td className="py-3.5 px-6 font-mono font-bold text-red-400">16,05 / mil</td>
                <td className="py-3.5 px-6 font-mono">11,20 / mil</td>
                <td className="py-3.5 px-6 font-mono">9,80 / mil</td>
                <td className="py-3.5 px-6 font-mono">12,40 / mil</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="py-3.5 px-6 font-semibold text-white">Liquidez de Caixa (TCE-MT)</td>
                <td className="py-3.5 px-6 font-mono font-bold text-emerald-400">R$ 10,78 p/ R$ 1,00</td>
                <td className="py-3.5 px-6 font-mono">R$ 3,40 p/ R$ 1,00</td>
                <td className="py-3.5 px-6 font-mono">R$ 4,10 p/ R$ 1,00</td>
                <td className="py-3.5 px-6 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
