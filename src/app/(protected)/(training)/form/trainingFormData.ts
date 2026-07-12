type TrainingFormData = {
  trainingDate: string;
  trainingType: string;
  intensity: string;
  gi: boolean;
  athletePerformance: string;
  durationMinutes: string;
  notes: string;
  rolls: TrainingRolls[];
};

type TrainingRolls = {
  id: string;
  durationMinutes: string;
  intensity: string;
  partnerName: string;
  partnerBelt: string;
  startPosition: string;
  submissionsApplied: string;
  submissionsSuffered: string;
  sweeps: string;
  passes: string;
  notes: string;
};

export { TrainingFormData, TrainingRolls };

