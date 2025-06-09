import { ref } from "lit/directives/ref";
import { BE, IND, MDI_ICON_SIZE, POS, RT, SCALE } from "../const";
import { html } from "lit";
import { RtRingSvg} from "../rt-ring-svg";
// TODO: Find a way to convert this back to SVG

export function extendWithRenderIcon(RtRingSvg: RtRingSvg) {
  RtRingSvg.prototype.renderIcon = function (
    position: keyof typeof POS,
    iconStateObj: any,
    stateColourValue = undefined
  ) {
    let scale;
    let translateDown;
    let className;
    switch (position) {
      case POS.TOP:
        scale = [0, 0.6, 1, 1.2, 1.8, 2.2][this.ring_size - 1];
        translateDown = [0, -43, -42, -45, -40, -40][this.ring_size - 1];
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
              ? 1
              : (this.ring_type === RT.CLOSED ? 0.9 : 0.85) *
                (this._hasMarker && this.indicator === IND.DOT ? 0.9 : 1)
            : [2.1, 3.1, 4, 5, 6][this.ring_size - 2];
        translateDown = this.bottom_element === BE.MIN_MAX ? -2 : 0;
        className = "icon middle";
        break;

      case POS.BOTTOM:
        scale = [0.5, 0.9, 1.5, 2, 3, 3.5][this.ring_size - 1];
        translateDown = [25, 40, 38, 40, 35, 35][this.ring_size - 1];
        if (this.ring_type === RT.CLOSED) {
          translateDown = [5, 25, 26, 27, 23, 24][this.ring_size - 1];
        }
        className = "icon bottom";
        break;
    }
    if (!scale) {scale = 1;}
    if (!translateDown) {translateDown = 0;}
    const size = MDI_ICON_SIZE * scale;
    const translateY = translateDown * scale;

    const iconRef = (el: any) => { //Idk what el does, be any
      if (el) {
        const checkForSvgIcon = () => {
          const haIcon = el.shadowRoot?.querySelector("ha-icon");
          const haSvgIcon = haIcon?.shadowRoot?.querySelector("ha-svg-icon");
          if (haSvgIcon) {
            // Set the width and height of the ha-svg-icon
            haSvgIcon.style.width = `${size}px`;
            haSvgIcon.style.height = `${size}px`;
            return true; // Element found and updated
          }
          return false; // Element not found yet
        };

        // Poll every 50ms until the element is found or timeout after 2 seconds
        const maxAttempts = 40;
        let attempts = 0;
        const interval = setInterval(() => {
          if (checkForSvgIcon() || attempts >= maxAttempts) {
            clearInterval(interval); // Stop polling
          }
          attempts++;
        }, 50);
      }
    };

    const stateColour = stateColourValue
      ? `--rt-icon-state-color: ${this._grad.getSolidColour(stateColourValue)};`
      : "";
    return html`
      <div
        style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, calc(-50% + ${translateY}px));
            ${stateColour}
          "
      >
        <ha-state-icon
          .icon=${this.icon}
          .stateObj=${iconStateObj}
          .hass=${this.hass}
          class=${className}
          ${ref(iconRef)}
        ></ha-state-icon>
      </div>
    `;
  };
}
