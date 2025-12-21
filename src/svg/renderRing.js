import { svg } from "lit";
import { MID_BOX, RT, VIEW_BOX } from "../const";
import { getRingPath } from "./getRingPath";

export function extendWithRenderRings(RtRingSvg) {
  RtRingSvg.prototype.renderGradRing = function (
    startAngle,
    endAngle,
    opacity,
    cutOuts = []
  ) {
    const width = this._ringWidth;
    const segment = getRingPath(startAngle, endAngle, this._outerRadius, width);

    const ringGradient = this._grad.getConicGradientCss(opacity);

    const id = opacity.toString().replace(".", "");
    return {
      object: svg`
        <g class="ring-grad">
          <clipPath id="ring-clip-${id}">
            <path
              d=${segment}
            />
          </clipPath>
          <mask id="cut-outs-ring-grad">
            <rect width=${VIEW_BOX} height=${VIEW_BOX} fill="white" />
            <g fill="black" stroke="black" stroke-width="0">
              ${cutOuts}
            </g>
          </mask>
          <foreignObject
            x="0" y="0"
            width=${VIEW_BOX} height=${VIEW_BOX}
            clip-path="url(#ring-clip-${id})"
            mask="url(#cut-outs-ring-grad)"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style="width: ${VIEW_BOX}px; height: ${VIEW_BOX}px; ${ringGradient};";
            />
          </foreignObject>
        </g>
      `,
    };
  };

  RtRingSvg.prototype.renderSolidRing = function (
    startAngle,
    endAngle,
    rawValue,
    cutOuts = []
  ) {
    const width = this._ringWidth;
    const segment = getRingPath(startAngle, endAngle, this._outerRadius, width);

    return {
      object: svg`
        <g class="ring-solid">
          <mask id="cut-outs-ring-solid">
            <rect width=${VIEW_BOX} height=${VIEW_BOX} fill="white" />
            <g fill="black" stroke="black" stroke-width="0">
              ${cutOuts}
            </g>
          </mask>
          <path 
            mask="url(#cut-outs-ring-solid)"
            d=${segment}
            fill=${this._grad.getSolidColour(rawValue)}
            stroke-width="0"
            fill-opacity="1"
          />
        </g>`,
    };
  };
}
