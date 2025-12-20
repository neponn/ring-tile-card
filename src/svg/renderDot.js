import { svg } from "lit";
import { MID_BOX, RT, VIEW_BOX } from "../const";
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

    return {
      object: svg`
        <g class="indicator">
          <circle 
            class="dot"
            cx=${dotCoord[0]} cy=${dotCoord[1]} 
            r=${dotRadius - dotOutline / 2}
            fill=${this._grad.getSolidColour(rawValue)}
            transform="rotate(${
              this.ring_type === RT.CLOSED ? 180 : 0
            } ${MID_BOX} ${MID_BOX})"
          />
        </g>`,
      mask: svg`
        <circle 
          cx=${dotCoord[0]} cy=${dotCoord[1]} 
          r=${dotRadius + dotOutline / 2}
          transform="rotate(${
            this.ring_type === RT.CLOSED ? 180 : 0
          } ${MID_BOX} ${MID_BOX})"
        />      
      `,
    };
  };
}
