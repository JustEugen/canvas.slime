import Victor = require("victor");

type SlimeLineData = {
  angleDeg: number;
  v: Victor;
}

type SlimeLinesData = {
  s: SlimeLineData;
  c: SlimeLineData;
  e: SlimeLineData;
};

type Configuration = {
  centerPositionVector: Victor;
  bezierAmount: number;
  radius: number;
}

export class Slime {
  ctx: CanvasRenderingContext2D;

  centerPositionVector: Victor;
  bezierAmount: number;
  radius: number;

  initialLinesData: SlimeLinesData[];
  slimeLinesData: SlimeLinesData[];

  constructor(
    ctx: CanvasRenderingContext2D,
    configuration: Configuration
  ) {
    this.ctx = ctx;

    this.centerPositionVector = configuration.centerPositionVector;
    this.bezierAmount = configuration.bezierAmount;
    this.radius = configuration.radius;

    this.init_fillSlimeLinesWithEmptyData();
    this.init_generateLines();

    this.debug_initControls();
  }

  init_fillSlimeLinesWithEmptyData() {
    this.slimeLinesData = new Array(this.bezierAmount).fill(undefined).map(() => {
      return {
        s: {
          angleDeg: 0,
          v: new Victor(0, 0)
        },
        c: {
          angleDeg: 0,
          v: new Victor(0, 0)
        },
        e: {
          angleDeg: 0,
          v: new Victor(0, 0)
        },
      }
    })
    this.initialLinesData = new Array(this.bezierAmount).fill(undefined).map(() => {
      return {
        s: {
          angleDeg: 0,
          v: new Victor(0, 0)
        },
        c: {
          angleDeg: 0,
          v: new Victor(0, 0)
        },
        e: {
          angleDeg: 0,
          v: new Victor(0, 0)
        },
      }
    })
  }

  init_generateLines() {
    const step = 360 / this.bezierAmount;
    const radiusV = new Victor(0, this.radius);

    let currentAngle = 0;

    for (let i = 0; i < this.bezierAmount; i ++ ) {
      this.slimeLinesData[i].s.v = this.centerPositionVector.clone().add(radiusV.clone().rotateByDeg(currentAngle));
      this.slimeLinesData[i].c.v = this.centerPositionVector.clone().add(radiusV.clone().add(new Victor(0, 14)).rotateByDeg(currentAngle + step / 2));
      this.slimeLinesData[i].e.v = this.centerPositionVector.clone().add(radiusV.clone().rotateByDeg(currentAngle + step));

      this.slimeLinesData[i].s.angleDeg = currentAngle
      this.slimeLinesData[i].c.angleDeg = currentAngle
      this.slimeLinesData[i].e.angleDeg = currentAngle

      this.initialLinesData[i].s.v = this.centerPositionVector.clone().add(radiusV.clone().rotateByDeg(currentAngle));
      this.initialLinesData[i].c.v = this.centerPositionVector.clone().add(radiusV.clone().add(new Victor(0, 14)).rotateByDeg(currentAngle + step / 2));
      this.initialLinesData[i].e.v = this.centerPositionVector.clone().add(radiusV.clone().rotateByDeg(currentAngle + step));

      this.initialLinesData[i].s.angleDeg = currentAngle
      this.initialLinesData[i].c.angleDeg = currentAngle
      this.initialLinesData[i].e.angleDeg = currentAngle

      currentAngle = currentAngle + step;
    }

    console.log('generated lines final: ', this.slimeLinesData);
  }

