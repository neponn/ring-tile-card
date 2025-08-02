import { svg } from "lit";
import { BE, IND, MDI_ICON_SIZE, POS, RT, SCALE, VIEW_BOX } from "../const";

export function extendWithRenderIconSvg(RtRingSvg) {
  RtRingSvg.prototype.renderIconSvg = async function (
    position,
    iconStateObj,
    stateColourValue = undefined
  ) {
    // Helper to get or extract the SVG path for an icon
    async function getIconPath(icon, iconCache, hass) {
      // Use a unique cache key (icon name, domain, etc.)
      const cacheKey = `${icon || "def"}`;

      // Return cached path if available
      if (iconCache[cacheKey]) {
        return iconCache[cacheKey];
      }

      // Create off-screen ha-state-icon
      const offscreen = document.createElement("div");
      offscreen.style.position = "absolute";
      offscreen.style.left = "-9999px";
      document.body.appendChild(offscreen);

      const haIcon = document.createElement("ha-state-icon");
      haIcon.icon = icon;
      haIcon.stateObj = iconStateObj;
      haIcon.hass = hass;
      offscreen.appendChild(haIcon);

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
            const d = path.getAttribute("d");
            iconCache[cacheKey] = d; // Cache the path
            document.body.removeChild(offscreen); // Clean up
            clearInterval(interval);
            resolve(d);
          } else if (attempts >= maxAttempts) {
            document.body.removeChild(offscreen); // Clean up
            clearInterval(interval);
            resolve(null); // Not found
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
        scale = [1.4, 1, 0.7, 0.7, 0.7, 0.7][this.ring_size - 1];
        translateDown = [35, 37, 40, 40, 40, 40][this.ring_size - 1];
        if (this.ring_type === RT.CLOSED) {
          translateDown = 22;
        }
        break;
    }

    const stateColour = stateColourValue
      ? this._grad.getSolidColour(stateColourValue)
      : "";

    const iconPath = await getIconPath(
      this.icon,
      this._iconPathCache,
      this.hass
    );

    const iconTranslate = VIEW_BOX / 2 - (MDI_ICON_SIZE / 2) * scale;

    return svg`
      <path 
        d=${iconPath}
        fill=${stateColour || baseColour}
        transform=
          "translate(${iconTranslate}, ${iconTranslate + translateDown})
          scale(${scale}, ${scale})" 
      />`;
  };
}
