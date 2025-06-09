// RtRingSvg.ts
import { LitElement, css, html, nothing, svg, TemplateResult } from "lit";

import { extendWithRenderRings } from "./svg/renderRing";
import { extendWithRenderDot } from "./svg/renderDot";
import { extendWithRenderCompass } from "./svg/renderCompass";
import { extendWithRenderScale } from "./svg/renderScale";
import { extendWithRenderMarker } from "./svg/renderMarker";
import { extendWithRenderPointer } from "./svg/renderPointer";
import { extendWithRenderIcon } from "./svg/renderIcon";
import { extendWithRenderText } from "./svg/renderText";

import { ColourGradientScale, scaleDef } from "./helpers/ColourGradientScale";
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
} from "./const";
import { clamp, degreesToCompass, isNumber } from "./helpers/utilities";

/* ---------- helper types ---------- */

interface HassState {
  state: string;
  attributes: Record<string, unknown>;
}

interface MarkerCfg {
  value: number;
  colour: string;
}

/* ---------- component ---------- */

export class RtRingSvg extends LitElement {
  /* Lit “properties” ---------------- */
  static override get properties() {
    return {
      ring_type: {},
      indicator: {},
      scale: {},
      ring_size: {},
      colour: { attribute: false },
      state: { attribute: false },
      display_state: { attribute: false },
      marker_value: { attribute: false },
      marker_colour: { attribute: false },
      marker2_value: { attribute: false },
      marker2_colour: { attribute: false },
      min: { attribute: false },
      max: { attribute: false },
      icon: { attribute: false },
      colourise_icon: { attribute: false },
      name: { attribute: false },
      bottom_element: { attribute: false },
      middle_element: { attribute: false },
      top_element: { attribute: false },
      bottom_name: { attribute: false },
      min_sig_figs: { attribute: false },
      max_decimals: { attribute: false },
      hass: { attribute: false },
    };
  }

  /* Explicit field types ------------- */
  ring_type!: string;
  indicator!: string;
  scale!: string;
  ring_size!: number;
  colour!: string | Record<string, string>;
  prototype!: any
  _grad: ColourGradientScale;

  state!: HassState;
  display_state!: HassState;

  marker_value!: number;
  marker_colour!: string;
  marker2_value!: number;
  marker2_colour!: string;

  min!: number;
  max!: number;

  icon!: string;
  colourise_icon!: boolean;
  name!: string;
  bottom_element!: string;
  middle_element!: string;
  top_element!: string;
  bottom_name!: string;

  min_sig_figs!: number;
  max_decimals!: number;

  hass!: unknown;

  /* Private working vars ------------- */
  #grad!: ColourGradientScale;
  _outerRadius = VIEW_BOX / 2;
  _hasMarker = false;
  _startDegrees = 60;
  _endDegrees = 300;
  _ringUnit?: string;
  _displayUnit?: string;
  _ringWidth = 10;
  _noState = false;

  /* ctor & mix-in wiring ------------- */
  constructor(...args: unknown[]) {
    // LitElement constructor
    super();

    extendWithRenderText(new RtRingSvg());
    extendWithRenderScale(new RtRingSvg());
    extendWithRenderRings(new RtRingSvg());
    extendWithRenderPointer(new RtRingSvg());
    extendWithRenderMarker(new RtRingSvg());
    extendWithRenderIcon(new RtRingSvg());
    extendWithRenderDot(new RtRingSvg());
    extendWithRenderCompass(new RtRingSvg());
    this._grad = new ColourGradientScale("grey");
  }

  /* ---------- configuration helpers ---------- */

  configureRing(): void {
    this._outerRadius = VIEW_BOX / 2;
    this._hasMarker = isNumber(this.marker_value);

    if (this.bottom_element === BE.NAME) {
      this.bottom_name = this.bottom_name || this.name;
    }

    // default angles
    this._startDegrees = 60;
    this._endDegrees = 300;

    // Adjust for ring type / bottom layout
    if (this.ring_type.startsWith(RT.COMPASS) || this.ring_type === RT.CLOSED) {
      this._startDegrees = 0;
      this._endDegrees = 359.999;
    } else {
      const shortNameOk =
        this.bottom_element === BE.NAME &&
        this.bottom_name.length <= [3, 6, 8, 10, 12, 14][this.ring_size - 1];

      if (
        [BE.ICON, BE.NONE, BE.UNIT].includes(this.bottom_element) ||
        shortNameOk ||
        (this.bottom_element === BE.MIN_MAX && this.ring_size > 1) ||
        (this.bottom_element.includes(BE.VALUE) && this.ring_size > 1)
      ) {
        this._startDegrees = 45;
        this._endDegrees = 315;
      }
    }

    /* Units ----------------------------------- */
    this._ringUnit = this.state?.attributes["unit_of_measurement"] as
      | string
      | undefined;
    this._displayUnit = this.display_state?.attributes[
      "unit_of_measurement"
    ] as string | undefined;

    /* Gradient setup --------------------------- */
    const scaleCfg: scaleDef = {
      minValue: this.min,
      maxValue: this.max,
      gradStart: (100 * this._startDegrees) / 360,
      gradEnd: (100 * this._endDegrees) / 360,
    };
    this._grad = new ColourGradientScale(this.colour, scaleCfg);

    this.marker_colour = HA_COLOURS[this.marker_colour] || this.marker_colour;
    this.marker2_colour = HA_COLOURS[this.marker2_colour] || this.marker2_colour;

    this._ringWidth =
      [10, 8, 7, 6, 5.5, 5][this.ring_size - 1] *
      (this.scale === SCALE.NONE ? 1 : 0.85);
  }

