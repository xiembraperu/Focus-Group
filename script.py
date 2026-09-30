with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Helper for Otro inputs
def get_otro_input(state_var, key):
    return f"""
                    {{ {state_var}.includes("Otro") && (
                      <input 
                        type="text" 
                        placeholder="Especificar..." 
                        className="w-full p-4 mb-3 rounded-xl border-2 border-brand-primary/50 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none" 
                        value={{otros.{key} || ''}} 
                        onChange={{e => handleOtroChange('{key}', e.target.value)}} 
                      />
                    )}}
"""

def get_otro_input_single(state_var, key):
    return f"""
                    {{ {state_var} === "Otro" && (
                      <input 
                        type="text" 
                        placeholder="Especificar..." 
                        className="w-full p-4 mb-3 rounded-xl border-2 border-brand-primary/50 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none" 
                        value={{otros.{key} || ''}} 
                        onChange={{e => handleOtroChange('{key}', e.target.value)}} 
                      />
                    )}}
"""

# Apply modifications

# q17Remember
content = content.replace(
    '{["Nombre / logo Xiembra", "Pacarana", "Imagen de las grajeas", "Chocolate / cacao", "Café", "Colores", "Texto principal", "Presentación / formato", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q17Remember.includes(opt)} onClick={() => toggleMultiSelect(q17Remember, setQ17Remember, opt)} />\n                    ))}',
    '{["Nombre / logo Xiembra", "Pacarana", "Imagen de las grajeas", "Chocolate / cacao", "Café", "Colores", "Texto principal", "Presentación / formato", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q17Remember.includes(opt)} onClick={() => toggleMultiSelect(q17Remember, setQ17Remember, opt)} />\n                    ))}' + get_otro_input('q17Remember', 'q17RememberOtro')
)

# q27Motivation
content = content.replace(
    '{["La calidad de los ingredientes", "La historia de la marca", "La presentación", "El precio", "El cacao", "El café", "Encontrarlo en una cafetería o tienda que frecuento", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q27Motivation.includes(opt)} onClick={() => toggleMultiSelect(q27Motivation, setQ27Motivation, opt)} />\n                    ))}',
    '{["La calidad de los ingredientes", "La historia de la marca", "La presentación", "El precio", "El cacao", "El café", "Encontrarlo en una cafetería o tienda que frecuento", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q27Motivation.includes(opt)} disabled={!q27Motivation.includes(opt) && q27Motivation.length >= 3} onClick={() => toggleMultiSelect(q27Motivation, setQ27Motivation, opt, 3)} />\n                    ))}' + get_otro_input('q27Motivation', 'q27MotivationOtro')
)
content = content.replace(
    'title="1. ¿Qué sería lo que más te motivaría a comprar Xiembra? (Puedes elegir varias)"',
    'title="1. ¿Qué sería lo que más te motivaría a comprar Xiembra? (Máximo 3)"'
)

# q28Impediment
content = content.replace(
    '{["Precio", "Sabor", "No conocer la marca", "No encontrarlo fácilmente", "Presentación / tamaño", "Empaque", "Otro"].map((opt) => (\n                      <RadioOption key={opt} label={opt} selected={q28Impediment === opt} onClick={() => setQ28Impediment(opt)} />\n                    ))}',
    '{["Precio", "Sabor", "No conocer la marca", "No encontrarlo fácilmente", "Presentación / tamaño", "Empaque", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q28Impediment.includes(opt)} disabled={!q28Impediment.includes(opt) && q28Impediment.length >= 3} onClick={() => toggleMultiSelect(q28Impediment, setQ28Impediment, opt, 3)} />\n                    ))}' + get_otro_input('q28Impediment', 'q28ImpedimentOtro')
)
content = content.replace(
    'title="2. ¿Qué podría impedirte comprar Xiembra?"',
    'title="2. ¿Qué podría impedirte comprar Xiembra? (Máximo 3)"'
)

