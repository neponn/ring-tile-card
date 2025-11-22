import { LitElement, html, css, nothing } from "lit";
import { classMap } from "lit/directives/class-map";
import { ifDefined } from "lit/directives/if-defined";

import { mdiExclamationThick, RT, US_SPELLINGS } from "./const.js";
import {
  DEFAULTS,
  SPECIFIC_DEFAULTS,
  COMPASS_DEFAULTS,
  LARGE_DEFAULTS,
  MEDIUM_DEFAULTS,
} from "./defaults.js";
import { clamp } from "./helpers/utilities.js";
import { TrackedObject } from "./helpers/trackedObject.js";

export class RingTile extends LitElement {
  _noState;
  _configProcessed = false;

  static get properties() {
    return {
      _hass: { attribute: false },
      _cfg: { state: true },

      _ringStateObj: { state: true },
      _displayStateObj: { state: true },
      _markerValue: { state: true },
      _marker2Value: { state: true },
      _minValue: { state: true },
      _maxValue: { state: true },
    };
  }

  processConfig() {
    // Resolve defaults based on specific device_class and measurement_unit
    // if they are specified. Combine with base defaults (the null case)

    // Start with base defaults
    let defaults = { ...DEFAULTS };

    // Apply extra defaults for medium rings
    if (this._cfg.ring_size && this._cfg.ring_size === 2) {
      defaults = {
        ...defaults,
        ...MEDIUM_DEFAULTS,
      };
    }

    // Apply extra defaults for large rings
    if (this._cfg.ring_size && this._cfg.ring_size > 2) {
      defaults = {
        ...defaults,
        ...LARGE_DEFAULTS,
      };
    }

    // Figure out what we can learn about the entity
    // const deviceClass = this._ringElement.attributes.device_class;
    // const measurementUnit = this._ringElement.attributes.unit_of_measurement;
    const deviceClass = this._ringElement.deviceClass;
    const measurementUnit = this._ringElement.unitOfMeasurement;
    const isCompass =
      this._cfg.ring_type && this._cfg.ring_type.startsWith(RT.COMPASS);

    // Special case for the compass
    if (isCompass) {
      defaults = {
        ...defaults,
        ...COMPASS_DEFAULTS,
      };
    } else {
      // start applying specific defaults
      const dcDefaults = SPECIFIC_DEFAULTS[deviceClass];
      if (dcDefaults) {
        const ringSize = !this._cfg.ring_size
          ? "small"
          : this._cfg.ring_size === 1
          ? "small"
          : this._cfg.ring_size === 2
          ? "medium"
          : "large";

        // We have a specific device_class
        // Start with base defaults for size
        const nullSize = dcDefaults.null || {};
        // Look for the base and specific case for measurement unit
        const nullSizeNullUnit = nullSize.null || {};
        const nullSizeSpecificUnit = nullSize[measurementUnit] || {};
        // Now look at specific defaults for size
        const specificSize = dcDefaults[ringSize] || {};
        // Look for the base and specific case for measurement unit
        const specificSizeNullUnit = specificSize.null || {};
        const specificSizeAndUnit = specificSize[measurementUnit] || {};

        // Merge defaults in order of specificity
        defaults = {
          ...defaults, // Base defaults
          ...nullSizeNullUnit, // General defaults for the device_class
          ...nullSizeSpecificUnit, // Defaults for the device_class and measurement_unit
          ...specificSizeNullUnit, // Defaults for the device_class and ring_size
          ...specificSizeAndUnit, // Specific match for device_class, ring_size, and measurement_unit
        };
      }
    }

    // handle US spellings
    US_SPELLINGS.forEach((correction) => {
      if (correction.US in this._cfg) {
        this._cfg[correction.AU] = this._cfg[correction.US];
      }
    });

    // Apply the found defaults to the config, with provided config taking precedence
    this._cfg = {
      ...defaults,
      ...this._cfg,
    };

    // Process remaining config
    this._cfg.ring_size = clamp(this._cfg.ring_size || 1, 1, 6);

    this._name =
      this._cfg.name || this._displayStateObj.attributes["friendly_name"];
    this._cfg.bottom_name = this._cfg.bottom_name || this._name;

    this._cfg.ring_only = this._cfg.ring_only || this._cfg.ring_size >= 3;

    this._configProcessed = true;
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    if (!config.entity) {
      throw new Error("You must define an entity");
    }

    this._cfg = { ...config };

    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass) {
    this._hass = hass;

    this._ringElement = new TrackedObject(
      this._cfg.ring_entity || this._cfg.entity,
      hass
    );
    this._ringStateObj = this._ringElement.stateObj;
    const ringValue = this._ringElement.value;
    this._noState = ["unavailable", "unknown"].includes(ringValue);

    this._displayElement = new TrackedObject(this._cfg.entity, hass);
    this._displayStateObj = this._displayElement.stateObj;

    if (this._ringStateObj && !this._configProcessed) {
      this.processConfig();
    }

    if (this._cfg.marker != null) {
      this._markerElement = new TrackedObject(this._cfg.marker, this._hass);
      this._markerValue = parseFloat(this._markerElement.value);
    }

    if (this._cfg.marker2 != null) {
      this._marker2Element = new TrackedObject(this._cfg.marker2, this._hass);
      this._marker2Value = parseFloat(this._marker2Element.value);
    }

    if (this._cfg.min != null) {
      this._minElement = new TrackedObject(this._cfg.min, this._hass);
      this._minValue = parseFloat(this._minElement.value);
    }
    if (this._cfg.max != null) {
      this._maxElement = new TrackedObject(this._cfg.max, this._hass);
      this._maxValue = parseFloat(this._maxElement.value);
    }
    // Handle the case that min == max to avoid annoying edge cases
    if (this._minValue === this._maxValue) {
      this._maxValue += 0.00000000001;
    }
  }

