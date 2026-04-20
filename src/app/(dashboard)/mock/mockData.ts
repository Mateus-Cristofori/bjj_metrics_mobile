import { colors } from "../types/types";

const chartData = {
  labels: ["S-5", "S-4", "S-3", "S-2", "S-1", "Atual"],
  datasets: [
    {
      data: [
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5,
      ],
    },
  ],
};

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const weeklyTrainingData = [
  { day: "Seg", treinos: 2 },
  { day: "Ter", treinos: 0 },
  { day: "Qua", treinos: 5 },
  { day: "Qui", treinos: 3 },
  { day: "Sex", treinos: 1 },
  { day: "Sáb", treinos: 4 },
  { day: "Dom", treinos: 0 },
];

const trainingSequenceData = [
  { week: "1", count: 5 },
  { week: "2", count: 7 },
  { week: "3", count: 6 },
  { week: "4", count: 8 },
  { week: "5", count: 7 },
  { week: "6", count: 9 },
];

const topTechniquesData = [
  { technique: "Finalização", percentage: 42 },
  { technique: "Guarda", percentage: 35 },
  { technique: "Raspagem", percentage: 23 },
];

const beltData = [
  { label: "Branca", percentage: 23, color: colors.white },
  { label: "Azul", percentage: 33, color: colors.blue },
  { label: "Roxa", percentage: 20, color: colors.purple },
  { label: "Marrom", percentage: 12, color: colors.brown },
  { label: "Preta", percentage: 30, color: colors.fullDark },
];

const sortedBeltData = [...beltData].sort(
  (a, b) => b.percentage - a.percentage,
);

export {
  chartData,
  sortedBeltData,
  topTechniquesData,
  trainingSequenceData,
  weekDays,
  weeklyTrainingData
};

