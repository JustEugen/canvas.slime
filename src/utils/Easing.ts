export type EasingFunction = (t: number) => number;

export class Easing {
  // no easing, no acceleration
  static linear(t: number): number {
    return t;
  }

  // accelerating from zero velocity
  static easeInQuad(t: number): number {
    return t * t;
  }

  // decelerating to zero velocity
  static easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  // acceleration until halfway, then deceleration
  static easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // accelerating from zero velocity
  static easeInCubic(t: number): number {
    return t * t * t;
  }

  // decelerating to zero velocity
  static easeOutCubic(t: number): number {
    return --t * t * t + 1;
  }

  // acceleration until halfway, then deceleration
  static easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // accelerating from zero velocity
  static easeInQuart(t: number): number {
    return t * t * t * t;
  }

  // decelerating to zero velocity
  static easeOutQuart(t: number) {
    return 1 - --t * t * t * t;
  }

  // acceleration until halfway, then deceleration
  static easeInOutQuart(t: number): number {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  }

  // accelerating from zero velocity
  static seaseInQuint(t: number): number {
    return t * t * t * t * t;
  }

  // decelerating to zero velocity
  static easeOutQuint(t: number): number {
    return 1 + --t * t * t * t * t;
  }

  // acceleration until halfway, then deceleration
  static easeInOutQuint(t: number): number {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
}