  render() {
    const stateStr = this._ringStateObj
      ? parseFloat(this._ringElement.value)
      : "unavailable";

    const stateDisplay = this._cfg.hide_state
      ? nothing
      : html`
          <state-display
            .stateObj=${this._displayStateObj}
            .hass=${this._hass}
            .name=${this._name}
          ></state-display>
        `;

    const ringPixels = [36, 96, 154, 212, 270, 330][this._cfg.ring_size - 1];
    const contentClasses = {
      vertical: false,
      centred: this._cfg.ring_only || this._cfg.ring_size >= 3,
      large: this._cfg.ring_size > 1,
      small: this._cfg.ring_size === 1,
    };
    const cardClasses = { "transparent-tile": this.transparent_tile };
    const icon =
      this._cfg.icon ||
      this._displayStateObj.attributes["icon"] ||
      this._cfg.default_icon;

    const renderString = html`
      <ha-card class="active type-tile ${classMap(cardClasses)}">
        <div
          class="background"
          @click=${(ev) => this._handleAction(ev, this._cfg.tap_action)}
          role=${ifDefined(this._hasCardAction ? "button" : undefined)}
          tabindex=${ifDefined(this._hasCardAction ? "0" : undefined)}
          aria-labelledby="info"
        >
          <ha-ripple .disabled=${!this._hasCardAction}></ha-ripple>
        </div>
        <div class="container">
          <div class="content ${classMap(contentClasses)} ">
            <rt-ring
              role=${ifDefined(this._hasIconAction ? "button" : undefined)}
              tabindex=${ifDefined(this._hasIconAction ? "0" : undefined)}
              data-domain="sensor"
              data-state=${stateStr}
              ring_size=${this._cfg.ring_size}
              @click=${(ev) =>
                this._handleAction(ev, this._cfg.icon_tap_action)}
            >
              <rt-ring-svg
                style="width:${ringPixels}px;height:${ringPixels}px;"
                slot="icon"
                ring_type=${this._cfg.ring_type}
                ring_size=${this._cfg.ring_size}
                indicator=${this._cfg.indicator}
                scale=${this._cfg.scale}
                .colour=${this._cfg.colour}
                .state=${this._ringElement}
                .display_state=${this._displayElement}
                .marker_value=${this._markerValue}
                .marker_colour=${this._cfg.marker_colour}
                .compass_marker=${this._cfg.compass_marker}
                .marker2_value=${this._marker2Value}
                .marker2_colour=${this._cfg.marker2_colour}
                .compass_marker2=${this._cfg.compass_marker2}
                .icon=${icon}
                .colourise_icon=${this._cfg.colourise_icon}
                .top_element=${this._cfg.top_element}
                .middle_element=${this._cfg.middle_element}
                .bottom_element=${this._cfg.bottom_element}
                .bottom_name=${this._cfg.bottom_name}
                .name=${this._name}
                .min=${this._minValue}
                .max=${this._maxValue}
                .min_sig_figs=${this._cfg.min_sig_figs}
                .max_decimals=${this._cfg.max_decimals}
                .hass=${this._hass}
              ></rt-ring-svg>
              ${this._noState
                ? html` <ha-tile-badge
                    style="--tile-badge-background-color: var(--orange-color)"
                  >
                    <ha-svg-icon .path=${mdiExclamationThick} />
                  </ha-tile-badge>`
                : nothing}
            </rt-ring>
            ${this._cfg.ring_only || this._cfg.ring_size >= 3
              ? nothing
              : html` <rt-info
                  id="info"
                  .primary=${this._name}
                  .secondary=${stateDisplay}
                  .large_ring=${this._cfg.ring_size > 1}
                  large_secondary=${this._cfg.large_secondary}
                ></rt-info>`}
          </div>
        </div>
      </ha-card>
    `;
    return renderString;
  }

