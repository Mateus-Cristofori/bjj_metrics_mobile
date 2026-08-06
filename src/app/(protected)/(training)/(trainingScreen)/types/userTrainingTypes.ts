interface UserTrainings {
  trainingId: string;
  trainingType: string;
  durationMinutes: number;
  intensity: string;
  gi: boolean;
  athleteTrainingPerformance: string;
  academyId?: string;
  trainingDate: string;
  notes?: string;
  rolas: UserRolls[];
}

interface UserRolls {
  intensity: string;
  durationMinutes: number;
  partnerName: string;
  partnerBelt: string;
  startPosition: string;
  submissionsApplied: number;
  submissionsSuffered: number;
  sweeps: number;
  passes: number;
  notes?: string;
}

const athletePerformanceMap: Record<string, string> = {
  VERY_BAD: "Péssimo",
  BAD: "Ruim",
  AVERAGE: "Médio",
  GOOD: "Bom",
  EXCELLENT: "Ótimo",
};

const intensity: Record<string, string> = {
  LOW_INTENSITY: "Baixa",
  MEDIUM_INTENSITY: "Média",
  HIGH_INTENSITY: "Alta",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const giOrNoGi: Record<string, string> = {
  true: "Gi",
  false: "No-Gi",
};

const startPositionMap: Record<string, string> = {
  STANDING: "Em pé",
  CLOSED_GUARD: "Guarda Fechada",
  OPEN_GUARD: "Guarda Aberta",
  HALF_GUARD: "Meia-Guarda",
  ON_KNEES: "De Joelhos",
  SIDE: "100kg",
  MOUNT: "Montada",
  BACK_CONTROL: "Controle de Costas",
  KNEE_ON_BELLY: "Joelho na Barriga",
};

export {
  athletePerformanceMap,
  formatDate,
  giOrNoGi,
  intensity,
  UserRolls,
  UserTrainings,
  startPositionMap
};
