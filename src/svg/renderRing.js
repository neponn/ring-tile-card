import { LitElement, svg } from "lit";
import { MID_BOX, RT, TRANSITION, VIEW_BOX } from "../const";
import { getRingPath, getRingPath2 } from "./getRingPath";

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
    const actualPath = getRingPath2(
      startAngle,
      endAngle,
      this._outerRadius,
      width
    );
    const animatedPath = getRingPath2(
      startAngle,
      359.9999 - startAngle,
      this._outerRadius,
      width
    );

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
            d=${animatedPath}
            style="transition: stroke-dasharray ${TRANSITION}, 
              stroke ${TRANSITION};"
            class="solid-ring-animated"
            mask="url(#cut-outs-ring-solid)"
            stroke=${this._grad.getSolidColour(rawValue)}
            stroke-width=${width}
            stroke-opacity="1"
            stroke-linecap="round"
            stroke-dashoffset="0"
            fill="transparent"
          />
          <path 
            d=${actualPath}
            class="solid-ring-actual"
            stroke-opacity="0"
            fill="transparent"
          />
        </g>`,
    };
  };

  RtRingSvg.prototype.renderRingsUpdateHandler = function (
    changedProperties,
    self
  ) {
    // Add lifecycle hook to handle animation on updates
    self._lastRingLength = self._lastRingLength || 0;
    if (changedProperties.has("state") || changedProperties.has("ring_state")) {
      // Wait for DOM update, then animate
      requestAnimationFrame(() => {
        const animatedPath = self.shadowRoot?.querySelector(
          ".solid-ring-animated"
        );
        const actualPath = self.shadowRoot?.querySelector(".solid-ring-actual");
        if (actualPath) {
          const length = actualPath.getTotalLength();
          if (length !== self._lastRingLength) {
            animatedPath.style.strokeDasharray = `${length} 10000`; // Animate to visible
            self._lastRingLength = length;
          }
        }
      });
    }
  };
}
