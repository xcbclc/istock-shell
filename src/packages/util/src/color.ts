/**
 * Hex转Hsl
 * @param hex
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // 将 hex 转换为 RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h = Math.round(h * 60);
  }

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Hsl转Hex
 * @param h
 * @param s
 * @param l
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 生成角度，但排除绿色
 * @param startAngle
 * @param count
 */
function generateAngles(startAngle: number, count: number): number[] {
  const angles: number[] = [];
  const greenStart = 90;
  const greenEnd = 150;
  const range = 360 - (greenEnd - greenStart); // 有效角度范围的总长度
  const currentAngle = startAngle % 360; // 确保起始角度在 0-360 度范围内
  for (let i = 0; i < count; i++) {
    // 生成 0 到 360 范围内的角度
    let angle = ((i * range) / count + currentAngle) % 360;

    // 如果角度落在绿色区域(90-150)，进行偏移
    if (angle >= greenStart && angle <= greenEnd) {
      angle = greenEnd + (angle - greenStart);
    }

    angles.push(Math.round(angle));
  }

  return angles;
}

/**
 * 根据基础颜色和数量生成颜色调色板
 * @param numColors
 * @param baseColor
 */
export function generateColorPalette(numColors: number, baseColor: string = '#ff7d51'): string[] {
  const baseHSL = hexToHsl(baseColor);
  const angles = generateAngles(baseHSL.h, numColors);

  return angles.map((angle) => hslToHex(angle, baseHSL.s, baseHSL.l));
}
