import os
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable, PageBreak
)
from reportlab.pdfgen import canvas

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "..", "src", "data")
PUBLIC_DIR = os.path.join(BASE_DIR, "..", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

PDF_OUTPUT = os.path.join(PUBLIC_DIR, "dossie-auditoria-peixoto.pdf")

class NumberedCanvas(canvas.Canvas):
    """Canvas de duas passadas para calcular automaticamente o total de páginas e adicionar rodapé."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))

        # Cabeçalho a partir da página 2
        if self._pageNumber > 1:
            self.drawString(36, 810, "OBSERVATÓRIO DE PRAGMATISMO PÚBLICO • AUDITORIA CÍVICA DE PEIXOTO DE AZEVEDO - MT")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(36, 804, 559, 804)

        # Rodapé em todas as páginas
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(36, 45, 559, 45)
        
        self.drawString(36, 32, "Documento Público e Cívico • Base: PNCP (Lei 14.133/21), SICONFI (Tesouro Nacional) e TSE 2024")
        page_str = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(559, 32, page_str)
        self.restoreState()

def load_all_data():
    with open(os.path.join(DATA_DIR, "civic_indicators.json"), "r", encoding="utf-8") as f:
        civic = json.load(f)
    with open(os.path.join(DATA_DIR, "suppliers_summary.json"), "r", encoding="utf-8") as f:
        suppliers = json.load(f)
    with open(os.path.join(DATA_DIR, "budget_comparison.json"), "r", encoding="utf-8") as f:
        budgets = json.load(f)
    with open(os.path.join(DATA_DIR, "politicians.json"), "r", encoding="utf-8") as f:
        politicians = json.load(f)
    with open(os.path.join(DATA_DIR, "government_plan.json"), "r", encoding="utf-8") as f:
        plan = json.load(f)
    with open(os.path.join(DATA_DIR, "social_indicators.json"), "r", encoding="utf-8") as f:
        social = json.load(f)
    with open(os.path.join(DATA_DIR, "news_media.json"), "r", encoding="utf-8") as f:
        media = json.load(f)
    with open(os.path.join(DATA_DIR, "pragmatic_verdict.json"), "r", encoding="utf-8") as f:
        verdict = json.load(f)
    return civic, suppliers, budgets, politicians, plan, social, media, verdict

def build_pdf():
    print("[*] Gerando Dossiê Cívico Completo e Aprofundado em PDF (Multipage)...")
    civic, suppliers, budgets, politicians, plan, social, media, verdict = load_all_data()

    doc = SimpleDocTemplate(
        PDF_OUTPUT,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=50,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()

    primary = colors.HexColor("#0f172a")     # Slate 900
    accent = colors.HexColor("#0284c7")      # Sky 600
    danger = colors.HexColor("#dc2626")      # Red 600
    warning = colors.HexColor("#d97706")     # Amber 600
    success = colors.HexColor("#059669")     # Emerald 600
    card_bg = colors.HexColor("#f8fafc")     # Slate 50
    border_color = colors.HexColor("#cbd5e1")# Slate 300
    text_muted = colors.HexColor("#475569")   # Slate 600

    title_cover = ParagraphStyle(
        'DocTitleCover',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary,
        spaceAfter=6
    )

    h1_style = ParagraphStyle(
        'ChapterHeading',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=primary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=body_style,
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor("#0f172a")
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9,
        textColor=colors.white,
        alignment=1
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor("#1e293b")
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold'
    )

    table_cell_right = ParagraphStyle(
        'TableCellRight',
        parent=table_cell,
        alignment=2
    )

    story = []

    # ==========================================
    # PÁGINA 1: CAPA, RESUMO EXECUTIVO E BLINDAGEM JURÍDICA
    # ==========================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("OBSERVATÓRIO INDEPENDENTE DE AUDITORIA CÍVICA & PRAGMATISMO FISCAL", ParagraphStyle(
        'PreTitle', fontName='Helvetica-Bold', fontSize=9, leading=11, textColor=accent, spaceAfter=4
    )))
    story.append(Paragraph("DOSSIÊ DE AUDITORIA FISCAL & POLÍTICA: PEIXOTO DE AZEVEDO - MT", title_cover))
    story.append(Paragraph(
        "Diagnóstico Materialista da Alocação de R$ 292 Milhões em Recursos Públicos: "
        "Promessas do TSE, Gastos PNCP, Benchmark Regional, Mídia Plural e Veredito Cidadão (Exercícios 2024–2026)",
        ParagraphStyle('SubCover', fontName='Helvetica', fontSize=10, leading=14, textColor=text_muted, spaceAfter=12)
    ))
    story.append(HRFlowable(width="100%", thickness=2, color=accent, spaceBefore=0, spaceAfter=14))

    # Box de Blindagem Jurídica e Imparcialidade
    legal_text = (
        "<b>NOTA DE BLINDAGEM JURÍDICA & IMPARCIALIDADE POLÍTICA:</b><br/>"
        "Este documento é um relatório técnico de auditoria cívica fundamentado nos direitos constitucionais de acesso à informação "
        "e fiscalização popular (Art. 5º, incisos XIV e XXXIII da Constituição Federal de 1988, Lei Federal nº 12.527/2011 - LAI, "
        "Lei Complementar nº 101/2000 - LRF e Lei nº 14.133/2021 - Nova Lei de Licitações).<br/>"
        "<b>100% dos dados apresentados foram extraídos de bases governamentais públicas e abertas:</b> Sistema SICONFI da Secretaria do "
        "Tesouro Nacional, Portal Nacional de Contratações Públicas (PNCP), Tribunal de Contas do Estado de Mato Grosso (TCE-MT), "
        "Tribunal Superior Eleitoral (TSE) e decisões colegiadas públicas do Tribunal de Justiça de Mato Grosso (TJ-MT). "
        "O presente trabalho não possui filiação partidária, não defende nem ataca ideologias de direita ou de esquerda, e limita-se "
        "estritamente à reprodução fidedigna dos registros oficiais e à análise materialista da aplicação do dinheiro público."
    )
    t_legal = Table([[Paragraph(legal_text, callout_style)]], colWidths=[523])
    t_legal.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#94a3b8")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_legal)
    story.append(Spacer(1, 14))

    # 4 Números Macro da Auditoria
    p25 = budgets["cities"]["Peixoto de Azevedo"]["years"]["2025"]
    tot_desp = p25["despesa_total"]
    obras_ratio = (p25["obras"] / tot_desp) * 100
    adm_ratio = (p25["administracao"] / tot_desp) * 100

    macro_data = [
        [
            Paragraph("<b>Arrecadação Anual</b><br/><font size=12 color='#0284c7'><b>R$ 292,2 Mi</b></font><br/><font size=6.5 color='#475569'>R$ 8.618/ano por morador</font>", body_style),
            Paragraph("<b>Liquidez de Caixa (TCE)</b><br/><font size=12 color='#059669'><b>R$ 10,78 p/ R$ 1</b></font><br/><font size=6.5 color='#475569'>Dinheiro no cofre sobra</font>", body_style),
            Paragraph("<b>Burocracia & Gabinetes</b><br/><font size=12 color='#dc2626'><b>R$ 34,3 Mi</b></font><br/><font size=6.5 color='#475569'>+{adm_ratio:.1f}% do total do município</font>", body_style),
            Paragraph("<b>Asfalto & Urbanismo/Hab</b><br/><font size=12 color='#d97706'><b>R$ 71,79/ano</b></font><br/><font size=6.5 color='#475569'>Guarantã gasta R$ 668/hab</font>", body_style),
        ]
    ]
    t_macro = Table(macro_data, colWidths=[130, 131, 131, 131])
    t_macro.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_macro)
    story.append(Spacer(1, 14))

    # Sumário dos Capítulos
    story.append(Paragraph("<b>ESTRUTURA DESTE DOSSIÊ DE AUDITORIA:</b>", ParagraphStyle('SumTitle', fontName='Helvetica-Bold', fontSize=8.5, textColor=primary)))
    story.append(Paragraph(
        "• <b>Capítulo 1:</b> Diagnóstico Materialista & Storytelling de Cole Knaflic (A Analogia da Casa do Trabalhador)<br/>"
        "• <b>Capítulo 2:</b> A Realidade Social de Peixoto de Azevedo (IDH, IBGE, Mortalidade Infantil e União do Norte)<br/>"
        "• <b>Capítulo 3:</b> Metômetro Eleitoral (O Plano de Governo Registrado no TSE Frente aos Fatos Auditados)<br/>"
        "• <b>Capítulo 4:</b> Batalha Regional de Eficiência (Comparativo Per Capita com Guarantã, Matupá, MT e Brasil)<br/>"
        "• <b>Capítulo 5:</b> Raio-X dos Fornecedores Privados (PNCP Oficial: R$ 100M Mapeados e Concentração)<br/>"
        "• <b>Capítulo 6:</b> O Papel da Mídia Plural & Os Autos Judiciais da Saúde (TJ-MT e Bloqueio de R$ 1,55M)<br/>"
        "• <b>Capítulo 7:</b> Quem Manda na Cidade (Os 15 Políticos Responsáveis, Seus Partidos e Contatos Oficiais)<br/>"
        "• <b>Capítulo 8:</b> Veredito Pragmático Final & Checklist de Ação Cidadã",
        ParagraphStyle('SumBody', fontName='Helvetica', fontSize=8, leading=12, textColor=text_muted)
    ))

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 2: DIAGNÓSTICO MATERIALISTA & A ANALOGIA DA CASA
    # ==========================================
    story.append(Paragraph("CAPÍTULO 1: O FEIJÃO COM ARROZ — E SE A PREFEITURA FOSSE A SUA CASA?", h1_style))
    story.append(Paragraph(
        "A desculpa padrão dos governantes municipais é sempre a mesma: <i>'o município passa por dificuldades e faltam recursos'</i>. "
        "A análise dos balanços oficiais do Tesouro Nacional desmente categoricamente essa narrativa. "
        "Para que qualquer trabalhador, autônomo ou dona de casa compreenda com precisão para onde foi o seu dinheiro, "
        "aplicamos os princípios de storytelling com dados da especialista Cole Nussbaumer Knaflic: <b>traduzir números abstratos "
        "de milhões de reais para o cotidiano da economia familiar</b>.",
        body_style
    ))

    # Box da Casa
    story_house = (
        "<b>A ANALOGIA DO ORÇAMENTO DOMÉSTICO (R$ 10.000 POR MÊS):</b><br/>"
        "Imagine que a sua família tenha uma renda mensal de <b>R$ 10.000</b>. "
        "É uma renda sólida no interior de Mato Grosso, suficiente para alimentar bem todos os membros, manter a casa reformada e "
        "guardar uma reserva de segurança.<br/><br/>"
        "Veja como a prefeitura de Peixoto administrou esses R$ 10.000 no exercício auditado:<br/>"
        "• Gastou <b>R$ 4.250</b> pagando os salários e encargos de quem administra a casa;<br/>"
        "• Gastou <b>R$ 1.830</b> contratando empresas terceirizadas de serviços gerais e locações;<br/>"
        "• Gastou <b>R$ 1.440</b> apenas em papelada, gabinetes e materiais de escritório;<br/>"
        "• Gastou <b>R$ 245</b> para manter o conselho familiar (Câmara de Vereadores);<br/>"
        "• Gastou <b>R$ 35</b> pagando diárias de viagens e passeios de seus integrantes;<br/>"
        "• E quando a chuva cai e a água entra pelo telhado do quarto dos seus filhos, ela diz que <font color='#dc2626'><b>só sobraram R$ 101</b></font> para consertar o telhado e arrumar o quintal!<br/><br/>"
        "E o mais revoltante: quando você abre a gaveta da cômoda, você descobre que há <font color='#059669'><b>R$ 1.078 guardados em dinheiro vivo</b></font> para cada R$ 100 de conta a pagar.<br/>"
        "<b>Pergunta ao cidadão:</b> Você aceitaria essa desculpa na gestão da sua própria casa? Então por que aceitar dos políticos na prefeitura?"
    )
    t_house = Table([[Paragraph(story_house, callout_style)]], colWidths=[523])
    t_house.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_house)
    story.append(Spacer(1, 10))

    # Tabela de Decomposição de R$ 100 de Imposto
    story.append(Paragraph("<b>A CONTA DO TRABALHADOR: PARA ONDE VAI CADA R$ 100 PAGOS EM IMPOSTOS?</b>", ParagraphStyle('SubSub', fontName='Helvetica-Bold', fontSize=9, textColor=primary)))
    tax_b = civic["tax_breakdown_per_100"]
    tax_rows = [
        [Paragraph("Destino do Dinheiro Público", table_header), Paragraph("Fatia (p/ R$ 100)", table_header), Paragraph("Impacto Real no Bolso e Estômago do Cidadão", table_header)],
        [Paragraph("Folha de Servidores & Encargos", table_cell_bold), Paragraph(f"R$ {tax_b['pessoal_encargos']:.2f}", table_cell_right), Paragraph("Salários de servidores municipais, comissionados e encargos previdenciários.", table_cell)],
        [Paragraph("Empresas Terceirizadas (PJ)", table_cell_bold), Paragraph(f"R$ {tax_b['terceiros_pj']:.2f}", table_cell_right), Paragraph("Prestação de serviços por empresas privadas (locadoras, limpeza, reformas, apoio).", table_cell)],
        [Paragraph("Administração Geral da Máquina", table_cell_bold), Paragraph(f"R$ {tax_b['administracao_maquina']:.2f}", table_cell_right), Paragraph("Custo de gabinetes, materiais de escritório, assessorias e burocracia-meio.", table_cell)],
        [Paragraph("Saúde Pública Municipal", table_cell_bold), Paragraph(f"R$ {tax_b['saude']:.2f}", table_cell_right), Paragraph("Hospital, postos e UPA (marcada por contrato emergencial sob bloqueio de R$ 1,55M pelo TJMT).", table_cell)],
        [Paragraph("Educação Municipal", table_cell_bold), Paragraph(f"R$ {tax_b['educacao']:.2f}", table_cell_right), Paragraph("Ensino Fundamental e Infantil (no limite mínimo obrigatório de 25% da Constituição).", table_cell)],
        [Paragraph("Câmara Municipal de Vereadores", table_cell_bold), Paragraph(f"R$ {tax_b['camara_vereadores']:.2f}", table_cell_right), Paragraph("Manutenção dos vereadores e estrutura legislativa (cresceu 72% em 2025).", table_cell)],
        [Paragraph("Urbanismo, Asfalto e Drenagem", table_cell_bold), Paragraph(f"<font color='#dc2626'><b>R$ {tax_b['urbanismo_asfalto']:.2f}</b></font>", table_cell_right), Paragraph("<b>APENAS R$ 1,01!</b> Pavimentação, bueiros e infraestrutura urbana abandonadas.", table_cell)],
        [Paragraph("Diárias de Viagem de Gestores", table_cell_bold), Paragraph(f"R$ {tax_b['diarias_viagens']:.2f}", table_cell_right), Paragraph("Diárias pagas a servidores e gestores (saltaram 167% em um único ano).", table_cell)],
    ]
    t_tax = Table(tax_rows, colWidths=[140, 85, 298])
    t_tax.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_tax)

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 3: A REALIDADE SOCIAL DE PEIXOTO (IDH, IBGE, MORTALIDADE E UNIÃO DO NORTE)
    # ==========================================
    story.append(Paragraph("CAPÍTULO 2: A REALIDADE SOCIAL — RIQUEZA MINERAL VS. CARÊNCIA NOS SERVIÇOS", h1_style))
    story.append(Paragraph(
        "Peixoto de Azevedo possui uma história marcada pela corrida do ouro a partir da década de 1980 na Bacia do Rio Peixoto "
        "e, nas últimas décadas, pela forte expansão da pecuária de corte e das lavouras de soja e milho. "
        "Contudo, a auditoria dos dados do IBGE e do Programa das Nações Unidas para o Desenvolvimento (PNUD) revela um abismo entre "
        "a pujança econômica das fazendas e garimpos e a precariedade dos serviços públicos ofertados à população trabalhadora:",
        body_style
    ))

    # Tabela dos Índices Sociais
    soc_rows = [
        [Paragraph("Indicador Social Oficial", table_header),
         Paragraph("Peixoto de Azevedo", table_header),
         Paragraph("Guarantã do Norte", table_header),
         Paragraph("Matupá", table_header),
         Paragraph("Média Mato Grosso", table_header),
         Paragraph("Diagnóstico Pragmático da Situação", table_header)],
        
        [Paragraph("IDH Municipal (PNUD)", table_cell_bold),
         Paragraph("<b>0,671 (Médio)</b>", table_cell_right),
         Paragraph("0,718 (Alto)", table_cell_right),
         Paragraph("0,723 (Alto)", table_cell_right),
         Paragraph("0,774 (Alto)", table_cell_right),
         Paragraph("Peixoto ocupa o 68º lugar no Estado, quase 100 pontos abaixo da média de MT.", table_cell)],

        [Paragraph("Mortalidade Infantil", table_cell_bold),
         Paragraph("<font color='#dc2626'><b>16,05 / mil</b></font>", table_cell_right),
         Paragraph("11,20 / mil", table_cell_right),
         Paragraph("9,80 / mil", table_cell_right),
         Paragraph("12,40 / mil", table_cell_right),
         Paragraph("Taxa 30% maior que a média de MT e quase o dobro de Matupá; carência de pré-natal.", table_cell)],

        [Paragraph("Crianças Fora da Escola (6-14)", table_cell_bold),
         Paragraph("<font color='#d97706'><b>8,95% fora</b></font>", table_cell_right),
         Paragraph("3,20% fora", table_cell_right),
         Paragraph("2,60% fora", table_cell_right),
         Paragraph("3,80% fora", table_cell_right),
         Paragraph("Quase 1 em cada 10 crianças em idade regular não frequenta o ensino fundamental.", table_cell)],

        [Paragraph("Malha Urbana com Asfalto/Hab", table_cell_bold),
         Paragraph("<font color='#dc2626'><b>R$ 71,79/hab</b></font>", table_cell_right),
         Paragraph("R$ 243,01/hab", table_cell_right),
         Paragraph("R$ 292,74/hab", table_cell_right),
         Paragraph("R$ 385,50/hab", table_cell_right),
         Paragraph("Menos de 25% dos bairros possuem drenagem pluvial e asfalto com meio-fio.", table_cell)],
    ]
    t_soc = Table(soc_rows, colWidths=[115, 68, 68, 68, 68, 136])
    t_soc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_soc)
    story.append(Spacer(1, 10))

    # O Desafio do Distrito de União do Norte
    story.append(Paragraph("<b>O DESAFIO TERRITORIAL E O DISTRITO DE UNIÃO DO NORTE (70 KM DA SEDE):</b>", ParagraphStyle('SubSub2', fontName='Helvetica-Bold', fontSize=8.5, textColor=primary)))
    story.append(Paragraph(
        "Peixoto de Azevedo possui uma vasta extensão territorial de 14.398 km². "
        "A mais de 70 quilômetros do centro urbano encontra-se o <b>Distrito de União do Norte</b>, um dos maiores núcleos habitacionais "
        "e assentamentos da região Norte de Mato Grosso. "
        "Historicamente, os moradores de União do Norte sofrem com o isolamento logístico e a precariedade na atenção médica de urgência. "
        "A transferência de pacientes graves até o Hospital Regional de Colíder ou Sinop chega a demorar horas por estradas vicinais. "
        "Foi justamente na terceirização do Pronto Atendimento deste distrito que a perícia judicial do Ministério Público flagrou "
        "as maiores distorções materiais de pagamentos sem cobertura contratual.",
        body_style
    ))

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 4: METÔMETRO DO PLANO DE GOVERNO REGISTRADO NO TSE
    # ==========================================
    story.append(Paragraph("CAPÍTULO 3: METÔMETRO ELEITORAL — PROMESSAS DO TSE VS. A AUDITORIA DOS FATOS", h1_style))
    story.append(Paragraph(
        f"Durante a campanha eleitoral de 2024, a coligação <i>'Humildade e Trabalho'</i>, encabeçada pelo prefeito "
        f"<b>{plan['candidato']}</b> ({plan['partido']}), protocolou junto à Justiça Eleitoral seu Plano de Governo com as diretrizes da gestão. "
        "Auditamos o cumprimento das 5 metas estruturais frente às despesas liquidadas no SICONFI e aos contratos no PNCP. "
        f"O índice geral consolidado de cumprimento até o momento é de <b>{plan['resumo_execucao']['media_geral_atingida']}%</b>:",
        body_style
    ))

    plan_rows = [
        [Paragraph("Meta Oficial de Campanha", table_header),
         Paragraph("Eixo Temático", table_header),
         Paragraph("Status de Execução", table_header),
         Paragraph("% Realizado", table_header),
         Paragraph("O Que Foi Feito de Verdade", table_header),
         Paragraph("O Que Ficou Devendo ao Povo", table_header)],
    ]
    for m in plan["metas"]:
        plan_rows.append([
            Paragraph(f"<b>{m['promessa_campanha']}</b>", table_cell_bold),
            Paragraph(m["eixo"], table_cell),
            Paragraph(m["status"], table_cell),
            Paragraph(f"<b>{m['percentual_atingido']}%</b>", table_cell_right),
            Paragraph(m["o_que_foi_feito"], table_cell),
            Paragraph(m["o_que_ficou_devendo"], table_cell)
        ])

    t_plan = Table(plan_rows, colWidths=[100, 75, 80, 48, 110, 110])
    t_plan.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_plan)
    story.append(Spacer(1, 10))

    # Diagnóstico do Metômetro
    story.append(Paragraph(
        "<b>DIAGNÓSTICO TÉCNICO DO METÔMETRO:</b><br/>"
        "A análise pragmática demonstra um padrão claro de governança: "
        "as promessas de campanha <b>avançam quando contam com forte injeção de recursos do Governo do Estado de Mato Grosso</b> "
        "(como a pavimentação de 7 km nas marginais da MT-322 e a ponte sobre o Rio Pium), "
        "mas <b>fracassam ou sofrem anomalias graves quando dependem da gestão direta do orçamento próprio do município</b>, "
        "a exemplo da saúde básica (marcada por judicialização e bloqueios) e da pavimentação dos bairros periféricos de Peixoto.",
        body_style
    ))

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 5: BATALHA REGIONAL DE EFICIÊNCIA (BENCHMARK)
    # ==========================================
    story.append(Paragraph("CAPÍTULO 4: BATALHA REGIONAL — PEIXOTO VS. GUARANTÃ, MATUPÁ, MT E BRASIL", h1_style))
    story.append(Paragraph(
        "A forma mais justa e neutra de avaliar a eficiência de uma administração pública não é através de discursos de palanque, "
        "mas comparando seus resultados per capita com municípios vizinhos que compartilham a mesma geografia, a mesma rodovia (BR-163) "
        "e o mesmo perfil produtivo. Cruzamos as contas de <b>Peixoto de Azevedo</b>, <b>Guarantã do Norte</b> e <b>Matupá</b>:",
        body_style
    ))

    c_px = budgets["cities"]["Peixoto de Azevedo"]["years"]["2025"]["per_capita"]
    c_gu = budgets["cities"]["Guarantã do Norte"]["years"]["2025"]["per_capita"]
    c_mt = budgets["cities"]["Matupá"]["years"]["2025"]["per_capita"]
    reg = budgets["regional_comparison_2025"]

    bench_rows = [
        [Paragraph("Função Orçamentária (Gasto Anual por Habitante)", table_header),
         Paragraph("Peixoto de Azevedo", table_header),
         Paragraph("Guarantã do Norte", table_header),
         Paragraph("Matupá", table_header),
         Paragraph("Média Mato Grosso", table_header),
         Paragraph("Média Brasil", table_header)],
        
        [Paragraph("Urbanismo, Asfalto e Drenagem", table_cell_bold),
         Paragraph(f"<font color='#dc2626'><b>R$ {c_px['urbanismo']:.2f}</b></font>", table_cell_right),
         Paragraph(f"R$ {c_gu['urbanismo']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['urbanismo']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['urbanismo_per_capita']['Media_Mato_Grosso']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['urbanismo_per_capita']['Media_Brasil']:.2f}", table_cell_right)],

        [Paragraph("Administração Geral (Burocracia de Gabinetes)", table_cell_bold),
         Paragraph(f"<font color='#dc2626'><b>R$ {c_px['administracao']:.2f}</b></font>", table_cell_right),
         Paragraph(f"R$ {c_gu['administracao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['administracao']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['administracao_per_capita']['Media_Mato_Grosso']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['administracao_per_capita']['Media_Brasil']:.2f}", table_cell_right)],

        [Paragraph("Saúde Pública (Hospital, UPA e Postos)", table_cell_bold),
         Paragraph(f"R$ {c_px['saude']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_gu['saude']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['saude']:.2f}", table_cell_right),
         Paragraph("R$ 1.850,00", table_cell_right),
         Paragraph("R$ 1.420,00", table_cell_right)],

        [Paragraph("Educação Municipal e Creches", table_cell_bold),
         Paragraph(f"R$ {c_px['educacao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_gu['educacao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['educacao']:.2f}", table_cell_right),
         Paragraph("R$ 2.100,00", table_cell_right),
         Paragraph("R$ 1.650,00", table_cell_right)],

        [Paragraph("Poder Legislativo (Câmara Municipal)", table_cell_bold),
         Paragraph(f"R$ {c_px['legislativa']:.2f}", table_cell_right),
         Paragraph("R$ 146,50", table_cell_right),
         Paragraph("R$ 177,50", table_cell_right),
         Paragraph("R$ 135,20", table_cell_right),
         Paragraph("R$ 115,40", table_cell_right)],

        [Paragraph("Taxa de Obras e Investimentos Reais (% da Despesa)", table_cell_bold),
         Paragraph(f"<font color='#d97706'><b>{reg['investimentos_ratio']['Peixoto de Azevedo']:.1f}%</b></font>", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Guarantã do Norte']:.1f}%", table_cell_right),
         Paragraph(f"<b>{reg['investimentos_ratio']['Matupá']:.1f}%</b>", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Media_Mato_Grosso']:.1f}%", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Media_Brasil']:.1f}%", table_cell_right)],
    ]
    t_bench = Table(bench_rows, colWidths=[160, 72, 72, 72, 72, 75])
    t_bench.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_bench)
    story.append(Spacer(1, 10))

    story.append(Paragraph(
        "<b>DUAS CONCLUSÕES RELEVANTES DO COMPARATIVO:</b><br/>"
        "1. <b>O Abismo no Asfalto:</b> Em 2024, Guarantã do Norte investiu <b>R$ 668,40 por morador</b> em urbanismo e drenagem, "
        "e em 2025 manteve R$ 243,01. Peixoto de Azevedo aplicou míseros <b>R$ 71,79</b>. Uma diferença de até 9 vezes menos investimento no bem-estar urbano do cidadão.<br/>"
        "2. <b>O Custo Burocrático:</b> Manter a estrutura de gabinetes e atividade-meio em Peixoto custa <b>R$ 1.017,50 por habitante</b>, "
        "contra R$ 743,12 em Guarantã e R$ 680,20 na média estadual. O município consome quase R$ 11 milhões a mais apenas com o aparato administrativo.",
        body_style
    ))

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 6: RAIO-X DE FORNECEDORES PRIVADOS (PNCP OFICIAL)
    # ==========================================
    story.append(Paragraph("CAPÍTULO 5: RAIO-X DE FORNECEDORES — OS MAIORES RECEBEDORES DE RECURSOS (PNCP)", h1_style))
    story.append(Paragraph(
        "A base do Portal Nacional de Contratações Públicas (PNCP) registrou <b>326 contratos públicos oficiais</b> firmados pela "
        "Prefeitura Municipal de Peixoto de Azevedo (CNPJ 03.238.631/0001-31), somando <b>R$ 100.612.976,87</b> distribuídos entre 275 fornecedores. "
        "O Índice de Concentração de Mercado (HHI) aponta que os <b>10 maiores fornecedores concentram 52,1% de todo o recurso contratado</b>:",
        body_style
    ))

    top10 = suppliers["suppliers"][:10]
    supp_rows = [
        [Paragraph("#", table_header),
         Paragraph("Razão Social do Fornecedor", table_header),
         Paragraph("CNPJ / CPF", table_header),
         Paragraph("Valor Total Contratado", table_header),
         Paragraph("% do Total", table_header),
         Paragraph("Setor Principal", table_header)],
    ]
    for i, s in enumerate(top10, 1):
        supp_rows.append([
            Paragraph(str(i), table_cell_bold),
            Paragraph(s["razao_social"], table_cell_bold),
            Paragraph(s["cnpj_cpf"], table_cell),
            Paragraph(f"R$ {s['total_valor']:,.2f}", table_cell_right),
            Paragraph(f"{s['share_percent']:.1f}%", table_cell_right),
            Paragraph(", ".join(s["setores"][:2]), table_cell)
        ])

    t_supp = Table(supp_rows, colWidths=[18, 185, 105, 95, 45, 75])
    t_supp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_supp)
    story.append(Spacer(1, 10))

    story.append(Paragraph(
        "<b>DESTAQUES TÉCNICOS DA CONCENTRAÇÃO:</b><br/>"
        "• <b>Liderança na Saúde:</b> A Associação Filantrópica de Saúde Santa Maria concentra isoladamente <b>R$ 15.704.603,88 (15,6% de todas as compras da prefeitura)</b>, "
        "sendo o contrato com maior volume material e justamente o epicentro da auditoria judicial que resultou em afastamentos cautelares.<br/>"
        "• <b>Construção e Locação:</b> A Excelência Construtora Ltda soma mais de <b>R$ 10 milhões</b> em 3 contratos de infraestrutura, "
        "enquanto a M.C. Locadora e Prestação de Serviços concentra <b>R$ 5,55 milhões</b> em serviços de apoio e máquinas.",
        body_style
    ))

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 7: O PAPEL DA MÍDIA PLURAL & OS AUTOS JUDICIAIS DA SAÚDE
    # ==========================================
    story.append(Paragraph("CAPÍTULO 6: O PAPEL DA IMPRENSA PLURAL — AVANÇOS VS. ESCÂNDALOS JUDICIAIS", h1_style))
    story.append(Paragraph(
        "Para assegurar absoluta imparcialidade e rigor factual, este dossiê não se apoia em um único canal de comunicação. "
        "Mapeamos reportagens veiculadas em diferentes órgãos de imprensa (G1 MT / Rede Globo, Olhar Direto, MidiaNews, Notícia Exata e Secom MT) "
        "que comprovam tanto as realizações concretas quanto as decisões sancionatórias do Poder Judiciário:",
        body_style
    ))

    # Tabela de Notícias Positivas
    story.append(Paragraph("<b>AVANÇOS E REALIZAÇÕES POSITIVAS DOCUMENTADAS PELA IMPRENSA:</b>", ParagraphStyle('PosTitle', fontName='Helvetica-Bold', fontSize=8.5, textColor=success)))
    pos_rows = [
        [Paragraph("Fato Positivo Noticiado", table_header),
         Paragraph("Veículo / Fonte", table_header),
         Paragraph("Síntese do Impacto Prático", table_header)],
    ]
    for n in media["noticias_positivas_avancos"]:
        pos_rows.append([
            Paragraph(f"<b>{n['titulo']}</b>", table_cell_bold),
            Paragraph(n["veiculo"], table_cell),
            Paragraph(n["resumo"], table_cell)
        ])
    t_pos = Table(pos_rows, colWidths=[175, 110, 238])
    t_pos.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), success),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_pos)
    story.append(Spacer(1, 10))

    # Tabela de Escândalos e Decisões Judiciais
    story.append(Paragraph("<b>ESCÂNDALOS, INVESTIGAÇÕES E DECISÕES JUDICIAIS CONDENATÓRIAS:</b>", ParagraphStyle('NegTitle', fontName='Helvetica-Bold', fontSize=8.5, textColor=danger)))
    neg_rows = [
        [Paragraph("Decisão Judicial / Investigação", table_header),
         Paragraph("Veículo / Fonte", table_header),
         Paragraph("Síntese da Prova dos Autos", table_header)],
    ]
    for n in media["noticias_escandalos_investigacoes"]:
        neg_rows.append([
            Paragraph(f"<b>{n['titulo']}</b>", table_cell_bold),
            Paragraph(n["veiculo"], table_cell),
            Paragraph(n["resumo"], table_cell)
        ])
    t_neg = Table(neg_rows, colWidths=[175, 110, 238])
    t_neg.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), danger),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_neg)

    story.append(PageBreak())

    # ==========================================
    # PÁGINA 8: QUEM SÃO OS 15 POLÍTICOS & O VEREDITO PRAGMÁTICO FINAL
    # ==========================================
    story.append(Paragraph("CAPÍTULO 7: QUEM COBRAR — OS 15 GESTORES E PARLAMENTARES DE PEIXOTO", h1_style))
    story.append(Paragraph(
        "A responsabilidade pela destinação de cada centavo é pessoal e indelegável. "
        "A composição partidária oficial comprova que <b>100% dos cargos do Executivo e Legislativo são controlados por uma coalizão de Centro e Direita</b> "
        "(UNIÃO Brasil, PRD, MDB, PSD e PL). A população possui o direito legal de cobrar seus representantes diretamente:",
        body_style
    ))

    all_pol = politicians["executivo"] + politicians["legislativo"]
    pol_rows = [
        [Paragraph("Nome de Urna", table_header),
         Paragraph("Cargo Oficial", table_header),
         Paragraph("Partido / Ideologia", table_header),
         Paragraph("Telefone Oficial", table_header),
         Paragraph("Papel Prático / O Que Ele Decide", table_header)],
    ]
    for p in all_pol:
        pol_rows.append([
            Paragraph(f"<b>{p['nome_urna']}</b>", table_cell_bold),
            Paragraph(p["cargo"], table_cell),
            Paragraph(f"{p['partido']} ({p['espectro']})", table_cell),
            Paragraph(p["telefone"], table_cell),
            Paragraph(p["papel_pratico"][:65] + "...", table_cell)
        ])

    t_pol = Table(pol_rows, colWidths=[95, 95, 105, 75, 153])
    t_pol.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_pol)
    story.append(Spacer(1, 10))

    # Capítulo 8: Veredito Final
    story.append(Paragraph("CAPÍTULO 8: VEREDITO PRAGMÁTICO FINAL — O PLACAR DA EFICIÊNCIA", h1_style))
    verdict_text = (
        "<b>ONDE A GESTÃO ACERTA (PONTOS POSITIVOS):</b><br/>"
        "• Articulação com o Governo do Estado para pavimentação de 7 km da MT-322 em União do Norte e pontes de concreto;<br/>"
        "• Solvência e alta liquidez de caixa (R$ 10,78 no banco para cada R$ 1,00 de dívida de curto prazo);<br/>"
        "• Cumprimento formal dos pisos constitucionais de saúde e educação.<br/><br/>"
        "<b>ONDE A GESTÃO ERRA GROSSEIRAMENTE (FALHAS MATERIAIS):</b><br/>"
        "• Abandono inescusável do asfalto dos bairros periféricos (apenas R$ 71/hab/ano, 1% do orçamento municipal);<br/>"
        "• Escândalo na terceirização hospitalar com R$ 1,55M bloqueados por ordem unânime do TJ-MT e prefeito afastado da Saúde;<br/>"
        "• Inchaço burocrático de 48% em gabinetes (R$ 34,3 Mi) e explosão de +167% em diárias de viagens;<br/>"
        "• Quase 9% das crianças em idade escolar fora da sala de aula.<br/><br/>"
        "<b>VEREDITO PARA O TRABALHADOR:</b><br/>"
        "Peixoto de Azevedo não tem falta de dinheiro. A prefeitura arrecada como gente grande, mas governa voltada para si mesma. "
        "A transformação do município depende exclusivamente da cobrança popular organizada sobre os 15 políticos acima listados."
    )
    t_verd = Table([[Paragraph(verdict_text, callout_style)]], colWidths=[523])
    t_verd.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 1, primary),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_verd)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[+] Dossiê Completo Multipage gerado com sucesso em: {PDF_OUTPUT}")

if __name__ == "__main__":
    build_pdf()
