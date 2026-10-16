import React from 'react'
import { ShieldCheck, ExternalLink, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
        
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>PEIXOTO TRANSPARENTE • OBSERVATÓRIO CÍVICO</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Iniciativa independente guiada pelos princípios do <b>pragmatismo político e econômico</b>. 
            Sem narrativas ideológicas, sem palanque e sem filiação partidária. 
            Analisamos a materialidade dos números públicos para defender o bolso e os direitos do cidadão pagador de impostos.
          </p>
        </div>

        <div className="md:col-span-4 space-y-2">
          <div className="text-white font-bold text-xs uppercase tracking-wider">Fontes Oficiais dos Dados</div>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <a href="https://pncp.gov.br" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                Portal Nacional de Contratações Públicas (PNCP) <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://siconfi.tesouro.gov.br" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                Tesouro Nacional (SICONFI - DCA / RREO / RGF) <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://www.tce.mt.gov.br" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                Tribunal de Contas de Mato Grosso (TCE-MT) <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://cidades.ibge.gov.br/brasil/mt/peixoto-de-azevedo/panorama" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                IBGE Cidades (Peixoto de Azevedo - MT) <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2">
          <div className="text-white font-bold text-xs uppercase tracking-wider">Canais de Denúncia</div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Identificou irregularidades ou obras abandonadas? Faça sua parte:
          </p>
          <div className="space-y-1 text-slate-300">
            <div>• <b>MPMT:</b> ouvidoria.mpmt.mp.br</div>
            <div>• <b>TCE-MT:</b> ouvidoria@tce.mt.gov.br</div>
            <div>• <b>e-SIC Municipal:</b> peixotodeazevedo.mt.gov.br</div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          Dados protegidos pela Lei de Acesso à Informação (Lei 12.527/11) e Nova Lei de Licitações (Lei 14.133/21).
        </div>
        <div>
          Peixoto de Azevedo - Mato Grosso • Atualização Outubro/2026
        </div>
      </div>
    </footer>
  )
}
