interface Height {
  feet?: number;
  inches?: number;
  centimeters?: number;
}
interface Weight {
  kilograms?: number;
  pounds?: number;
}

export function generateHeightArray(us: boolean = false): Height[] {
  const minHeight = 120; // in centimeters
  const maxHeight = 250;
  const heightArray: Height[] = [];

  for (let centimeters = minHeight; centimeters <= maxHeight; centimeters++) {
    const height: Height = us
      ? {
          feet: Math.floor(centimeters / 30.48),
          inches: Math.floor((centimeters % 30.48) / 2.54),
        }
      : { centimeters };

    heightArray.push(height);
  }

  return heightArray;
}
export function generateWeightArray(us: boolean = false): Weight[] {
  const minWeight = 30; // in kilograms
  const maxWeight = 250;
  const weightArray: Weight[] = [];

  for (let kilograms = minWeight; kilograms <= maxWeight; kilograms++) {
    const weight: Weight = us
      ? { pounds: Math.round(kilograms * 2.20462 * 10) / 10 }
      : { kilograms };

    weightArray.push(weight);
  }

  return weightArray;
}

export function checkForEmptyValuesInObject(values: {
  [key: string]: any;
}): boolean {
  for (const [key, value] of Object.entries(values)) {
    if (!value || value === "") {
      return true;
    }
  }
  return false;
}
