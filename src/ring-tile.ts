import {
  LitElement,
  html,
  css,
  nothing,
} from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { mdiExclamationThick, RT, US_SPELLINGS } from "./const";
import {
  SPECIFIC_DEFAULTS,
  COMPASS_DEFAULTS,
  MEDIUM_DEFAULTS,
  LARGE_DEFAULTS,
} from "./defaults";
import { clamp, isNumber } from "./helpers/utilities";

const DEFAULTS = {
  ring_only: false,
  ring_type: "default",
  indicator: "default",
  scale: "default",
  top_element: "default",
  middle_element: "default",
  bottom_element: "default",
  colour: {
    "70%": "#f39c12",
    "80%": "#e67e22",
    "90%": "#e74c3c",
  },
  min: 0,
  max: 100,
  min_sig_figs: 2,
  max_decimals: 1,
  colourise_icon: false,
  transparent_tile: false,
  large_secondary: false,
  hide_state: false,
  tap_action: {
    action: "more-info" as LovelaceAction,
  },
  icon_tap_action: {
    action: "more-info" as LovelaceAction,
    tapped: "icon" as "icon",
  },
};
// Home-Assistant shims
interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, unknown>): void;
}

// Lovelace action & config
type LovelaceAction =
  | "none"
  | "more-info"
  | "navigate"
  | "call-service"
  | "url";

interface ActionConfig {
  action: LovelaceAction;
  tapped?: "icon" | "info";
  navigation_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  url?: string;
}

/** All options RingTile understands (union of defaults & user config). */
export interface RingTileConfig {
  entity: string;
  ring_entity?: string;
  ring_size?: 1 | 2 | 3 | 4 | 5 | 6;
  ring_only?: boolean;
  ring_type?: string;
  indicator?: string;
  scale?: string;

  top_element?: string;
  middle_element?: string;
  bottom_element?: string;

  name?: string;
  bottom_name?: string;
  icon?: string;
  colour?: Record<string, string> | string;

  marker?: number | string;
  marker2?: number | string;
  marker_colour?: string;
  marker2_colour?: string;

  min?: number | string;
  max?: number | string;
  min_sig_figs?: number;
  max_decimals?: number;

  colourise_icon?: boolean;
  transparent_tile?: boolean;
  large_secondary?: boolean;
  hide_state?: boolean;

  tap_action?: ActionConfig;
  icon_tap_action?: ActionConfig;
}

// Main element
export class RingTile extends LitElement {
  // Reactive properties
  private _hass!: HomeAssistant;
  private _cfg!: RingTileConfig;

  private _ringStateObj: HassEntity | undefined;
  private _displayStateObj: HassEntity | undefined;

  private _markerValue?: number;
  private _marker2Value?: number;
  private _min?: number;
  private _max?: number;

  // Non-reactive helpers
  private _markerEntity?: string;
  private _marker2Entity?: string;
  private _minEntity?: string;
  private _maxEntity?: string;
  private _name = "";
  private _noState = false;
  private _configProcessed = false;

  // Lit property metadata
  static get properties() {
    return {
      _hass: { attribute: false },
      _cfg: { state: true },
      _ringStateObj: { state: true },
      _displayStateObj: { state: true },
      _markerValue: { state: true },
      _marker2Value: { state: true },
      _min: { state: true },
      _max: { state: true },
    };
  }

