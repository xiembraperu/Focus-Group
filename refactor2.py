import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# --- Extract UI Components ---
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '// UI Components' in line:
        start_idx = i
    if 'return (' in line and start_idx != -1 and end_idx == -1:
        if 'min-h-screen pb-24' in lines[i+1]:
            end_idx = i

if start_idx != -1 and end_idx != -1:
    ui_block_lines = lines[start_idx:end_idx]
    del lines[start_idx:end_idx]
    
    fixed_ui_block = []
    for line in ui_block_lines:
        if line.startswith('  '):
            fixed_ui_block.append(line[2:])
        else:
            fixed_ui_block.append(line)
            
    fixed_ui_str = ''.join(fixed_ui_block)
    
    fixed_ui_str = fixed_ui_str.replace(
        'CheckboxOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string })',
        'CheckboxOption = ({ selected, onClick, label, disabled = false }: { selected: boolean; onClick: () => void; label: string; disabled?: boolean })'
    )
    fixed_ui_str = fixed_ui_str.replace(
        'className={w-full p-4',
        'disabled={disabled}\n    className={w-full p-4 disabled:opacity-50 disabled:cursor-not-allowed'
    )
    
    insert_idx = -1
    for i, line in enumerate(lines):
        if 'export default function SurveyPage' in line:
            insert_idx = i
            break
    lines.insert(insert_idx, fixed_ui_str + '\n')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# --- State changes ---
content = content.replace('  // Derived state', '  const [otros, setOtros] = useState<Record<string, string>>({});\n  const handleOtroChange = (key: string, value: string) => setOtros(prev => ({...prev, [key]: value}));\n  const [q38Age, setQ38Age] = useState("");\n\n  // Derived state')
content = content.replace('contactOptIn\n    };', 'contactOptIn,\n      q38Age,\n      ...otros\n    };')

# toggleMultiSelect fix
content = content.replace(
    'const toggleMultiSelect = (state: string[], setState: any, value: string) => {\\n    if (state.includes(value)) {\\n      setState(state.filter((v) => v !== value));\\n    } else {\\n      setState([...state, value]);\\n    }\\n  };',
    'const toggleMultiSelect = (state: string[], setState: any, value: string, maxSelections?: number) => {\\n    if (state.includes(value)) {\\n      setState(state.filter((v) => v !== value));\\n    } else {\\n      if (!maxSelections || state.length < maxSelections) {\\n        setState([...state, value]);\\n      }\\n    }\\n  };'
)
# Re-try toggle regex manually if the above fails
import re
content = re.sub(r'const toggleMultiSelect = \(state: string\[\], setState: any, value: string\) => \{\s*if \(state.includes\(value\)\) \{\s*setState\(state.filter\(\(v\) => v !== value\)\);\s*\} else \{\s*setState\(\[\.\.\.state, value\]\);\s*\}\s*\};', 'const toggleMultiSelect = (state: string[], setState: any, value: string, maxSelections?: number) => {\\n    if (state.includes(value)) {\\n      setState(state.filter((v) => v !== value));\\n    } else {\\n      if (!maxSelections || state.length < maxSelections) {\\n        setState([...state, value]);\\n      }\\n    }\\n  };', content)

# Impediment string to array
content = content.replace('const [q28Impediment, setQ28Impediment] = useState("");', 'const [q28Impediment, setQ28Impediment] = useState<string[]>([]);')
content = content.replace('q28Impediment,', 'q28Impediment: q28Impediment.join(", "),')
content = content.replace('q28Impediment &&', 'q28Impediment.length > 0 &&')
content = content.replace('case 9:\n        return true;', 'case 9:\n        return q38Age !== "";')

# Price text
content = content.replace('presentación de 20 g', 'bolsita de 20 g')
content = content.replace('presentación de 100 g', 'caja de 100 g')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
