import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

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
        'className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all ${',
        'disabled={disabled}\n    className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all ${'
    )
    fixed_ui_str = fixed_ui_str.replace(
        'selected ? "border-brand-primary bg-brand-secondary/30" : "border-brand-secondary bg-white hover:border-brand-primary/50"',
        'disabled && !selected ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50" : selected ? "border-brand-primary bg-brand-secondary/30" : "border-brand-secondary bg-white hover:border-brand-primary/50"'
    )
    
    insert_idx = -1
    for i, line in enumerate(lines):
        if 'export default function SurveyPage' in line:
            insert_idx = i
            break
    lines.insert(insert_idx, fixed_ui_str + '\n')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
