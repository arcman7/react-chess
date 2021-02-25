export class Color {
  constructor(r, g, b, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }
  toNormal() {
    const r = this.r / 255
    const g = this.g / 255
    const b = this.b / 255
    const a = this.a
    return { r, g, b, a }
  }
  toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`
  }
  toNormalizedString() {
    const r = (this.r / 255).toFixed(2)
    const g = (this.g / 255).toFixed(2)
    const b = (this.b / 255).toFixed(2)
    const a = (this.a).toFixed(2)
    return `rgba(${r},${g},${b},${a})`
  }
  static getColorStr({ r, g, b, a = 1 }) {
    if (r <= 1 && g <= 1 && b <= 1) {
      r *= 255
      g *= 255
      b *= 255
    }
    return `rgba(${r},${g},${b},${a})`
  }
  static build({ r, g, b, a = 1 }) {
    if (r <= 1 && g <= 1 && b <= 1) {
      r *= 255
      g *= 255
      b *= 255
    }
    return new Color(r, g, b, a)
  }
}
