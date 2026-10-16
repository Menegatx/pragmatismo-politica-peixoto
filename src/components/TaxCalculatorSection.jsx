import React, { useState } from 'react'
import { Calculator, ArrowRight, HelpCircle, Check, Info } from 'lucide-react'

export default function TaxCalculatorSection({ civicData }) {
  const [salary, setSalary] = useState(3000)
  const [calculationMode, setCalculationMode] = useState('salary') // 'salary' or 'iptu'
  const [directTax, setDirectTax] = useState(1200)

  // Em média, o trabalhador brasileiro paga ~33% de carga tributária total (consumo + renda + serviços)
  // E o município fica com uma fatia direta e indireta correspondente
  const estimatedTaxPaid = calculationMode === 'salary' 
    ? (salary * 12) * 0.12 // ~12% da renda anual volta/gira em tributos municipais e transferências obrigatórias
    : directTax

  const breakdown = civicData?.tax_breakdown_per_100 || {
    pessoal_encargos: 42.49,
    terceiros_pj: 18.33,
    administracao_maquina: 14.41,
    saude: 30.23,
    educacao: 27.51,
    camara_vereadores: 2.45,
    urbanismo_asfalto: 1.01,
    diarias_viagens: 0.35,
    investimentos_obras: 6.09,
    assistencia_social: 1.10
  }

  const calcValue = (percent) => {
    return ((estimatedTaxPaid * percent) / 100).toFixed(2)
  }

  return (
    <section id="calculadora" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-800/80 bg-slate-950/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Impacto Individual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculadora Cívica: Onde Vai Parar o Seu Imposto?
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Descubra quanto do dinheiro suado do seu trabalho vai para pagar o salário dos vereadores, 
            as diárias de viagem e as empreiteiras terceirizadas — e quanto mísero centavo sobra para tapar os buracos da sua rua.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Caixa de Entrada de Valores */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Forma de Cálculo</span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
                <button
                  onClick={() => setCalculationMode('salary')}
                  className={`px-3 py-1 rounded-md transition-all ${calculationMode === 'salary' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Salário Mensal
                </button>
                <button
                  onClick={() => setCalculationMode('iptu')}
                  className={`px-3 py-1 rounded-md transition-all ${calculationMode === 'iptu' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  IPTU / Taxa Anual
                </button>
              </div>
            </div>

            {calculationMode === 'salary' ? (
              <div className="mt-6">
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Seu Salário Mensal Bruto (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">R$</span>
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value) || 0)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSalary(1518)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                  >
                    1 Salário Mínimo (R$ 1.518)
                  </button>
                  <button
                    onClick={() => setSalary(3000)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                  >
                    Trabalhador Médio (R$ 3.000)
                  </button>
                  <button
                    onClick={() => setSalary(6000)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                  >
                    Comerciante / Agro (R$ 6.000)
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Valor Total Pago à Prefeitura no Ano (IPTU, ISS, Taxas) (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">R$</span>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={directTax}
                    onChange={(e) => setDirectTax(Number(e.target.value) || 0)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>
            )}

            <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Estimado de Arrecadação Pública
              </span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1 font-mono">
                R$ {estimatedTaxPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-xs text-slate-400 font-sans font-normal ml-2">/ ano</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Baseado na carga tributária municipal efetiva e na execução orçamentária oficial declarada pela Prefeitura de Peixoto no SICONFI.
              </p>
            </div>
          </div>

          {/* Resultado: Para Onde Vai Cada Centavo */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
              <span>Distribuição Real do Seu Dinheiro</span>
              <span className="text-xs font-mono font-normal text-slate-400">Total: 100% dos Gastos</span>
            </h3>

            <div className="space-y-4">
              {/* Pessoal e Burocracia */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Folha de Servidores & Encargos</div>
                  <div className="text-[11px] text-slate-400">Salários, comissionados e encargos previdenciários</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-cyan-400">R$ {calcValue(breakdown.pessoal_encargos)}</div>
                  <div className="text-[10px] text-slate-500">{breakdown.pessoal_encargos}% do total</div>
                </div>
              </div>

              {/* Terceirizações PJ */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Empresas Terceirizadas (PJ)</div>
                  <div className="text-[11px] text-slate-400">Contratos de locação, apoio, manutenção e limpeza</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-amber-400">R$ {calcValue(breakdown.terceiros_pj)}</div>
                  <div className="text-[10px] text-slate-500">{breakdown.terceiros_pj}% do total</div>
                </div>
              </div>

              {/* Burocracia / Gabinetes */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Administração Geral da Máquina</div>
                  <div className="text-[11px] text-slate-400">Gabinetes, despesas administrativas e atividade-meio</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-white">R$ {calcValue(breakdown.administracao_maquina)}</div>
                  <div className="text-[10px] text-slate-500">{breakdown.administracao_maquina}% do total</div>
                </div>
              </div>

              {/* Câmara de Vereadores */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Câmara Municipal de Vereadores</div>
                  <div className="text-[11px] text-slate-400">Salários de vereadores e custos do legislativo municipal</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-white">R$ {calcValue(breakdown.camara_vereadores)}</div>
                  <div className="text-[10px] text-slate-500">{breakdown.camara_vereadores}% do total</div>
                </div>
              </div>

              {/* Urbanismo & Asfalto - Destaque em Vermelho */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                <div>
                  <div className="text-xs font-extrabold text-red-400 flex items-center gap-1.5">
                    <span>Urbanismo, Asfalto e Drenagem da Cidade</span>
                  </div>
                  <div className="text-[11px] text-red-300/80">Pavimentação de ruas, bueiros e infraestrutura de bairros</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-base text-red-400">R$ {calcValue(breakdown.urbanismo_asfalto)}</div>
                  <div className="text-[10px] text-red-400/80 font-bold">APENAS {breakdown.urbanismo_asfalto}%</div>
                </div>
              </div>

              {/* Diárias de Viagem */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Diárias de Viagem de Gestores</div>
                  <div className="text-[11px] text-slate-400">Reembolsos de viagens (cresceram +167% em 1 ano)</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-amber-400">R$ {calcValue(breakdown.diarias_viagens)}</div>
                  <div className="text-[10px] text-slate-500">{breakdown.diarias_viagens}% do total</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <b>Conclusão Materialista:</b> De tudo que você pagou, <span className="text-red-400 font-bold">apenas R$ {calcValue(breakdown.urbanismo_asfalto)}</span> foi destinado ao asfalto e drenagem das ruas onde você anda todos os dias. O restante foi consumido pelo próprio aparato burocrático e contratações terceirizadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
