export function getDecimalSeparator(locale) {
  const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
  const dec = parts.find((p) => p.type === "decimal");
  return dec ? dec.value : ".";
}

export function toLocaleFixed(value, decimals) {
  const fixedValue = parseFloat(value).toFixed(decimals);
  const dp = getDecimalSeparator();
  return fixedValue.replace(".", dp);
}
