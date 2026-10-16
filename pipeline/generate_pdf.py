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
    with open(os.path.join(DATA_DIR, "politicians.json"), "r", encoding="utf-8") as f:
        politicians = json.load(f)
    return civic, suppliers, budgets, politicians

def build_pdf():
    print("[*] Gerando Dossiê de Auditoria Cívica em PDF com Políticos e Storytelling Cole Knaflic...")
    civic, suppliers, budgets, politicians = load_data()

    doc = SimpleDocTemplate(
        PDF_OUTPUT,
        pagesize=A4,
        rightMargin=32,
        leftMargin=32,
        topMargin=32,
        bottomMargin=32
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

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=primary,
        spaceAfter=3
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_muted,
        spaceAfter=10
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=primary,
        spaceBefore=12,
        spaceAfter=5
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=5
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

    # 1. HEADER
    story.append(Paragraph("OBSERVATÓRIO DE PRAGMATISMO PÚBLICO & AUDITORIA CÍVICA", ParagraphStyle(
        'Tagline', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=accent, spaceAfter=2
    )))
    story.append(Paragraph("DOSSIÊ DE AUDITORIA FISCAL & POLÍTICA: PEIXOTO DE AZEVEDO - MT", title_style))
    story.append(Paragraph("Quem Manda, Para Onde Vai o Dinheiro e Quem Cobrar (Base Oficial PNCP, SICONFI e TSE)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent, spaceBefore=0, spaceAfter=8))

    # 2. CARDS DE DESTAQUE MACRO
    p25 = budgets["cities"]["Peixoto de Azevedo"]["years"]["2025"]
    tot_desp = p25["despesa_total"]
    obras_ratio = (p25["obras"] / tot_desp) * 100
    adm_ratio = (p25["administracao"] / tot_desp) * 100

    macro_data = [
        [
            Paragraph(f"<b>Arrecadação Municipal</b><br/><font size=11 color='#0284c7'><b>R$ 292,2 Mi</b></font><br/><font size=6 color='#475569'>R$ 8.618/ano por morador</font>", body_style),
            Paragraph(f"<b>Liquidez no Banco (TCE)</b><br/><font size=11 color='#059669'><b>R$ 10,78 p/ R$ 1</b></font><br/><font size=6 color='#475569'>Dinheiro em caixa sobra</font>", body_style),
            Paragraph(f"<b>Burocracia & Gabinetes</b><br/><font size=11 color='#dc2626'><b>R$ 34,3 Mi</b></font><br/><font size=6 color='#475569'>+{adm_ratio:.1f}% do total do município</font>", body_style),
            Paragraph(f"<b>Obras de Asfalto / Hab</b><br/><font size=11 color='#d97706'><b>R$ 71,79/ano</b></font><br/><font size=6 color='#475569'>Guarantã gasta R$ 668/hab</font>", body_style),
        ]
    ]
    t_macro = Table(macro_data, colWidths=[132, 132, 132, 132])
    t_macro.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_macro)
    story.append(Spacer(1, 8))

    # 3. STORYTELLING COLE KNAFLIC (A ANALOGIA DA CASA)
    story.append(Paragraph("1. A VERDADE DOS FATOS: E SE A PREFEITURA FOSSE A SUA CASA?", h2_style))
    p_story = (
        "Para o trabalhador entender sem rodeios: se a prefeitura de Peixoto fosse a sua família ganhando <b>R$ 10.000 por mês</b>, "
        "ela gastou R$ 4.250 pagando os salários de quem administra, R$ 1.830 com terceirizados, R$ 1.440 em burocracia e papéis de escritório, "
        "R$ 35 em passeios e diárias... e quando o telhado do quarto dos seus filhos desaba com a chuva, ela diz que <b>só sobraram R$ 101</b> "
        "para consertar a casa! E quando abrem a gaveta, <b>há R$ 1.078 guardados para cada R$ 100 de conta a pagar</b>. "
        "Dinheiro nunca faltou; o problema é a prioridade dos governantes."
    )
    story.append(Paragraph(p_story, body_style))

    # 4. TABELA DO BOLSO DO CIDADÃO (R$ 100)
    story.append(Paragraph("2. A CONTA DO TRABALHADOR: PARA ONDE VAI CADA R$ 100 DE IMPOSTO?", h2_style))
    tax_b = civic["tax_breakdown_per_100"]
    tax_rows = [
        [Paragraph("Destino do Dinheiro Público", table_header), Paragraph("Fatia (p/ R$ 100)", table_header), Paragraph("O Que Significa na Vida Prática do Cidadão", table_header)],
        [Paragraph("Folha de Servidores & Encargos", table_cell_bold), Paragraph(f"R$ {tax_b['pessoal_encargos']:.2f}", table_cell_right), Paragraph("Salários de servidores municipais, comissionados e encargos previdenciários.", table_cell)],
        [Paragraph("Empresas Terceirizadas (PJ)", table_cell_bold), Paragraph(f"R$ {tax_b['terceiros_pj']:.2f}", table_cell_right), Paragraph("Prestação de serviços por empresas privadas (locadoras, limpeza, reformas, apoio).", table_cell)],
        [Paragraph("Administração Geral da Máquina", table_cell_bold), Paragraph(f"R$ {tax_b['administracao_maquina']:.2f}", table_cell_right), Paragraph("Custo de gabinetes, materiais de escritório, assessorias e burocracia-meio.", table_cell)],
        [Paragraph("Saúde Pública Municipal", table_cell_bold), Paragraph(f"R$ {tax_b['saude']:.2f}", table_cell_right), Paragraph("Hospital, postos e UPA (marcada por contrato emergencial sob bloqueio de R$ 1,55M pelo TJMT).", table_cell)],
        [Paragraph("Educação Municipal", table_cell_bold), Paragraph(f"R$ {tax_b['educacao']:.2f}", table_cell_right), Paragraph("Ensino Fundamental e Infantil (no limite mínimo obrigatório da lei).", table_cell)],
        [Paragraph("Câmara Municipal de Vereadores", table_cell_bold), Paragraph(f"R$ {tax_b['camara_vereadores']:.2f}", table_cell_right), Paragraph("Manutenção dos vereadores e estrutura legislativa (cresceu 72% em 2025).", table_cell)],
        [Paragraph("Urbanismo, Asfalto e Drenagem", table_cell_bold), Paragraph(f"R$ {tax_b['urbanismo_asfalto']:.2f}", table_cell_right), Paragraph("<b>APENAS R$ 1,01!</b> Pavimentação, bueiros e infraestrutura urbana abandonadas.", table_cell)],
        [Paragraph("Diárias de Viagem de Gestores", table_cell_bold), Paragraph(f"R$ {tax_b['diarias_viagens']:.2f}", table_cell_right), Paragraph("Diárias pagas a servidores e gestores (saltaram 167% em um único ano).", table_cell)],
    ]
    t_tax = Table(tax_rows, colWidths=[145, 85, 298])
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
    story.append(Spacer(1, 8))

    # 5. BENCHMARK REGIONAL
    story.append(Paragraph("3. BATALHA REGIONAL: PEIXOTO VS. VIZINHOS (2025)", h2_style))
    c_px = budgets["cities"]["Peixoto de Azevedo"]["years"]["2025"]["per_capita"]
    c_gu = budgets["cities"]["Guarantã do Norte"]["years"]["2025"]["per_capita"]
    c_mt = budgets["cities"]["Matupá"]["years"]["2025"]["per_capita"]
    reg = budgets["regional_comparison_2025"]

    bench_rows = [
        [Paragraph("Gasto por Habitante / Ano", table_header),
         Paragraph("Peixoto de Azevedo", table_header),
         Paragraph("Guarantã do Norte", table_header),
         Paragraph("Matupá", table_header),
         Paragraph("Média MT", table_header),
         Paragraph("Média Brasil", table_header)],
        
        [Paragraph("Urbanismo & Asfalto", table_cell_bold),
         Paragraph(f"<font color='#dc2626'><b>R$ {c_px['urbanismo']:.2f}</b></font>", table_cell_right),
         Paragraph(f"R$ {c_gu['urbanismo']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['urbanismo']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['urbanismo_per_capita']['Media_Mato_Grosso']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['urbanismo_per_capita']['Media_Brasil']:.2f}", table_cell_right)],

        [Paragraph("Burocracia / Gabinetes", table_cell_bold),
         Paragraph(f"<font color='#dc2626'><b>R$ {c_px['administracao']:.2f}</b></font>", table_cell_right),
         Paragraph(f"R$ {c_gu['administracao']:.2f}", table_cell_right),
         Paragraph(f"R$ {c_mt['administracao']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['administracao_per_capita']['Media_Mato_Grosso']:.2f}", table_cell_right),
         Paragraph(f"R$ {reg['administracao_per_capita']['Media_Brasil']:.2f}", table_cell_right)],

        [Paragraph("Taxa de Obras Reais (%)", table_cell_bold),
         Paragraph(f"<font color='#d97706'><b>{reg['investimentos_ratio']['Peixoto de Azevedo']:.1f}%</b></font>", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Guarantã do Norte']:.1f}%", table_cell_right),
         Paragraph(f"<b>{reg['investimentos_ratio']['Matupá']:.1f}%</b>", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Media_Mato_Grosso']:.1f}%", table_cell_right),
         Paragraph(f"{reg['investimentos_ratio']['Media_Brasil']:.1f}%", table_cell_right)],
    ]
    t_bench = Table(bench_rows, colWidths=[150, 75, 75, 75, 75, 78])
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
    story.append(Spacer(1, 8))

    # 6. TOP FORNECEDORES
    story.append(Paragraph("4. OS MAIORES RECEBEDORES DE CONTRATOS PÚBLICOS (PNCP)", h2_style))
    top6 = suppliers["suppliers"][:6]
    supp_rows = [
        [Paragraph("#", table_header),
         Paragraph("Razão Social do Fornecedor", table_header),
         Paragraph("CNPJ / CPF", table_header),
         Paragraph("Valor Contratado", table_header),
         Paragraph("% Total", table_header),
         Paragraph("Setor", table_header)],
    ]
    for i, s in enumerate(top6, 1):
        supp_rows.append([
            Paragraph(str(i), table_cell_bold),
            Paragraph(s["razao_social"], table_cell_bold),
            Paragraph(s["cnpj_cpf"], table_cell),
            Paragraph(f"R$ {s['total_valor']:,.2f}", table_cell_right),
            Paragraph(f"{s['share_percent']:.1f}%", table_cell_right),
            Paragraph(", ".join(s["setores"][:1]), table_cell)
        ])

    t_supp = Table(supp_rows, colWidths=[18, 190, 105, 95, 45, 75])
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
    story.append(Spacer(1, 8))

    # 7. QUEM COBRAR: OS 15 POLÍTICOS RESPONSÁVEIS
    story.append(Paragraph("5. QUEM COBRAR: OS POLÍTICOS ELEITOS E SEUS CANAIS DE CONTATO", h2_style))
    story.append(Paragraph(
        "<b>Atenção Cidadão:</b> 100% da prefeitura e da Câmara são controlados por partidos de Centro, Centro-Direita e Direita "
        "(UNIÃO Brasil com o prefeito e 5 vereadores; PRD com vice e 3 vereadores; MDB com 3; PSD com 1; PL com 1). "
        "Não existe oposição de esquerda na cidade. A responsabilidade pelas contas é exclusiva dessa maioria. Veja quem cobrar:",
        body_style
    ))

    all_pol = politicians["executivo"] + politicians["legislativo"]
    pol_rows = [
        [Paragraph("Nome Político", table_header),
         Paragraph("Cargo Oficial", table_header),
         Paragraph("Partido / Linha Política", table_header),
         Paragraph("Telefone Direto", table_header),
         Paragraph("O Que Ele Decide Com Seu Dinheiro", table_header)],
    ]
    for p in all_pol:
        pol_rows.append([
            Paragraph(f"<b>{p['nome_urna']}</b>", table_cell_bold),
            Paragraph(p["cargo"], table_cell),
            Paragraph(f"{p['partido']} ({p['espectro']})", table_cell),
            Paragraph(p["telefone"], table_cell),
            Paragraph(p["papel_pratico"][:75] + "...", table_cell)
        ])

    t_pol = Table(pol_rows, colWidths=[95, 95, 105, 75, 158])
    t_pol.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_pol)
    story.append(Spacer(1, 8))

    # FOOTER
    story.append(HRFlowable(width="100%", thickness=1, color=border_color, spaceBefore=4, spaceAfter=4))
    story.append(Paragraph("Observatório Cívico de Peixoto de Azevedo - MT • Base de Dados: PNCP (Lei 14.133/21), Tesouro Nacional SICONFI e TSE Eleições 2024. Distribuição livre e gratuita.", ParagraphStyle(
        'FooterNote', fontName='Helvetica', fontSize=6.5, leading=8.5, textColor=text_muted, alignment=1
    )))

    doc.build(story)
    print(f"[+] Dossiê gerado com sucesso em: {PDF_OUTPUT}")

if __name__ == "__main__":
    build_pdf()
