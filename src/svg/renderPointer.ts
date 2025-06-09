import { svg } from "lit";
import { MID_BOX, RT, VIEW_BOX } from "../const";
import { getCoordFromDegrees } from "../helpers/utilities";
import { RtRing } from "../rt-ring";
import { RtRingSvg } from "../rt-ring-svg";

export function extendWithRenderPointer(RtRingSvg: RtRingSvg) {
  RtRingSvg.prototype.renderPointer = function (degrees: number) {
    const colour = "color-mix(in srgb, orange 80%, var(--primary-text-color))";
    const startPoint = getCoordFromDegrees(
      this.ring_type === RT.CLOSED ? degrees : (degrees + 180) % 360,
      (0.15 * VIEW_BOX) / 2,
      VIEW_BOX
    );
    const endPoint = getCoordFromDegrees(
      this.ring_type !== RT.CLOSED ? degrees : (degrees + 180) % 360,
      this._outerRadius - this._ringWidth / 2,
      VIEW_BOX
    );
    return svg`
        <g class="indicator">
          <line class="pointer"
            x1=${startPoint[0]} y1=${startPoint[1]}
            x2=${endPoint[0]}   y2=${endPoint[1]}
            stroke=${colour}
            stroke-width=${[5, 3, 2.5, 2.5, 2.3, 2.0][this.ring_size - 1]}
            stroke-linecap="round"
          />
          <circle class="pointer"
            cx=${MID_BOX} cy=${MID_BOX}
            r=${[7, 5, 3.5, 3.5, 3.3, 2.9][this.ring_size - 1]}
            fill=${colour}
          />
          <circle class="pointer-centre"
            cx=${MID_BOX} cy=${MID_BOX}
            r=${[3, 2.5, 1.8, 1.8, 1.6, 1.4][this.ring_size - 1]}
            fill="#444444"
        </g>
      `;
  };
}