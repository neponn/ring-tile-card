import { countDecimals } from "../helpers/utilities";

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

    // Format
    value = parseFloat(value).toFixed(decimals);

    if (trim) {
      value = parseFloat(value);
      value = value.toFixed(countDecimals(value));
    }
    // Convert 0.0 to 0 if needed
    if (parseFloat(value) === 0) {
      value = "0";
    }

    return value;
  };
}
