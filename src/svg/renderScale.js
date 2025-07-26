import { svg, nothing } from "lit";
import { BE, IND, RT, SCALE, VIEW_BOX } from "../const";
import { countDecimals, getCoordFromDegrees } from "../helpers/utilities";

// Helper function to calculate a "nice" step size
function calcNiceNum(range, round) {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction;

  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1;
    } else if (fraction < 3) {
      niceFraction = 2;
    } else if (fraction < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  } else {
    if (fraction <= 1) {
      niceFraction = 1;
    } else if (fraction <= 2) {
      niceFraction = 2;
    } else if (fraction <= 5) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  }

  return niceFraction * Math.pow(10, exponent);
}

function calcSubdivisions(bigStep) {
  const oom = Math.pow(10, Math.floor(Math.log10(bigStep)));
  const stepFraction = bigStep / oom;

  if (stepFraction === 5) {
    return [bigStep / 5, bigStep / 10];
  } else {
    return [bigStep / 2, bigStep / 10];
  }
}

export function extendWithRenderScale(RtRingSvg) {
  RtRingSvg.prototype.renderScale = function (dialOpacity = 1) {
    const width = this._ringWidth;
    const targetGrandTicks = this.ring_size === 1 ? 3 : 5;
    const maxTotalTicks = [80, 80, 110, 110, 110, 110][this.ring_size - 1];

    const start = this.min;
    const end = this.max;
    const range = end - start;

    const niceRange = calcNiceNum(range, false);
    const grandStep = calcNiceNum(niceRange / (targetGrandTicks - 1), true);
    const [majorStep, minorStep] = calcSubdivisions(grandStep);

    const produceMinorSteps = Math.round(range / minorStep) < maxTotalTicks;

    // Generate Grand ticks
    const grand = [];
    for (
      let value = Math.ceil(start / grandStep) * grandStep;
      value <= end;
      value += grandStep
    ) {
      grand.push(value);
    }

    // Generate Major ticks
    const major = [];
    for (
      let value = Math.ceil(start / majorStep) * majorStep;
      value <= end;
      value += majorStep
    ) {
      // Avoid duplicating Grand ticks
      if (!grand.includes(value)) {
        major.push(value);
      }
    }

    // Generate Minor ticks
    const minor = [];
    if (produceMinorSteps) {
      for (
        let value = Math.ceil(start / minorStep) * minorStep;
        value <= end;
        value += minorStep
      ) {
        // Avoid duplicating Major or Grand ticks
        if (!grand.includes(value) && !major.includes(value)) {
          minor.push(value);
        }
      }
    }

    // Map a value to its corresponding angle in the range [this._startDegrees, this._endDegrees]
    const mapValueToDegrees = (value) =>
      this._startDegrees +
      ((this._endDegrees - this._startDegrees) * (value - start)) / range;

    const tickStrokeScale = [1, 1, 1, 0.9, 0.8, 0.7][this.ring_size - 1];

    const renderTick = (value, depth) => {
      const degrees =
        (mapValueToDegrees(value) + (this.ring_type === RT.CLOSED ? 180 : 0)) %
        360;
      const p1 = getCoordFromDegrees(degrees, this._outerRadius, VIEW_BOX);
      const p2 = getCoordFromDegrees(
        degrees,
        this._outerRadius - depth * width,
        VIEW_BOX
      );

      return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`;
    };

    const renderLabel = (value) => {
      // Avoid duplicate labels for min/max
      if (this.bottom_element === BE.MIN_MAX) {
        if (value === this.min || value === this.max) {
          return nothing;
        }
      }

      let labelRadius =
        this._outerRadius *
        [0.45, 0.65, 0.7, 0.73, 0.75, 0.77][this.ring_size - 1];

      if (this._hasMarker && this.indicator === IND.DOT) {
        labelRadius *= 0.96;
      }
      if (Math.log10(this.max) > 3) {
        labelRadius *= 0.93;
      }

      const degrees =
        (mapValueToDegrees(value) + (this.ring_type === RT.CLOSED ? 180 : 0)) %
        360;
      const p3 = getCoordFromDegrees(degrees, labelRadius, VIEW_BOX);

      const fontSize = this.ring_size === 1 ? width * 2.5 : width * 1.15;

      return svg`
          <text
            x=${p3[0]} y=${p3[1]}
            text-anchor="middle"
            alignment-baseline="central"
            font-size=${fontSize}
          >${value}</text>
        `;
    };

    // Render the ticks as SVG lines
    const grandSvg = svg`
      <path
        class="grand"
        d=${grand.map((value) => renderTick(value, 1.35)).join(" ")}
        stroke-width=${1.8 * tickStrokeScale}
        stroke-opacity=${dialOpacity}
      />`;

    const majorSvg = svg`
      <path
        class="major"
        d=${major.map((value) => renderTick(value, 1.2)).join(" ")}
        stroke-width=${1.2 * tickStrokeScale}
        stroke-opacity=${0.7 * dialOpacity}
      />`;

    const minorSvg = svg`
      <path
        class="minor"
        d=${minor.map((value) => renderTick(value, 1)).join(" ")}
        stroke-width=${0.6 * tickStrokeScale}
        stroke-opacity=${0.3 * dialOpacity}
      />`;

    // Render labels, if required
    let svgLabels = nothing;
    if (this.scale === SCALE.TICKS_LABELS) {
      let labels = [...grand];
      if (this.ring_size > 3 && grandStep / majorStep !== 5) {
        // add major labels
        labels = [...labels, ...major];
      }
      // figure out decimal places needed
      const places = labels.reduce(
        (max, value) => Math.max(max, countDecimals(value, this.max_decimals)),
        0
      );
      labels = labels.map((v) => v.toFixed(places));

      svgLabels = labels.map(renderLabel);
    }

    // Combine all SVG elements
    return svg`
        <g class="scale">
          <g class="ticks">
            ${grandSvg}
            ${majorSvg}
            ${minorSvg}
          </g>
          <g class="labels">
            ${svgLabels} 
          </g> 
        </g>
      `;
  };
}
