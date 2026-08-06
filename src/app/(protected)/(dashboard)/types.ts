type Technique = {
  value: number;
  label: string;
  text: string;
  color: string;
};

type Belt = {
  id: number;
  label: string;
  percentage: number;
  color: string;
};

type AthletePerformance = {
  label: string;
  value: number;
};

type TrainingSequence = {
  id: string;
  value: number;
  label: string;
};

type WeeklyTraining = { id: string; value: number; label: string };

const athletePerformanceMap: Record<string, string> = {
  veryBad: "Péssimo",
  bad: "Ruim",
  average: "Médio",
  good: "Bom",
  excellent: "Ótimo",
};

const beltLabelMap: Record<string, string> = {
  WHITE: "Branca",
  BLUE: "Azul",
  PURPLE: "Roxa",
  BROWN: "Marrom",
  BLACK: "Preta",
};

const beltColorMap: Record<string, string> = {
  WHITE: "#E5E7EB",
  BLUE: "#3B82F6",
  PURPLE: "#8B5CF6",
  BROWN: "#92400E",
  BLACK: "#000",
};

export {
  AthletePerformance,
  athletePerformanceMap,
  Belt,
  beltColorMap,
  beltLabelMap,
  Technique,
  TrainingSequence,
  WeeklyTraining,
};
