import { LitElement, html, css, nothing } from "lit";
import { classMap } from "lit/directives/class-map";
import { styleMap } from "lit/directives/style-map";
import { ifDefined } from "lit/directives/if-defined";

import { HA_COLOURS, mdiExclamationThick, RT, US_SPELLINGS } from "./const.js";
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
      _config: { state: true },

      _ringStateObj: { state: true },
      _displayStateObj: { state: true },
      _markerValue: { state: true },
      _marker2Value: { state: true },
      _minValue: { state: true },
      _maxValue: { state: true },
    };
  }

  // ============================================================================
  // Config and default handling
  // ============================================================================

  processConfig() {
    // Resolve defaults based on specific device_class and measurement_unit
    // if they are specified. Combine with base defaults (the null case)

    // Start with base defaults
    let defaults = { ...DEFAULTS };

    // Apply extra defaults for medium rings
    if (this._config.ring_size && this._config.ring_size === 2) {
      defaults = {
        ...defaults,
        ...MEDIUM_DEFAULTS,
      };
    }

    // Apply extra defaults for large rings
    if (this._config.ring_size && this._config.ring_size > 2) {
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
      this._config.ring_type && this._config.ring_type.startsWith(RT.COMPASS);

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
        const ringSize = !this._config.ring_size
          ? "small"
          : this._config.ring_size === 1
          ? "small"
          : this._config.ring_size === 2
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
      if (correction.US in this._config) {
        this._config[correction.AU] = this._config[correction.US];
      }
    });

    // Apply the found defaults to the config, with provided config taking precedence
    this._config = {
      ...defaults,
      ...this._config,
    };

    // Process remaining config
    this._config.ring_size = clamp(this._config.ring_size || 1, 1, 6);

    this._name =
      this._config.name || this._displayStateObj.attributes["friendly_name"];
    this._config.bottom_name = this._config.bottom_name || this._name;

    this._config.ring_only =
      this._config.ring_only || this._config.ring_size >= 3;

    this._configProcessed = true;
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    if (!config.entity) {
      throw new Error("You must define an entity");
    }

    this._config = { ...config };

    if (this._hass) {
      this.hass = this._hass;
    }
  }

  // ============================================================================
  // State management
  // ============================================================================

  set hass(hass) {
    this._hass = hass;

    this._ringElement = new TrackedObject(
      this._config.ring_entity || this._config.entity,
      hass
    );
    this._ringStateObj = this._ringElement.stateObj;
    const ringValue = this._ringElement.value;
    this._noState = ["unavailable", "unknown"].includes(ringValue);

    this._displayElement = new TrackedObject(this._config.entity, hass);
    this._displayStateObj = this._displayElement.stateObj;

    if (this._ringStateObj && !this._configProcessed) {
      this.processConfig();
    }

    if (this._config.marker != null) {
      this._markerElement = new TrackedObject(this._config.marker, this._hass);
      this._markerValue = parseFloat(this._markerElement.value);
    }

    if (this._config.marker2 != null) {
      this._marker2Element = new TrackedObject(
        this._config.marker2,
        this._hass
      );
      this._marker2Value = parseFloat(this._marker2Element.value);
    }

    if (this._config.min != null) {
      this._minElement = new TrackedObject(this._config.min, this._hass);
      this._minValue = parseFloat(this._minElement.value);
    }
    if (this._config.max != null) {
      this._maxElement = new TrackedObject(this._config.max, this._hass);
      this._maxValue = parseFloat(this._maxElement.value);
    }
    // Handle the case that min == max to avoid annoying edge cases
    if (this._minValue === this._maxValue) {
      this._maxValue += 0.00000000001;
    }
  }

  // ============================================================================
  // Card composition
  // ============================================================================

  render() {
    const stateStr = this._ringStateObj
      ? parseFloat(this._ringElement.value)
      : "unavailable";

    const stateDisplay = this._config.hide_state
      ? nothing
      : html`
          <state-display
            .stateObj=${this._displayStateObj}
            .hass=${this._hass}
            .name=${this._name}
          ></state-display>
        `;

    const ringPixels = [36, 96, 154, 212, 270, 330][this._config.ring_size - 1];
    const contentClasses = {
      vertical: false,
      centred: this._config.ring_only || this._config.ring_size >= 3,
      large: this._config.ring_size > 1,
      small: this._config.ring_size === 1,
    };

    const icon =
      this._config.icon ||
      this._displayStateObj.attributes["icon"] ||
      this._config.default_icon;

    // Any style tweaks?
    const cardClasses = {
      "transparent-tile": this._config.tweaks?.transparent_tile || false,
    };
    let styles = {};
    if (this._config.tweaks) {
      const tweaks = this._config.tweaks;
      Object.keys(tweaks).forEach((key) => {
        if (key.slice(0, 3) === "rt-") {
          styles[`--${key}`] = HA_COLOURS[tweaks[key]] || tweaks[key];
        }
      });
    }

    const renderString = html`
      <ha-card
        class="active ${classMap(cardClasses)}"
        style=${styleMap(styles)}
      >
        <div
          class="background"
          @pointerdown=${(ev) => this._onPointerDown(ev, "card")}
          @pointerup=${(ev) => this._onPointerUp(ev, "card")}
          @pointercancel=${(ev) => this._onPointerCancel(ev, "card")}
          @dblclick=${(ev) => this._onPointerDouble(ev, "card")}
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
              .interactive=${this._hasIconAction}
              ring_size=${this._config.ring_size}
              @pointerdown=${ifDefined(
                this._hasIconAction
                  ? (ev) => this._onPointerDown(ev, "icon")
                  : undefined
              )}
              @pointerup=${ifDefined(
                this._hasIconAction
                  ? (ev) => this._onPointerUp(ev, "icon")
                  : undefined
              )}
              @pointercancel=${ifDefined(
                this._hasIconAction
                  ? (ev) => this._onPointerCancel(ev, "icon")
                  : undefined
              )}
              @dblclick=${ifDefined(
                this._hasIconAction
                  ? (ev) => this._onPointerDouble(ev, "icon")
                  : undefined
              )}
            >
              <rt-ring-svg
                style="width: var(--rt-ring-svg-size, ${ringPixels}px);
                  height: var(--rt-ring-svg-size, ${ringPixels}px);"
                slot="icon"
                ring_type=${this._config.ring_type}
                ring_size=${this._config.ring_size}
                indicator=${this._config.indicator}
                scale=${this._config.scale}
                .colour=${this._config.colour}
                .state=${this._ringElement}
                .display_state=${this._displayElement}
                .marker_value=${this._markerValue}
                .marker_colour=${this._config.marker_colour}
                .compass_marker=${this._config.compass_marker}
                .marker2_value=${this._marker2Value}
                .marker2_colour=${this._config.marker2_colour}
                .compass_marker2=${this._config.compass_marker2}
                .icon=${icon}
                .colourise_icon=${this._config.colourise_icon}
                .top_element=${this._config.top_element}
                .middle_element=${this._config.middle_element}
                .bottom_element=${this._config.bottom_element}
                .bottom_name=${this._config.bottom_name}
                .name=${this._name}
                .min=${this._minValue}
                .max=${this._maxValue}
                .min_sig_figs=${this._config.min_sig_figs}
                .max_decimals=${this._config.max_decimals}
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
            ${this._config.ring_only || this._config.ring_size >= 3
              ? nothing
              : html` <rt-info
                  id="info"
                  .primary=${this._name}
                  .secondary=${stateDisplay}
                  .large_ring=${this._config.ring_size > 1}
                  large_secondary=${this._config.large_secondary}
                ></rt-info>`}
          </div>
        </div>
      </ha-card>
    `;
    return renderString;
  }

  // ============================================================================
  // Action handling
  // ============================================================================

  _holdTimers = {};
  _singleTapTimers = {};
  _lastTap = {};
  _holdFired = {};

  get _hasCardAction() {
    return (
      (this._config.tap_action && this._config.tap_action.action !== "none") ||
      (this._config.hold_action &&
        this._config.hold_action.action !== "none") ||
      (this._config.double_tap_action &&
        this._config.double_tap_action.action !== "none")
    );
  }

  get _hasIconAction() {
    return (
      this._config.ring_entity !== undefined ||
      (this._config.icon_tap_action &&
        this._config.icon_tap_action.action !== "none") ||
      (this._config.icon_hold_action &&
        this._config.icon_hold_action.action !== "none") ||
      (this._config.icon_double_tap_action &&
        this._config.icon_double_tap_action.action !== "none")
    );
  }

  _onPointerDown(ev, context) {
    if (context === "icon") ev.stopPropagation();

    const hasAny =
      (context === "card" && this._hasCardAction) ||
      (context === "icon" && this._hasIconAction);

    if (!hasAny) return;
    const HOLD_THRESHOLD = 500;

    this._holdFired[context] = false;
    this._holdTimers[context] = setTimeout(() => {
      this._holdFired[context] = true;
      this._fireAction(context, "hold");
    }, HOLD_THRESHOLD);
  }

  _onPointerUp(ev, context) {
    if (context === "icon") ev.stopPropagation();

    if (this._holdTimers[context]) {
      clearTimeout(this._holdTimers[context]);
      delete this._holdTimers[context];
    }

    if (this._holdFired[context]) {
      this._holdFired[context] = false;
      return;
    }

    const now = Date.now();
    const last = this._lastTap[context] || 0;
    const DOUBLE_TAP_THRESHOLD = 300;

    // Check if double-tap action is configured for this context
    const hasDoubleTap =
      (context === "card" && this._config.double_tap_action) ||
      (context === "icon" && this._config.icon_double_tap_action);

    if (now - last <= DOUBLE_TAP_THRESHOLD) {
      // Second tap within threshold — fire double-tap if configured
      if (this._singleTapTimers[context]) {
        clearTimeout(this._singleTapTimers[context]);
        delete this._singleTapTimers[context];
      }
      this._lastTap[context] = 0;
      this._fireAction(context, "double_tap");
    } else if (hasDoubleTap) {
      // First tap, but double-tap is possible — wait to see if second tap comes
      this._lastTap[context] = now;
      this._singleTapTimers[context] = setTimeout(() => {
        this._singleTapTimers[context] = undefined;
        this._lastTap[context] = 0;
        this._fireAction(context, "tap");
      }, DOUBLE_TAP_THRESHOLD);
    } else {
      // No double-tap configured — fire tap immediately
      this._lastTap[context] = 0;
      this._fireAction(context, "tap");
    }
  }

  _onPointerCancel(ev, context) {
    if (context === "icon") ev.stopPropagation();
    if (this._holdTimers[context]) {
      clearTimeout(this._holdTimers[context]);
      delete this._holdTimers[context];
    }
    if (this._singleTapTimers[context]) {
      clearTimeout(this._singleTapTimers[context]);
      delete this._singleTapTimers[context];
    }
    this._holdFired[context] = false;
    this._lastTap[context] = 0;
  }

  _onPointerDouble(ev, context) {
    if (context === "icon") ev.stopPropagation();
    if (this._singleTapTimers[context]) {
      clearTimeout(this._singleTapTimers[context]);
      delete this._singleTapTimers[context];
    }
    if (this._holdTimers[context]) {
      clearTimeout(this._holdTimers[context]);
      delete this._holdTimers[context];
    }
    this._lastTap[context] = 0;
    this._fireAction(context, "double_tap");
  }

  _fireAction(context, actionType) {
    // Map context and action type to config key
    const configMap = {
      card: {
        tap: "tap_action",
        hold: "hold_action",
        double_tap: "double_tap_action",
      },
      icon: {
        tap: "icon_tap_action",
        hold: "icon_hold_action",
        double_tap: "icon_double_tap_action",
      },
    };

    const configKey = configMap[context][actionType];
    let actionConfig = this._config[configKey];
    let entityId;

    // Handle icon tap with no icon_tap_action
    if (!actionConfig && context === "icon" && actionType === "tap")
      if (!this._config.ring_entity) {
        // no ring_entity, so fall through to card
        this._fireAction("card", actionType);
        return;
      } else {
        // default to more-info and use the ring_entity
        actionConfig = { action: "more-info" };
        entityId = this._ringElement.entityName;
      }
    else {
      // all other cases (normal)
      entityId = actionConfig.entity || this._displayElement.entityName;
    }

    if (!actionConfig) return;

    this._handleAction(
      { entity: entityId, tap_action: actionConfig },
      actionType
    );
  }

  _handleAction(actionConfig, actionName = "tap") {
    const event = new Event("hass-action", {
      bubbles: true,
      composed: true,
    });
    event.detail = {
      config: actionConfig,
      action: actionName,
    };
    this.dispatchEvent(event);
  }

  // ============================================================================
  // Card formatting
  // ============================================================================

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
    let columns = this._config.tweaks?.tile_columns || 6;
    if (this._config.ring_only && !this._config.tweaks?.tile_columns) {
      columns = 2 * this._config.ring_size;
    }
    const rows = this._config.tweaks?.tile_rows || this._config.ring_size;
    return {
      columns,
      rows: rows,
      min_columns: columns,
      min_rows: rows,
    };
  }

  // ============================================================================
  // Style sheet
  // ============================================================================

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
}
