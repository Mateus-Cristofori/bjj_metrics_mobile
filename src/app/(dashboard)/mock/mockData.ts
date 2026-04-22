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
  { value: 0, label: "D" },
  { value: 1, label: "S" },
  { value: 10, label: "T" },
  { value: 9, label: "Q" },
  { value: 20, label: "Q" },
  { value: 1, label: "S" },
  { value: 0, label: "S" },
];

const trainingSequenceData = [
  { value: 5, label: "S1" },
  { value: 7, label: "S2" },
  { value: 6, label: "S3" },
  { value: 8, label: "S4" },
  { value: 7, label: "S5" },
  { value: 9, label: "S6" },
];

const topTechniquesData = [
  { value: 42, color: "#FF6384", text: "42%", label: "Finalização" },
  { value: 35, color: "#36A2EB", text: "35%", label: "Guarda" },
  { value: 23, color: "#FFCE56", text: "23%", label: "Raspagem" },
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

