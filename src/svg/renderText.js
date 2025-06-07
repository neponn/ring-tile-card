import { svg, nothing } from "lit";
import { clamp, isNumber } from "../helpers/utilities";
import { MID_BOX, POS, RT, SCALE } from "../const";

// export function renderText(cfg, value, unit, position) {
export function extendWithRenderText(RtRingSvg) {
  RtRingSvg.prototype.renderText = function (value, unit, position) {
    function scaleFontSize(
      unit = "",
      unitScale = 1.0,
      maxLengthForScaling = 6
    ) {
      const valueLength =
        value.length -
        (value.includes(".") ? 0.7 : 0) -
        (value.includes("°") ? 0.5 : 0);
      const unitLength = unit.length * unitScale;

      const scale =
        1 -
        0.16 * clamp(valueLength + unitLength - 2, 0, maxLengthForScaling - 2);
      return scale;
    }

    function renderValueUnitElement(
      valueSize,
      unitSize,
      xShift,
      yShift,
      className
    ) {
      return svg`
        <text class=${className}
          x=${MID_BOX + xShift} y="${MID_BOX + yShift + valueSize / 3.5}" 
          text-anchor="middle" alignment-baseline="alphabetic" 
          font-size=${valueSize}
          >${value}<tspan
            alignment-baseline="alphabetic"
            font-size=${unitSize}
          >${unit || nothing}</tspan>
        </text>
      `;
    }

    function renderTextElement(
      text,
      textSize,
      xShift,
      yShift,
      className,
      textAnchor = "middle"
    ) {
      return svg`
        <text class=${className}
          x=${MID_BOX + xShift} y="${MID_BOX + yShift + textSize / 3.5}" 
          text-anchor=${textAnchor} alignment-baseline="alphabetic" 
          font-size=${textSize}
        >${text}</text>
      `;
    }

    // if value is a number, convert to text and set
    // the correct number of decimal places
    if (isNumber(value) && ![POS.MIN, POS.MAX].includes(position)) {
      // let decimals;
      // if (parseInt(value) === 0) {
      //   decimals = this.min_sig_figs - 1;
      // } else {
      let decimals = Math.max(
        Math.floor(this.min_sig_figs - Math.log10(Math.abs(value))),
        0
      );

      // clamp decimals if needed
      if (decimals > (this.max_decimals ?? 99)) {
        decimals = this.max_decimals;
      }

      // Format
      value = parseFloat(value).toFixed(decimals);
      // Convert 0.0 to 0 if needed
      if (parseFloat(value) === 0) {
        value = "0";
      }
    }

    // adjust unit if required
    if (unit) {
      if (this.ring_size === 1) {
        if (unit.startsWith("°")) {
          value = `${value}°`;
          unit = "";
        } else {
          unit = unit.slice(0, 1);
        }
      } else if (unit !== "%") {
        unit = ` ${unit}`;
      }
    }

    const middleFontScale = [1, 0.8, 0.75, 0.72, 0.71, 0.7][this.ring_size - 1];
    const bottomFontSize = [20, 15, 11, 10, 9, 7.5][this.ring_size - 1];
    switch (position) {
      case POS.TOP: {
        const yShift = this.scale === SCALE.TICKS_LABELS ? -22 : -25;
        return renderValueUnitElement(12, 12, 0, yShift, "top marker");
      }

      case POS.MIDDLE: {
        if (this.ring_size === 1 || ["%", ""].includes(unit)) {
          // Single line: small ring, or small unit
          const unitScale = 0.8;
          const fontSize =
            42 * scaleFontSize(unit, unitScale) * middleFontScale;
          const unitSize = fontSize * 0.8;

          const className = `middle ${this.ring_size === 1 ? "tight" : ""}`;
          return renderValueUnitElement(fontSize, unitSize, 0, 0, className);
        } else {
          // Place the unit on a second line
          const fontSize = 38 * scaleFontSize() * middleFontScale;
          const unitSize = 15 * middleFontScale;
          const unitShift = 22 - (this.ring_size === 2 ? 2 : 0);

          return svg`
            ${renderTextElement(value, fontSize, 0, 0, "middle")}
            ${renderTextElement(unit, unitSize, 0, unitShift, "middle unit")}
          `;
        }
      }

      case POS.BELOW_DIAL: {
        // Dial case: position below the centre point
        const unitScale = 0.8;
        const fontSize =
          20 * scaleFontSize(unit, unitScale, 4) * middleFontScale;
        const unitSize = fontSize * 0.8;
        const className = "lower-middle";

        // render the SVG
        return renderValueUnitElement(fontSize, unitSize, 0, 18, className);
      }

      case POS.BOTTOM: {
        let yShift = 41;
        let className = "bottom";
        if (this.ring_type === RT.CLOSED) {
          yShift -= 15;
          className += " closed";
        }
        return renderValueUnitElement(
          bottomFontSize,
          bottomFontSize,
          0,
          yShift,
          className
        );
      }

      case POS.MIN: {
        const xShift = -32 + [0, 6, 6, 4, 3.8, 3.2][this.ring_size - 1];
        const yShift = 41 - (this.ring_type === RT.CLOSED ? 10 : 0);
        return renderTextElement(
          value,
          bottomFontSize,
          xShift,
          yShift,
          "bottom",
          "start"
        );
      }

      case POS.MAX: {
        const xShift = 32 - [0, 6, 6, 4, 3.8, 3.2][this.ring_size - 1];
        const yShift = 41 - (this.ring_type === RT.CLOSED ? 10 : 0);
        return renderTextElement(
          value,
          bottomFontSize,
          xShift,
          yShift,
          "bottom",
          "end"
        );
      }
    }
  };
}
