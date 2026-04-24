import json
import re

log_path = r"C:\Users\ronicley.souza\.gemini\antigravity\brain\b151fa11-1090-4a91-acf9-ab5c2eaec0e2\.system_generated\logs\overview.txt"

with open(log_path, 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'(\{.*?\"metadata\":.*?\"totalRows\":\s*\"717\"[^\}]*\})', text, re.DOTALL)

if match:
    data_str = match.group(1)
    # The JSON ends with }, need to handle potential extra brackets
    # Let's cleanly substring between "{" and the last "}" in that block
    start_idx = text.find('{"metadata":', match.start() - 10)
    end_idx = text.find('}', match.end())
    try:
        data = json.loads(match.group(1))
    except Exception as e:
        print("Json load directly failed:", e)
        # fallback parsing
        # just find the start of {"metadata": and end of "totalRows": "717"\n  }\n}
        m2 = re.search(r'\{\s*"metadata":.*?\}\s*\}', text[match.start():], re.DOTALL)
        if m2:
            try:
                data = json.loads(m2.group(0))
            except Exception as e2:
                print("Fallback JSON failed:", e2)
                exit(1)
        else:
            print("Regex 2 missed")
            exit(1)

    result = data['resultset']
    
    uo_map = {}
    for row in result:
        uo_code = row[0]
        uo_mne = row[1]
        acao_code = row[2]
        acao_nom = row[3]
        
        uo_key = f"{uo_code} - {uo_mne}"
        acao_key = f"{acao_code} - {acao_nom}"
        
        if uo_key not in uo_map:
            uo_map[uo_key] = []
        if acao_key not in uo_map[uo_key]:
            uo_map[uo_key].append(acao_key)
            
    js_code = "const uoActionsMap = " + json.dumps(uo_map, indent=4, ensure_ascii=False) + ";\n"
    js_code += "window.uoActionsMap = uoActionsMap;\n"
    
    with open("mock_data.js", "w", encoding="utf-8") as out_f:
        out_f.write(js_code)
    print("Successfully generated mock_data.js")
else:
    print("Match failed")
