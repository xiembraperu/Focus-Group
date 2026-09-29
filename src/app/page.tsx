"use client";

import { useState, useEffect } from "react";
import { SortableList } from "@/components/SortableList";
import { ChevronRight, Check, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const XIEMBRA_SAMPLE_CODE = "B";
const INITIAL_SAMPLES = ["A", "B", "C"];

export default function SurveyPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 10;

  // Tracking State
  const [participantId, setParticipantId] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setParticipantId(crypto.randomUUID());
    setStartedAt(new Date().toISOString());
  }, []);

  // Form State
  const [q1Rank, setQ1Rank] = useState<string[]>(INITIAL_SAMPLES);
  const [q2Buy, setQ2Buy] = useState("");
  const [q3SweetRank, setQ3SweetRank] = useState<string[]>(INITIAL_SAMPLES);
  const [q4Intensity, setQ4Intensity] = useState("");
  const [q5Texture, setQ5Texture] = useState("");
  const [q6Balance, setQ6Balance] = useState("");
  const [q7Influence, setQ7Influence] = useState("");
  const [q8Why, setQ8Why] = useState("");

  const [q9Feeling, setQ9Feeling] = useState("");
  const [q10LikedMost, setQ10LikedMost] = useState("");
  const [q11Sweetness, setQ11Sweetness] = useState("");
  const [q12CoffeeInt, setQ12CoffeeInt] = useState("");
  const [q13BalanceX, setQ13BalanceX] = useState("");

  const [q14FlavorDesc, setQ14FlavorDesc] = useState("");
  const [q15FirstAttention, setQ15FirstAttention] = useState("");
  const [q16Understand, setQ16Understand] = useState("");
  const [q17Remember, setQ17Remember] = useState<string[]>([]);
  const [q18Clarity, setQ18Clarity] = useState("");

  const [q19Animal, setQ19Animal] = useState("");
  const [q20Transmit, setQ20Transmit] = useState<string[]>([]);
  const [q21ChangePercep, setQ21ChangePercep] = useState("");

  const [q22Price20, setQ22Price20] = useState("");
  const [q23Price20Exp, setQ23Price20Exp] = useState("");
  const [q24Price100, setQ24Price100] = useState("");
  const [q25Price100Exp, setQ25Price100Exp] = useState("");
  const [q26ProbBuy, setQ26ProbBuy] = useState("");

  const [q27Motivation, setQ27Motivation] = useState<string[]>([]);
  const [q28Impediment, setQ28Impediment] = useState("");
  const [q29Moments, setQ29Moments] = useState<string[]>([]);
  const [q30Places, setQ30Places] = useState<string[]>([]);

  const [q31Describe, setQ31Describe] = useState<string[]>([]);
  const [q32Improve, setQ32Improve] = useState<string[]>([]);
  const [q33RememberEnd, setQ33RememberEnd] = useState<string[]>([]);

  const [q34FlavorRank, setQ34FlavorRank] = useState<string[]>(["Arándano", "Piña", "Aguaymanto"]);
  const [q35CoffeeTake, setQ35CoffeeTake] = useState("");
  const [q36CoffeeInfl, setQ36CoffeeInfl] = useState("");
  const [q37CoffeeBuy, setQ37CoffeeBuy] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [contactOptIn, setContactOptIn] = useState(false);

  // Derived state
  const isXiembraFavorite = q1Rank[0] === XIEMBRA_SAMPLE_CODE;

  // Auto scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Validation
  const canProceed = () => {
    switch (step) {
      case 1:
        return q2Buy && q4Intensity && q5Texture && q6Balance && q7Influence;
      case 2:
        return q9Feeling && q10LikedMost && q11Sweetness && q12CoffeeInt && q13BalanceX;
      case 3:
        return q15FirstAttention && q16Understand && q17Remember.length > 0 && q18Clarity;
      case 4:
        return q19Animal && q20Transmit.length > 0 && q21ChangePercep;
      case 5:
        return q22Price20 && q23Price20Exp && q24Price100 && q25Price100Exp && q26ProbBuy;
      case 6:
        return q27Motivation.length > 0 && q28Impediment && q29Moments.length > 0 && q30Places.length > 0;
      case 7:
        return q31Describe.length > 0 && q32Improve.length > 0 && q33RememberEnd.length > 0;
      case 8:
        return q35CoffeeTake && q36CoffeeInfl && q37CoffeeBuy;
      case 9:
        return true; 
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceed() && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    
    const payload = {
      participantId,
      startedAt,
      submittedAt: new Date().toISOString(),
      q1Rank: q1Rank.join(", "),
      q2Buy,
      q3SweetRank: q3SweetRank.join(", "),
      q4Intensity,
      q5Texture,
      q6Balance,
      q7Influence,
      q8Why,
      q9Feeling,
      q10LikedMost,
      q11Sweetness,
      q12CoffeeInt,
      q13BalanceX,
      q14FlavorDesc,
      q15FirstAttention,
      q16Understand,
      q17Remember: q17Remember.join(", "),
      q18Clarity,
      q19Animal,
      q20Transmit: q20Transmit.join(", "),
      q21ChangePercep,
      q22Price20,
      q23Price20Exp,
      q24Price100,
      q25Price100Exp,
      q26ProbBuy,
      q27Motivation: q27Motivation.join(", "),
      q28Impediment,
      q29Moments: q29Moments.join(", "),
      q30Places: q30Places.join(", "),
      q31Describe: q31Describe.join(", "),
      q32Improve: q32Improve.join(", "),
      q33RememberEnd: q33RememberEnd.join(", "),
      q34FlavorRank: q34FlavorRank.join(", "),
      q35CoffeeTake,
      q36CoffeeInfl,
      q37CoffeeBuy,
      contactName,
      contactInfo,
      contactOptIn
    };

    try {
      const endpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
      if (!endpoint) {
        throw new Error("No hay un endpoint configurado para enviar los datos.");
      }
      
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });
      
      setStep(10);
    } catch (error: any) {
      console.error("Submit Error:", error);
      setSubmitError(error.message || "Ocurrió un error al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMultiSelect = (state: string[], setState: any, value: string) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  // UI Components
  const RadioOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all ${
        selected ? "border-brand-primary bg-brand-secondary/30" : "border-brand-secondary bg-white hover:border-brand-primary/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-medium ${selected ? "text-brand-primary" : "text-gray-700"}`}>{label}</span>
        {selected && <Check className="text-brand-primary w-5 h-5" />}
      </div>
    </button>
  );

  const CheckboxOption = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all ${
        selected ? "border-brand-primary bg-brand-secondary/30" : "border-brand-secondary bg-white hover:border-brand-primary/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-medium ${selected ? "text-brand-primary" : "text-gray-700"}`}>{label}</span>
        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${selected ? "border-brand-primary bg-brand-primary" : "border-gray-300"}`}>
          {selected && <Check className="text-brand-bg w-4 h-4" />}
        </div>
      </div>
    </button>
  );

  const QuestionBlock = ({ title, children, optional = false }: { title: string; children: React.ReactNode, optional?: boolean }) => (
    <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-brand-secondary">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title} {optional && <span className="text-sm font-normal text-gray-400">(Opcional)</span>}</h3>
      {children}
    </div>
  );

  const Scale1To5 = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => {
    return (
      <div className="flex justify-between items-center gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num.toString())}
            className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center transition-all ${
              value === num.toString() ? "bg-brand-primary text-brand-bg shadow-md scale-110" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 selection:bg-brand-secondary selection:text-brand-primary">
      {/* Progress Bar */}
      {step < 10 && (
        <div className="fixed top-0 left-0 right-0 h-2 bg-brand-secondary/30 z-50">
          <div
            className="h-full bg-brand-secondary transition-all duration-500 ease-out"
            style={{ width: `${(step / 9) * 100}%` }}
          />
        </div>
      )}

      {/* Header Container integrado (sin sticky ni blur) para una superficie continua */}
      <div className="w-full pt-10 pb-2">
        <div className="max-w-md mx-auto px-4 flex justify-center">
          <img 
            src="/logo_verde_campo.jpg" 
            alt="Xiembra Logo" 
            className="w-56 sm:w-64 md:w-72 h-auto object-contain rounded-3xl shadow-lg border-2 border-brand-secondary/30" 
          />
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 pt-4">
        {step < 10 && (
          <div className="mb-6">
            <span className="text-sm font-semibold text-brand-primary tracking-wider uppercase">Paso {step} de 9</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* --- STEP 1 --- */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Cata a Ciegas</h2>
                
                <QuestionBlock title="1. Ordena las muestras de tu favorita a tu menos favorita (1 = Favorita)">
                  <SortableList items={q1Rank} onChange={setQ1Rank} />
                </QuestionBlock>

                <QuestionBlock title="2. ¿Cuál comprarías si tuvieras que elegir una?">
                  {INITIAL_SAMPLES.map((s) => (
                    <RadioOption key={s} label={`Muestra ${s}`} selected={q2Buy === s} onClick={() => setQ2Buy(s)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. Ordena las muestras según qué tanto te gustó su nivel de dulzor (1 = Más me gustó)">
                  <SortableList items={q3SweetRank} onChange={setQ3SweetRank} />
                </QuestionBlock>

                <QuestionBlock title="4. ¿Cuál tenía la intensidad de café que más te gustó?">
                  {INITIAL_SAMPLES.map((s) => (
                    <RadioOption key={s} label={`Muestra ${s}`} selected={q4Intensity === s} onClick={() => setQ4Intensity(s)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="5. ¿Cuál tenía la textura que más te gustó?">
                  {INITIAL_SAMPLES.map((s) => (
                    <RadioOption key={s} label={`Muestra ${s}`} selected={q5Texture === s} onClick={() => setQ5Texture(s)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="6. ¿Cuál tenía el mejor equilibrio entre chocolate y café?">
                  {INITIAL_SAMPLES.map((s) => (
                    <RadioOption key={s} label={`Muestra ${s}`} selected={q6Balance === s} onClick={() => setQ6Balance(s)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="7. ¿Qué fue lo que más influyó en tu elección de la muestra favorita?">
                  {["Sabor del chocolate", "Sabor del café", "Equilibrio entre chocolate y café", "Dulzor", "Intensidad del café", "Textura", "Aroma", "Sensación final"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q7Influence === opt} onClick={() => setQ7Influence(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="8. ¿Por qué elegiste esa muestra como tu favorita?" optional>
                  <textarea
                    className="w-full p-4 rounded-xl border-2 border-brand-secondary focus:border-brand-primary focus:ring-0 resize-none h-28"
                    placeholder="Escribe tu respuesta aquí..."
                    value={q8Why}
                    onChange={(e) => setQ8Why(e.target.value)}
                  />
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 2 --- */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-brand-primary text-white p-6 rounded-2xl mb-8 shadow-md">
                  <h2 className="text-xl font-bold mb-3">Revelación de Muestra</h2>
                  <p className="text-brand-bg leading-relaxed">
                    Ahora que hemos probado las muestras, queremos conocer tu percepción de Xiembra: su sabor, propuesta, identidad y lo que te transmite como marca.
                  </p>
                  <div className="mt-4 bg-brand-primary/80 p-4 rounded-xl border border-brand-secondary/50">
                    <p className="text-lg font-medium text-center">La muestra <span className="font-black text-brand-accent text-2xl mx-1">{XIEMBRA_SAMPLE_CODE}</span> era Xiembra.</p>
                  </div>
                </div>

                <QuestionBlock title="1. Ahora que sabes cuál era Xiembra, ¿Cómo te sientes respecto a tu elección?">
                  {["Me reafirma que elegiría Xiembra", "Me sorprendió que Xiembra fuera mi favorita", "Xiembra no fue mi favorita, pero me interesa conocerla más", "Mi opinión no cambia", "No estoy seguro/a"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q9Feeling === opt} onClick={() => setQ9Feeling(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="2. Pensando específicamente en la muestra de Xiembra, ¿Qué fue lo que más te gustó?">
                  {["Sabor del chocolate", "Sabor del café", "Equilibrio entre chocolate y café", "Dulzor", "Intensidad del café", "Aroma", "Textura", "Sensación final"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q10LikedMost === opt} onClick={() => setQ10LikedMost(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. ¿Cómo percibiste el dulzor de Xiembra?">
                  <div className="flex flex-col gap-2">
                    {["Muy bajo", "Bajo", "Adecuado", "Alto", "Muy Alto"].map((opt) => (
                      <RadioOption key={opt} label={opt} selected={q11Sweetness === opt} onClick={() => setQ11Sweetness(opt)} />
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock title="4. ¿Cómo percibiste la intensidad del café de Xiembra?">
                  <div className="flex flex-col gap-2">
                    {["Muy baja", "Baja", "Adecuada", "Alta", "Muy Alta"].map((opt) => (
                      <RadioOption key={opt} label={opt} selected={q12CoffeeInt === opt} onClick={() => setQ12CoffeeInt(opt)} />
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock title="5. ¿Cómo percibiste el equilibrio entre el chocolate y el café?">
                  {["Predomina mucho el chocolate", "Predomina un poco el chocolate", "Está equilibrado", "Predomina un poco el café", "Predomina mucho el café"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q13BalanceX === opt} onClick={() => setQ13BalanceX(opt)} />
                  ))}
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 3 --- */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Experiencia con Xiembra</h2>

                <QuestionBlock title="1. ¿Cómo describirías el sabor de Xiembra con tus propias palabras?" optional>
                  <textarea
                    className="w-full p-4 rounded-xl border-2 border-brand-secondary focus:border-brand-primary resize-none h-28"
                    value={q14FlavorDesc}
                    onChange={(e) => setQ14FlavorDesc(e.target.value)}
                  />
                </QuestionBlock>

                <QuestionBlock title="2. Al ver el empaque de Xiembra por primera vez, ¿qué fue lo primero que llamó tu atención?">
                  {["Nombre / logo Xiembra", "Pacarana", "Imagen de las grajeas", "Chocolate / cacao", "Café", "Colores", "Texto principal", "Presentación / formato", "Otro"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q15FirstAttention === opt} onClick={() => setQ15FirstAttention(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. Sin que nadie te explique el producto, ¿qué entiendes que es?">
                  {["Chocolate", "Chocolate con café", "Grajeas de chocolate", "Grajeas de café cubiertas de chocolate", "Snack de café", "Confitería", "No me queda claro", "Otro"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q16Understand === opt} onClick={() => setQ16Understand(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="4. ¿Qué información recuerdas del empaque después de observarlo? (Puedes elegir varias)">
                  {["Xiembra", "Choco Grajeas de Café Tostado", "Cacao", "Café", "Selva Central", "Porcentaje de cacao", "Contenido neto", "Pacarana"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q17Remember.includes(opt)} onClick={() => toggleMultiSelect(q17Remember, setQ17Remember, opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="5. ¿Qué tan claro te resulta qué producto estás comprando? (1 = Nada claro, 5 = Muy claro)">
                  <Scale1To5 value={q18Clarity} onChange={setQ18Clarity} />
                  <div className="flex justify-between text-sm text-gray-400 mt-2 px-1">
                    <span>Nada claro</span>
                    <span>Muy claro</span>
                  </div>
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 4 --- */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-brand-secondary/30 border-l-4 border-brand-primary p-5 rounded-r-xl mb-8">
                  <p className="text-brand-primary">
                    Exploraremos qué te transmite la Pacarana y cómo percibes la conexión de Xiembra con la Selva Central, el cacao y el café.
                  </p>
                </div>

                <QuestionBlock title="1. Antes de conocer la historia, ¿Qué animal pensabas que era el personaje?">
                  {["Ratón", "Cuy", "Capibara", "No lo identifico", "Otro"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q19Animal === opt} onClick={() => setQ19Animal(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="2. ¿Qué te transmite el personaje? (Puedes elegir varias)">
                  {["Selva", "Naturaleza", "Algo artesanal", "Algo amigable", "Algo infantil", "Algo premium", "No me transmite algo específico", "Otro"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q20Transmit.includes(opt)} onClick={() => toggleMultiSelect(q20Transmit, setQ20Transmit, opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. Ahora que conoces que es una Pacarana de la Selva Central, ¿cambia tu percepción de Xiembra?">
                  {["Mejora mi percepción", "No cambia", "Empeora mi percepción", "No estoy seguro/a"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q21ChangePercep === opt} onClick={() => setQ21ChangePercep(opt)} />
                  ))}
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 5 --- */}
            {step === 5 && (
              <div className="space-y-6">
                 <div className="bg-brand-secondary/30 border-l-4 border-brand-primary p-5 rounded-r-xl mb-8">
                  <p className="text-brand-primary">
                    Queremos conocer cuánto valor percibes en Xiembra y qué precio considerarías razonable, caro o económico para sus diferentes presentaciones.
                  </p>
                </div>

                <QuestionBlock title="1. Pensando en la presentación de 20 g, ¿qué precio considerarías razonable?">
                  {["S/ 3–4", "S/ 5–6", "S/ 7–8", "S/ 9–10", "Más de S/ 10", "No sé"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q22Price20 === opt} onClick={() => setQ22Price20(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="2. ¿A partir de qué precio considerarías cara la presentación de 20 g?">
                  {["S/ 5", "S/ 6", "S/ 7", "S/ 8", "S/ 9", "S/ 10", "No sé"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q23Price20Exp === opt} onClick={() => setQ23Price20Exp(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. Pensando en la presentación de 100 g, ¿qué precio considerarías razonable?">
                  {["S/ 15–19", "S/ 20–24", "S/ 25–29", "S/ 30–34", "S/ 35–39", "No sé"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q24Price100 === opt} onClick={() => setQ24Price100(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="4. ¿A partir de qué precio considerarías cara la presentación de 100 g?">
                  {["S/ 20", "S/ 25", "S/ 30", "S/ 35", "S/ 40 a más", "No sé"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q25Price100Exp === opt} onClick={() => setQ25Price100Exp(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="5. Después de probar Xiembra y conocer la marca, ¿Qué tan probable sería que la compraras? (1 = Nada probable, 5 = Muy probable)">
                  <Scale1To5 value={q26ProbBuy} onChange={setQ26ProbBuy} />
                   <div className="flex justify-between text-sm text-gray-400 mt-2 px-1">
                    <span>Nada probable</span>
                    <span>Muy probable</span>
                  </div>
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 6 --- */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="bg-brand-secondary/30 border-l-4 border-brand-primary p-5 rounded-r-xl mb-8">
                  <p className="text-brand-primary">
                    Queremos entender en qué momentos consumirías Xiembra, con qué lo acompañarías y en qué lugares esperarías encontrarlo.
                  </p>
                </div>

                <QuestionBlock title="1. ¿Qué sería lo que más te motivaría a comprar Xiembra? (Puedes elegir varias)">
                  {["La calidad de los ingredientes", "La historia de la marca", "La presentación", "El precio", "El cacao", "El café", "Encontrarlo en una cafetería o tienda que frecuento", "Otro"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q27Motivation.includes(opt)} onClick={() => toggleMultiSelect(q27Motivation, setQ27Motivation, opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="2. ¿Qué podría impedirte comprar Xiembra?">
                  {["Precio", "Sabor", "No conocer la marca", "No encontrarlo fácilmente", "Presentación / tamaño", "Empaque", "Otro"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q28Impediment === opt} onClick={() => setQ28Impediment(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. ¿En qué momentos consumirías Xiembra? (Puedes elegir varias)">
                  {["Acompañando un café", "Como snack", "Durante el trabajo/estudio", "Después de comer", "En una reunión", "Como regalo", "Para tener en casa", "Otro"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q29Moments.includes(opt)} onClick={() => toggleMultiSelect(q29Moments, setQ29Moments, opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="4. ¿Dónde esperarías encontrar Xiembra? (Puedes elegir varias)">
                  {["Cafeterías", "Tiendas de productos naturales", "Supermercados", "Ferias", "Tiendas online", "Redes sociales", "Otro"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q30Places.includes(opt)} onClick={() => toggleMultiSelect(q30Places, setQ30Places, opt)} />
                  ))}
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 7 --- */}
            {step === 7 && (
              <div className="space-y-6">
                 <div className="bg-brand-secondary/30 border-l-4 border-brand-primary p-5 rounded-r-xl mb-8">
                  <p className="text-brand-primary">
                    Queremos conocer qué impresión te llevas de Xiembra, qué recordarías y qué consideras que podría mejorar.
                  </p>
                </div>

                <QuestionBlock title="1. Después de esta experiencia, ¿Cuáles de estas palabras describen mejor a Xiembra? (Puedes elegir varias)">
                  {["Natural", "Peruano", "Artesanal", "Premium", "Sofisticada", "Diferente", "Cercana", "Amigable", "Saludable", "Gourmet", "Infantil", "Juvenil", "No me genera una percepción clara", "Otro"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q31Describe.includes(opt)} onClick={() => toggleMultiSelect(q31Describe, setQ31Describe, opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="2. ¿Qué sería lo primero que mejorarías de Xiembra? (Obligatoria)">
                  {["El nivel de dulzor", "La intensidad del café", "El sabor del chocolate", "La textura", "El equilibrio chocolate–café", "El aroma", "El empaque", "La información del empaque", "El precio", "La historia / comunicación de la marca", "No cambiaría nada", "Otro"].map((opt) => (
                    <CheckboxOption key={opt} label={opt} selected={q32Improve.includes(opt)} onClick={() => toggleMultiSelect(q32Improve, setQ32Improve, opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. ¿Qué es lo que más recordarías de Xiembra después de esta experiencia? (Obligatoria)">
                  {["La combinación de café y chocolate", "El empaque", "La marca Xiembra", "La Pacarana", "La historia / origen de la Selva Central", "La presentación del producto", "La experiencia de probarlo", "Otro"].map((opt) => (
                     <CheckboxOption key={opt} label={opt} selected={q33RememberEnd.includes(opt)} onClick={() => toggleMultiSelect(q33RememberEnd, setQ33RememberEnd, opt)} />
                  ))}
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 8 --- */}
            {step === 8 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Lo que viene</h2>

                <QuestionBlock title="1. Si Xiembra desarrollara estos nuevos sabores, ¿en qué orden te gustaría probarlos? (1 = El que más quieres)">
                  <SortableList items={q34FlavorRank} onChange={setQ34FlavorRank} />
                </QuestionBlock>

                <QuestionBlock title="2. De los dos cafés que probaste, ¿cuál elegirías para tomar?">
                  {["Café A", "Café B"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q35CoffeeTake === opt} onClick={() => setQ35CoffeeTake(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="3. ¿Qué fue lo que más influyó en tu elección?">
                  {["Aroma", "Sabor", "Acidez", "Suavidad", "Cuerpo", "Sabor final"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q36CoffeeInfl === opt} onClick={() => setQ36CoffeeInfl(opt)} />
                  ))}
                </QuestionBlock>

                <QuestionBlock title="4. Si tuvieras que elegir uno para comprar, ¿cuál elegirías?">
                  {["Café A", "Café B"].map((opt) => (
                    <RadioOption key={opt} label={opt} selected={q37CoffeeBuy === opt} onClick={() => setQ37CoffeeBuy(opt)} />
                  ))}
                </QuestionBlock>
              </div>
            )}

            {/* --- STEP 9 --- */}
            {step === 9 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Datos de contacto (Opcional)</h2>

                <QuestionBlock title="Queremos seguir en contacto contigo">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input
                        type="text"
                        className="w-full p-4 rounded-xl border-2 border-brand-secondary focus:border-brand-primary"
                        placeholder="Ej: Juan Pérez"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp o Correo</label>
                      <input
                        type="text"
                        className="w-full p-4 rounded-xl border-2 border-brand-secondary focus:border-brand-primary"
                        placeholder="Ej: +51 999 999 999 / correo@ejemplo.com"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                      />
                    </div>
                    
                    <button
                      onClick={() => setContactOptIn(!contactOptIn)}
                      className="flex items-start gap-3 mt-4 text-left"
                    >
                      <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${contactOptIn ? "border-brand-primary bg-brand-primary" : "border-gray-300"}`}>
                        {contactOptIn && <Check className="text-brand-bg w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Acepto que Xiembra me contacte sobre futuros lanzamientos</span>
                        <p className="text-xs text-gray-400 mt-1">Tus datos no serán compartidos con terceros.</p>
                      </div>
                    </button>
                  </div>
                </QuestionBlock>

                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium">Error al enviar</p>
                      <p className="text-red-600 text-sm mt-1">{submitError}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- STEP 10 --- */}
            {step === 10 && (
              <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
                <div className="w-48 h-48 rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-brand-secondary/50">
                  <img src="/pacarana.jpg" alt="Pacarana" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-3xl font-black text-gray-900">¡Gracias por ser parte de esto!</h1>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Tu opinión nos ayuda a mejorar y llevar el mejor sabor de la Selva Central a más personas.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Nav */}
      {step < 10 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-brand-secondary/30">
          <div className="max-w-md mx-auto flex justify-between items-center">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-gray-500 font-medium rounded-xl active:bg-gray-100"
                disabled={isSubmitting}
              >
                Atrás
              </button>
            ) : (
              <div />
            )}
            
            {step === 9 ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all w-full max-w-[200px] ${
                  canProceed() && !isSubmitting
                    ? "bg-brand-primary text-brand-bg shadow-lg shadow-brand-secondary active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <> <RefreshCw className="w-5 h-5 animate-spin" /> Enviando... </>
                ) : (
                  <> Enviar <Check className="w-5 h-5" /> </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all w-full max-w-[160px] ${
                  canProceed()
                    ? "bg-brand-primary text-brand-bg shadow-lg shadow-brand-secondary active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Siguiente <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
