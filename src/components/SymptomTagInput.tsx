import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SymptomTagInputProps {
  symptoms: string[];
  onChange: (symptoms: string[]) => void;
  error?: string;
}

const SymptomTagInput = ({ symptoms, onChange, error }: SymptomTagInputProps) => {
  const [input, setInput] = useState("");

  const addSymptom = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !symptoms.includes(trimmed)) {
      onChange([...symptoms, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSymptom(input);
    }
    if (e.key === "Backspace" && !input && symptoms.length) {
      onChange(symptoms.slice(0, -1));
    }
  };

  const removeSymptom = (symptom: string) => {
    onChange(symptoms.filter((s) => s !== symptom));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        Symptoms
      </label>
      <div
        className={`flex flex-wrap gap-2 p-3 rounded-lg border bg-card min-h-[48px] 
          focus-within:ring-2 focus-within:ring-ring ${
          error ? "border-destructive" : "border-input"
        }`}
      >
        {symptoms.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 px-6 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            {s}
            <button
              onClick={() => removeSymptom(s)}
              className="hover:bg-primary/20 rounded-full p-0.5"
              aria-label={`Remove ${s}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={symptoms.length ? "Add more..." : "Type a symptom and press Enter"}
          className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 flex-1 min-w-[150px] bg-transparent"
        />
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default SymptomTagInput;
