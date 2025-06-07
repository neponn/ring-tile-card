import { svg } from "lit";
import { IND, MID_BOX, RT, VIEW_BOX } from "../const";
import { clamp, deg2rad, getCoordFromDegrees } from "../helpers/utilities";

export function extendWithRenderMarker(RtRingSvg) {
  RtRingSvg.prototype.renderMarker = function (markerValue, markerColour) {
    const width = this._ringWidth;

    let degrees;
    let markerWidth;
    let strokeWidth;
    let className = "marker";

    if (this.ring_type.startsWith(RT.COMPASS)) {
      degrees = parseFloat(markerValue);
      markerWidth = 2.3 * width;
      strokeWidth = 0; // width / 8;
      degrees = (degrees + 180) % 360;
      className = "marker compass";
    } else {
      const clampedMarkerState = clamp(markerValue, this.min, this.max);
      degrees =
        this._startDegrees +
        ((this._endDegrees - this._startDegrees) *
          (clampedMarkerState - this.min)) /
          (this.max - this.min);
      markerWidth = (this.indicator === IND.DOT ? 1.2 : 1.5) * width;
      strokeWidth =
        this.indicator === IND.DOT
          ? 0
          : this.ring_size <= 2
          ? width / 5
          : width / 8;

      if (this.ring_type === RT.CLOSED) {
        degrees = (degrees + 180) % 360;
      }
    }

    // TODO: Add support for this.outerRadius
    if (this.indicator !== IND.POINTER) {
      const commands = [];
      if (this.indicator === IND.DOT) {
        commands.push(`M ${MID_BOX} ${VIEW_BOX - width + strokeWidth}`);
      } else {
        commands.push(`M ${MID_BOX} ${VIEW_BOX - width / 3}`);
      }
      commands.push(
        `l ${markerWidth / 2} -${markerWidth * Math.sin(deg2rad(60))}`
      );
      if (this.ring_type.startsWith(RT.COMPASS)) {
        commands.push(`l -${markerWidth / 2} ${markerWidth / 6}`);
        commands.push(`l -${markerWidth / 2} -${markerWidth / 6}`);
      } else {
        commands.push(`h -${markerWidth}`);
      }
      commands.push(`Z`);
      const triangle = commands.join(" ");

      const pointIn = this.ring_type.startsWith(RT.COMPASS) ? 180 : 0;

      return svg`
        <g class=${className} transform="rotate(${degrees} ${MID_BOX} ${MID_BOX})">
          <path
            d=${triangle}
            fill=${markerColour}
            stroke="var(--card-background-color, white)"
            stroke-linejoin="bevel"
            stroke-width=${strokeWidth}
            transform="rotate(${pointIn} ${MID_BOX} ${
        VIEW_BOX - markerWidth / 2
      })"
          />
        </g>`;
    } else {
      const p1 = [MID_BOX, MID_BOX];
      const p2 = getCoordFromDegrees(degrees, MID_BOX - width * 0.75, VIEW_BOX);
      const strokeWidth = [2, 1.6, 1.4, 1.3, 1.2, 1.1][this.ring_size - 1];
      return svg`
          <g class=${className}>
            <line
              x1=${p1[0]} y1=${p1[1]}
              x2=${p2[0]} y2=${p2[1]}
              stroke=${markerColour}
              stroke-linecap="round"
              stroke-width=${strokeWidth}
            />
          </g>
        `;
    }
  };
}
