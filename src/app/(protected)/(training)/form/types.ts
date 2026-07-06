const trainingType = [
  { label: "Drill", value: "DRILL" },
  { label: "Sparring", value: "SPARRING" },
  { label: "Competição", value: "COMPETITION" },
] as const;

const intensityType = [
  { label: "Baixa", value: "LOW_INTENSITY" },
  { label: "Média", value: "MEDIUM_INTENSITY" },
  { label: "Alta", value: "HIGH_INTENSITY" },
] as const;

const performanceType = [
  { label: "Péssimo", value: "VERY_BAD" },
  { label: "Ruim", value: "BAD" },
  { label: "Médio", value: "AVERAGE" },
  { label: "Bom", value: "GOOD" },
  { label: "Ótimo", value: "EXCELLENT" },
] as const;

const modalityType = [
  { label: "Gi", value: true },
  { label: "No-Gi", value: false },
] as const;

export { intensityType, modalityType, performanceType, trainingType };