  private processConfig(): void {
    if (!this._ringStateObj || !this._displayStateObj) return;

    // Start with generic defaults
    let defaults: Partial<RingTileConfig> = { ...DEFAULTS };

    // Size-based overrides
    if (this._cfg.ring_size === 2) defaults = { ...defaults, ...MEDIUM_DEFAULTS };
    if ((this._cfg.ring_size ?? 1) > 2) defaults = { ...defaults, ...LARGE_DEFAULTS };

    // device_class / compass overrides
    const dc = this._ringStateObj.attributes.device_class as string | undefined;
    const unit = this._ringStateObj.attributes.unit_of_measurement as string | undefined;
    const isCompass = this._cfg.ring_type?.startsWith(RT.COMPASS);

    if (isCompass) {
      defaults = { 
        ...defaults, 
        ...{ 
          ...COMPASS_DEFAULTS, 
          ring_size: COMPASS_DEFAULTS.ring_size as 1 | 2 | 3 | 4 | 5 | 6 | undefined 
        } 
      };
    } else if (dc && dc in SPECIFIC_DEFAULTS) {
      const dcDefaults = SPECIFIC_DEFAULTS[dc as keyof typeof SPECIFIC_DEFAULTS];
      const sizeKey =
        !this._cfg.ring_size || this._cfg.ring_size === 1
          ? "small"
          : this._cfg.ring_size === 2
          ? "medium"
          : "large";

      // Apply base device-class defaults (not size-specific)
      defaults = {
        ...defaults,
        ...((dcDefaults.null && "null" in dcDefaults.null) ? (dcDefaults.null.null ?? {}) : {}),
        ...((dcDefaults.null && typeof dcDefaults.null?.[unit as keyof typeof dcDefaults.null] === "object" && dcDefaults.null?.[unit as keyof typeof dcDefaults.null] !== null)
          ? dcDefaults.null?.[unit as keyof typeof dcDefaults.null]
          : {})
      };

      // Conditionally apply size-specific defaults with robust structure handling
      if (dcDefaults && sizeKey in dcDefaults) {
        const sizeSpecificDefaults = dcDefaults[sizeKey as keyof typeof dcDefaults] as any;
        if (typeof sizeSpecificDefaults === 'object' && sizeSpecificDefaults !== null) {
          let sizeConfig = {};
          // Case 1: A config exists for the specific unit. Use it.
          if (unit && unit in sizeSpecificDefaults) {
            sizeConfig = sizeSpecificDefaults[unit];
          }
          // Case 2: No specific unit config, but a generic 'null' config exists. Use it.
          else if ('null' in sizeSpecificDefaults) {
            sizeConfig = sizeSpecificDefaults.null;
          }
          // Case 3: Neither of the above, assume the object itself is the config.
          else {
            sizeConfig = sizeSpecificDefaults;
          }
          defaults = { ...defaults, ...sizeConfig };
        }
      }
    }

    // US→AU spelling variants
    US_SPELLINGS.forEach(({ US, AU }) => {
      if (US in this._cfg) (this._cfg as Record<string, any>)[AU] = (this._cfg as Record<string, any>)[US];
    });

    // Final merge and type assertion to resolve persistent type errors
    this._cfg = { ...defaults, ...this._cfg } as RingTileConfig;

    // Normalise
    this._cfg.ring_size = clamp(this._cfg.ring_size || 1, 1, 6) as RingTileConfig["ring_size"];
    this._name =
      this._cfg.name || (this._displayStateObj.attributes["friendly_name"] as string);
    this._cfg.bottom_name ??= this._name;
    this._cfg.ring_only ||= (this._cfg.ring_size ?? 1) >= 3;

    // Literals vs entities
    if (isNumber(this._cfg.marker)) this._markerValue = Number(this._cfg.marker);
    else this._markerEntity = this._cfg.marker as string | undefined;

    if (isNumber(this._cfg.marker2)) this._marker2Value = Number(this._cfg.marker2);
    else this._marker2Entity = this._cfg.marker2 as string | undefined;

    if (isNumber(this._cfg.min)) this._min = Number(this._cfg.min);
    else this._minEntity = this._cfg.min as string | undefined;

    if (isNumber(this._cfg.max)) this._max = Number(this._cfg.max);
    else this._maxEntity = this._cfg.max as string | undefined;

    this._configProcessed = true;
  }

  setConfig(config: RingTileConfig): void {
    if (!config?.entity) throw new Error("You must define an entity");
    this._cfg = { ...config };
    if (this._hass) this.hass = this._hass; // trigger initial binding
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;

    this._ringStateObj = hass.states[this._cfg.ring_entity ?? this._cfg.entity];
    this._displayStateObj = hass.states[this._cfg.entity];

    if (!this._ringStateObj) {
      this._noState = true;
      return;
    }
    this._noState = ["unavailable", "unknown"].includes(this._ringStateObj.state);

    if (!this._configProcessed) this.processConfig();

    // Dynamic entities
    if (this._markerEntity) this._markerValue = Number(hass.states[this._markerEntity]?.state);
    if (this._marker2Entity) this._marker2Value = Number(hass.states[this._marker2Entity]?.state);
    if (this._minEntity) this._min = Number(hass.states[this._minEntity]?.state);
    if (this._maxEntity) this._max = Number(hass.states[this._maxEntity]?.state);

    if (this._min !== undefined && this._max !== undefined && this._min === this._max) this._max += 1e-11; // avoid divide-by-zero downstream
  }

