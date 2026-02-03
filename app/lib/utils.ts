export function createSlides<T>(arr: T[], slideSize: number): T[][] {
  if (slideSize <= 0) {
    throw new Error("Chunk size must be a positive number.");
  }

  const slides: T[][] = [];
  for (let i = 0; i < arr.length; i += slideSize) {
    const slide = arr.slice(i, i + slideSize);
    slides.push(slide);
  }
  return slides;
}