  debug_initControls() {
    const createControl = (indexInList: number, controlName: keyof SlimeLinesData, controlValue: number) => {
      const controlWrapper = document.createElement('div');
      const controlText = document.createElement('div');
      const controlInput = document.createElement('input');

      controlWrapper.classList.add('control-wrapper');

      controlText.innerHTML = controlValue + ' --- ' + controlName;

      controlInput.setAttribute('type', 'range');
      controlInput.setAttribute('min', '-50');
      controlInput.setAttribute('max', '50');
      controlInput.setAttribute('id', `control-${controlName}-${indexInList}`)
      controlInput.setAttribute('data-uniq', indexInList + '');
      controlInput.setAttribute('data-name', controlName + '');
      controlInput.setAttribute('value', controlValue + '');

      controlWrapper.appendChild(controlText);
      controlWrapper.appendChild(controlInput);

      controlInput.addEventListener('input', (e: Event) => {
        const updatedValue = parseInt((e.currentTarget as HTMLInputElement).value);

        controlText.innerHTML = updatedValue + ' --- ' + controlName;

        const selectedSlimeLineData = this.slimeLinesData[indexInList][controlName];
        const initialSelectedSlimeLineData = this.initialLinesData[indexInList][controlName];

        console.log(initialSelectedSlimeLineData.v)
        selectedSlimeLineData.v = initialSelectedSlimeLineData.v.clone().add(new Victor(0, updatedValue).rotateByDeg(initialSelectedSlimeLineData.angleDeg));
      });

      return controlWrapper;
    }

    for (let i = 0; i < this.slimeLinesData.length; i ++ ) {
      const currentLineDaa = this.slimeLinesData[i];

      const { s, c, e } = currentLineDaa;

      const lineDataWrapper = document.createElement('div');

      const sControl = createControl(i, 's', 0);
      const cControl = createControl(i, 'c', 0);
      const eControl = createControl(i, 'e', 0);

      lineDataWrapper.appendChild(sControl);
      lineDataWrapper.appendChild(cControl);
      lineDataWrapper.appendChild(eControl);

      document.querySelector('#controls').appendChild(lineDataWrapper);
    }


    // document.querySelector('#range').addEventListener('input', (event: InputEvent) => {
    //   const value = (document.querySelector('#range') as HTMLInputElement).value;
    //
    //   document.querySelector('#range-data').innerHTML = value + '';
    //
    //   this.init_generateLines(+value);
    // })
  }

  debug_renderSlimeLinesPoints() {
    const renderSinglePoint = (x: number, y: number, r: number, color: string) => {
      this.ctx.beginPath();

      this.ctx.arc(x, y, r, 0, Math.PI * 2);

      this.ctx.fillStyle = color;
      this.ctx.fill();

      this.ctx.closePath();
    }

    const r = 2;

    for (let i = 0; i < this.slimeLinesData.length; i ++) {
      const data = this.slimeLinesData[i];

      const s = data.s.v.clone().add(new Victor(0, r / 2).rotateByDeg(data.s.angleDeg))
      const c = data.c.v.clone().add(new Victor(0, r / 2).rotateByDeg(data.c.angleDeg))
      const e = data.e.v.clone().add(new Victor(0, r / 2).rotateByDeg(data.e.angleDeg))

      renderSinglePoint(s.x - 2, s.y - 2, r, "rgba(255, 0, 0, 0.5)")
      renderSinglePoint(c.x - 2, c.y - 2, r, "#7CFC00")
      renderSinglePoint(e.x - 2, e.y - 2, r, "#4169E1")
    }
  }

  debug_renderControlPositionPoint() {
    this.ctx.beginPath();

    this.ctx.arc(this.centerPositionVector.x - 5, this.centerPositionVector.y - 5, 10, 0, Math.PI * 2);

    this.ctx.fillStyle = '#FF0000';
    this.ctx.fill();

    this.ctx.closePath();
  }

  renderLines() {
    this.ctx.beginPath();

    const firstLineData = this.slimeLinesData[0];

    this.ctx.moveTo(firstLineData.s.v.x, firstLineData.s.v.y);

    for (let i = 0; i < this.slimeLinesData.length; i ++ ) {
      const currentLineData = this.slimeLinesData[i];

      this.ctx.quadraticCurveTo(currentLineData.c.v.x, currentLineData.c.v.y, currentLineData.e.v.x, currentLineData.e.v.y);
    }

    this.ctx.strokeStyle = "#d90fbe";
    this.ctx.stroke();

    this.ctx.closePath();
  }

  render() {
    this.renderLines();

    this.debug_renderSlimeLinesPoints();
    this.debug_renderControlPositionPoint();
  }
}