import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'RadioOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (\n  <button\n    onClick={onClick}\n    className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all ${\n      disabled && !selected ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50" : selected ? "border-brand-primary bg-brand-secondary/30" : "border-brand-secondary bg-white hover:border-brand-primary/50"\n    }`}',
    'RadioOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (\n  <button\n    onClick={onClick}\n    className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all ${\n      selected ? "border-brand-primary bg-brand-secondary/30" : "border-brand-secondary bg-white hover:border-brand-primary/50"\n    }`}'
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