  render() {
    if (!this._cfg || !this._ringStateObj || !this._displayStateObj) {
        return html`
            <ha-card class="type-tile">
                <div class="background"></div>
                <div class="container">
                    ${!this._cfg ? "Configuration missing." : "Entity not available."}
                </div>
            </ha-card>
        `;
    }

    const stateStr = this._ringStateObj.state;
    const ringPixels = [36, 96, 154, 212, 270, 330][(this._cfg.ring_size ?? 1) - 1];

    const stateDisplay = (!this._cfg.hide_state && this._displayStateObj)
      ? html`
          <state-display
            .stateObj=${this._displayStateObj}
            .hass=${this._hass}
            .name=${this._name}
          ></state-display>
        `
      : nothing;

    return html`
      <ha-card class="active type-tile ${classMap({ "transparent-tile": !!this._cfg.transparent_tile })}">
        <div
          class="background"
          @click=${(e: Event) => this._handleAction(e, this._cfg.tap_action)}
          role=${ifDefined(this._hasCardAction() ? "button" : undefined)}
          tabindex=${ifDefined(this._hasCardAction() ? 0 : undefined)}
          aria-labelledby="info"
        >
          <ha-ripple .disabled=${!this._hasCardAction()}></ha-ripple>
        </div>

        <div class="container">
          <div class="content ${classMap({
            vertical: false,
            centred: !!this._cfg.ring_only || (this._cfg.ring_size ?? 1) >= 3,
            large: (this._cfg.ring_size ?? 1) > 1,
            small: (this._cfg.ring_size ?? 1) === 1,
          })}">
            <rt-ring
              role=${ifDefined(this._hasIconAction() ? "button" : undefined)}
              tabindex=${ifDefined(this._hasIconAction() ? 0 : undefined)}
              data-domain="sensor"
              data-state=${stateStr}
              ring_size=${this._cfg.ring_size ?? 1}
              @click=${(e: Event) => this._handleAction(e, this._cfg.icon_tap_action)}
            >
              <rt-ring-svg
                slot="icon"
                style="width:${ringPixels}px;height:${ringPixels}px;"
                .ring_type=${ifDefined(this._cfg.ring_type)}
                .ring_size=${this._cfg.ring_size ?? 1}
                .indicator=${ifDefined(this._cfg.indicator)}
                .scale=${ifDefined(this._cfg.scale)}
                .colour=${ifDefined(this._cfg.colour)}
                .state=${this._ringStateObj}
                .display_state=${this._displayStateObj}
                .marker_value=${ifDefined(this._markerValue)}
                .marker_colour=${ifDefined(this._cfg.marker_colour)}
                .marker2_value=${ifDefined(this._marker2Value)}
                .marker2_colour=${ifDefined(this._cfg.marker2_colour)}
                .icon=${ifDefined(this._cfg.icon)}
                .colourise_icon=${this._cfg.colourise_icon ?? false}
                .top_element=${ifDefined(this._cfg.top_element)}
                .middle_element=${ifDefined(this._cfg.middle_element)}
                .bottom_element=${ifDefined(this._cfg.bottom_element)}
                .bottom_name=${ifDefined(this._cfg.bottom_name)}
                .name=${this._name}
                .min=${ifDefined(this._min)}
                .max=${ifDefined(this._max)}
                .min_sig_figs=${ifDefined(this._cfg.min_sig_figs)}
                .max_decimals=${ifDefined(this._cfg.max_decimals)}
                .hass=${this._hass}
              ></rt-ring-svg>

              ${this._noState
                ? html`<ha-tile-badge style="--tile-badge-background-color: var(--orange-color)">
                    <ha-svg-icon .path=${mdiExclamationThick}></ha-svg-icon>
                  </ha-tile-badge>`
                : nothing}
            </rt-ring>

            ${this._cfg.ring_only || (this._cfg.ring_size ?? 1) >= 3
              ? nothing
              : html`<rt-info
                  id="info"
                  .primary=${this._name}
                  .secondary=${stateDisplay}
                  .large_ring=${(this._cfg.ring_size ?? 1) > 1}
                  .large_secondary=${!!this._cfg.large_secondary}
                ></rt-info>`}
          </div>
        </div>
      </ha-card>
    `;
  }

  static getStubConfig(hass: HomeAssistant, entities: string[]): RingTileConfig {
    const sensors = entities.filter((e) => e.startsWith("sensor."));
    const temps = sensors.filter(
      (e) => hass.states[e]?.attributes.device_class === "temperature"
    );
    return { entity: temps.length ? temps[Math.floor(Math.random() * temps.length)] : sensors[0] };
  }