# q31Describe
content = content.replace(
    '{["Natural", "Peruano", "Artesanal", "Premium", "Sofisticada", "Diferente", "Cercana", "Amigable", "Saludable", "Gourmet", "Infantil", "Juvenil", "No me genera una percepción clara", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q31Describe.includes(opt)} onClick={() => toggleMultiSelect(q31Describe, setQ31Describe, opt)} />\n                    ))}',
    '{["Natural", "Peruano / Artesanal", "Premium / Gourmet", "Diferente", "Cercana / Amigable", "Saludable", "Infantil / Juvenil", "No me genera una percepción clara", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q31Describe.includes(opt)} disabled={!q31Describe.includes(opt) && q31Describe.length >= 3} onClick={() => toggleMultiSelect(q31Describe, setQ31Describe, opt, 3)} />\n                    ))}' + get_otro_input('q31Describe', 'q31DescribeOtro')
)
content = content.replace(
    'title="1. Después de esta experiencia, ¿Cuáles de estas palabras describen mejor a Xiembra? (Puedes elegir varias)"',
    'title="1. Después de esta experiencia, ¿Cuáles de estas palabras describen mejor a Xiembra? (Máximo 3)"'
)

# q32Improve
content = content.replace(
    '{["El nivel de dulzor", "La intensidad del café", "El sabor del chocolate", "La textura", "El equilibrio chocolate–café", "El aroma", "El empaque", "La información del empaque", "El precio", "La historia / comunicación de la marca", "No cambiaría nada", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q32Improve.includes(opt)} onClick={() => toggleMultiSelect(q32Improve, setQ32Improve, opt)} />\n                    ))}',
    '{["La historia / comunicación de la marca", "El nivel de dulzor", "La intensidad del café", "El sabor del chocolate", "La textura", "El equilibrio chocolate–café", "El aroma", "El empaque", "La información del empaque", "El precio", "No cambiaría nada", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q32Improve.includes(opt)} disabled={!q32Improve.includes(opt) && q32Improve.length >= 3} onClick={() => toggleMultiSelect(q32Improve, setQ32Improve, opt, 3)} />\n                    ))}' + get_otro_input('q32Improve', 'q32ImproveOtro')
)
content = content.replace(
    'title="2. ¿Qué sería lo primero que mejorarías de Xiembra? (Obligatoria)"',
    'title="2. ¿Qué sería lo primero que mejorarías de Xiembra? (Máximo 3)"'
)

# q33RememberEnd
content = content.replace(
    '{["La combinación de café y chocolate", "El empaque", "La marca Xiembra", "La Pacarana", "La historia / origen de la Selva Central", "La presentación del producto", "La experiencia de probarlo", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q33RememberEnd.includes(opt)} onClick={() => toggleMultiSelect(q33RememberEnd, setQ33RememberEnd, opt)} />\n                    ))}',
    '{["La combinación de café y chocolate", "El empaque", "La marca Xiembra", "La Pacarana", "La historia / origen de la Selva Central", "La presentación del producto", "La experiencia de probarlo", "Otro"].map((opt) => (\n                      <CheckboxOption key={opt} label={opt} selected={q33RememberEnd.includes(opt)} disabled={!q33RememberEnd.includes(opt) && q33RememberEnd.length >= 3} onClick={() => toggleMultiSelect(q33RememberEnd, setQ33RememberEnd, opt, 3)} />\n                    ))}' + get_otro_input('q33RememberEnd', 'q33RememberEndOtro')
)
content = content.replace(
    'title="3. ¿Qué es lo que más recordarías de Xiembra después de esta experiencia? (Obligatoria)"',
    'title="3. ¿Qué es lo que más recordarías de Xiembra después de esta experiencia? (Máximo 3)"'
)

# q36CoffeeInfl
content = content.replace(
    '{["Aroma", "Sabor", "Acidez", "Suavidad", "Cuerpo", "Sabor final"].map((opt) => (\n                      <RadioOption key={opt} label={opt} selected={q36CoffeeInfl === opt} onClick={() => setQ36CoffeeInfl(opt)} />\n                    ))}',
    '{["Aroma", "Sabor y acidez", "Cuerpo y suavidad"].map((opt) => (\n                      <RadioOption key={opt} label={opt} selected={q36CoffeeInfl === opt} onClick={() => setQ36CoffeeInfl(opt)} />\n                    ))}'
)


with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
