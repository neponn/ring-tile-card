import { LitElement, css, html, nothing, svg } from "lit";

import { extendWithRenderRings } from "./svg/renderRing.js";
import { extendWithRenderDot } from "./svg/renderDot.js";
import { extendWithRenderCompass } from "./svg/renderCompass.js";
import { extendWithRenderScale } from "./svg/renderScale.js";
import { extendWithRenderMarker } from "./svg/renderMarker.js";
import { extendWithRenderPointer } from "./svg/renderPointer.js";
import { extendWithRenderIcon } from "./svg/renderIcon.js";
import { extendWithRenderText } from "./svg/renderText.js";
import { extendWithGetRoundedValue } from "./svg/getRoundedValue.js";

import { ColourGradientScale } from "./helpers/ColourGradientScale.js";
import {
  VIEW_BOX,
  HA_COLOURS,
  BE,
  POS,
  RT,
  SCALE,
  TE,
  ME,
  IND,
} from "./const.js";
import { clamp, degreesToCompass, isNumber } from "./helpers/utilities.js";

export class RtRingSvg extends LitElement {
  _iconSvgCache = {};
  _iconSvg = nothing;

  constructor(...args) {
    super(...args);

    extendWithRenderText(RtRingSvg);
    extendWithRenderScale(RtRingSvg);
    extendWithRenderRings(RtRingSvg);
    extendWithRenderPointer(RtRingSvg);
    extendWithRenderMarker(RtRingSvg);
    extendWithRenderIcon(RtRingSvg);
    extendWithRenderDot(RtRingSvg);
    extendWithRenderCompass(RtRingSvg);
    extendWithGetRoundedValue(RtRingSvg);
  }

  static get properties() {
    return {
      ring_type: {}, // RT.{}
      indicator: {}, // IND{}
      scale: {}, // SCALE.{}
      ring_size: {}, // 1-6
      colour: { attribute: false },
      state: { attribute: false },
      display_state: { attribute: false },
      marker_value: { attribute: false },
      marker_colour: { attribute: false },
      compass_marker: { attribute: false },
      marker2_value: { attribute: false },
      marker2_colour: { attribute: false },
      compass_marker2: { attribute: false },
      min: { attribute: false },
      max: { attribute: false },
      icon: { attribute: false },
      colourise_icon: { attribute: false },
      name: { attribute: false },
      bottom_element: { attribute: false }, // BE.{}
      middle_element: { attribute: false }, // ME.{}
      top_element: { attribute: false }, // TE.{}
      bottom_name: { attribute: false },
      min_sig_figs: { attribute: false },
      max_decimals: { attribute: false },
      hass: { attribute: false },
    };
  }

  configureRing() {
    this._outerRadius = VIEW_BOX / 2;
    this._hasMarker = isNumber(this.marker_value);

    if (this.bottom_element === BE.NAME) {
      this.bottom_name = this.bottom_name || this.name;
    }

    // guess ring angles
    this._startDegrees = 60;
    this._endDegrees = 300;

    // Adjust, based on config
    if (this.ring_type.startsWith(RT.COMPASS) || this.ring_type === RT.CLOSED) {
      this._startDegrees = 0;
      this._endDegrees = 359.999;
    } else {
      if (
        [BE.ICON, BE.NONE, BE.UNIT].includes(this.bottom_element) ||
        (this.bottom_element === BE.NAME &&
          this.bottom_name.length <=
            [3, 6, 8, 10, 12, 14][this.ring_size - 1]) ||
        (this.bottom_element === BE.MIN_MAX && this.ring_size > 1) ||
        (this.bottom_element.includes(BE.VALUE) && this.ring_size > 1)
      ) {
        this._startDegrees = 45;
        this._endDegrees = 315;
      }
    }

    this._ringUnit = this.state ? this.state.unitOfMeasurement : nothing;
    this._displayUnit = this.display_state
      ? this.display_state.unitOfMeasurement
      : nothing;

    const scaleDef = {
      minValue: this.min,
      maxValue: this.max,
      gradStart: (100.0 * this.startDegrees) / 360,
      gradEnd: (100.0 * this.endDegrees) / 360,
    };
    this._grad = new ColourGradientScale(this.colour, scaleDef);
    this.marker_colour = HA_COLOURS[this.marker_colour] || this.marker_colour;
    this.marker2_colour =
      HA_COLOURS[this.marker2_colour] || this.marker2_colour;

    this._ringWidth =
      [10, 8, 7, 6, 5.5, 5][this.ring_size - 1] *
      (this.scale === SCALE.NONE ? 1 : 0.85);
  }

