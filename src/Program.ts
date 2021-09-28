import { Slime } from "./Slime";
import Victor = require("victor");

export class Program {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  canvas = document.querySelector("canvas");
  ctx = this.canvas.getContext("2d");

  slime: Slime;

  constructor() {
    this.canvas.height = this.windowHeight;
    this.canvas.width = this.windowWidth;

    this.slime = new Slime(this.ctx, {
      radius: 100,
      bezierAmount: 6,
      centerPositionVector: new Victor(this.windowWidth / 2, this.windowHeight / 2)
    });

    window.requestAnimationFrame(this.render.bind(this));
  }

  clearWindowBeforeRenderingNextFrame() {
    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
  }

  renderFrameBackgroundColor() {
    this.ctx.fillStyle = "#000";
    this.ctx.fill();

    this.ctx.fillRect(0, 0, this.windowWidth, this.windowHeight);
  }

  render() {
    this.clearWindowBeforeRenderingNextFrame();
    this.renderFrameBackgroundColor();

    this.slime.render();

    requestAnimationFrame(this.render.bind(this));
  }
}
