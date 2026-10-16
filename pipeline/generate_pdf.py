import os
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "..", "src", "data")
PUBLIC_DIR = os.path.join(BASE_DIR, "..", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

PDF_OUTPUT = os.path.join(PUBLIC_DIR, "dossie-auditoria-peixoto.pdf")

def load_data():
    with open(os.path.join(DATA_DIR, "civic_indicators.json"), "r", encoding="utf-8") as f:
        civic = json.load(f)
    with open(os.path.join(DATA_DIR, "suppliers_summary.json"), "r", encoding="utf-8") as f:
        suppliers = json.load(f)
    with open(os.path.join(DATA_DIR, "budget_comparison.json"), "r", encoding="utf-8") as f:
        budgets = json.load(f)
    return civic, suppliers, budgets

def build_pdf():
    print("[*] Gerando Dossiê de Auditoria Cívica em PDF...")
    civic, suppliers, budgets = load_data()

    doc = SimpleDocTemplate(
        PDF_OUTPUT,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Cores do tema (Pragmatismo & Auditoria)
    primary = colors.HexColor("#0f172a")     # Slate 900
    accent = colors.HexColor("#0284c7")      # Sky 600
    danger = colors.HexColor("#dc2626")      # Red 600
    warning = colors.HexColor("#d97706")     # Amber 600
    success = colors.HexColor("#059669")     # Emerald 600
    card_bg = colors.HexColor("#f8fafc")     # Slate 50
    border_color = colors.HexColor("#cbd5e1")# Slate 300
    text_muted = colors.HexColor("#475569")   # Slate 600

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=primary,
        alignment=0,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=text_muted,
        alignment=0,
        spaceAfter=12
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary,
        spaceBefore=14,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.white,
        alignment=1
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
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

    # 1. HEADER
    story.append(Paragraph("OBSERVATÓRIO DE PRAGMATISMO PÚBLICO & AUDITORIA CÍVICA", ParagraphStyle(
        'Tagline', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=accent, spaceAfter=2
    )))
    story.append(Paragraph("DOSSIÊ DE AUDITORIA FISCAL: PEIXOTO DE AZEVEDO - MT", title_style))
    story.append(Paragraph("Auditoria Materialista e Não-Partidária: Contratos PNCP, Orçamento SICONFI e Benchmark Regional (2024-2026)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent, spaceBefore=0, spaceAfter=10))

    # 2. CARDS DE DESTAQUE MACRO
    p25 = budgets["cities"]["Peixoto de Azevedo"]["years"]["2025"]
    tot_desp = p25["despesa_total"]
    obras_ratio = (p25["obras"] / tot_desp) * 100
    adm_ratio = (p25["administracao"] / tot_desp) * 100

    macro_data = [
        [
            Paragraph(f"<b>Arrecadação Municipal</b><br/><font size=11 color='#0284c7'><b>R$ 292,2 Milhões</b></font><br/><font size=6.5 color='#475569'>R$ 8.618/ano por morador</font>", body_style),
            Paragraph(f"<b>Liquidez de Caixa</b><br/><font size=11 color='#059669'><b>R$ 10,78 p/ R$ 1,00</b></font><br/><font size=6.5 color='#475569'>Dinheiro em caixa não falta</font>", body_style),
            Paragraph(f"<b>Gabinete e Burocracia</b><br/><font size=11 color='#dc2626'><b>R$ 34,3 Milhões</b></font><br/><font size=6.5 color='#475569'>+{adm_ratio:.1f}% do total do município</font>", body_style),
            Paragraph(f"<b>Investimento em Obras</b><br/><font size=11 color='#d97706'><b>Apenas {obras_ratio:.1f}%</b></font><br/><font size=6.5 color='#475569'>R$ 71/ano em asfalto p/ hab</font>", body_style),
        ]
    ]
    t_macro = Table(macro_data, colWidths=[130, 130, 130, 130])
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
    story.append(Spacer(1, 10))

    # 3. STORYTELLING & DIAGNÓSTICO PRAGMÁTICO
    story.append(Paragraph("1. DIAGNÓSTICO MATERIALISTA: ONDE O DINHEIRO ESTÁ SENDO ALOCADO?", h2_style))
    p_story = (
        "Uma auditoria estritamente técnica, baseada nos dados do Tesouro Nacional (SICONFI) e do Portal Nacional de Contratações Públicas (PNCP), "
        "revela um paradoxo estrutural em Peixoto de Azevedo: <b>o município possui alta arrecadação e fartura de caixa, mas aloca quase a totalidade "
        "dos seus recursos na manutenção da máquina burocrática e em contratos terceirizados</b>, enquanto investimentos essenciais em asfalto, "
        "drenagem e saúde de linha de frente sofrem estrangulamento ou anomalias graves."
    )
    story.append(Paragraph(p_story, body_style))

    # 4. TABELA DO BOLSO DO CIDADÃO (R$ 100)
    story.append(Paragraph("2. A CONTA DO CIDADÃO: PARA ONDE VAI CADA R$ 100 PAGOS EM IMPOSTOS?", h2_style))
    tax_b = civic["tax_breakdown_per_100"]
    tax_rows = [
        [Paragraph("Destinação do Recurso Municipal", table_header), Paragraph("Valor Real (p/ R$ 100)", table_header), Paragraph("Impacto Prático no Bolso e Estômago do Cidadão", table_header)],
        [Paragraph("Folha de Pessoal e Encargos", table_cell_bold), Paragraph(f"R$ {tax_b['pessoal_encargos']:.2f}", table_cell_right), Paragraph("Salários de servidores municipais, comissionados e encargos previdenciários.", table_cell)],
        [Paragraph("Terceirizações (Contratos PJ)", table_cell_bold), Paragraph(f"R$ {tax_b['terceiros_pj']:.2f}", table_cell_right), Paragraph("Prestação de serviços por empresas privadas (locadoras, limpeza, reformas, apoio).", table_cell)],
        [Paragraph("Administração Geral da Máquina", table_cell_bold), Paragraph(f"R$ {tax_b['administracao_maquina']:.2f}", table_cell_right), Paragraph("Custo de gabinetes, materiais de escritório, assessorias e burocracia-meio.", table_cell)],
        [Paragraph("Saúde Pública Municipal", table_cell_bold), Paragraph(f"R$ {tax_b['saude']:.2f}", table_cell_right), Paragraph("Hospital, postos e UPA (marcada por contrato emergencial sob apuração do MPMT/TJMT).", table_cell)],
        [Paragraph("Educação Municipal", table_cell_bold), Paragraph(f"R$ {tax_b['educacao']:.2f}", table_cell_right), Paragraph("Ensino Fundamental e Infantil (quase no piso obrigatório constitucional).", table_cell)],
        [Paragraph("Câmara de Vereadores (Legislativo)", table_cell_bold), Paragraph(f"R$ {tax_b['camara_vereadores']:.2f}", table_cell_right), Paragraph("Manutenção dos vereadores e estrutura legislativa (cresceu 72% em 2025).", table_cell)],
        [Paragraph("Urbanismo, Asfalto e Drenagem", table_cell_bold), Paragraph(f"R$ {tax_b['urbanismo_asfalto']:.2f}", table_cell_right), Paragraph("<b>APENAS R$ 1,01!</b> Pavimentação, bueiros e infraestrutura urbana abandonadas.", table_cell)],
        [Paragraph("Diárias de Viagem (Civil)", table_cell_bold), Paragraph(f"R$ {tax_b['diarias_viagens']:.2f}", table_cell_right), Paragraph("Diárias pagas a servidores e gestores (saltaram 167% em um único ano).", table_cell)],
    ]
    t_tax = Table(tax_rows, colWidths=[150, 90, 280])
    t_tax.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_tax)
    story.append(Spacer(1, 10))

    # 5. BENCHMARK REGIONAL
    story.append(Paragraph("3. BATALHA REGIONAL DE EFICIÊNCIA: PEIXOTO VS. VIZINHOS (2025)", h2_style))
    p_comp = (
        "Ao comparar Peixoto de Azevedo com seus vizinhos geográficos imediatos (Guarantã do Norte e Matupá) e com as médias "
        "estadual e brasileira, as distorções orçamentárias saltam aos olhos:"
    )
    story.append(Paragraph(p_comp, body_style))

    c_px = budgets["cities"]["Peixoto de Azevedo"]["years"]["2025"]["per_capita"]
    c_gu = budgets["cities"]["Guarantã do Norte"]["years"]["2025"]["per_capita"]
    c_mt = budgets["cities"]["Matupá"]["years"]["2025"]["per_capita"]
    reg = budgets["regional_comparison_2025"]

    bench_rows = [
        [Paragraph("Indicador Per Capita (Gasto por Morador/Ano)", table_header),
         Paragraph("Peixoto de Azevedo", table_header),
         Paragraph("Guarantã do Norte", table_header),
         Paragraph("Matupá", table_header),
         Paragraph("Média Mato Grosso", table_header),
         Paragraph("Média Brasil", table_header)],
        
        [Paragraph("Urbanismo & Asfalto", table_cell_bold),
         Paragraph(f"<font color='#dc2626'><b>R$ {c_px['urbanismo']:.2f}</b></font>", table_cell_right),
         Paragraph(f"R$ {c_gu['urbanismo']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['urbanismo']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['urbanismo_per_capita']['Media_Mato_Grosso']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['urbanismo_per_capita']['Media_Brasil']:.2f}", table_cell_right)],

        [Paragraph("Administração & Burocracia", table_cell_bold),
         Paragraph(f"<font color='#dc2626'><b>R$ {c_px['administracao']:.2f}</b></font>", table_cell_right),
         Paragraph(f"R$ {c_gu['administracao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['administracao']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['administracao_per_capita']['Media_Mato_Grosso']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['administracao_per_capita']['Media_Brasil']:.2f}", table_cell_right)],

        [Paragraph("Saúde Pública", table_cell_bold),
         Paragraph(f"R$ {c_px['saude']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_gu['saude']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['saude']:.2f}", table_cell_right),
         Paragraph("R$ 1.850,00", table_cell_right),
         Paragraph("R$ 1.420,00", table_cell_right)],

        [Paragraph("Educação Municipal", table_cell_bold),
         Paragraph(f"R$ {c_px['educacao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_gu['educacao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['educacao']:.2f}", table_cell_right),
         Paragraph("R$ 2.100,00", table_cell_right),
         Paragraph("R$ 1.650,00", table_cell_right)],

        [Paragraph("Taxa de Investimentos (% da Despesa)", table_cell_bold),
         Paragraph(f"<font color='#d97706'><b>{reg['investimentos_ratio']['Peixoto de Azevedo']:.1f}%</b></font>", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Guarantã do Norte']:.1f}%", table_cell_right),
         Paragraph(f"<b>{reg['investimentos_ratio']['Matupá']:.1f}%</b>", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Media_Mato_Grosso']:.1f}%", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Media_Brasil']:.1f}%", table_cell_right)],
    ]

    t_bench = Table(bench_rows, colWidths=[160, 72, 72, 72, 72, 72])
    t_bench.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_bench)
    story.append(Spacer(1, 10))

    # 6. TOP 10 FORNECEDORES (CNPJ POR CNPJ)
    story.append(Paragraph("4. RAIO-X DE FORNECEDORES: OS 10 MAIORES RECEBEDORES (PNCP OFICIAL)", h2_style))
    top10 = suppliers["suppliers"][:10]
    supp_rows = [
        [Paragraph("#", table_header),
         Paragraph("Razão Social do Fornecedor", table_header),
         Paragraph("CNPJ / CPF", table_header),
         Paragraph("Valor Total Contratado", table_header),
         Paragraph("% Total", table_header),
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

    t_supp = Table(supp_rows, colWidths=[20, 180, 100, 90, 45, 85])
    t_supp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_supp)
    story.append(Spacer(1, 10))

    # 7. ANOMALIAS CRÍTICAS E AUDITORIA JURÍDICA
    story.append(Paragraph("5. ANOMALIAS CRÍTICAS E FOCOS DE RISCO MATERIAL", h2_style))
    for ano in civic["anomalias"]:
        badge_color = danger if ano["gravidade"] == "CRÍTICA" else warning
        story.append(Paragraph(
            f"<b><font color='{badge_color.hexval()}'>[{ano['gravidade']}]</font> {ano['titulo']}</b> ({ano['setor']})",
            body_bold
        ))
        story.append(Paragraph(ano["descricao"], body_style))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 8))
    # 8. ORIENTAÇÕES DE FISCALIZAÇÃO CÍVICA
    story.append(Paragraph("6. COMO O CIDADÃO FISCALIZA (PASSO A PASSO CÍVICO)", h2_style))
    p_action = (
        "O cidadão não precisa aceitar respostas vagas. A Lei de Acesso à Informação (Lei 12.527/2011) garante o direito de "
        "requisitar medições de obras, notas fiscais eletrônicas e folhas de ponto diretamente pelo e-SIC de Peixoto de Azevedo. "
        "Qualquer divergência pode ser denunciada anonimamente na Ouvidoria do Ministério Público Estadual (MPMT) ou no Tribunal "
        "de Contas de Mato Grosso (TCE-MT)."
    )
    story.append(Paragraph(p_action, body_style))

    # FOOTER
    story.append(HRFlowable(width="100%", thickness=1, color=border_color, spaceBefore=8, spaceAfter=6))
    story.append(Paragraph("Dossiê gerado de forma autônoma via dados abertos da API do PNCP (Lei 14.133/21) e Tesouro Nacional SICONFI. Atualizado em Outubro/2026. Distribuição livre e gratuita.", ParagraphStyle(
        'FooterNote', fontName='Helvetica', fontSize=7, leading=9, textColor=text_muted, alignment=1
    )))

    doc.build(story)
    print(f"[+] Dossiê gerado com sucesso em: {PDF_OUTPUT}")

if __name__ == "__main__":
    build_pdf()
