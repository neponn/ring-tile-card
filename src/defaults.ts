import { IND, ME, RT, SCALE, TE, BE, HA_COLOURS } from "./const";

/*
Default handling for the ring-tile-card, with the following priority:
  - DEFAULTS apply to all configurations
  - if the ring_size is 2, ovverride with MEDIUM_DEFAULTS
  - if the ring_size ≥ 3, override with LARGE_DEFAULTS
  - if the ring_type is a compass, override with COMPASS_DEFAULTS
  - if the entity has a device_class, override with SPECIFIC_DEFAULTS

SPECIFIC_DEFAULTS consider:
  - the device_class of the entity
  - the ring_size (small, medium (2) or large (≥ 3))
  - the unit_of_measurement of the entity

SPECIFIC_DEFAULTS are structured in a three-level hierarchy:
  - device_class - must be an exact match
    - ring_size - null applies to all; an exact match is in addition to null
      - unit_of_measurement - null applies to all; an exact match is in addition to null
*/

// generic defaults used as a common base for all sizes
export const DEFAULTS = {
  ring_only: false,
  ring_type: RT.CLOSED,
  indicator: IND.ARC,
  scale: SCALE.NONE,
  top_element: TE.NONE,
  middle_element: ME.ICON,
  bottom_element: BE.NONE,
  colour: {
    "70%": HA_COLOURS.ha_blue,
    "80%": HA_COLOURS.ha_yellow,
    "90%": HA_COLOURS.ha_red,
  },
  min: 0,
  max: 100,
  min_sig_figs: 2,
  max_decimals: 1,
  marker_colour: "var(--secondary-text-color, grey)",
  marker2_colour: "var(--disabled-text-color, lightgrey)",
  large_secondary: false,
  hide_state: false,
  transparent_tile: false,
  colourise_icon: false,
  tap_action: {
    action: "more-info",
    tapped: "info",
  },
  icon_tap_action: {
    action: "more-info",
    tapped: "icon",
  },
};

// generic defaults applied to medium rings
export const MEDIUM_DEFAULTS = {
  ring_type: RT.OPEN,
  top_element: TE.UNIT,
  middle_element: ME.VALUE,
  bottom_element: BE.ICON,
  min_sig_figs: 2,
};

// generic defaults applied to large rings
export const LARGE_DEFAULTS = {
  ring_type: RT.OPEN,
  top_element: TE.ICON,
  middle_element: ME.VALUE_UNIT,
  bottom_element: BE.MIN_MAX,
  min_sig_figs: 3,
};

// additional defaults for the compass ring_type
export const COMPASS_DEFAULTS = {
  top_element: TE.MARKER_DIR,
  middle_element: ME.VALUE_UNIT,
  bottom_element: BE.NONE,
  marker_colour: HA_COLOURS.ha_blue,
  marker2_colour: "var(--disabled-text-color, grey)",
  indicator: IND.NONE,
  ring_size: 2,
};

