type technique = {
  value: number;
  label: string;
  text: string;
  color: string;
};

type belt = {
  id: number;
  label: string;
  percentage: number;
  color: string;
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
  BLACK: "#111827",
};

export { belt, beltColorMap, beltLabelMap, technique };