  static getStubConfig(hass, entities, entitiesFallback) {
    // find temperature sensors, if there are any
    const sensors = entities.filter((ent) => ent.startsWith("sensor."));
    const temperatureSensors = sensors.filter(
      (sens) => hass.states[sens].attributes["device_class"] === "temperature"
    );
    return {
      // Choose a random sensor, prioritising temperature sensors
      entity:
        temperatureSensors.length > 0
          ? temperatureSensors[
              Math.floor(Math.random() * temperatureSensors.length)
            ]
          : sensors[Math.floor(Math.random() * sensors.length)],
    };
  }

  getCardSize() {
    return 1;
  }

  getGridOptions() {
    let columns = 6;
    if (this._cfg.ring_only) {
      if (this._cfg.transparent_tile) {
        columns = 1.6;
      } else {
        columns = 2 * this._cfg.ring_size;
      }
    }
    const rows = this._cfg.ring_size;
    return {
      columns,
      rows: rows,
      min_columns: columns,
      min_rows: rows,
    };
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
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
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
    .container.horizontal {
      flex-direction: row;
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
      /* margin: auto;
      padding: 0; */
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
    .vertical ha-tile-info {
      width: 100%;
      flex: none;
    }
    rt-ring {
      --tile-icon-color: var(--tile-color);
      position: relative;
      padding: 6px;
      margin: -6px;
    }
    ha-tile-badge {
      position: absolute;
      top: 3px;
      right: 3px;
      inset-inline-end: 3px;
      inset-inline-start: initial;
    }
    rt-info {
      position: relative;
      min-width: 0;
      transition: background-color 180ms ease-in-out;
      box-sizing: border-box;
    }
    hui-card-features {
      --feature-color: var(--tile-color);
      padding: 0 12px 12px 12px;
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
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  _handleAction(event, actionConfig) {
    if (!actionConfig || !actionConfig.action) return;

    const entityId =
      actionConfig.tapped === "icon" && this._cfg.ring_entity
        ? this._ringElement.entityName
        : this._displayElement.entityName;

    switch (actionConfig.action) {
      case "more-info":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId },
            })
          );
        }
        break;
      case "navigate":
        if (actionConfig.navigation_path) {
          window.history.pushState(null, "", actionConfig.navigation_path);
          this.dispatchEvent(
            new CustomEvent("location-changed", {
              bubbles: true,
              composed: true,
            })
          );
        }
        break;
      case "call-service":
        if (actionConfig.service) {
          const [domain, service] = actionConfig.service.split(".", 2);
          this._hass.callService(
            domain,
            service,
            actionConfig.service_data || {}
          );
        }
        break;
      case "url":
        if (actionConfig.url) {
          window.open(actionConfig.url, "_blank");
        }
        break;
      default:
        console.warn(`Unhandled action type: ${actionConfig.action}`);
    }
  }

  _hasCardAction() {
    return this._cfg.tap_action && this._cfg.tap_action.action !== "none";
  }
  _hasIconAction() {
    return (
      this._cfg.icon_tap_action && this._cfg.icon_tap_action.action !== "none"
    );
  }
}
