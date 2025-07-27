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
    let className;
    switch (position) {
      case POS.TOP:
        // scale = [0, 0.6, 1, 1.2, 1.8, 2.2][this.ring_size - 1];
        scale = [0, 0, 0.6, 0.5, 0.47, 0.42][this.ring_size - 1];
        // translateDown = [0, -43, -42, -45, -40, -40][this.ring_size - 1];
        translateDown = -25;
        if (this.indicator === IND.POINTER) {
          translateDown *= 0.75;
        }
        if (this.scale === SCALE.TICKS_LABELS) {
          scale *= 0.95;
        }
        className = "icon top";
        break;

      case POS.MIDDLE:
        scale =
          this.ring_size === 1
            ? this.ring_type === RT.NONE
              ? 1 // TODO fix this?
              : //   : (this.ring_type === RT.CLOSED ? 0.9 : 0.85) *
                //     (this._hasMarker && this.indicator === IND.DOT ? 0.9 : 1)
                // : [2.1, 3.1, 4, 5, 6][this.ring_size - 2];
                (this.ring_type === RT.CLOSED ? 2.5 : 2.2) *
                (this._hasMarker && this.indicator ? 0.85 : 1)
            : [1.5, 1.3, 1.15, 1, 0.9][this.ring_size - 2];

        // translateDown = this.bottom_element === BE.MIN_MAX ? -2 : 0;
        translateDown = this.bottom_element === BE.MIN_MAX ? -5 : 0;
        className = "icon middle";
        break;

      case POS.BOTTOM:
        // scale = [0.5, 0.9, 1.5, 2, 3, 3.5][this.ring_size - 1];
        scale = [1.4, 1, 0.7, 0.7, 0.7, 0.7][this.ring_size - 1];
        // translateDown = [25, 40, 38, 40, 35, 35][this.ring_size - 1];
        translateDown = [35, 37, 40, 40, 40, 40][this.ring_size - 1];
        if (this.ring_type === RT.CLOSED) {
          // TODO fix me
          translateDown = [5, 25, 26, 27, 23, 24][this.ring_size - 1];
        }
        className = "icon bottom";
        break;
    }

    // const size = MDI_ICON_SIZE * scale;
    // const translateY = translateDown * scale;

    const stateColour = stateColourValue
      ? this._grad.getSolidColour(stateColourValue)
      : "";

    const iconPath = await getIconPath(this.icon, this._iconPathCache, this.hass);

    const iconTranslate = VIEW_BOX / 2 - (MDI_ICON_SIZE / 2) * scale;

    return svg`
      <path 
        class="primary-path inner-icon" 
        d=${iconPath}
        fill=${stateColour || "var(--rt-icon-color, var(--tile-icon-color))"}
        transform=
          "translate(${iconTranslate}, ${iconTranslate + translateDown})
          scale(${scale}, ${scale})" 
      />`;
  };
}
