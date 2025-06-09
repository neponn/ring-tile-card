import { svg, nothing } from "lit";
import { RT, VIEW_BOX } from "../const";
import { degreesToCompass, getCoordFromDegrees } from "../helpers/utilities";
import { RtRingSvg } from "../rt-ring-svg";

export function extendWithRenderCompass(RtRingSvg: RtRingSvg) {
  RtRingSvg.prototype.renderCompass = function () {
    const width = this._ringWidth * 0.7;

    const cardinals = [];
    const cardinalNames = [];
    const major = [];
    const minor = [];
    for (let deg = 0; deg < 360; deg += 360 / 64) {
      const degFlipped = (deg + 180) % 360;
      if (deg % 90 === 0) {
        if (
          this.ring_type === RT.COMPASS_NESW ||
          (this.ring_type === RT.COMPASS_N && degFlipped === 0)
        ) {
          const coord = getCoordFromDegrees(
            deg,
            this._outerRadius - (1.2 * width) / 2,
            VIEW_BOX
          );
          cardinalNames.push(
            svg`<text
                  class="compass cardinal"
                  x=${coord[0]}
                  y=${coord[1]}
                  text-anchor="middle"
                  alignment-baseline="central"
                  font-size=${2 * width}
                  fill="var(--primary-text-color, #212121)"
                >${degreesToCompass(degFlipped)}</text>`
          );
        } else {
          cardinals.push(
            `M ${getCoordFromDegrees(deg, this._outerRadius, VIEW_BOX)}`
          );
          cardinals.push(
            `L ${getCoordFromDegrees(
              deg,
              this._outerRadius - 1.7 * width,
              VIEW_BOX
            )}`
          );
        }
      } else if (deg % 22.5 === 0) {
        major.push(`M ${getCoordFromDegrees(deg, this._outerRadius, VIEW_BOX)}`);
        major.push(
          `L ${getCoordFromDegrees(
            deg,
            this._outerRadius - 1.2 * width,
            VIEW_BOX
          )}`
        );
      } else {
        minor.push(`M ${getCoordFromDegrees(deg, this._outerRadius, VIEW_BOX)}`);
        minor.push(
          `L ${getCoordFromDegrees(deg, this._outerRadius - width, VIEW_BOX)}`
        );
      }
    }
    const cardinalNamesSvg = cardinalNames ? svg`${cardinalNames}` : nothing;

    const cardinalSvg = cardinals
      ? svg`
            <path
              class="compass cardinals"
              d=${cardinals.join(" ")}
              stroke-width=2
              fill="none"
              stroke="var(--primary-text-color, #212121)"
              stroke-linecap="round"
            />`
      : nothing;

    const compassSvg = svg`
        ${cardinalNamesSvg}
        ${cardinalSvg}
        <path
          class="compass major"
          d=${major.join(" ")}
          stroke-width=1.4
          fill="none"
          stroke="var(--primary-text-color, #212121)"
          stroke-linecap="round"
          stroke-opacity=0.7
        />
        <path
          class="compass minor"
          d=${minor.join(" ")}
          stroke-width=0.8
          fill="none"
          stroke="var(--primary-text-color, #212121)"
          stroke-linecap="round"
          stroke-opacity=0.3
        />`;
    return compassSvg;
  };
}
