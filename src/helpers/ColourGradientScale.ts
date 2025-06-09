import { HA_COLOURS } from "../const";
import { isNumber } from "./utilities";

type gradDef = Record<string, string> | string;

export interface scaleDef {
  gradStart: number;
  gradEnd: number;
  minValue: number;
  maxValue: number;
}

interface GradEntry {
  value: number;
  colour: string;
}

export class ColourGradientScale {
  // internal grad scale representation
  // array of { value, colour }
  #grad: GradEntry[] = [];
  // scaling end points for raw values
  #minValue: number = 0; //minValue;
  #maxValue: number = 100; //maxValue;
  // scale the grad to constrained endpoints if required
  #gradStart: number = 0;
  #gradEnd: number = 100;
  #isSingleColour = false;

  constructor(gradDef: gradDef, scaleDef: scaleDef = {
    "gradStart": 0,
    "gradEnd": 100,
    "minValue": 0,
    "maxValue": 100,
  }) {
    if (typeof gradDef === "object" && !Array.isArray(gradDef)) {
      // gradDef is a dictionary, so build the grad array
      // Store the scale definitions
      this.#gradStart = scaleDef.gradStart || 0;
      this.#gradEnd = scaleDef.gradEnd || 100;
      this.#minValue = scaleDef.minValue || 0;
      this.#maxValue = scaleDef.maxValue || 100;

      // Map and store the grad
      for (const [val, col] of Object.entries(gradDef)) {
        // convert % entries to raw values if needed
        const rawValue = val.endsWith("%")
          ? this.#minValue +
          (parseFloat(val) / 100.0) * (this.#maxValue - this.#minValue)
          : parseFloat(val);
        // apply HA colours if supplied
        const colour = HA_COLOURS[col] || col;
        // scale and add to the grad array
        this.#grad.push({
          value: this.#scaleToGrad(rawValue),
          colour: colour,
        });
      }
      // Sort the grad in case the definition was out of order
      this.#grad.sort((a, b) => a.value - b.value);
      // Extend the grad to 0% and 100% by repeating end point colours if needed
      if (this.#grad[0].value > 0) {
        this.#grad.unshift({ value: 0, colour: this.#grad[0].colour });
      }
      const lastGrad = this.#grad.at(-1);
      if (lastGrad && lastGrad.value < 100) {
        this.#grad.push({ value: 100, colour: lastGrad.colour });
      }
    } else {
      // gradDef is a block colour, so treat as such
      this.#isSingleColour = true;

      if (typeof gradDef === "string") {
        const colour = HA_COLOURS[gradDef] || gradDef;
        this.#grad = [
          { value: 0, colour },
          { value: 100, colour }
        ];
      } else {
        throw new Error("Invalid gradDef: expected string for single-colour mode.");
      }
    }
  }

  #scaleToGrad(rawValue: number) {
    // convert the rawValue to % on the grad, constrained to the operating
    // of the grad

    return (
      this.#gradStart +
      ((rawValue - this.#minValue) /
        (this.#maxValue - this.#minValue)) *
      (this.#gradEnd - this.#gradStart)
    );
  }

  public getConicGradientCss(opacity = 1) {
    // if we've just got a single colour, just return it
    if (this.#isSingleColour) {
      return `background: color-mix(in srgb, ${this.#grad[0].colour
      } var(--rt-ring-background-opacity, ${100.0 * opacity}%), transparent);`;

    }
    // build the gradient
    const gradCSS = this.#grad.map((grad) => {
      return `color-mix(in srgb, ${grad.colour} var(--rt-ring-background-opacity, ${100.0 * opacity
        }%), transparent) ${grad.value}%`;
    });
    // return the full CSS
    return `background-image: conic-gradient(
        from 180deg,
        ${gradCSS.join(", ")}
      );
    `;
  }

  public getSolidColourAtGradPct(gradPct: number): string {
    // convert the angle to a value on the grad
    const rawValue: number =
      this.#minValue +
      ((gradPct - this.#gradStart) / (this.#gradEnd - this.#gradStart)) *
      (this.#maxValue - this.#minValue);
    // get the colour at that value
    return this.getSolidColour(rawValue);
  }

  public getSolidColour(rawValue: number = 0): string {
    if (Number.isNaN(rawValue)) rawValue = 0; // just in case
    // is it a single colour?
    if (this.#isSingleColour) {
      return this.#grad[0].colour;
    }
    // are we out of range?
    const endGrad = this.#grad.at(-1);
    if (!endGrad) {
      throw new Error("No gradient defined");
    }

    if (this.#scaleToGrad(rawValue) < this.#grad[0].value) {
      return this.#grad[0].colour;
    }
    if (this.#scaleToGrad(rawValue) > endGrad.value) {
      return endGrad.colour;
    }

    // mix a colour from the grad at rawValue
    const gradValue = this.#scaleToGrad(rawValue);
    // is it a direct match?
    const entry = this.#grad.find((g) => g.value === gradValue);
    if (entry) {
      return entry.colour;
    }
    let lowEntry = undefined;
    for (let i = this.#grad.length - 1; i >= 0; i--) { // could use findLast in newer versions instead
      if (this.#grad[i].value < gradValue) {
        lowEntry = this.#grad[i];
        break;
      }
    }
    const highEntry = this.#grad.find((g) => g.value > gradValue)
    if (!lowEntry || !highEntry) {
      throw new Error(`No low entry found for grad value ${gradValue}`);
    }
    // are the two entries the same?
    if (lowEntry.colour === highEntry.colour) {
      return lowEntry.colour;
    }
    // ok, mix a colour
    const ratio =
      (100.0 * (gradValue - lowEntry.value)) /
      (highEntry.value - lowEntry.value);
    return `color-mix(in srgb,
        ${lowEntry.colour} ${100 - ratio}%,
        ${highEntry.colour} ${ratio}%
      )
    `;
  }
}
