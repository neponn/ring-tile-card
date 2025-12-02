import { countDecimals } from "../helpers/utilities";
import { toLocaleFixed } from "../localise/maths";

export function extendWithGetRoundedValue(RtRingSvg) {
  RtRingSvg.prototype.getRoundedValue = function (
    value,
    trim = false,
    maxDecimals = 99
  ) {
    let decimals = Math.max(
      Math.floor(this.min_sig_figs - Math.log10(Math.abs(value))),
      0
    );

    // clamp decimals if needed
    if (decimals > (this.max_decimals ?? 99)) {
      decimals = this.max_decimals;
    }
    if (decimals > maxDecimals) {
      decimals = maxDecimals;
    }

    // ensure numeric
    const num = parseFloat(value);
    if (!isFinite(num)) {
      return String(value);
    }

    // treat exact zero consistently
    if (num === 0) {
      return "0";
    }

    // trim if needed
    if (trim) {
      decimals = Math.min(decimals, countDecimals(num), maxDecimals);
    }
    
    // Format using locale-aware formatting (respecting '.' or ',' as needed)
    const formatted = toLocaleFixed(value, decimals);

    return formatted;
  };
}