  getCardSize(): number {
    return 1;
  }

  getGridOptions() {
    const columns = this._cfg.ring_only
      ? this._cfg.transparent_tile
        ? 1.6
        : 2 * (this._cfg.ring_size ?? 1)
      : 6;
    const rows = this._cfg.ring_size ?? 1;
    return { columns, rows, min_columns: columns, min_rows: rows };
  }

  private _handleAction(e: Event, cfg?: ActionConfig): void {
    if (!cfg || cfg.action === "none") return;

    const entityId =
      cfg.tapped === "icon" && this._cfg.ring_entity ? this._cfg.ring_entity : this._cfg.entity;

    switch (cfg.action) {
      case "more-info":
        if (entityId)
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId },
            })
          );
        break;
      case "navigate":
        if (cfg.navigation_path) {
          window.history.pushState(null, "", cfg.navigation_path);
          this.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true }));
        }
        break;
      case "call-service":
        if (cfg.service) {
          const [domain, service] = cfg.service.split(".", 2);
          this._hass.callService(domain, service, cfg.service_data ?? {});
        }
        break;
      case "url":
        if (cfg.url) window.open(cfg.url, "_blank");
        break;
    }
  }

  private _hasCardAction(): boolean {
    return !!(this._cfg.tap_action && this._cfg.tap_action.action !== "none");
  }
  private _hasIconAction(): boolean {
    return !!(this._cfg.icon_tap_action && this._cfg.icon_tap_action.action !== "none");
  }

  static styles = css`
    :host {
      --tile-color: var(--state-inactive-color);
      -webkit-tap-highlight-color: transparent;
    }
    ha-card:has(.background:focus-visible) {
      --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
      --shadow-focus: 0 0 0 1px var(--tile-color);
      border-color: var(--tile-color);
      box-shadow: var(--shadow-default), var(--shadow-focus);
    }
    ha-card {
      --ha-ripple-color: var(--tile-color);
      --ha-ripple-hover-opacity: 0.04;
      --ha-ripple-pressed-opacity: 0.12;
      height: 100%;
      transition: box-shadow 180ms ease-in-out, border-color 180ms ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    ha-card.transparent-tile {
      border-width: 0;
      background: none;
    }
    ha-card.active {
      --tile-color: var(--state-icon-color);
    }
    [role="button"] {
      cursor: pointer;
      pointer-events: auto;
    }
    [role="button"]:focus {
      outline: none;
    }
    .background {
      position: absolute;
      inset: 0;
      border-radius: var(--ha-card-border-radius, 12px);
      margin: calc(-1 * var(--ha-card-border-width, 1px));
      overflow: hidden;
    }
    .container {
      margin: calc(-1 * var(--ha-card-border-width, 1px));
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      pointer-events: none;
      overflow: hidden;
    }
    .content.centred {
      justify-content: center;
    }
    .content.large {
      gap: 20px;
    }
    .content.small {
      gap: 10px;
    }
    .vertical {
      flex-direction: column;
      text-align: center;
      justify-content: center;
    }
    rt-ring {
      --tile-icon-color: var(--tile-color);
      position: relative;
      padding: 6px;
      margin: -6px;
    }
    ha-tile-badge {
      position: absolute;
      inset-inline-end: 3px;
      inset-inline-start: initial;
      top: 3px;
    }
    rt-info {
      position: relative;
      min-width: 0;
      transition: background-color 180ms ease-in-out;
      box-sizing: border-box;
    }
    hui-card-features {
      --feature-color: var(--tile-color);
      padding: 0 12px 12px;
    }
    .container.horizontal hui-card-features {
      width: calc(50% - var(--column-gap, 0px) / 2 - 12px);
      flex: none;
      --feature-height: 36px;
      padding: 0 12px;
      padding-inline-start: 0;
    }
    ha-tile-icon[data-domain="alarm_control_panel"][data-state="pending"],
    ha-tile-icon[data-domain="alarm_control_panel"][data-state="arming"],
    ha-tile-icon[data-domain="alarm_control_panel"][data-state="triggered"],
    ha-tile-icon[data-domain="lock"][data-state="jammed"] {
      animation: pulse 1s infinite;
    }
    ha-tile-badge.not-found {
      --tile-badge-background-color: var(--red-color);
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
}

customElements.define("ring-tile", RingTile);