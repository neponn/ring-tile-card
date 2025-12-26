import { svg } from "lit";
import { MID_BOX, RT, TRANSITION, VIEW_BOX } from "../const";

export function extendWithRenderPointer(RtRingSvg) {
  RtRingSvg.prototype.renderPointer = function (degrees) {
    degrees = this.ring_type.startsWith(RT.COMPASS)
      ? (degrees + 180) % 360
      : degrees;
    const tail = [MID_BOX, MID_BOX - (0.15 * VIEW_BOX) / 2];
    const point = [
      MID_BOX,
      MID_BOX + this._outerRadius - this._ringWidth / 2,
    ];
    return {
      object: svg`
        <g class="indicator" 
          style="transform: rotate(${degrees}deg); 
            transform-origin: ${MID_BOX}px ${MID_BOX}px; 
            transition: transform ${TRANSITION};"
        >
          <line class="pointer"
            x1=${tail[0]} y1=${tail[1]}
            x2=${point[0]}   y2=${point[1]}
            stroke-width=${[5, 3, 2.5, 2.5, 2.3, 2.0][this.ring_size - 1]}
            stroke-linecap="round"
          />
          <circle class="pointer"
            cx=${MID_BOX} cy=${MID_BOX}
            r=${[7, 5, 3.5, 3.5, 3.3, 2.9][this.ring_size - 1]}
          />
          <circle class="pointer-centre"
            cx=${MID_BOX} cy=${MID_BOX}
            r=${[3, 2.5, 1.8, 1.8, 1.6, 1.4][this.ring_size - 1]}
        </g>
      `,
    };
  };
}
