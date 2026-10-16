import os
import json
import time
import requests

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data")
RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "data_raw")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(RAW_DIR, exist_ok=True)

ENTITIES = [
    {"ibge": 5106422, "cnpj": "03238631000131", "name": "Peixoto de Azevedo", "pop": 33754},
    {"ibge": 5104104, "cnpj": "03239019000183", "name": "Guarantã do Norte", "pop": 31209},
    {"ibge": 5105606, "cnpj": "24772188000154", "name": "Matupá", "pop": 21959},
]

HEADERS = {"User-Agent": "PragmatismoCivicoBot/1.0 (Auditoria Publica Peixoto de Azevedo)"}

def fetch_siconfi_dca(ibge, year):
    raw_path = os.path.join(RAW_DIR, f"siconfi_dca_{ibge}_{year}.json")
    if os.path.exists(raw_path):
        with open(raw_path, "r", encoding="utf-8") as f:
            return json.load(f)
    
    url = f"https://apidatalake.tesouro.gov.br/ords/siconfi/tt/dca?an_exercicio={year}&id_ente={ibge}"
    print(f"[*] Buscando SICONFI DCA {year} para ente {ibge}...")
    try:
        r = requests.get(url, headers=HEADERS, timeout=25)
        if r.status_code == 200:
            data = r.json().get("items", [])
            with open(raw_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return data
    except Exception as e:
        print(f"[!] Erro ao buscar SICONFI {ibge} {year}: {e}")
    return []

def fetch_pncp_contracts_peixoto():
    raw_path = os.path.join(RAW_DIR, "pncp_contracts_peixoto.json")
    if os.path.exists(raw_path):
        with open(raw_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
            if len(existing) > 50:
                print(f"[*] Carregando {len(existing)} contratos do cache...")
                return existing

    cnpj = "03238631000131"
    quarters = [
        # 2024
        ("20240101", "20240331"),
        ("20240401", "20240630"),
        ("20240701", "20240930"),
        ("20241001", "20241231"),
        # 2025
        ("20250101", "20250331"),
        ("20250401", "20250630"),
        ("20250701", "20250930"),
        ("20251001", "20251231"),
        # 2026
        ("20260101", "20260331"),
        ("20260401", "20260630"),
        ("20260701", "20261016"),
    ]

    all_contracts = []
    base_url = "https://pncp.gov.br/api/consulta/v1/contratos"

    for ini, fim in quarters:
        print(f"[*] PNCP Peixoto {ini} a {fim}...")
        page = 1
        while True:
            url = f"{base_url}?cnpjOrgao={cnpj}&dataInicial={ini}&dataFinal={fim}&pagina={page}"
            try:
                r = requests.get(url, headers=HEADERS, timeout=20)
                if r.status_code == 200:
                    res = r.json()
                    items = res.get("data", [])
                    all_contracts.extend(items)
                    total_pages = res.get("totalPaginas", 1)
                    if page >= total_pages or not items:
                        break
                    page += 1
                    time.sleep(0.3)
                else:
                    print(f"Status {r.status_code} em {ini}-{fim}")
                    break
            except Exception as e:
                print(f"[!] Erro ao buscar PNCP {ini}-{fim} pag {page}: {e}")
                break

    # Deduplicate by numeroControlePNCP or id
    unique_contracts = {}
    for c in all_contracts:
        key = c.get("numeroControlePNCP") or f"{c.get('numeroContratoEmpenho')}_{c.get('anoContrato')}"
        if key not in unique_contracts:
            unique_contracts[key] = c

    cleaned = list(unique_contracts.values())
    print(f"[+] Total de contratos únicos obtidos: {len(cleaned)}")
    with open(raw_path, "w", encoding="utf-8") as f:
        json.dump(cleaned, f, ensure_ascii=False, indent=2)
    return cleaned

if __name__ == "__main__":
    print("=== INICIANDO COLETA OFICIAL DE DADOS PÚBLICOS ===")
    for ent in ENTITIES:
        for y in [2024, 2025]:
            fetch_siconfi_dca(ent["ibge"], y)
    
    fetch_pncp_contracts_peixoto()
    print("=== COLETA CONCLUÍDA ===")
