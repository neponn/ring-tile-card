import { svg } from "lit";
import { VIEW_BOX } from "../const";
import { getRingPath } from "./getRingPath";
import { getCoordFromDegrees } from "../helpers/utilities";

export function extendWithRenderDot(RtRingSvg) {
  RtRingSvg.prototype.renderDot = function (degrees, rawValue) {
    const width = this._ringWidth;
    const radius = this._outerRadius - width / 2;
    const dotCoord = getCoordFromDegrees(degrees, radius, VIEW_BOX);
    const dotOutline =
      width * [0.55, 0.4, 0.35, 0.35, 0.35, 0.35][this.ring_size - 1];
    const dotRadius = width / 2 + dotOutline * 0.7;

    const ringClipSegment = getRingPath(
      degrees - 10,
      degrees + 10,
      this._outerRadius + width * 0.05,
      width * 1.1
    );

    return {
      object: svg`
        <g class="indicator">
          <circle 
            class="dot"
            cx=${dotCoord[0]} cy=${dotCoord[1]} 
            r=${dotRadius - dotOutline / 2}
            fill=${this._grad.getSolidColour(rawValue)}
          />
        </g>`,
      mask: svg`
        <clipPath id="dot-clip">
          <path d=${ringClipSegment}
          />
        </clipPath>
        <circle 
          cx=${dotCoord[0]} cy=${dotCoord[1]} 
          r=${dotRadius + dotOutline / 2}
          clip-path="url(#dot-clip)"
        />      
      `,
    };
  };
}