  renderText!: (
    value: unknown,
    unit: string,
    pos: string
  ) => TemplateResult | typeof nothing;

  renderScale!: (opacity: number) => TemplateResult | typeof nothing;
  renderRings!: (...a: unknown[]) => TemplateResult | typeof nothing;
  renderGradRing!: (
    startDeg: number,
    endDeg: number,
    opacity: number
  ) => TemplateResult | typeof nothing;
  renderPointer!: (statePoint: number) => TemplateResult | typeof nothing;
  renderMarker!: (
    value: number,
    colour: string
  ) => TemplateResult | typeof nothing;
  renderIcon!: (
    pos: string,
    displayState: HassState,
    stateColourValue?: string | number
  ) => TemplateResult | typeof nothing;
  renderDot!: (statePoint: number, rawValue: number) => TemplateResult;
  renderCompass!: () => TemplateResult | typeof nothing;

  /* Top / middle / bottom element helpers ----- */

  private getTopElementSvg(): unknown {
    switch (this.top_element) {
      case TE.MARKER:
        return this.renderText(this.marker_value, "", POS.TOP);
      case TE.MARKER_UNIT:
        return this.renderText(this.marker_value, this._displayUnit ?? "", POS.TOP);
      case TE.UNIT:
        return this.renderText(this._displayUnit ?? "", "", POS.TOP);
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

  private getMiddleElementSvg(): unknown {
    switch (this.middle_element) {
      case ME.VALUE:
      case ME.VALUE_UNIT:
      case ME.RING_VALUE:
      case ME.RING_VALUE_UNIT:
        if (this._noState) return nothing;

        const val =
          [ME.RING_VALUE, ME.RING_VALUE_UNIT].includes(this.middle_element)
            ? this.state.state
            : this.display_state.state;

        let unit = "";
        if (this.middle_element === ME.VALUE_UNIT) unit = this._displayUnit ?? "";
        if (this.middle_element === ME.RING_VALUE_UNIT) unit = this._ringUnit ?? "";

        const position =
          this.indicator === IND.POINTER ? POS.BELOW_DIAL : POS.MIDDLE;

        return this.renderText(val, unit, position);

      default:
        return nothing;
    }
  }

  private getBottomElementSvg(): unknown {
    if (this.ring_type.startsWith(RT.COMPASS)) return nothing;

    switch (this.bottom_element) {
      case BE.NAME:
        return this.renderText(this.bottom_name, "", POS.BOTTOM);
      case BE.UNIT:
        return this.renderText(this._displayUnit ?? "", "", POS.BOTTOM);
      case BE.RING_UNIT:
        return this.renderText(this._ringUnit ?? "", "", POS.BOTTOM);
      case BE.MIN_MAX:
        if (this.ring_type === RT.CLOSED) return nothing;

        const minText = Math.round(this.min);
        const maxText =
          this.max - this.min < 0.01 ? "–" : Math.round(this.max);

        return svg`
          ${this.renderText(minText, "", POS.MIN)}
          ${this.renderText(maxText, "", POS.MAX)}
        `;
      case BE.VALUE:
      case BE.VALUE_UNIT:
      case BE.RING_VALUE:
      case BE.RING_VALUE_UNIT:
        if (this._noState) return nothing;

        const value =
          [BE.RING_VALUE, BE.RING_VALUE_UNIT].includes(this.bottom_element)
            ? this.state.state
            : this.display_state.state;

        let unit = "";
        if (this.bottom_element === BE.VALUE_UNIT) unit = this._displayUnit ?? "";
        if (this.bottom_element === BE.RING_VALUE_UNIT) unit = this._ringUnit ?? "";
        return this.renderText(value, unit, POS.BOTTOM);
      default:
        return nothing;
    }
  }

  /* ---------- Lit render() ---------- */

  override render() {
    this.configureRing();
    this._noState = ["unknown", "unavailable"].includes(this.state.state);

    let clampedState = clamp(Number(this.state.state), this.min, this.max);
    let statePoint =
      this._startDegrees +
      ((this._endDegrees - this._startDegrees) * (clampedState - this.min)) /
        (this.max - this.min);

    if (this._noState) {
      clampedState = this.min;
      statePoint = this._startDegrees;
      this._grad = new ColourGradientScale("grey");
    }

    /* Opacity presets ----------------- */
    let ringBackgroundOpacity = 0.15;
    if (this.indicator === IND.DOT) ringBackgroundOpacity = 0.7;
    else if (this.indicator === IND.POINTER) ringBackgroundOpacity = 0.07;
    else if (this.scale === IND.NONE) ringBackgroundOpacity = 0.15;

    /* Ring background ----------------- */
    const ringBackground =
      this.ring_type === RT.NONE
        ? nothing
        : this.ring_type.startsWith(RT.COMPASS)
        ? this.renderCompass()
        : this.renderGradRing(
            this._startDegrees,
            this._endDegrees,
            ringBackgroundOpacity
          );

    /* Indicator ----------------------- */
    let indicatorBottom: unknown = nothing;
    let indicatorTop: unknown = nothing;

    if (this.ring_type !== RT.NONE && !this._noState) {
      switch (this.indicator) {
        case IND.ARC:
          indicatorBottom = this.renderRings?.(
            this._startDegrees,
            statePoint,
            this.state.state
          );
          break;
        case IND.DOT:
          indicatorBottom = this.renderDot(statePoint, this.state.state as unknown as number);
          break;
        case IND.POINTER:
          indicatorTop = this.renderPointer(statePoint);
          break;
        default:
          break;
      }
    }

    /* Scale --------------------------- */
    const scale =
      this.scale === SCALE.NONE
        ? nothing
        : this.renderScale(this.indicator === IND.POINTER ? 0.7 : 0.2);

    /* Markers ------------------------- */
    const marker =
      isNumber(this.marker_value) && !this._noState
        ? this.renderMarker(this.marker_value, this.marker_colour)
        : nothing;
    const marker2 =
      isNumber(this.marker2_value) && !this._noState
        ? this.renderMarker(this.marker2_value, this.marker2_colour)
        : nothing;

    /* Icon ---------------------------- */
    let stateColourValue: string | number | undefined;
    if (this.colourise_icon) stateColourValue = this.state.state;

    const iconHtml =
      this.middle_element === ME.ICON
        ? this.renderIcon(POS.MIDDLE, this.display_state, stateColourValue)
        : this.top_element === TE.ICON
        ? this.renderIcon(POS.TOP, this.display_state, stateColourValue)
        : this.bottom_element === BE.ICON
        ? this.renderIcon(POS.BOTTOM, this.display_state, stateColourValue)
        : nothing;

    /* Assembled SVG ------------------- */
    return html`
      ${iconHtml}
      <svg
        viewBox="0 0 ${VIEW_BOX} ${VIEW_BOX}"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        role="img"
        aria-hidden="true"
      >
        <g class="elements">
          ${this.getTopElementSvg()}
          ${this.getMiddleElementSvg()}
          ${this.getBottomElementSvg()}
        </g>
        <g class="ring">
          ${ringBackground}
          ${scale}
        </g>
        <g class="indicators">
          ${indicatorBottom}
          ${marker2}
          ${marker}
          ${indicatorTop}
        </g>
      </svg>
    `;
  }

  /* ---------- Lit styles ---------- */

  static override styles = css`
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

    path.primary-path {
      opacity: var(--icon-primary-opactity, 1);
    }
    path.secondary-path {
      fill: var(--icon-secondary-color, currentcolor);
      opacity: var(--icon-secondary-opactity, 0.5);
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
      letter-spacing: 0;
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

    ha-state-icon.icon.top {
      color: var(
        --rt-icon-color,
        var(
          --rt-icon-state-color,
          color-mix(
            in srgb,
            var(--primary-text-color, #212121) var(--rt-top-icon-opacity, 50%),
            transparent
          )
        )
      );
    }
    ha-state-icon.icon {
      color: var(
        --rt-icon-color,
        var(--rt-icon-state-color, var(--tile-icon-color))
      );
    }

    text.compass.cardinal {
      font-weight: 800;
    }
    g.scale text {
      font-weight: 300;
      letter-spacing: 0;
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

/* Register element */
customElements.define("rt-ring-svg", RtRingSvg);
