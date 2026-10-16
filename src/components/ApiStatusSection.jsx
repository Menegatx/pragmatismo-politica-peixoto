import React from 'react'
import { Database, RefreshCw, FileText, Download, CheckCircle, Shield, Terminal, ArrowUpRight } from 'lucide-react'

export default function ApiStatusSection() {
  return (
    <section id="api-status" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Painel da API e Integração Contínua */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>Pipeline Automatizado de Dados</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Acompanhamento Diário via APIs Oficiais
            </h3>

            <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
              Diferente de portais de transparência municipais que escondem relatórios em PDFs ilegíveis, 
              esta plataforma se conecta diretamente aos servidores federais abertos para auditar dados sem filtro político.
            </p>

            {/* Status das 3 APIs */}
            <div className="mt-6 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div>
                    <div className="text-xs font-bold text-white">Portal Nacional de Contratações Públicas (PNCP)</div>
                    <div className="text-[10px] text-slate-400 font-mono">api/consulta/v1/contratos • CNPJ 03.238.631/0001-31</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE (326 Contratos)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div>
                    <div className="text-xs font-bold text-white">Tesouro Nacional (SICONFI - DCA / RREO)</div>
                    <div className="text-[10px] text-slate-400 font-mono">apidatalake.tesouro.gov.br • Balanços 2024 e 2025</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE (Auditado)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div>
                    <div className="text-xs font-bold text-white">IBGE Cidades (Indicadores Demográficos)</div>
                    <div className="text-[10px] text-slate-400 font-mono">servicodados.ibge.gov.br • Censo e População Oficial</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SINCRONIZADO
                </span>
              </div>
            </div>

            {/* Como atualizar */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-2">
                <Terminal className="w-4 h-4" />
                <span>Como Rodar a Atualização Contínua dos Dados:</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Você pode executar o pipeline a qualquer momento no seu computador ou servidor para puxar novos contratos e gerar automaticamente a versão mais recente do site e do PDF:
              </p>
              <div className="bg-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <code>./pipeline/update_pipeline.sh</code>
                <span className="text-[10px] text-slate-500">Bash / Cron Script</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Última sincronização: Outubro/2026</span>
            <span className="text-slate-500">Dados 100% Públicos e Auditáveis</span>
          </div>
        </div>

        {/* Card de Download do Dossiê em PDF */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none" />

          <div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 mb-5">
              <FileText className="w-6 h-6 stroke-[2.5]" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Documento Oficial de Auditoria</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
              Dossiê de Auditoria Cívica: Peixoto de Azevedo - MT
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Baixe o relatório completo diagramado pronto para impressão, compartilhamento em grupos de WhatsApp e anexação em representações ao Ministério Público.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Raio-X dos 10 maiores recebedores de contratos com CNPJs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Batalha de eficiência com Guarantã do Norte e Matupá</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Auditoria do bloqueio de R$ 1,55M na gestão da Saúde</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tabela "Para Onde Vai Cada R$ 100 de Imposto"</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="/dossie-auditoria-peixoto.pdf"
              download="Dossie-Auditoria-Peixoto-de-Azevedo.pdf"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Dossiê em PDF (Gratuito)</span>
            </a>
            <span className="block text-center text-[10px] text-slate-500 mt-2">
              Formato A4 • Diagramação Profissional • Dados Oficiais
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
