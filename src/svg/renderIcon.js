import { svg } from "lit";
import { BE, IND, MDI_ICON_SIZE, POS, RT, SCALE, VIEW_BOX } from "../const";
import { isNumber } from "../helpers/utilities";

export function extendWithRenderIcon(RtRingSvg) {
  RtRingSvg.prototype.renderIcon = async function (
    position,
    iconStateObj,
    stateColourValue = undefined
  ) {
    // Helper to extract the SVG path for an icon.
    async function getIconSvg(icon, hass) {
      // Determine the scope where card-mod might set CSS variables.
      const parentScope =
        this.closest("rt-ring") ||
        (this.getRootNode &&
          this.getRootNode().host &&
          this.getRootNode().host.closest &&
          this.getRootNode().host.closest("rt-ring")) ||
        (this.getRootNode && this.getRootNode().host) ||
        document.body;

      // Read the card-mod icon variable (if present) and include it in the
      // cache key so changes to that CSS var invalidate the cache.
      let cardModIconVar = "";
      try {
        cardModIconVar =
          getComputedStyle(parentScope).getPropertyValue("--card-mod-icon");
      } catch (e) {
        cardModIconVar = "";
      }

      const cacheKey = `${icon || "def"}|${(cardModIconVar || "").trim()}`;

      // Ensure cache object exists on the instance
      if (!this._iconSvgCache) {
        this._iconSvgCache = {};
      }

      // Return cached path if available for this icon + card-mod var
      if (this._iconSvgCache[cacheKey]) {
        return this._iconSvgCache[cacheKey];
      }
      // Create a persistent hidden container on the instance to host
      // the off-screen `ha-state-icon`. This container is preserved
      // instead of being removed so that runtime CSS updates affect it.
      if (!this._rt_offscreen_container) {
        const offscreen = document.createElement("div");
        offscreen.style.position = "absolute";
        offscreen.style.left = "-9999px";
        offscreen.style.top = "-9999px";
        offscreen.style.width = "1px";
        offscreen.style.height = "1px";
        offscreen.style.overflow = "hidden";
        offscreen.style.pointerEvents = "none";
        // Append into the previously-determined parentScope so card-mod
        // variables apply.
        parentScope.appendChild(offscreen);
        this._rt_offscreen_container = offscreen;
      }

      if (!this._rt_ha_state_icon) {
        const haIconEl = document.createElement("ha-state-icon");
        this._rt_offscreen_container.appendChild(haIconEl);
        this._rt_ha_state_icon = haIconEl;
      }

      const haIcon = this._rt_ha_state_icon;

      // Update the off-screen element with the requested icon/state
      haIcon.icon = icon;
      haIcon.stateObj = iconStateObj;
      haIcon.hass = hass;

      // Wait for rendering (polling)
      return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 40;
        const interval = setInterval(() => {
          const haIconShadow = haIcon.shadowRoot;
          const haSvgIcon = haIconShadow
            ?.querySelector("ha-icon")
            ?.shadowRoot?.querySelector("ha-svg-icon");
          const svg = haSvgIcon?.shadowRoot?.querySelector("svg");
          const path = svg?.querySelector("path");
          if (path) {
            const vbSize =
              svg.getAttribute("viewBox")?.split(" ")[3] || MDI_ICON_SIZE;
            const d = path.getAttribute("d");

            // Cache the result for this icon + card-mod state so we don't
            // repeatedly re-extract while the values are unchanged.
            const res = { d, vbSize };
            try {
              this._iconSvgCache[cacheKey] = res;
            } catch (e) {
              // ignore caching errors
            }

            clearInterval(interval);
            resolve(res);
          } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            resolve({ d: null, vbSize: null }); // Not found
          }
          attempts++;
        }, 50);
      });
    }

    let scale;
    let translateDown;
    let baseColour = "var(--rt-icon-color, var(--tile-icon-color))";
    switch (position) {
      case POS.TOP:
        scale = [0, 0.625, 0.65, 0.566, 0.667, 0.667][this.ring_size - 1];
        translateDown = -27;
        if (this.indicator === IND.POINTER) {
          translateDown *= 0.75;
        }
        if (this.scale === SCALE.TICKS_LABELS) {
          scale *= 0.95;
          translateDown *= 0.93;
        }
        baseColour = `var(--rt-icon-color, 
                        color-mix(
                          in srgb, 
                          var(--primary-text-color, #212121) 
                          var(--top-icon-opacity, 50%), 
                          transparent
                        )
                      )`;
        break;

      case POS.MIDDLE:
        scale =
          this.ring_size === 1
            ? this.ring_type === RT.NONE
              ? // no ring so scale up to standard tile icon size
                2.778
              : (this.ring_type === RT.CLOSED ? 2.7 : 2.38) *
                (this._hasMarker && this.indicator ? 0.9 : 1)
            : // ring_size ≥2
              [2.2, 2, 1.9, 1.85, 1.8][this.ring_size - 2];

        translateDown = this.bottom_element === BE.MIN_MAX ? -3 : 0;
        break;

      case POS.BOTTOM:
        scale = [1.4, 1, 1, 1, 1, 1][this.ring_size - 1];
        translateDown = [35, 37, 40, 40, 40, 40][this.ring_size - 1];
        if (this.ring_type === RT.CLOSED) {
          translateDown = 22;
        }
        break;
    }

    const stateColour = isNumber(stateColourValue)
      ? this._grad.getSolidColour(stateColourValue)
      : "";

    const iconSvg = await getIconSvg.call(this, this.icon, this.hass);

    scale *= MDI_ICON_SIZE / parseFloat(iconSvg.vbSize);
    const iconTranslate = VIEW_BOX / 2 - (iconSvg.vbSize / 2) * scale;

    return svg`
      <path 
        d=${iconSvg.d}
        fill=${stateColour || baseColour}
        transform=
          "translate(${iconTranslate}, ${iconTranslate + translateDown})
          scale(${scale}, ${scale})" 
      />`;
  };
}
