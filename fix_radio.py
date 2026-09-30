import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'RadioOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (\n  <button\n    onClick={onClick}\n    disabled={disabled}',
    'RadioOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (\n  <button\n    onClick={onClick}'
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