  getTopElementSvg() {
    switch (this.top_element) {
      // case TE.ICON: handled in async update()
      case TE.MARKER:
        return this.renderText(this.marker_value, "", POS.TOP);

      case TE.MARKER_UNIT:
        return this.renderText(this.marker_value, this._displayUnit, POS.TOP);

      case TE.UNIT:
        return this.renderText(this._displayUnit, "", POS.TOP);

      case TE.MARKER_DIR:
        return this.renderText(
          degreesToCompass(this.marker_value),
          "",
          POS.TOP
        );

      default:
        return nothing;
    }
  }

  getMiddleElementSvg() {
    switch (this.middle_element) {
      // case ME.ICON: handled in async update()
      case ME.VALUE:
      case ME.VALUE_UNIT:
      case ME.RING_VALUE:
      case ME.RING_VALUE_UNIT:
        if (this._noState) {
          return nothing;
        }
        const value = [ME.RING_VALUE, ME.RING_VALUE_UNIT].includes(
          this.middle_element
        )
          ? this.state.value
          : this.display_state.value;

        let unit = "";
        if (this.middle_element === ME.VALUE_UNIT) {
          unit = this._displayUnit;
        }
        if (this.middle_element === ME.RING_VALUE_UNIT) {
          unit = this._ringUnit;
        }
        const position =
          this.indicator === IND.POINTER ? POS.BELOW_DIAL : POS.MIDDLE;

        return this.renderText(value, unit, position);

      default:
        return nothing;
    }
  }

  getBottomElementSvg() {
    if (this.ring_type.startsWith(RT.COMPASS)) {
      return nothing;
    }

    switch (this.bottom_element) {
      // case BE.ICON: handled in async update()
      case BE.NAME:
        return this.renderText(this.bottom_name, "", POS.BOTTOM);

      case BE.UNIT:
        return this.renderText(this._displayUnit, "", POS.BOTTOM);

      case BE.RING_UNIT:
        return this.renderText(this._ringUnit, "", POS.BOTTOM);

      case BE.MIN_MAX:
        if (this.ring_type === RT.CLOSED) {
          return nothing;
        }
        const maxDecimals = this.ring_size < 4 ? 0 : 99;
        const minText = this.getRoundedValue(this.min, true, maxDecimals);
        const maxText =
          this.max - this.min < 0.01
            ? "–"
            : this.getRoundedValue(this.max, true, maxDecimals);

        return svg`
          ${this.renderText(minText, "", POS.MIN)}
          ${this.renderText(maxText, "", POS.MAX)}
        `;

      case BE.VALUE:
      case BE.VALUE_UNIT:
      case BE.RING_VALUE:
      case BE.RING_VALUE_UNIT:
        if (this._noState) {
          return nothing;
        }
        const value = [BE.RING_VALUE, BE.RING_VALUE_UNIT].includes(
          this.bottom_element
        )
          ? this.value
          : this.display_state.value;

        let unit = "";
        if (this.bottom_element === BE.VALUE_UNIT) {
          unit = this._displayUnit;
        }
        if (this.bottom_element === BE.RING_VALUE_UNIT) {
          unit = this._ringUnit;
        }
        return this.renderText(value, unit, POS.BOTTOM);

      default:
        return nothing;
    }
  }

  async updated(changedProps) {
    // Check if icon or relevant state changed
    if (
      changedProps.has("icon") ||
      changedProps.has("display_state") ||
      changedProps.has("middle_element") ||
      changedProps.has("top_element") ||
      changedProps.has("bottom_element")
    ) {
      // Only fetch if needed
      let stateColourValue;
      if (this.colourise_icon) {
        stateColourValue = this.state.value;
      }
      this._iconSvg =
        this.middle_element === ME.ICON
          ? await this.renderIcon(
              POS.MIDDLE,
              this.display_state.stateObj,
              stateColourValue
            )
          : this.top_element === TE.ICON
          ? await this.renderIcon(
              POS.TOP,
              this.display_state.stateObj,
              stateColourValue
            )
          : this.bottom_element === BE.ICON
          ? await this.renderIcon(
              POS.BOTTOM,
              this.display_state.stateObj,
              stateColourValue
            )
          : nothing;

      this.requestUpdate();
    }
  }

