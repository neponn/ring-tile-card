export function getDecimalSeparator(locale) {
  let dp = ".";
  // figure out what the locale has to say
  if (locale?.number_format === "language") {
    // set according to the language
    const parts = new Intl.NumberFormat(locale.language).formatToParts(1.1);
    dp = parts.find((p) => p.type === "decimal").value;
  } else if (locale?.number_format.endsWith("comma")) {
    // custom number format
    dp = ",";
  }
  return dp;
}

export function toLocaleFixed(value, decimals, locale) {
  const fixedValue = parseFloat(value).toFixed(decimals);
  const dp = getDecimalSeparator(locale);
  return fixedValue.replace(".", dp);
}