// device_class matched defaults, which override the generic defaults
export const SPECIFIC_DEFAULTS = {
  temperature: {
    // temperature device_class
    null: {
      // all ring sizes
      null: {
        // all measurement units
        icon: "mdi:thermometer",
        ring_type: RT.OPEN,
        indicator: IND.DOT,
        // middle_element: ME.ICON,
        bottom_element: BE.MIN_MAX,
      },
      "°C": {
        min: 17,
        max: 27,
        colour: {
          19.5: HA_COLOURS.ha_blue,
          21: HA_COLOURS.ha_green,
          22.5: HA_COLOURS.ha_green,
          24: HA_COLOURS.ha_yellow,
          25: HA_COLOURS.ha_orange,
          27: HA_COLOURS.ha_red,
        },
      },
      "°F": {
        min: 62,
        max: 80,
        colour: {
          67: HA_COLOURS.ha_blue,
          70: HA_COLOURS.ha_green,
          73: HA_COLOURS.ha_green,
          75: HA_COLOURS.ha_yellow,
          77: HA_COLOURS.ha_orange,
          80: HA_COLOURS.ha_red,
        },
      },
    },
  },

  pressure: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        icon: "mdi:weather-partly-cloudy",
        ring_type: RT.OPEN,
        indicator: IND.POINTER,
        scale: SCALE.TICKS,
        middle_element: ME.NONE,
        bottom_element: BE.ICON,
      },
      mbar: {
        min: 980,
        max: 1040,
        colour: {
          983: HA_COLOURS.ha_blue,
          1013: HA_COLOURS.ha_green,
          1043: HA_COLOURS.ha_yellow,
        },
      },
      inHg: {
        min: 28.9,
        max: 30.4,
        colour: {
          29.0: HA_COLOURS.ha_blue,
          29.9: HA_COLOURS.ha_green,
          30.4: HA_COLOURS.ha_yellow,
        },
      },
    },
    medium: {
      // medium ring size
      null: {
        // all measurement units
        scale: SCALE.TICKS_LABELS,
        top_element: TE.NONE,
        middle_element: ME.NONE,
        bottom_element: BE.ICON,
      },
    },
    large: {
      // large ring sizes
      null: {
        // all measurement units
        scale: SCALE.TICKS_LABELS,
        middle_element: ME.VALUE,
        bottom_element: BE.UNIT,
      },
    },
  },

  humidity: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        icon: "mdi:water-percent",
        ring_type: RT.OPEN,
        indicator: IND.DOT,
        max_decimals: 0,
        colour: {
          0: HA_COLOURS.ha_red,
          50: HA_COLOURS.ha_green,
          100: HA_COLOURS.ha_blue,
        },
      },
    },
    medium: {
      // medium ring size
      null: {
        // all measurement units
        top_element: TE.NONE,
        middle_element: ME.VALUE_UNIT,
        bottom_element: BE.ICON,
      },
    },
    large: {
      // large ring sizes
      null: {
        // all measurement units
        top_element: TE.ICON,
        middle_element: ME.VALUE_UNIT,
        bottom_element: BE.NONE,
      },
    },
  },

  data_size: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        ring_type: RT.OPEN,
        bottom_element: BE.MIN_MAX,
      },
    },
    medium: {
      null: {
        top_element: TE.NONE,
        middle_element: ME.ICON,
      },
    },
  },

  wind_speed: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        icon: "mdi:weather-windy",
        ring_type: RT.OPEN,
      },
      kn: {
        min: 0,
        max: 40,
        colour: {
          10: HA_COLOURS.ha_blue,
          15: HA_COLOURS.ha_green,
          20: HA_COLOURS.ha_yellow,
          25: HA_COLOURS.ha_orange,
          30: HA_COLOURS.ha_red,
        },
      },
      "km/h": {
        min: 0,
        max: 75,
        colour: {
          20: HA_COLOURS.ha_blue,
          30: HA_COLOURS.ha_green,
          40: HA_COLOURS.ha_yellow,
          50: HA_COLOURS.ha_orange,
          60: HA_COLOURS.ha_red,
        },
      },
      mph: {
        min: 0,
        max: 45,
        colour: {
          12: HA_COLOURS.ha_blue,
          17: HA_COLOURS.ha_green,
          23: HA_COLOURS.ha_yellow,
          29: HA_COLOURS.ha_orange,
          35: HA_COLOURS.ha_red,
        },
      },
    },
  },

  precipitation: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        icon: "mdi:weather-rainy",
        ring_type: RT.OPEN,
        colour: HA_COLOURS.ha_blue,
        bottom_element: BE.MIN_MAX,
      },
      mm: {
        max: 10,
      },
      in: {
        max: 0.4,
      },
    },
    medium: {
      null: {
        top_element: TE.NONE,
        middle_element: ME.ICON,
      },
    },
  },

  battery: {
    null: {
      // all ring sizes
      "%": {
        colour: {
          20: HA_COLOURS.ha_red,
          30: HA_COLOURS.ha_orange,
          40: HA_COLOURS.ha_yellow,
          70: HA_COLOURS.ha_green,
        },
        max_decimals: 0,
      },
    },
    medium: {
      // medium ring sizes
      "%": {
        scale: SCALE.TICKS,
        ring_type: RT.CLOSED,
        top_element: TE.ICON,
        middle_element: ME.RING_VALUE_UNIT,
        bottom_element: BE.NONE,
      },
    },
    large: {
      // large ring sizes
      "%": {
        scale: SCALE.TICKS,
        ring_type: RT.CLOSED,
        top_element: TE.ICON,
        middle_element: ME.RING_VALUE_UNIT,
        bottom_element: BE.NONE,
      },
    },
  },

  power: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        ring_type: RT.OPEN,
        indicator: IND.DOT,
      },
      kW: {
        max: 3,
      },
      W: {
        max: 3000,
        bottom_element: BE.NONE,
      },
    },
    large: {
      // large ring sizes
      null: {
        // all measurement units
        scale: SCALE.TICKS_LABELS,
      },
    },
  },

  energy: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        ring_type: RT.OPEN,
      },
      kWh: {
        max: 10,
      },
      Wh: {
        max: 10000,
        bottom_element: BE.NONE,
      },
    },
    large: {
      // large ring sizes
      null: {
        // all measurement units
        scale: SCALE.TICKS_LABELS,
      },
    },
  },

  signal_strength: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        ring_type: RT.OPEN,
        middle_element: ME.RING_VALUE,
        bottom_element: BE.RING_UNIT,
        min: -90,
        max: -40,
        colour: {
          "-90": HA_COLOURS.ha_purple,
          "-80": HA_COLOURS.ha_red,
          "-70": HA_COLOURS.ha_orange,
          "-67": HA_COLOURS.ha_yellow,
          "-60": HA_COLOURS.ha_green,
        },
        max_decimals: 0,
      },
    },
    medium: {
      // medium ring size
      null: {
        // all measurement units
        bottom_element: BE.ICON,
      },
    },
    large: {
      // large ring sizes
      null: {
        // all measurement units
        middle_element: ME.RING_VALUE_UNIT,
        bottom_element: BE.MIN_MAX,
      },
    },
  },

  moisture: {
    null: {
      // all ring sizes
      null: {
        // all measurement units
        colour: {
          25: HA_COLOURS.ha_yellow,
          45: HA_COLOURS.ha_blue,
          55: HA_COLOURS.ha_blue,
          75: HA_COLOURS.ha_purple,
        },
        max_decimals: 0,
      },
    },
    medium: {
      null: {
        ring_type: RT.CLOSED,
        top_element: TE.ICON,
        middle_element: ME.VALUE_UNIT,
      },
    },
    large: {
      // large ring sizes
      null: {
        // all measurement units
        ring_type: RT.CLOSED,
        bottom_element: BE.NONE,
      },
    },
  },
};
