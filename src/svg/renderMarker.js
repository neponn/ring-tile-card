import { svg } from "lit";
import { CM, IND, MID_BOX, RT, TRANSITION, VIEW_BOX } from "../const";
import { clamp, deg2rad, getCoordFromDegrees } from "../helpers/utilities";

export function extendWithRenderMarker(RtRingSvg) {
  RtRingSvg.prototype.renderMarker = function (
    markerValue,
    markerColour,
    compassMarker,
    markerId
  ) {
    // Initialize previous degrees tracking
    this._previousMarkerDegrees = this._previousMarkerDegrees || {};

    const width = this._ringWidth;

    // set up config
    let degrees;
    let markerWidth;
    let strokeWidth;
    let className = "marker";
    let turns;

    if (this.ring_type.startsWith(RT.COMPASS)) {
      // set up config for compass markers
      degrees = parseFloat(markerValue);
      degrees = degrees + 180;
      className = "marker compass";
      turns = degrees / 360;

      // Adjust degrees for shortest path animation using turns
      const key = `compass_${markerId}`;
      const prevTurns = this._previousMarkerDegrees[key];
      if (prevTurns !== undefined) {
        let delta = turns - prevTurns;
        if (Math.abs(delta) > 0.5) {
          turns += delta > 0 ? -1 : 1;
        }
      }
      this._previousMarkerDegrees[key] = turns;

      if (compassMarker === CM.DOT) {
        markerWidth = width * 1.5;
        strokeWidth = width / 5;
      } else {
        markerWidth = 2.3 * width;
        strokeWidth = 0;
      }
    } else {
      // set up config for normal markers
      const clampedMarkerState = clamp(markerValue, this.min, this.max);
      degrees =
        this._startDegrees +
        ((this._endDegrees - this._startDegrees) *
          (clampedMarkerState - this.min)) /
          (this.max - this.min);
      turns = degrees / 360;
      markerWidth = (this.indicator === IND.DOT ? 1.2 : 1.5) * width;
      strokeWidth =
        this.indicator === IND.DOT
          ? 0
          : this.ring_size <= 2
          ? width / 2.5
          : width / 4;
    }

    // TODO: Add support for this.outerRadius
    if (this.indicator !== IND.POINTER) {
      if (compassMarker === CM.DOT) {
        // dot compass marker
        return svg`
          <g class=${className} 
            style="transform: rotate(${turns}turn); 
              transform-origin: ${MID_BOX}px ${MID_BOX}px; 
              transition: transform ${TRANSITION};"
          >
            <circle
              cx=${MID_BOX}
              cy=${VIEW_BOX - (width * 0.7) / 2}
              r=${markerWidth / 2}
              fill=${markerColour}
              stroke="var(--card-background-color, white)"
              stroke-width=${strokeWidth}
            />
          </g>`;
      }

      // render normal markers
      const commands = [];
      // start with the tip of the triangle at the very bottom of the ring
      if (this.indicator === IND.DOT) {
        // for dot, start the tip at the inside edge of the ring
        commands.push(`M ${MID_BOX} ${VIEW_BOX - width + strokeWidth}`);
      } else if (this.ring_type.startsWith(RT.COMPASS)) {
        // for compass, start the tip beyond the outside edge of the ring
        commands.push(`M ${MID_BOX} ${VIEW_BOX + width / 3 + strokeWidth}`);
      } else {
        // otherwise, start the tip overlapped with the ring
        commands.push(`M ${MID_BOX} ${VIEW_BOX - width / 1.7}`);
      }
      // now plot up and to the right to draw the first side of the triangle
      commands.push(
        `l ${markerWidth / 2} -${markerWidth * Math.sin(deg2rad(60))}`
      );
      // now plot across to the left to draw the base of the triangle
      if (this.ring_type.startsWith(RT.COMPASS)) {
        // base of triangle gets kicked in to make an arrow for compass
        commands.push(`l -${markerWidth / 2} ${markerWidth / 6}`);
        commands.push(`l -${markerWidth / 2} -${markerWidth / 6}`);
      } else {
        // straight base for normal marker
        commands.push(`h -${markerWidth}`);
      }
      // go back to the start to complete the last side of the triangle
      commands.push(`Z`);
      const triangle = commands.join(" ");

      const pointIn =
        this.ring_type.startsWith(RT.COMPASS) && compassMarker === CM.IN
          ? 180
          : 0;

      return {
        object: svg`
          <g class=${className}
            style="transform: rotate(${turns}turn); 
              transform-origin: ${MID_BOX}px ${MID_BOX}px; 
              transition: transform ${TRANSITION};"
          >
            <path
              d=${triangle}
              fill=${markerColour}
              transform="rotate(${pointIn} ${MID_BOX} 
                ${VIEW_BOX - width + (0.5 * width) / 3})"
            />
          </g>`,
        mask: svg`
          <g class=${className}
            style="transform: rotate(${turns}turn); 
              transform-origin: ${MID_BOX}px ${MID_BOX}px; 
              transition: transform ${TRANSITION};"
          >
            <path
              d=${triangle}
              stroke-linejoin="round"
              stroke-width=${strokeWidth}
              transform="rotate(${pointIn} ${MID_BOX} 
                ${VIEW_BOX - width + (0.5 * width) / 3})"
            />
          </g>`,
      };
    } else {
      // render pointer markers
      const p1 = [MID_BOX, MID_BOX];
      // const p2 = getCoordFromDegrees(0, MID_BOX - width * 0.75, VIEW_BOX);
      const p2 = [MID_BOX, VIEW_BOX - width * 0.75];
      const strokeWidth = [2, 1.6, 1.4, 1.3, 1.2, 1.1][this.ring_size - 1];
      return {
        object: svg`
          <g class=${className}
            style="transform: rotate(${degrees}deg); 
              transform-origin: ${MID_BOX}px ${MID_BOX}px; 
              transition: transform ${TRANSITION};"
          >
            <line
              x1=${p1[0]} y1=${p1[1]}
              x2=${p2[0]} y2=${p2[1]}
              stroke=${markerColour}
              stroke-linecap="round"
              stroke-width=${strokeWidth}
            />
          </g>
        `,
      };
    }
  };
}