  render() {
    // set up the ring based on config
    this.configureRing();

    // figure out ring parameters based on current state
    this._noState = ["unknown", "unavailable"].includes(this.state.value);

    let clampedState = clamp(this.state.value, this.min, this.max);
    let statePoint =
      this._startDegrees +
      ((this._endDegrees - this._startDegrees) * (clampedState - this.min)) /
        (this.max - this.min);

    if (this._noState) {
      clampedState = this.min;
      statePoint = this._startDegrees;
      this._grad = new ColourGradientScale("grey");
    }

    let ringBackgroundOpacity = 0.15;
    if (this.indicator === IND.DOT) {
      ringBackgroundOpacity = 0.7;
    } else if (this.indicator === IND.POINTER) {
      ringBackgroundOpacity = 0.07;
    } else if (this.scale === IND.NONE) {
      ringBackgroundOpacity = 0.15;
    }

    // render the ring
    let ringBackground;
    if (this.ring_type === RT.NONE) {
      ringBackground = nothing;
    } else if (this.ring_type.startsWith(RT.COMPASS)) {
      ringBackground = this.renderCompass();
    } else {
      ringBackground = this.renderGradRing(
        this._startDegrees,
        this._endDegrees,
        ringBackgroundOpacity
      );
    }

    // render the indicator
    let indicatorBottom = nothing;
    let indicatorTop = nothing;
    if (this.ring_type !== RT.NONE && !this._noState) {
      switch (this.indicator) {
        case IND.ARC:
          indicatorBottom = this.renderSolidRing(
            this._startDegrees,
            statePoint,
            this.state.value
          );
          break;
        case IND.DOT:
          indicatorBottom = this.renderDot(statePoint, this.state.value);
          break;
        case IND.POINTER:
          indicatorTop = this.renderPointer(statePoint);
          break;
        case IND.NONE:
          break;
      }
    }

    // render the scale
    let scale = nothing;
    if (this.scale !== SCALE.NONE) {
      const scaleOpacity = this.indicator === IND.POINTER ? 0.7 : 0.2;
      scale = this.renderScale(scaleOpacity);
    }

    // render the markers
    const marker =
      isNumber(this.marker_value) && !this._noState
        ? this.renderMarker(
            this.marker_value,
            this.marker_colour,
            this.compass_marker
          )
        : nothing;
    const marker2 =
      isNumber(this.marker2_value) && !this._noState
        ? this.renderMarker(
            this.marker2_value,
            this.marker2_colour,
            this.compass_marker2
          )
        : nothing;

    // render the top, middle and bottom elements
    const topElementSvg = this.getTopElementSvg();
    const middleElementSvg = this.getMiddleElementSvg();
    const bottomElementSvg = this.getBottomElementSvg();

    // composite the SVG
    return html`
      <svg
        viewBox="0 0 ${VIEW_BOX} ${VIEW_BOX}"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        role="img"
        aria-hidden="true"
      >
        <g class="elements">
          ${topElementSvg} ${middleElementSvg} ${bottomElementSvg}
          ${this._iconSvg}
        </g>
        <g class="ring">${ringBackground} ${scale}</g>
        <g class="indicators">
          ${indicatorBottom} ${marker2} ${marker} ${indicatorTop}
        </g>
      </svg>
    `;
  }

  static styles = css`
    :host {
      display: var(--ha-icon-display, inline-flex);
      align-items: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      fill: var(--icon-primary-color, currentcolor);
    }
    svg {
      width: 100%;
      height: 100%;
      pointer-events: none;
      display: block;
      position: absolute;
      inset: 0;
      overflow: visible;
    }
    text {
      font-family: Geist, var(--ha-font-family-body);
      font-optical-sizing: auto;
      font-style: normal;
      color: var(--primary-text-color);
      font-weight: 600;
    }
    text.middle {
      letter-spacing: -0.3px;
    }
    text.middle.tight {
      letter-spacing: -1.1px;
    }
    text.lower-middle {
      letter-spacing: -0.2px;
    }
    text.middle.unit {
      letter-spacing: 0px;
      opacity: var(--rt-background-text-opacity, 0.6);
      font-weight: 500;
    }
    text.bottom.closed {
      letter-spacing: -0.2px;
      opacity: var(--rt-background-text-opacity, 0.6);
      font-weight: 500;
    }
    text.top.marker {
      opacity: var(--rt-background-text-opacity, 0.6);
      font-weight: 500;
    }
    text.compass.cardinal {
      font-weight: 800;
    }
    g.scale text {
      font-weight: 300;
      letter-spacing: 0px;
      opacity: var(--rt-scale-text-opacity, 0.5);
      fill: var(--primary-text-color, #212121);
    }
    .scale .ticks {
      stroke: var(--primary-text-color, #212121);
    }
    .pointer {
      stroke: var(--rt-pointer-colour, orange);
      fill: var(--rt-pointer-colour, orange);
    }
  `;
}
