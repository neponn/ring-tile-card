import { localise } from "../localise/localise";

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

export function isDictionary(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

export function countDecimals(value, maxDecimals = 5) {
  const dp = ".";
  value = parseFloat(value.toFixed(maxDecimals));
  if (Math.floor(value) === value) return 0;
  const str = value.toString();
  if (str.indexOf(dp) === -1) return 0;
  return str.split(dp)[1].length;
}

export function roundDecimals(value, places) {
  return parseFloat(parseFloat(value).toFixed(places));
}

export function deg2rad(angle) {
  return (angle * Math.PI * 2) / 360;
}

export function getCoordFromDegrees(angle, radius, viewBox) {
  const x = -Math.sin(deg2rad(angle));
  const y = Math.cos(deg2rad(angle));
  const coordX = x * radius + viewBox / 2;
  const coordY = y * radius + viewBox / 2;
  return [coordX, coordY];
}

export function degreesToCompass(degrees) {
  // Define the compass points in order
  const compassPoints = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ].map((cp) => localise(`directions.${cp}`));

  // Normalize the angle to be within 0-360 degrees
  const normalizedDegrees = ((degrees % 360) + 360) % 360;

  // Calculate the index of the compass point
  const index = Math.round(normalizedDegrees / 22.5) % 16;

  // Return the corresponding compass point
  return compassPoints[index];
}
