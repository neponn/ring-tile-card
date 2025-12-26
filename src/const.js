// hard coded defauls
export const VIEW_BOX = 100; // SVG viewBox for scaling
export const MID_BOX = VIEW_BOX / 2; // SVG viewBox midpoint for scaling
export const MDI_ICON_SIZE = 24; // hard coded MDI SVG viewBox

export const HA_COLOURS = {
  ha_red: "rgb(244,67,54)", // hsl(4, 90%, 58%)
  ha_orange: "rgb(255,152,1)", // hsl(36, 100%, 50%)
  ha_yellow: "rgb(255,193,7)", // hsl(45, 100%, 51%)
  ha_green: "rgb(81,140,67)", // hsl(108, 35%, 41%)
  ha_blue: "rgb(68,115,158)", // hsl(209, 40%, 44%)
  ha_purple: "rgb(146,107,199)", // hsl(265, 45%, 60%)
  ha_grey:
    "color-mix(in srgb, var(--primary-text-color, #212121) 50%, transparent)",
  ha_gray:
    "color-mix(in srgb, var(--primary-text-color, #212121) 50%, transparent)",
};

export var mdiExclamationThick = "M10 3H14V14H10V3M10 21V17H14V21H10Z";

export const RT = {
  OPEN: "open",
  CLOSED: "closed",
  COMPASS: "compass",
  COMPASS_N: "compass_n",
  COMPASS_NESW: "compass_nesw",
  NONE: "none",
};

export const IND = {
  DOT: "dot",
  ARC: "arc",
  POINTER: "pointer",
  NONE: "none",
};

export const CM = {
  IN: "arrow_in",
  OUT: "arrow_out",
  DOT: "dot",
};

export const SCALE = {
  NONE: "none",
  TICKS: "ticks",
  TICKS_LABELS: "ticks_with_labels",
};

export const TE = {
  ICON: "icon",
  MARKER: "marker",
  MARKER_UNIT: "marker_with_unit",
  MARKER_DIR: "marker_dir",
  UNIT: "unit",
  NONE: "none",
};

export const ME = {
  NAME: "name",
  ICON: "icon",
  VALUE: "value",
  VALUE_UNIT: "value_with_unit",
  RING_VALUE: "ring_value",
  RING_VALUE_UNIT: "ring_value_with_unit",
  NONE: "none",
};

export const BE = {
  NAME: "name",
  UNIT: "unit",
  RING_UNIT: "ring_unit",
  ICON: "icon",
  MIN_MAX: "min_max",
  VALUE: "value",
  VALUE_UNIT: "value_with_unit",
  RING_VALUE: "ring_value",
  RING_VALUE_UNIT: "ring_value_with_unit",
  NONE: "none",
};

export const POS = {
  TOP: "top",
  BOTTOM: "bottom",
  MIDDLE: "middle",
  BELOW_DIAL: "below_dial",
  MIN: "min",
  MAX: "max",
};

export const US_SPELLINGS = [
  { US: "color", AU: "colour" },
  { US: "marker_color", AU: "marker_colour" },
  { US: "marker2_color", AU: "marker2_colour" },
  { US: "colorize_icon", AU: "colourise_icon" },
];

export const TRANSITION = "0.5s ease-in-out";