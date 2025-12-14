import { html, css, LitElement, nothing } from "lit";

export class RtInfo extends LitElement {
  static get properties() {
    return {
      primary: {},
      secondary: {},
      large_ring: {},
      large_secondary: {},
    };
  }

  render() {
    if (!this.large_ring) {
      return html`
        <div class="info small">
          <span class="primary small nowrap">${this.primary}</span>
          ${this.secondary
            ? html`<span class="secondary small nowrap">${this.secondary}</span>`
            : nothing}
        </div>
      `;
    } else {
      return html`
        <div class="info large">
          <span class="primary small">${this.primary}</span>
          ${this.secondary
            ? html`<span class="secondary ${this.large_secondary ? "large" : "small"}">${this.secondary}</span>`
            : nothing}
        </div>
      `;
    }
  }

  static styles = css`
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .info.small {
      height: 36px;
      justify-content: center;
    }
    .info.large {
      height: 100px;
    }
    span {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }
    .nowrap {
      white-space: nowrap;
    }
    .primary.small {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: var(--primary-text-color);
    }
    .secondary.small {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      color: var(--primary-text-color);
    }
    .primary.large {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0px; //0.8px;
      color: var(--primary-text-color);
    }
    .secondary.large {
      font-family: var(--rt-font-family, Geist), var(--ha-font-family-body);
      font-optical-sizing: auto;
      font-style: normal;
      font-weight: 600;
      font-size: 34px;
      line-height: 28px;
      // letter-spacing: 0.2px;
      color: var(--primary-text-color);
      height: 60px;
      align-items: center;
      display: flex;
    }
  `;
}