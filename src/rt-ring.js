import { LitElement, html, css, nothing, svg } from "lit";

export class RtRing extends LitElement {
  static get properties() {
    return {
      interactive: {},
      imageStyle: {},
      imageUrl: {},
      ring_size: {},
    };
  }
  render() {
    if (this.imageUrl) {
      const imageStyle = this.imageStyle || DEFAULT_TILE_ICON_BORDER_STYLE;
      return html`
        <div class="container ${classMap({ [imageStyle]: this.imageUrl })}">
          <img alt="" src=${this.imageUrl} />
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div
        class="container size_${this.ring_size} ${this
          .interactive
          ? "background"
          : ""}"
      >
        <slot name="icon"></slot>
      </div>
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      --tile-icon-color: var(--disabled-color);
      --tile-icon-opacity: 0.2;
      --tile-icon-hover-opacity: 0.35;
      --mdc-icon-size: 24px;
      position: relative;
      user-select: none;
      transition: transform 180ms ease-in-out;
    }
    :host([interactive]:active) {
      transform: scale(1.2);
    }
    :host([interactive]:hover) {
      --tile-icon-opacity: var(--tile-icon-hover-opacity);
    }
    .container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      // width: 36px;
      // height: 36px;
      border-radius: 18px;
      overflow: visible;
      transition: box-shadow 180ms ease-in-out;
    }
    :host([interactive]:focus-visible) .container {
      box-shadow: 0 0 0 2px var(--tile-icon-color);
    }
    .container.rounded-square {
      border-radius: 8px;
    }
    .container.square {
      border-radius: 0;
    }
    .container.background::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: var(--tile-icon-color);
      transition: background-color 180ms ease-in-out, opacity 180ms ease-in-out;
      opacity: var(--tile-icon-opacity);
    }
    .container ::slotted([slot="icon"]) {
      display: flex;
      color: var(--tile-icon-color);
      transition: color 180ms ease-in-out;
      pointer-events: none;
    }
    .container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
}
