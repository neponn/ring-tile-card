import { svg } from "lit";
import { MID_BOX, RT, VIEW_BOX } from "../const";
import { getRingPath } from "./getRingPath";
import { getCoordFromDegrees } from "../helpers/utilities";
import { RtRingSvg } from "../rt-ring-svg";

export function extendWithRenderDot(RtRingSvg: RtRingSvg) {
  RtRingSvg.prototype.renderDot = function (degrees: number, rawValue: number) {
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

    return svg`
            <g class="indicator">
              <clipPath id="ring-clip">
                <path d=${ringClipSegment}
                />
              </clipPath>
              <circle 
                class="dot-outline"
                cx=${dotCoord[0]} cy=${dotCoord[1]} 
                r=${dotRadius + dotOutline / 2}
                clip-path="url(#ring-clip)"
                fill="var(--card-background-color, white)"
                transform="rotate(${
                  this.ring_type === RT.CLOSED ? 180 : 0
                } ${MID_BOX} ${MID_BOX})"
              />
              <circle 
                class="dot"
                cx=${dotCoord[0]} cy=${dotCoord[1]} 
                r=${dotRadius - dotOutline / 2}
                fill=${this._grad.getSolidColour(rawValue)}
                transform="rotate(${
                  this.ring_type === RT.CLOSED ? 180 : 0
                } ${MID_BOX} ${MID_BOX})"
              />
            </g>`;
  };
}
