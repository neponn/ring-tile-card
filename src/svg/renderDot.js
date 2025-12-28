import { svg } from "lit";
import { MID_BOX, TRANSITION, VIEW_BOX } from "../const";
import { getRingPath } from "./getRingPath";
import { getCoordFromDegrees } from "../helpers/utilities";

export function extendWithRenderDot(RtRingSvg) {
  RtRingSvg.prototype.renderDot = function (degrees, rawValue) {
    const width = this._ringWidth;
    const radius = this._outerRadius - width / 2;
    const dotCoord = getCoordFromDegrees(0, radius, VIEW_BOX);
    const dotOutline =
      width * [0.55, 0.4, 0.35, 0.35, 0.35, 0.35][this.ring_size - 1];
    const dotRadius = width / 2 + dotOutline * 0.7;

    const ringClipSegment = getRingPath(
      -10,
      10,
      this._outerRadius + width * 0.05,
      width * 1.1
    );

    return {
      object: svg`
        <g class="indicator"
          style="transform: rotate(${degrees}deg); 
            transform-origin: ${MID_BOX}px ${MID_BOX}px;"
        >
          <circle 
            class="dot"
            cx=${dotCoord[0]} cy=${dotCoord[1]} 
            r=${dotRadius - dotOutline / 2}
            style="fill: ${this._grad.getSolidColour(rawValue)};"
          />
        </g>`,
      mask: svg`
        <g class="indicator"
          style="transform: rotate(${degrees}deg); 
            transform-origin: ${MID_BOX}px ${MID_BOX}px;"
        >
          <clipPath id="dot-clip">
            <path d=${ringClipSegment}/>
          </clipPath>
          <circle
            class="dot"
            cx=${dotCoord[0]} cy=${dotCoord[1]} 
            r=${dotRadius + dotOutline / 2}
            clip-path="url(#dot-clip)"
          />
        </g>
      `,
    };
  };
}
