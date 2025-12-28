import { svg } from "lit";
import { VIEW_BOX } from "../const";
import {  getRingPath } from "./getRingPath";

export function extendWithRenderRings(RtRingSvg) {
  RtRingSvg.prototype.renderGradRing = function (
    startAngle,
    endAngle,
    opacity,
    cutOuts = []
  ) {
    const width = this._ringWidth;
    const segment = getRingPath(
      startAngle,
      endAngle,
      this._outerRadius,
      width
    );

    const ringGradient = this._grad.getConicGradientCss(opacity);

    return {
      object: svg`
        <g class="ring-grad">
          <mask id="cut-outs-ring-grad">
            <path               
              stroke-width=${width}
              stroke-opacity="1"
              stroke-linecap="round"
              fill="transparent" 
              stroke="white" 
              d=${segment}
            />
            <g fill="black" stroke="black" stroke-width="0">
              ${cutOuts}
            </g>
          </mask>
          <foreignObject
            x="0" y="0"
            width=${VIEW_BOX} height=${VIEW_BOX}
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
    // render the actual solid ring (but which will be invisible)
    const actualPath = getRingPath(
      startAngle,
      endAngle,
      this._outerRadius,
      width
    );
    // render the entire ring (which will be partially rendered using dasharray)
    const animatedPath = getRingPath(
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
            class="solid-ring-animated"
            mask="url(#cut-outs-ring-solid)"
            stroke=${this._grad.getSolidColour(rawValue)}
            stroke-width=${width}
            stroke-opacity="1"
            stroke-linecap="round"
            stroke-dasharray="0 10000"
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
    self._lastRingLength = self._lastRingLength || 0;
    if (changedProperties.has("state") || changedProperties.has("ring_state")) {
      // Wait for DOM to update so that we can access getTotalLength()
      requestAnimationFrame(() => {
        const animatedPath = self.shadowRoot?.querySelector(
          ".solid-ring-animated"
        );
        const actualPath = self.shadowRoot?.querySelector(".solid-ring-actual");
        if (actualPath) {
          const length = actualPath.getTotalLength();
          if (length !== self._lastRingLength) {
            animatedPath.style.strokeDasharray = `${length} 10000`;
            self._lastRingLength = length;
          }
        }
      });
    }
  };
}
