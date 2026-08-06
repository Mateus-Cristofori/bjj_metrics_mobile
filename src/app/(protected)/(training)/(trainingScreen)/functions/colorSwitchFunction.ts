export function getIntensityColor(intensity: string) {
  switch (intensity) {
    case "Alta":
      return "#ef4444";
    case "Média":
      return "#eab308";
    case "Baixa":
      return "#22c55e";
    default:
      return "#9ca3af";
  }
}