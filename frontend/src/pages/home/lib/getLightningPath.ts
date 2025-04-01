
export const getLightningPath = (width: number, height: number): string => {
  const points = [];
  const segments = 12; // больше сегментов — гибче линия
  for (let i = 0; i <= segments; i++) {
    const x = (width / segments) * i + (Math.random() - 0.5) * (width / segments * 0.5);
    const y = height - (height / segments) * i + (Math.random() - 0.5) * (height / segments * 0.5);
    points.push({ x, y });
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`;
  }
  return d;
};
