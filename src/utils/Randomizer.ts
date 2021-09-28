export class Randomizer {
  static getRandomBetween(max: number, min: number, disableFloor = false) {
    return !disableFloor
      ? Math.ceil(Math.random() * (max - min) + min)
      : Math.random() * (max - min) + min;
  }
}
