import {html as $hRcWJ$html, nothing as $hRcWJ$nothing, LitElement as $hRcWJ$LitElement, css as $hRcWJ$css, svg as $hRcWJ$svg} from "lit";
import {classMap as $hRcWJ$classMap} from "lit/directives/class-map.js";
import {ifDefined as $hRcWJ$ifDefined} from "lit/directives/if-defined.js";
import {classMap as $hRcWJ$classMap1} from "lit/directives/class-map";
import {ref as $hRcWJ$ref} from "lit/directives/ref";


      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire7456"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire7456"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("7Wxnt", function(module, exports) {
module.exports = JSON.parse("{\"name\":\"ring-tile-card\",\"version\":\"1.0.0\",\"scripts\":{\"build\":\"tsc --outDir build && parcel build build/src/ring-tile-card.js --dist-dir dist --no-source-maps\"},\"main\":\"dist/src/ring-tile-card.js\",\"description\":\"A Home Assistant card to visualise your sensor data, based on tile card\",\"author\":\"neponn\",\"license\":\"MIT\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/neponn/ring-tile-card.git\"},\"source\":\"src/ring-tile-card.js\",\"type\":\"module\",\"devDependencies\":{\"parcel\":\"^2.15.2\"},\"dependencies\":{\"lit\":\"^3.1.0\",\"typescript\":\"^5.8.3\"},\"include\":[\"src\"]}");

});

var $97845d1997314720$exports = {};
"use strict";
var $97845d1997314720$var$__createBinding = $97845d1997314720$exports && $97845d1997314720$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $97845d1997314720$var$__setModuleDefault = $97845d1997314720$exports && $97845d1997314720$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $97845d1997314720$var$__importStar = $97845d1997314720$exports && $97845d1997314720$exports.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") $97845d1997314720$var$__createBinding(result, mod, k[i]);
        }
        $97845d1997314720$var$__setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty($97845d1997314720$exports, "__esModule", {
    value: true
});
var $706064f87829af5f$exports = {};
"use strict";
Object.defineProperty($706064f87829af5f$exports, "__esModule", {
    value: true
});
$706064f87829af5f$exports.RingTile = void 0;



var $efd7d73b5aabc0e1$exports = {};
"use strict";
Object.defineProperty($efd7d73b5aabc0e1$exports, "__esModule", {
    value: true
});
$efd7d73b5aabc0e1$exports.US_SPELLINGS = $efd7d73b5aabc0e1$exports.POS = $efd7d73b5aabc0e1$exports.BE = $efd7d73b5aabc0e1$exports.ME = $efd7d73b5aabc0e1$exports.TE = $efd7d73b5aabc0e1$exports.SCALE = $efd7d73b5aabc0e1$exports.IND = $efd7d73b5aabc0e1$exports.RT = $efd7d73b5aabc0e1$exports.mdiExclamationThick = $efd7d73b5aabc0e1$exports.HA_COLOURS = $efd7d73b5aabc0e1$exports.MDI_ICON_SIZE = $efd7d73b5aabc0e1$exports.MID_BOX = $efd7d73b5aabc0e1$exports.VIEW_BOX = void 0;
// hard coded defauls
$efd7d73b5aabc0e1$exports.VIEW_BOX = 100; // SVG viewBox for scaling
$efd7d73b5aabc0e1$exports.MID_BOX = $efd7d73b5aabc0e1$exports.VIEW_BOX / 2; // SVG viewBox midpoint for scaling
$efd7d73b5aabc0e1$exports.MDI_ICON_SIZE = 24; // hard coded MDI SVG viewBox
$efd7d73b5aabc0e1$exports.HA_COLOURS = {
    ha_red: "rgb(244,67,54)",
    ha_orange: "rgb(255,152,1)",
    ha_yellow: "rgb(255,193,7)",
    ha_green: "rgb(81,140,67)",
    ha_blue: "rgb(68,115,158)",
    ha_purple: "rgb(146,107,199)",
    ha_grey: "color-mix(in srgb, var(--primary-text-color, #212121) 50%, transparent)",
    ha_gray: "color-mix(in srgb, var(--primary-text-color, #212121) 50%, transparent)"
};
$efd7d73b5aabc0e1$exports.mdiExclamationThick = "M10 3H14V14H10V3M10 21V17H14V21H10Z";
$efd7d73b5aabc0e1$exports.RT = {
    OPEN: "open",
    CLOSED: "closed",
    COMPASS: "compass",
    COMPASS_N: "compass_n",
    COMPASS_NESW: "compass_nesw",
    NONE: "none"
};
$efd7d73b5aabc0e1$exports.IND = {
    DOT: "dot",
    ARC: "arc",
    POINTER: "pointer",
    NONE: "none"
};
$efd7d73b5aabc0e1$exports.SCALE = {
    NONE: "none",
    TICKS: "ticks",
    TICKS_LABELS: "ticks_with_labels"
};
$efd7d73b5aabc0e1$exports.TE = {
    ICON: "icon",
    MARKER: "marker",
    MARKER_UNIT: "marker_with_unit",
    MARKER_DIR: "marker_dir",
    UNIT: "unit",
    NONE: "none"
};
$efd7d73b5aabc0e1$exports.ME = {
    NAME: "name",
    ICON: "icon",
    VALUE: "value",
    VALUE_UNIT: "value_with_unit",
    RING_VALUE: "ring_value",
    RING_VALUE_UNIT: "ring_value_with_unit",
    NONE: "none"
};
$efd7d73b5aabc0e1$exports.BE = {
    NAME: "name",
    UNIT: "unit",
    RING_UNIT: "ring_unit",
    ICON: "icon",
    MIN_MAX: "min_max",
    VALUE: "value",
    VALUE_UNIT: "value_with_unit",
    RING_VALUE: "ring_value",
    RING_VALUE_UNIT: "ring_value_with_unit",
    NONE: "none"
};
$efd7d73b5aabc0e1$exports.POS = {
    TOP: "top",
    BOTTOM: "bottom",
    MIDDLE: "middle",
    BELOW_DIAL: "below_dial",
    MIN: "min",
    MAX: "max"
};
$efd7d73b5aabc0e1$exports.US_SPELLINGS = [
    {
        US: "color",
        AU: "colour"
    },
    {
        US: "marker_color",
        AU: "marker_colour"
    },
    {
        US: "marker2_color",
        AU: "marker2_colour"
    },
    {
        US: "colorize_icon",
        AU: "colourise_icon"
    }
];


var $048d2d47b5035894$exports = {};
"use strict";
Object.defineProperty($048d2d47b5035894$exports, "__esModule", {
    value: true
});
$048d2d47b5035894$exports.SPECIFIC_DEFAULTS = $048d2d47b5035894$exports.COMPASS_DEFAULTS = $048d2d47b5035894$exports.LARGE_DEFAULTS = $048d2d47b5035894$exports.MEDIUM_DEFAULTS = $048d2d47b5035894$exports.DEFAULTS = void 0;

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
*/ // generic defaults used as a common base for all sizes
$048d2d47b5035894$exports.DEFAULTS = {
    ring_only: false,
    ring_type: $efd7d73b5aabc0e1$exports.RT.CLOSED,
    indicator: $efd7d73b5aabc0e1$exports.IND.ARC,
    scale: $efd7d73b5aabc0e1$exports.SCALE.NONE,
    top_element: $efd7d73b5aabc0e1$exports.TE.NONE,
    middle_element: $efd7d73b5aabc0e1$exports.ME.ICON,
    bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE,
    colour: {
        "70%": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
        "80%": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
        "90%": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red
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
        tapped: "info"
    },
    icon_tap_action: {
        action: "more-info",
        tapped: "icon"
    }
};
// generic defaults applied to medium rings
$048d2d47b5035894$exports.MEDIUM_DEFAULTS = {
    ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
    top_element: $efd7d73b5aabc0e1$exports.TE.UNIT,
    middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE,
    bottom_element: $efd7d73b5aabc0e1$exports.BE.ICON,
    min_sig_figs: 2
};
// generic defaults applied to large rings
$048d2d47b5035894$exports.LARGE_DEFAULTS = {
    ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
    top_element: $efd7d73b5aabc0e1$exports.TE.ICON,
    middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT,
    bottom_element: $efd7d73b5aabc0e1$exports.BE.MIN_MAX,
    min_sig_figs: 3
};
// additional defaults for the compass ring_type
$048d2d47b5035894$exports.COMPASS_DEFAULTS = {
    top_element: $efd7d73b5aabc0e1$exports.TE.MARKER_DIR,
    middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT,
    bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE,
    marker_colour: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
    marker2_colour: "var(--disabled-text-color, grey)",
    indicator: $efd7d73b5aabc0e1$exports.IND.NONE,
    ring_size: 2
};
// device_class matched defaults, which override the generic defaults
$048d2d47b5035894$exports.SPECIFIC_DEFAULTS = {
    temperature: {
        // temperature device_class
        null: {
            // all ring sizes
            null: {
                // all measurement units
                icon: "mdi:thermometer",
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                indicator: $efd7d73b5aabc0e1$exports.IND.DOT,
                // middle_element: ME.ICON,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.MIN_MAX
            },
            "\xb0C": {
                min: 17,
                max: 27,
                colour: {
                    19.5: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    21: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    22.5: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    24: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    25: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    27: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red
                }
            },
            "\xb0F": {
                min: 62,
                max: 80,
                colour: {
                    67: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    70: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    73: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    75: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    77: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    80: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red
                }
            }
        }
    },
    pressure: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                icon: "mdi:weather-partly-cloudy",
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                indicator: $efd7d73b5aabc0e1$exports.IND.POINTER,
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS,
                middle_element: $efd7d73b5aabc0e1$exports.ME.NONE,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.ICON
            },
            mbar: {
                min: 980,
                max: 1040,
                colour: {
                    983: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    1013: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    1043: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow
                }
            },
            inHg: {
                min: 28.9,
                max: 30.4,
                colour: {
                    29.0: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    29.9: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    30.4: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow
                }
            }
        },
        medium: {
            // medium ring size
            null: {
                // all measurement units
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS,
                top_element: $efd7d73b5aabc0e1$exports.TE.NONE,
                middle_element: $efd7d73b5aabc0e1$exports.ME.NONE,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.ICON
            }
        },
        large: {
            // large ring sizes
            null: {
                // all measurement units
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS,
                middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.UNIT
            }
        }
    },
    humidity: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                icon: "mdi:water-percent",
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                indicator: $efd7d73b5aabc0e1$exports.IND.DOT,
                max_decimals: 0,
                colour: {
                    0: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red,
                    50: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    100: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue
                }
            }
        },
        medium: {
            // medium ring size
            null: {
                // all measurement units
                top_element: $efd7d73b5aabc0e1$exports.TE.NONE,
                middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.ICON
            }
        },
        large: {
            // large ring sizes
            null: {
                // all measurement units
                top_element: $efd7d73b5aabc0e1$exports.TE.ICON,
                middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE
            }
        }
    },
    data_size: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.MIN_MAX
            }
        },
        medium: {
            null: {
                top_element: $efd7d73b5aabc0e1$exports.TE.NONE,
                middle_element: $efd7d73b5aabc0e1$exports.ME.ICON
            }
        }
    },
    wind_speed: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                icon: "mdi:weather-windy",
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN
            },
            kn: {
                min: 0,
                max: 40,
                colour: {
                    10: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    15: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    20: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    25: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    30: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red
                }
            },
            "km/h": {
                min: 0,
                max: 75,
                colour: {
                    20: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    30: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    40: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    50: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    60: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red
                }
            },
            mph: {
                min: 0,
                max: 45,
                colour: {
                    12: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    17: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green,
                    23: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    29: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    35: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red
                }
            }
        }
    },
    precipitation: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                icon: "mdi:weather-rainy",
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                colour: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.MIN_MAX
            },
            mm: {
                max: 10
            },
            in: {
                max: 0.4
            }
        },
        medium: {
            null: {
                top_element: $efd7d73b5aabc0e1$exports.TE.NONE,
                middle_element: $efd7d73b5aabc0e1$exports.ME.ICON
            }
        }
    },
    battery: {
        null: {
            // all ring sizes
            "%": {
                colour: {
                    20: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red,
                    30: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    40: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    70: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green
                },
                max_decimals: 0
            }
        },
        medium: {
            // medium ring sizes
            "%": {
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS,
                ring_type: $efd7d73b5aabc0e1$exports.RT.CLOSED,
                top_element: $efd7d73b5aabc0e1$exports.TE.ICON,
                middle_element: $efd7d73b5aabc0e1$exports.ME.RING_VALUE_UNIT,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE
            }
        },
        large: {
            // large ring sizes
            "%": {
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS,
                ring_type: $efd7d73b5aabc0e1$exports.RT.CLOSED,
                top_element: $efd7d73b5aabc0e1$exports.TE.ICON,
                middle_element: $efd7d73b5aabc0e1$exports.ME.RING_VALUE_UNIT,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE
            }
        }
    },
    power: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                indicator: $efd7d73b5aabc0e1$exports.IND.DOT
            },
            kW: {
                max: 3
            },
            W: {
                max: 3000,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE
            }
        },
        large: {
            // large ring sizes
            null: {
                // all measurement units
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS
            }
        }
    },
    energy: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN
            },
            kWh: {
                max: 10
            },
            Wh: {
                max: 10000,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE
            }
        },
        large: {
            // large ring sizes
            null: {
                // all measurement units
                scale: $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS
            }
        }
    },
    signal_strength: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                ring_type: $efd7d73b5aabc0e1$exports.RT.OPEN,
                middle_element: $efd7d73b5aabc0e1$exports.ME.RING_VALUE,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.RING_UNIT,
                min: -90,
                max: -40,
                colour: {
                    "-90": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_purple,
                    "-80": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_red,
                    "-70": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_orange,
                    "-67": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    "-60": $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_green
                },
                max_decimals: 0
            }
        },
        medium: {
            // medium ring size
            null: {
                // all measurement units
                bottom_element: $efd7d73b5aabc0e1$exports.BE.ICON
            }
        },
        large: {
            // large ring sizes
            null: {
                // all measurement units
                middle_element: $efd7d73b5aabc0e1$exports.ME.RING_VALUE_UNIT,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.MIN_MAX
            }
        }
    },
    moisture: {
        null: {
            // all ring sizes
            null: {
                // all measurement units
                colour: {
                    25: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_yellow,
                    45: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    55: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_blue,
                    75: $efd7d73b5aabc0e1$exports.HA_COLOURS.ha_purple
                },
                max_decimals: 0
            }
        },
        medium: {
            null: {
                ring_type: $efd7d73b5aabc0e1$exports.RT.CLOSED,
                top_element: $efd7d73b5aabc0e1$exports.TE.ICON,
                middle_element: $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT
            }
        },
        large: {
            // large ring sizes
            null: {
                // all measurement units
                ring_type: $efd7d73b5aabc0e1$exports.RT.CLOSED,
                bottom_element: $efd7d73b5aabc0e1$exports.BE.NONE
            }
        }
    }
};


var $a99931ec60826f34$exports = {};
"use strict";
Object.defineProperty($a99931ec60826f34$exports, "__esModule", {
    value: true
});
$a99931ec60826f34$exports.isNumber = $a99931ec60826f34$var$isNumber;
$a99931ec60826f34$exports.clamp = $a99931ec60826f34$var$clamp;
$a99931ec60826f34$exports.deg2rad = $a99931ec60826f34$var$deg2rad;
$a99931ec60826f34$exports.getCoordFromDegrees = $a99931ec60826f34$var$getCoordFromDegrees;
$a99931ec60826f34$exports.degreesToCompass = $a99931ec60826f34$var$degreesToCompass;
function $a99931ec60826f34$var$isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
function $a99931ec60826f34$var$clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}
function $a99931ec60826f34$var$deg2rad(angle) {
    return angle * Math.PI * 2 / 360;
}
function $a99931ec60826f34$var$getCoordFromDegrees(angle, radius, viewBox) {
    const x = -Math.sin($a99931ec60826f34$var$deg2rad(angle));
    const y = Math.cos($a99931ec60826f34$var$deg2rad(angle));
    const coordX = x * radius + viewBox / 2;
    const coordY = y * radius + viewBox / 2;
    return [
        coordX,
        coordY
    ];
}
function $a99931ec60826f34$var$degreesToCompass(degrees) {
    // Normalize the angle to be within 0-360 degrees
    const normalizedDegrees = (degrees % 360 + 360) % 360;
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
        "NNW"
    ];
    // Calculate the index of the compass point
    const index = Math.round(normalizedDegrees / 22.5) % 16;
    // Return the corresponding compass point
    return compassPoints[index];
}


const $706064f87829af5f$var$DEFAULTS = {
    ring_only: false,
    ring_type: "default",
    indicator: "default",
    scale: "default",
    top_element: "default",
    middle_element: "default",
    bottom_element: "default",
    colour: {
        "70%": "#f39c12",
        "80%": "#e67e22",
        "90%": "#e74c3c"
    },
    min: 0,
    max: 100,
    min_sig_figs: 2,
    max_decimals: 1,
    colourise_icon: false,
    transparent_tile: false,
    large_secondary: false,
    hide_state: false,
    tap_action: {
        action: "more-info"
    },
    icon_tap_action: {
        action: "more-info",
        tapped: "icon"
    }
};
// Main element
class $706064f87829af5f$var$RingTile extends $hRcWJ$LitElement {
    constructor(){
        super(...arguments);
        this._name = "";
        this._noState = false;
        this._configProcessed = false;
    }
    // Lit property metadata
    static get properties() {
        return {
            _hass: {
                attribute: false
            },
            _cfg: {
                state: true
            },
            _ringStateObj: {
                state: true
            },
            _displayStateObj: {
                state: true
            },
            _markerValue: {
                state: true
            },
            _marker2Value: {
                state: true
            },
            _min: {
                state: true
            },
            _max: {
                state: true
            }
        };
    }
    processConfig() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var _j, _k;
        if (!this._ringStateObj || !this._displayStateObj) return;
        // Start with generic defaults
        let defaults = Object.assign({}, $706064f87829af5f$var$DEFAULTS);
        // Size-based overrides
        if (this._cfg.ring_size === 2) defaults = Object.assign(Object.assign({}, defaults), $048d2d47b5035894$exports.MEDIUM_DEFAULTS);
        if (((_a = this._cfg.ring_size) !== null && _a !== void 0 ? _a : 1) > 2) defaults = Object.assign(Object.assign({}, defaults), $048d2d47b5035894$exports.LARGE_DEFAULTS);
        // device_class / compass overrides
        const dc = this._ringStateObj.attributes.device_class;
        const unit = this._ringStateObj.attributes.unit_of_measurement;
        const isCompass = (_b = this._cfg.ring_type) === null || _b === void 0 ? void 0 : _b.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS);
        if (isCompass) defaults = Object.assign(Object.assign({}, defaults), Object.assign(Object.assign({}, $048d2d47b5035894$exports.COMPASS_DEFAULTS), {
            ring_size: $048d2d47b5035894$exports.COMPASS_DEFAULTS.ring_size
        }));
        else if (dc && dc in $048d2d47b5035894$exports.SPECIFIC_DEFAULTS) {
            const dcDefaults = $048d2d47b5035894$exports.SPECIFIC_DEFAULTS[dc];
            const sizeKey = !this._cfg.ring_size || this._cfg.ring_size === 1 ? "small" : this._cfg.ring_size === 2 ? "medium" : "large";
            // Apply base device-class defaults (not size-specific)
            defaults = Object.assign(Object.assign(Object.assign({}, defaults), dcDefaults.null && "null" in dcDefaults.null ? (_c = dcDefaults.null.null) !== null && _c !== void 0 ? _c : {} : {}), dcDefaults.null && typeof ((_d = dcDefaults.null) === null || _d === void 0 ? void 0 : _d[unit]) === "object" && ((_e = dcDefaults.null) === null || _e === void 0 ? void 0 : _e[unit]) !== null ? (_f = dcDefaults.null) === null || _f === void 0 ? void 0 : _f[unit] : {});
            // Conditionally apply size-specific defaults with robust structure handling
            if (dcDefaults && sizeKey in dcDefaults) {
                const sizeSpecificDefaults = dcDefaults[sizeKey];
                if (typeof sizeSpecificDefaults === 'object' && sizeSpecificDefaults !== null) {
                    let sizeConfig = {};
                    // Case 1: A config exists for the specific unit. Use it.
                    if (unit && unit in sizeSpecificDefaults) sizeConfig = sizeSpecificDefaults[unit];
                    else if ('null' in sizeSpecificDefaults) sizeConfig = sizeSpecificDefaults.null;
                    else sizeConfig = sizeSpecificDefaults;
                    defaults = Object.assign(Object.assign({}, defaults), sizeConfig);
                }
            }
        }
        // US→AU spelling variants
        $efd7d73b5aabc0e1$exports.US_SPELLINGS.forEach(({ US: US, AU: AU })=>{
            if (US in this._cfg) this._cfg[AU] = this._cfg[US];
        });
        // Final merge and type assertion to resolve persistent type errors
        this._cfg = Object.assign(Object.assign({}, defaults), this._cfg);
        // Normalise
        this._cfg.ring_size = (0, $a99931ec60826f34$exports.clamp)(this._cfg.ring_size || 1, 1, 6);
        this._name = this._cfg.name || this._displayStateObj.attributes["friendly_name"];
        (_g = (_j = this._cfg).bottom_name) !== null && _g !== void 0 ? _g : _j.bottom_name = this._name;
        (_k = this._cfg).ring_only || (_k.ring_only = ((_h = this._cfg.ring_size) !== null && _h !== void 0 ? _h : 1) >= 3);
        // Literals vs entities
        if ((0, $a99931ec60826f34$exports.isNumber)(this._cfg.marker)) this._markerValue = Number(this._cfg.marker);
        else this._markerEntity = this._cfg.marker;
        if ((0, $a99931ec60826f34$exports.isNumber)(this._cfg.marker2)) this._marker2Value = Number(this._cfg.marker2);
        else this._marker2Entity = this._cfg.marker2;
        if ((0, $a99931ec60826f34$exports.isNumber)(this._cfg.min)) this._min = Number(this._cfg.min);
        else this._minEntity = this._cfg.min;
        if ((0, $a99931ec60826f34$exports.isNumber)(this._cfg.max)) this._max = Number(this._cfg.max);
        else this._maxEntity = this._cfg.max;
        this._configProcessed = true;
    }
    setConfig(config) {
        if (!(config === null || config === void 0 ? void 0 : config.entity)) throw new Error("You must define an entity");
        this._cfg = Object.assign({}, config);
        if (this._hass) this.hass = this._hass; // trigger initial binding
    }
    set hass(hass) {
        var _a, _b, _c, _d, _e;
        this._hass = hass;
        this._ringStateObj = hass.states[(_a = this._cfg.ring_entity) !== null && _a !== void 0 ? _a : this._cfg.entity];
        this._displayStateObj = hass.states[this._cfg.entity];
        if (!this._ringStateObj) {
            this._noState = true;
            return;
        }
        this._noState = [
            "unavailable",
            "unknown"
        ].includes(this._ringStateObj.state);
        if (!this._configProcessed) this.processConfig();
        // Dynamic entities
        if (this._markerEntity) this._markerValue = Number((_b = hass.states[this._markerEntity]) === null || _b === void 0 ? void 0 : _b.state);
        if (this._marker2Entity) this._marker2Value = Number((_c = hass.states[this._marker2Entity]) === null || _c === void 0 ? void 0 : _c.state);
        if (this._minEntity) this._min = Number((_d = hass.states[this._minEntity]) === null || _d === void 0 ? void 0 : _d.state);
        if (this._maxEntity) this._max = Number((_e = hass.states[this._maxEntity]) === null || _e === void 0 ? void 0 : _e.state);
        if (this._min !== undefined && this._max !== undefined && this._min === this._max) this._max += 1e-11; // avoid divide-by-zero downstream
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (!this._cfg || !this._ringStateObj || !this._displayStateObj) return (0, $hRcWJ$html)`
            <ha-card class="type-tile">
                <div class="background"></div>
                <div class="container">
                    ${!this._cfg ? "Configuration missing." : "Entity not available."}
                </div>
            </ha-card>
        `;
        const stateStr = this._ringStateObj.state;
        const ringPixels = [
            36,
            96,
            154,
            212,
            270,
            330
        ][((_a = this._cfg.ring_size) !== null && _a !== void 0 ? _a : 1) - 1];
        const stateDisplay = !this._cfg.hide_state && this._displayStateObj ? (0, $hRcWJ$html)`
          <state-display
            .stateObj=${this._displayStateObj}
            .hass=${this._hass}
            .name=${this._name}
          ></state-display>
        ` : $hRcWJ$nothing;
        return (0, $hRcWJ$html)`
      <ha-card class="active type-tile ${(0, $hRcWJ$classMap)({
            "transparent-tile": !!this._cfg.transparent_tile
        })}">
        <div
          class="background"
          @click=${(e)=>this._handleAction(e, this._cfg.tap_action)}
          role=${(0, $hRcWJ$ifDefined)(this._hasCardAction() ? "button" : undefined)}
          tabindex=${(0, $hRcWJ$ifDefined)(this._hasCardAction() ? 0 : undefined)}
          aria-labelledby="info"
        >
          <ha-ripple .disabled=${!this._hasCardAction()}></ha-ripple>
        </div>

        <div class="container">
          <div class="content ${(0, $hRcWJ$classMap)({
            vertical: false,
            centred: !!this._cfg.ring_only || ((_b = this._cfg.ring_size) !== null && _b !== void 0 ? _b : 1) >= 3,
            large: ((_c = this._cfg.ring_size) !== null && _c !== void 0 ? _c : 1) > 1,
            small: ((_d = this._cfg.ring_size) !== null && _d !== void 0 ? _d : 1) === 1
        })}">
            <rt-ring
              role=${(0, $hRcWJ$ifDefined)(this._hasIconAction() ? "button" : undefined)}
              tabindex=${(0, $hRcWJ$ifDefined)(this._hasIconAction() ? 0 : undefined)}
              data-domain="sensor"
              data-state=${stateStr}
              ring_size=${(_e = this._cfg.ring_size) !== null && _e !== void 0 ? _e : 1}
              @click=${(e)=>this._handleAction(e, this._cfg.icon_tap_action)}
            >
              <rt-ring-svg
                slot="icon"
                style="width:${ringPixels}px;height:${ringPixels}px;"
                .ring_type=${(0, $hRcWJ$ifDefined)(this._cfg.ring_type)}
                .ring_size=${(_f = this._cfg.ring_size) !== null && _f !== void 0 ? _f : 1}
                .indicator=${(0, $hRcWJ$ifDefined)(this._cfg.indicator)}
                .scale=${(0, $hRcWJ$ifDefined)(this._cfg.scale)}
                .colour=${(0, $hRcWJ$ifDefined)(this._cfg.colour)}
                .state=${this._ringStateObj}
                .display_state=${this._displayStateObj}
                .marker_value=${(0, $hRcWJ$ifDefined)(this._markerValue)}
                .marker_colour=${(0, $hRcWJ$ifDefined)(this._cfg.marker_colour)}
                .marker2_value=${(0, $hRcWJ$ifDefined)(this._marker2Value)}
                .marker2_colour=${(0, $hRcWJ$ifDefined)(this._cfg.marker2_colour)}
                .icon=${(0, $hRcWJ$ifDefined)(this._cfg.icon)}
                .colourise_icon=${(_g = this._cfg.colourise_icon) !== null && _g !== void 0 ? _g : false}
                .top_element=${(0, $hRcWJ$ifDefined)(this._cfg.top_element)}
                .middle_element=${(0, $hRcWJ$ifDefined)(this._cfg.middle_element)}
                .bottom_element=${(0, $hRcWJ$ifDefined)(this._cfg.bottom_element)}
                .bottom_name=${(0, $hRcWJ$ifDefined)(this._cfg.bottom_name)}
                .name=${this._name}
                .min=${(0, $hRcWJ$ifDefined)(this._min)}
                .max=${(0, $hRcWJ$ifDefined)(this._max)}
                .min_sig_figs=${(0, $hRcWJ$ifDefined)(this._cfg.min_sig_figs)}
                .max_decimals=${(0, $hRcWJ$ifDefined)(this._cfg.max_decimals)}
                .hass=${this._hass}
              ></rt-ring-svg>

              ${this._noState ? (0, $hRcWJ$html)`<ha-tile-badge style="--tile-badge-background-color: var(--orange-color)">
                    <ha-svg-icon .path=${$efd7d73b5aabc0e1$exports.mdiExclamationThick}></ha-svg-icon>
                  </ha-tile-badge>` : $hRcWJ$nothing}
            </rt-ring>

            ${this._cfg.ring_only || ((_h = this._cfg.ring_size) !== null && _h !== void 0 ? _h : 1) >= 3 ? $hRcWJ$nothing : (0, $hRcWJ$html)`<rt-info
                  id="info"
                  .primary=${this._name}
                  .secondary=${stateDisplay}
                  .large_ring=${((_j = this._cfg.ring_size) !== null && _j !== void 0 ? _j : 1) > 1}
                  .large_secondary=${!!this._cfg.large_secondary}
                ></rt-info>`}
          </div>
        </div>
      </ha-card>
    `;
    }
    static getStubConfig(hass, entities) {
        const sensors = entities.filter((e)=>e.startsWith("sensor."));
        const temps = sensors.filter((e)=>{
            var _a;
            return ((_a = hass.states[e]) === null || _a === void 0 ? void 0 : _a.attributes.device_class) === "temperature";
        });
        return {
            entity: temps.length ? temps[Math.floor(Math.random() * temps.length)] : sensors[0]
        };
    }
    getCardSize() {
        return 1;
    }
    getGridOptions() {
        var _a, _b;
        const columns = this._cfg.ring_only ? this._cfg.transparent_tile ? 1.6 : 2 * ((_a = this._cfg.ring_size) !== null && _a !== void 0 ? _a : 1) : 6;
        const rows = (_b = this._cfg.ring_size) !== null && _b !== void 0 ? _b : 1;
        return {
            columns: columns,
            rows: rows,
            min_columns: columns,
            min_rows: rows
        };
    }
    _handleAction(e, cfg) {
        var _a;
        if (!cfg || cfg.action === "none") return;
        const entityId = cfg.tapped === "icon" && this._cfg.ring_entity ? this._cfg.ring_entity : this._cfg.entity;
        switch(cfg.action){
            case "more-info":
                if (entityId) this.dispatchEvent(new CustomEvent("hass-more-info", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        entityId: entityId
                    }
                }));
                break;
            case "navigate":
                if (cfg.navigation_path) {
                    window.history.pushState(null, "", cfg.navigation_path);
                    this.dispatchEvent(new CustomEvent("location-changed", {
                        bubbles: true,
                        composed: true
                    }));
                }
                break;
            case "call-service":
                if (cfg.service) {
                    const [domain, service] = cfg.service.split(".", 2);
                    this._hass.callService(domain, service, (_a = cfg.service_data) !== null && _a !== void 0 ? _a : {});
                }
                break;
            case "url":
                if (cfg.url) window.open(cfg.url, "_blank");
                break;
        }
    }
    _hasCardAction() {
        return !!(this._cfg.tap_action && this._cfg.tap_action.action !== "none");
    }
    _hasIconAction() {
        return !!(this._cfg.icon_tap_action && this._cfg.icon_tap_action.action !== "none");
    }
}
$706064f87829af5f$exports.RingTile = $706064f87829af5f$var$RingTile;
$706064f87829af5f$var$RingTile.styles = (0, $hRcWJ$css)`
    :host {
      --tile-color: var(--state-inactive-color);
      -webkit-tap-highlight-color: transparent;
    }
    ha-card:has(.background:focus-visible) {
      --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
      --shadow-focus: 0 0 0 1px var(--tile-color);
      border-color: var(--tile-color);
      box-shadow: var(--shadow-default), var(--shadow-focus);
    }
    ha-card {
      --ha-ripple-color: var(--tile-color);
      --ha-ripple-hover-opacity: 0.04;
      --ha-ripple-pressed-opacity: 0.12;
      height: 100%;
      transition: box-shadow 180ms ease-in-out, border-color 180ms ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    ha-card.transparent-tile {
      border-width: 0;
      background: none;
    }
    ha-card.active {
      --tile-color: var(--state-icon-color);
    }
    [role="button"] {
      cursor: pointer;
      pointer-events: auto;
    }
    [role="button"]:focus {
      outline: none;
    }
    .background {
      position: absolute;
      inset: 0;
      border-radius: var(--ha-card-border-radius, 12px);
      margin: calc(-1 * var(--ha-card-border-width, 1px));
      overflow: hidden;
    }
    .container {
      margin: calc(-1 * var(--ha-card-border-width, 1px));
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      pointer-events: none;
      overflow: hidden;
    }
    .content.centred {
      justify-content: center;
    }
    .content.large {
      gap: 20px;
    }
    .content.small {
      gap: 10px;
    }
    .vertical {
      flex-direction: column;
      text-align: center;
      justify-content: center;
    }
    rt-ring {
      --tile-icon-color: var(--tile-color);
      position: relative;
      padding: 6px;
      margin: -6px;
    }
    ha-tile-badge {
      position: absolute;
      inset-inline-end: 3px;
      inset-inline-start: initial;
      top: 3px;
    }
    rt-info {
      position: relative;
      min-width: 0;
      transition: background-color 180ms ease-in-out;
      box-sizing: border-box;
    }
    hui-card-features {
      --feature-color: var(--tile-color);
      padding: 0 12px 12px;
    }
    .container.horizontal hui-card-features {
      width: calc(50% - var(--column-gap, 0px) / 2 - 12px);
      flex: none;
      --feature-height: 36px;
      padding: 0 12px;
      padding-inline-start: 0;
    }
    ha-tile-icon[data-domain="alarm_control_panel"][data-state="pending"],
    ha-tile-icon[data-domain="alarm_control_panel"][data-state="arming"],
    ha-tile-icon[data-domain="alarm_control_panel"][data-state="triggered"],
    ha-tile-icon[data-domain="lock"][data-state="jammed"] {
      animation: pulse 1s infinite;
    }
    ha-tile-badge.not-found {
      --tile-badge-background-color: var(--red-color);
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
customElements.define("ring-tile", $706064f87829af5f$var$RingTile);


var $94ff6df8efb89b41$exports = {};
"use strict";
Object.defineProperty($94ff6df8efb89b41$exports, "__esModule", {
    value: true
});
$94ff6df8efb89b41$exports.addFonts = $94ff6df8efb89b41$var$addFonts;
function $94ff6df8efb89b41$var$addLink(id, href, rel, co = false) {
    if (!document.getElementById(id)) {
        var link = document.createElement("link");
        link.id = id;
        link.rel = rel;
        link.href = href;
        if (co) link.crossOrigin = "anonymous";
        document.head.appendChild(link);
    }
}
function $94ff6df8efb89b41$var$addFonts() {
    $94ff6df8efb89b41$var$addLink("gf1", "https://fonts.googleapis.com", "preconnect");
    $94ff6df8efb89b41$var$addLink("gf2", "https://fonts.gstatic.com", "preconnect");
    $94ff6df8efb89b41$var$addLink("gf3", "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap", "stylesheet", true);
} // all fonts
 //     "https://fonts.googleapis.com/css2?family=Arimo:wght@400..700&family=Geist:wght@100..900&family=Inter:opsz,wght@14..32,100..900&family=Public+Sans:wght@100..900&display=swap",
 // Fonts
 // Arimo --
 // Inter -
 // Public Sans --
 // Geist +


var $0e4094fdb9f56610$exports = {};
"use strict";
Object.defineProperty($0e4094fdb9f56610$exports, "__esModule", {
    value: true
});
$0e4094fdb9f56610$exports.RtInfo = void 0;

class $0e4094fdb9f56610$var$RtInfo extends $hRcWJ$LitElement {
    static get properties() {
        return {
            primary: {},
            secondary: {},
            large_ring: {},
            large_secondary: {}
        };
    }
    render() {
        if (!this.large_ring) return (0, $hRcWJ$html)`
        <div class="info small">
          <span class="primary small nowrap">${this.primary}</span>
          ${this.secondary ? (0, $hRcWJ$html)`<span class="secondary small nowrap">${this.secondary}</span>` : $hRcWJ$nothing}
        </div>
      `;
        else return (0, $hRcWJ$html)`
        <div class="info large">
          <span class="primary small">${this.primary}</span>
          ${this.secondary ? (0, $hRcWJ$html)`<span class="secondary ${this.large_secondary ? "large" : "small"}">${this.secondary}</span>` : $hRcWJ$nothing}
        </div>
      `;
    }
}
$0e4094fdb9f56610$exports.RtInfo = $0e4094fdb9f56610$var$RtInfo;
$0e4094fdb9f56610$var$RtInfo.styles = (0, $hRcWJ$css)`
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
      font-family: Geist, var(--ha-font-family-body);
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


var $6b0251d01b9a9c16$exports = {};
"use strict";
Object.defineProperty($6b0251d01b9a9c16$exports, "__esModule", {
    value: true
});
$6b0251d01b9a9c16$exports.RtRing = void 0;


// Default style class for tile icon border
const $6b0251d01b9a9c16$var$DEFAULT_TILE_ICON_BORDER_STYLE = "rounded-square";
class $6b0251d01b9a9c16$var$RtRing extends $hRcWJ$LitElement {
    static get properties() {
        return {
            interactive: {},
            imageStyle: {},
            imageUrl: {},
            ring_size: {}
        };
    }
    render() {
        if (this.imageUrl) {
            const imageStyle = this.imageStyle || $6b0251d01b9a9c16$var$DEFAULT_TILE_ICON_BORDER_STYLE;
            return (0, $hRcWJ$html)`
        <div class="container ${(0, $hRcWJ$classMap1)({
                [imageStyle]: this.imageUrl
            })}">
          <img alt="" src=${this.imageUrl} />
        </div>
        <slot></slot>
      `;
        }
        return (0, $hRcWJ$html)`
      <div
        class="container size_${this.ring_size} ${this.interactive ? "background" : ""}"
      >
        <slot name="icon"></slot>
      </div>
      <slot></slot>
    `;
    }
}
$6b0251d01b9a9c16$exports.RtRing = $6b0251d01b9a9c16$var$RtRing;
$6b0251d01b9a9c16$var$RtRing.styles = (0, $hRcWJ$css)`
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


var $55f6c947fc198e2c$exports = {};
"use strict";
var $55f6c947fc198e2c$var$_RtRingSvg_grad;
Object.defineProperty($55f6c947fc198e2c$exports, "__esModule", {
    value: true
});
$55f6c947fc198e2c$exports.RtRingSvg = void 0;

var $9bbe49c420e11bf2$exports = {};
"use strict";
Object.defineProperty($9bbe49c420e11bf2$exports, "__esModule", {
    value: true
});
$9bbe49c420e11bf2$exports.extendWithRenderRings = $9bbe49c420e11bf2$var$extendWithRenderRings;


var $0b5519fce8283b66$exports = {};
"use strict";
Object.defineProperty($0b5519fce8283b66$exports, "__esModule", {
    value: true
});
$0b5519fce8283b66$exports.getRingPath = $0b5519fce8283b66$var$getRingPath;


function $0b5519fce8283b66$var$getRingPath(startAngle, endAngle, outerRadius, width) {
    const innerRadius = outerRadius - width;
    const longPathFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    const outerStart = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(startAngle, outerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX).join(" ");
    const outerEnd = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(endAngle, outerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX).join(" ");
    const innerStart = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(endAngle, innerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX).join(" ");
    const innerEnd = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(startAngle, innerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX).join(" ");
    const commands = [];
    commands.push(`M ${outerStart}`);
    commands.push(`A ${outerRadius} ${outerRadius} 0 ${longPathFlag} 1 ${outerEnd}`);
    commands.push(`A ${width / 2} ${width / 2} 0 0 1 ${innerStart}`);
    commands.push(`A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 0 ${innerEnd}`);
    commands.push(`A ${width / 2} ${width / 2} 0 0 1 ${outerStart}`);
    const segment = commands.join(" ");
    return segment;
}


function $9bbe49c420e11bf2$var$extendWithRenderRings(RtRingSvg) {
    RtRingSvg.prototype.renderGradRing = function(startAngle, endAngle, opacity) {
        const width = this._ringWidth;
        const segment = (0, $0b5519fce8283b66$exports.getRingPath)(startAngle, endAngle, this._outerRadius, width);
        const ringGradient = this._grad.getConicGradientCss(opacity);
        const id = opacity.toString().replace(".", "");
        return (0, $hRcWJ$svg)`
      <clipPath id="ring-clip-${id}">
        <path
          d=${segment}
        />
      </clipPath>
      <foreignObject
        x="0" y="0"
        class="ring-grad"
        width=${$efd7d73b5aabc0e1$exports.VIEW_BOX} height=${$efd7d73b5aabc0e1$exports.VIEW_BOX}
        clip-path="url(#ring-clip-${id})"
        transform="rotate(${this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 180 : 0} ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.MID_BOX})"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="width: ${$efd7d73b5aabc0e1$exports.VIEW_BOX}px; height: ${$efd7d73b5aabc0e1$exports.VIEW_BOX}px; ${ringGradient};";
        />
      </foreignObject>
    `;
    };
    RtRingSvg.prototype.renderSolidRing = function(startAngle, endAngle, rawValue) {
        const width = this._ringWidth;
        const segment = (0, $0b5519fce8283b66$exports.getRingPath)(startAngle, endAngle, this._outerRadius, width);
        return (0, $hRcWJ$svg)`<path 
        class="ring-solid"
        d=${segment}
        fill=${this._grad.getSolidColour(rawValue)}
        stroke-width="0"
        fill-opacity="1"
        transform="rotate(${this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 180 : 0} ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.MID_BOX})"
      />`;
    };
}


var $951361eae0377902$exports = {};
"use strict";
Object.defineProperty($951361eae0377902$exports, "__esModule", {
    value: true
});
$951361eae0377902$exports.extendWithRenderDot = $951361eae0377902$var$extendWithRenderDot;




function $951361eae0377902$var$extendWithRenderDot(RtRingSvg) {
    RtRingSvg.prototype.renderDot = function(degrees, rawValue) {
        const width = this._ringWidth;
        const radius = this._outerRadius - width / 2;
        const dotCoord = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(degrees, radius, $efd7d73b5aabc0e1$exports.VIEW_BOX);
        const dotOutline = width * [
            0.55,
            0.4,
            0.35,
            0.35,
            0.35,
            0.35
        ][this.ring_size - 1];
        const dotRadius = width / 2 + dotOutline * 0.7;
        const ringClipSegment = (0, $0b5519fce8283b66$exports.getRingPath)(degrees - 10, degrees + 10, this._outerRadius + width * 0.05, width * 1.1);
        return (0, $hRcWJ$svg)`
            <g class="indicator">
              <clipPath id="ring-clip">
                <path d=${ringClipSegment}
                />
              </clipPath>
              <circle 
                class="dot-outline"
                cx=${dotCoord[0]} cy=${dotCoord[1]} 
                r=${dotRadius + dotOutline / 2}
                clip-path="url(#ring-clip)"
                fill="var(--card-background-color, white)"
                transform="rotate(${this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 180 : 0} ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.MID_BOX})"
              />
              <circle 
                class="dot"
                cx=${dotCoord[0]} cy=${dotCoord[1]} 
                r=${dotRadius - dotOutline / 2}
                fill=${this._grad.getSolidColour(rawValue)}
                transform="rotate(${this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 180 : 0} ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.MID_BOX})"
              />
            </g>`;
    };
}


var $b2190ce543d88b94$exports = {};
"use strict";
Object.defineProperty($b2190ce543d88b94$exports, "__esModule", {
    value: true
});
$b2190ce543d88b94$exports.extendWithRenderCompass = $b2190ce543d88b94$var$extendWithRenderCompass;



function $b2190ce543d88b94$var$extendWithRenderCompass(RtRingSvg) {
    RtRingSvg.prototype.renderCompass = function() {
        const width = this._ringWidth * 0.7;
        const cardinals = [];
        const cardinalNames = [];
        const major = [];
        const minor = [];
        for(let deg = 0; deg < 360; deg += 5.625){
            const degFlipped = (deg + 180) % 360;
            if (deg % 90 === 0) {
                if (this.ring_type === $efd7d73b5aabc0e1$exports.RT.COMPASS_NESW || this.ring_type === $efd7d73b5aabc0e1$exports.RT.COMPASS_N && degFlipped === 0) {
                    const coord = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius - 1.2 * width / 2, $efd7d73b5aabc0e1$exports.VIEW_BOX);
                    cardinalNames.push((0, $hRcWJ$svg)`<text
                  class="compass cardinal"
                  x=${coord[0]}
                  y=${coord[1]}
                  text-anchor="middle"
                  alignment-baseline="central"
                  font-size=${2 * width}
                  fill="var(--primary-text-color, #212121)"
                >${(0, $a99931ec60826f34$exports.degreesToCompass)(degFlipped)}</text>`);
                } else {
                    cardinals.push(`M ${(0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX)}`);
                    cardinals.push(`L ${(0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius - 1.7 * width, $efd7d73b5aabc0e1$exports.VIEW_BOX)}`);
                }
            } else if (deg % 22.5 === 0) {
                major.push(`M ${(0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX)}`);
                major.push(`L ${(0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius - 1.2 * width, $efd7d73b5aabc0e1$exports.VIEW_BOX)}`);
            } else {
                minor.push(`M ${(0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX)}`);
                minor.push(`L ${(0, $a99931ec60826f34$exports.getCoordFromDegrees)(deg, this._outerRadius - width, $efd7d73b5aabc0e1$exports.VIEW_BOX)}`);
            }
        }
        const cardinalNamesSvg = cardinalNames ? (0, $hRcWJ$svg)`${cardinalNames}` : $hRcWJ$nothing;
        const cardinalSvg = cardinals ? (0, $hRcWJ$svg)`
            <path
              class="compass cardinals"
              d=${cardinals.join(" ")}
              stroke-width=2
              fill="none"
              stroke="var(--primary-text-color, #212121)"
              stroke-linecap="round"
            />` : $hRcWJ$nothing;
        const compassSvg = (0, $hRcWJ$svg)`
        ${cardinalNamesSvg}
        ${cardinalSvg}
        <path
          class="compass major"
          d=${major.join(" ")}
          stroke-width=1.4
          fill="none"
          stroke="var(--primary-text-color, #212121)"
          stroke-linecap="round"
          stroke-opacity=0.7
        />
        <path
          class="compass minor"
          d=${minor.join(" ")}
          stroke-width=0.8
          fill="none"
          stroke="var(--primary-text-color, #212121)"
          stroke-linecap="round"
          stroke-opacity=0.3
        />`;
        return compassSvg;
    };
}


var $d319be45cbef2331$exports = {};
"use strict";
Object.defineProperty($d319be45cbef2331$exports, "__esModule", {
    value: true
});
$d319be45cbef2331$exports.extendWithRenderScale = $d319be45cbef2331$var$extendWithRenderScale;



// Helper function to calculate a "nice" step size
function $d319be45cbef2331$var$calcNiceNum(range, round) {
    const exponent = Math.floor(Math.log10(range));
    const fraction = range / Math.pow(10, exponent);
    let niceFraction;
    if (round) {
        if (fraction < 1.5) niceFraction = 1;
        else if (fraction < 3) niceFraction = 2;
        else if (fraction < 7) niceFraction = 5;
        else niceFraction = 10;
    } else {
        if (fraction <= 1) niceFraction = 1;
        else if (fraction <= 2) niceFraction = 2;
        else if (fraction <= 5) niceFraction = 5;
        else niceFraction = 10;
    }
    return niceFraction * Math.pow(10, exponent);
}
function $d319be45cbef2331$var$calcSubdivisions(bigStep) {
    const oom = Math.pow(10, Math.floor(Math.log10(bigStep)));
    const stepFraction = bigStep / oom;
    if (stepFraction === 5) return [
        bigStep / 5,
        bigStep / 10
    ];
    else return [
        bigStep / 2,
        bigStep / 10
    ];
}
function $d319be45cbef2331$var$extendWithRenderScale(RtRingSvg) {
    RtRingSvg.prototype.renderScale = function(dialOpacity = 1) {
        const width = this._ringWidth;
        const targetGrandTicks = this.ring_size === 1 ? 3 : 5;
        const maxTotalTicks = [
            80,
            80,
            110,
            110,
            110,
            110
        ][this.ring_size - 1];
        const start = this.min;
        const end = this.max;
        const range = end - start;
        const niceRange = $d319be45cbef2331$var$calcNiceNum(range, false);
        const grandStep = $d319be45cbef2331$var$calcNiceNum(niceRange / (targetGrandTicks - 1), true);
        const [majorStep, minorStep] = $d319be45cbef2331$var$calcSubdivisions(grandStep);
        const produceMinorSteps = Math.round(range / minorStep) < maxTotalTicks;
        // Generate Grand ticks
        const grand = [];
        for(let value = Math.ceil(start / grandStep) * grandStep; value <= end; value += grandStep)grand.push(value);
        // Generate Major ticks
        const major = [];
        for(let value = Math.ceil(start / majorStep) * majorStep; value <= end; value += majorStep)// Avoid duplicating Grand ticks
        if (!grand.includes(value)) major.push(value);
        // Generate Minor ticks
        const minor = [];
        if (produceMinorSteps) {
            for(let value = Math.ceil(start / minorStep) * minorStep; value <= end; value += minorStep)// Avoid duplicating Major or Grand ticks
            if (!grand.includes(value) && !major.includes(value)) minor.push(value);
        }
        // Map a value to its corresponding angle in the range [this._startDegrees, this._endDegrees]
        const mapValueToDegrees = (value)=>this._startDegrees + (this._endDegrees - this._startDegrees) * (value - start) / range;
        const tickStrokeScale = [
            1,
            1,
            1,
            0.9,
            0.8,
            0.7
        ][this.ring_size - 1];
        const renderTick = (value, depth)=>{
            const degrees = (mapValueToDegrees(value) + (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 180 : 0)) % 360;
            const p1 = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(degrees, this._outerRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX);
            const p2 = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(degrees, this._outerRadius - depth * width, $efd7d73b5aabc0e1$exports.VIEW_BOX);
            return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`;
        };
        const renderLabel = (value)=>{
            // Avoid duplicate labels for min/max
            if (this.bottom_element === $efd7d73b5aabc0e1$exports.BE.MIN_MAX) {
                if (value === this.min || value === this.max) return $hRcWJ$nothing;
            }
            let labelRadius = this._outerRadius * [
                0.45,
                0.65,
                0.7,
                0.73,
                0.75,
                0.77
            ][this.ring_size - 1];
            if (this._hasMarker && this.indicator === $efd7d73b5aabc0e1$exports.IND.DOT) labelRadius *= 0.96;
            if (Math.log10(this.max) > 3) labelRadius *= 0.93;
            const degrees = (mapValueToDegrees(value) + (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 180 : 0)) % 360;
            const p3 = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(degrees, labelRadius, $efd7d73b5aabc0e1$exports.VIEW_BOX);
            const fontSize = this.ring_size === 1 ? width * 2.5 : width * 1.15;
            return (0, $hRcWJ$svg)`
          <text
            x=${p3[0]} y=${p3[1]}
            text-anchor="middle"
            alignment-baseline="central"
            font-size=${fontSize}
          >${value}</text>
        `;
        };
        // Render the ticks as SVG lines
        const grandSvg = (0, $hRcWJ$svg)`
      <path
        class="grand"
        d=${grand.map((value)=>renderTick(value, 1.35)).join(" ")}
        stroke-width=${1.8 * tickStrokeScale}
        stroke-opacity=${dialOpacity}
      />`;
        let grandLabels = [];
        if (this.scale === $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS) grandLabels = grand.map(renderLabel);
        const majorSvg = (0, $hRcWJ$svg)`
      <path
        class="major"
        d=${major.map((value)=>renderTick(value, 1.2)).join(" ")}
        stroke-width=${1.2 * tickStrokeScale}
        stroke-opacity=${0.7 * dialOpacity}
      />`;
        let majorLabels = [];
        if (this.scale === $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS && this.ring_size > 3 && grandStep / majorStep !== 5) majorLabels = major.map(renderLabel);
        const minorSvg = (0, $hRcWJ$svg)`
      <path
        class="minor"
        d=${minor.map((value)=>renderTick(value, 1)).join(" ")}
        stroke-width=${0.6 * tickStrokeScale}
        stroke-opacity=${0.3 * dialOpacity}
      />`;
        // Combine all SVG elements
        return (0, $hRcWJ$svg)`
        <g class="scale">
          <g class="ticks">
            ${grandSvg}
            ${majorSvg}
            ${minorSvg}
          </g>
          <g class="labels">
            ${majorLabels}        
            ${grandLabels} 
          </g> 
        </g>
      `;
    };
}


var $102a9a0603f0ad95$exports = {};
"use strict";
Object.defineProperty($102a9a0603f0ad95$exports, "__esModule", {
    value: true
});
$102a9a0603f0ad95$exports.extendWithRenderMarker = $102a9a0603f0ad95$var$extendWithRenderMarker;



function $102a9a0603f0ad95$var$extendWithRenderMarker(RtRingSvg) {
    RtRingSvg.prototype.renderMarker = function(markerValue, markerColour) {
        const width = this._ringWidth;
        let degrees;
        let markerWidth;
        let strokeWidth;
        let className = "marker";
        if (this.ring_type.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS)) {
            degrees = parseFloat(String(markerValue));
            markerWidth = 2.3 * width;
            strokeWidth = 0; // width / 8;
            degrees = (degrees + 180) % 360;
            className = "marker compass";
        } else {
            const clampedMarkerState = (0, $a99931ec60826f34$exports.clamp)(markerValue, this.min, this.max);
            degrees = this._startDegrees + (this._endDegrees - this._startDegrees) * (clampedMarkerState - this.min) / (this.max - this.min);
            markerWidth = (this.indicator === $efd7d73b5aabc0e1$exports.IND.DOT ? 1.2 : 1.5) * width;
            strokeWidth = this.indicator === $efd7d73b5aabc0e1$exports.IND.DOT ? 0 : this.ring_size <= 2 ? width / 5 : width / 8;
            if (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED) degrees = (degrees + 180) % 360;
        }
        // TODO: Add support for this.outerRadius
        if (this.indicator !== $efd7d73b5aabc0e1$exports.IND.POINTER) {
            const commands = [];
            if (this.indicator === $efd7d73b5aabc0e1$exports.IND.DOT) commands.push(`M ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.VIEW_BOX - width + strokeWidth}`);
            else commands.push(`M ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.VIEW_BOX - width / 3}`);
            commands.push(`l ${markerWidth / 2} -${markerWidth * Math.sin((0, $a99931ec60826f34$exports.deg2rad)(60))}`);
            if (this.ring_type.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS)) {
                commands.push(`l -${markerWidth / 2} ${markerWidth / 6}`);
                commands.push(`l -${markerWidth / 2} -${markerWidth / 6}`);
            } else commands.push(`h -${markerWidth}`);
            commands.push(`Z`);
            const triangle = commands.join(" ");
            const pointIn = this.ring_type.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS) ? 180 : 0;
            return (0, $hRcWJ$svg)`
        <g class=${className} transform="rotate(${degrees} ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.MID_BOX})">
          <path
            d=${triangle}
            fill=${markerColour}
            stroke="var(--card-background-color, white)"
            stroke-linejoin="bevel"
            stroke-width=${strokeWidth}
            transform="rotate(${pointIn} ${$efd7d73b5aabc0e1$exports.MID_BOX} ${$efd7d73b5aabc0e1$exports.VIEW_BOX - markerWidth / 2})"
          />
        </g>`;
        } else {
            const p1 = [
                $efd7d73b5aabc0e1$exports.MID_BOX,
                $efd7d73b5aabc0e1$exports.MID_BOX
            ];
            const p2 = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(degrees, $efd7d73b5aabc0e1$exports.MID_BOX - width * 0.75, $efd7d73b5aabc0e1$exports.VIEW_BOX);
            const strokeWidth = [
                2,
                1.6,
                1.4,
                1.3,
                1.2,
                1.1
            ][this.ring_size - 1];
            return (0, $hRcWJ$svg)`
          <g class=${className}>
            <line
              x1=${p1[0]} y1=${p1[1]}
              x2=${p2[0]} y2=${p2[1]}
              stroke=${markerColour}
              stroke-linecap="round"
              stroke-width=${strokeWidth}
            />
          </g>
        `;
        }
    };
}


var $549e7574147a113a$exports = {};
"use strict";
Object.defineProperty($549e7574147a113a$exports, "__esModule", {
    value: true
});
$549e7574147a113a$exports.extendWithRenderPointer = $549e7574147a113a$var$extendWithRenderPointer;



function $549e7574147a113a$var$extendWithRenderPointer(RtRingSvg) {
    RtRingSvg.prototype.renderPointer = function(degrees) {
        const colour = "color-mix(in srgb, orange 80%, var(--primary-text-color))";
        const startPoint = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? degrees : (degrees + 180) % 360, 0.15 * $efd7d73b5aabc0e1$exports.VIEW_BOX / 2, $efd7d73b5aabc0e1$exports.VIEW_BOX);
        const endPoint = (0, $a99931ec60826f34$exports.getCoordFromDegrees)(this.ring_type !== $efd7d73b5aabc0e1$exports.RT.CLOSED ? degrees : (degrees + 180) % 360, this._outerRadius - this._ringWidth / 2, $efd7d73b5aabc0e1$exports.VIEW_BOX);
        return (0, $hRcWJ$svg)`
        <g class="indicator">
          <line class="pointer"
            x1=${startPoint[0]} y1=${startPoint[1]}
            x2=${endPoint[0]}   y2=${endPoint[1]}
            stroke=${colour}
            stroke-width=${[
            5,
            3,
            2.5,
            2.5,
            2.3,
            2.0
        ][this.ring_size - 1]}
            stroke-linecap="round"
          />
          <circle class="pointer"
            cx=${$efd7d73b5aabc0e1$exports.MID_BOX} cy=${$efd7d73b5aabc0e1$exports.MID_BOX}
            r=${[
            7,
            5,
            3.5,
            3.5,
            3.3,
            2.9
        ][this.ring_size - 1]}
            fill=${colour}
          />
          <circle class="pointer-centre"
            cx=${$efd7d73b5aabc0e1$exports.MID_BOX} cy=${$efd7d73b5aabc0e1$exports.MID_BOX}
            r=${[
            3,
            2.5,
            1.8,
            1.8,
            1.6,
            1.4
        ][this.ring_size - 1]}
            fill="#444444"
        </g>
      `;
    };
}


var $be6ca3f981cfe9d7$exports = {};
"use strict";
Object.defineProperty($be6ca3f981cfe9d7$exports, "__esModule", {
    value: true
});
$be6ca3f981cfe9d7$exports.extendWithRenderIcon = $be6ca3f981cfe9d7$var$extendWithRenderIcon;



// TODO: Find a way to convert this back to SVG
function $be6ca3f981cfe9d7$var$extendWithRenderIcon(RtRingSvg) {
    RtRingSvg.prototype.renderIcon = function(position, iconStateObj, stateColourValue) {
        let scale;
        let translateDown;
        let className;
        switch(position){
            case $efd7d73b5aabc0e1$exports.POS.TOP:
                scale = [
                    0,
                    0.6,
                    1,
                    1.2,
                    1.8,
                    2.2
                ][this.ring_size - 1];
                translateDown = [
                    0,
                    -43,
                    -42,
                    -45,
                    -40,
                    -40
                ][this.ring_size - 1];
                if (this.indicator === $efd7d73b5aabc0e1$exports.IND.POINTER) translateDown *= 0.75;
                if (this.scale === $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS) scale *= 0.95;
                className = "icon top";
                break;
            case $efd7d73b5aabc0e1$exports.POS.MIDDLE:
                scale = this.ring_size === 1 ? this.ring_type === $efd7d73b5aabc0e1$exports.RT.NONE ? 1 : (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 0.9 : 0.85) * (this._hasMarker && this.indicator === $efd7d73b5aabc0e1$exports.IND.DOT ? 0.9 : 1) : [
                    2.1,
                    3.1,
                    4,
                    5,
                    6
                ][this.ring_size - 2];
                translateDown = this.bottom_element === $efd7d73b5aabc0e1$exports.BE.MIN_MAX ? -2 : 0;
                className = "icon middle";
                break;
            case $efd7d73b5aabc0e1$exports.POS.BOTTOM:
                scale = [
                    0.5,
                    0.9,
                    1.5,
                    2,
                    3,
                    3.5
                ][this.ring_size - 1];
                translateDown = [
                    25,
                    40,
                    38,
                    40,
                    35,
                    35
                ][this.ring_size - 1];
                if (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED) translateDown = [
                    5,
                    25,
                    26,
                    27,
                    23,
                    24
                ][this.ring_size - 1];
                className = "icon bottom";
                break;
        }
        if (!scale) scale = 1;
        if (!translateDown) translateDown = 0;
        const size = $efd7d73b5aabc0e1$exports.MDI_ICON_SIZE * scale;
        const translateY = translateDown * scale;
        const iconRef = (el)=>{
            if (el) {
                const checkForSvgIcon = ()=>{
                    var _a, _b;
                    const haIcon = (_a = el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("ha-icon");
                    const haSvgIcon = (_b = haIcon === null || haIcon === void 0 ? void 0 : haIcon.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("ha-svg-icon");
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
                const interval = setInterval(()=>{
                    if (checkForSvgIcon() || attempts >= maxAttempts) clearInterval(interval); // Stop polling
                    attempts++;
                }, 50);
            }
        };
        const stateColour = stateColourValue ? `--rt-icon-state-color: ${this._grad.getSolidColour(stateColourValue)};` : "";
        return (0, $hRcWJ$html)`
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
          ${(0, $hRcWJ$ref)(iconRef)}
        ></ha-state-icon>
      </div>
    `;
    };
}


var $c142528481ab1522$exports = {};
"use strict";
Object.defineProperty($c142528481ab1522$exports, "__esModule", {
    value: true
});
$c142528481ab1522$exports.extendWithRenderText = $c142528481ab1522$var$extendWithRenderText;



// export function renderText(cfg, value, unit, position) {
function $c142528481ab1522$var$extendWithRenderText(RtRingSvg) {
    RtRingSvg.prototype.renderText = function(value, unit, position) {
        var _a;
        function scaleFontSize(unit = "", unitScale = 1.0, maxLengthForScaling = 6) {
            const valueLength = value.length - (value.includes(".") ? 0.7 : 0) - (value.includes("\xb0") ? 0.5 : 0);
            const unitLength = unit.length * unitScale;
            const scale = 1 - 0.16 * (0, $a99931ec60826f34$exports.clamp)(valueLength + unitLength - 2, 0, maxLengthForScaling - 2);
            return scale;
        }
        function renderValueUnitElement(valueSize, unitSize, xShift, yShift, className) {
            return (0, $hRcWJ$svg)`
        <text class=${className}
          x=${$efd7d73b5aabc0e1$exports.MID_BOX + xShift} y="${$efd7d73b5aabc0e1$exports.MID_BOX + yShift + valueSize / 3.5}" 
          text-anchor="middle" alignment-baseline="alphabetic" 
          font-size=${valueSize}
          >${value}<tspan
            alignment-baseline="alphabetic"
            font-size=${unitSize}
          >${unit || $hRcWJ$nothing}</tspan>
        </text>
      `;
        }
        function renderTextElement(text, textSize, xShift, yShift, className, textAnchor = "middle") {
            return (0, $hRcWJ$svg)`
        <text class=${className}
          x=${$efd7d73b5aabc0e1$exports.MID_BOX + xShift} y="${$efd7d73b5aabc0e1$exports.MID_BOX + yShift + textSize / 3.5}" 
          text-anchor=${textAnchor} alignment-baseline="alphabetic" 
          font-size=${textSize}
        >${text}</text>
      `;
        }
        // if value is a number, convert to text and set
        // the correct number of decimal places
        if ((0, $a99931ec60826f34$exports.isNumber)(value) && ![
            $efd7d73b5aabc0e1$exports.POS.MIN,
            $efd7d73b5aabc0e1$exports.POS.MAX
        ].includes(position)) {
            // let decimals;
            // if (parseInt(value) === 0) {
            //   decimals = this.min_sig_figs - 1;
            // } else {
            let decimals = Math.max(Math.floor(this.min_sig_figs - Math.log10(Math.abs(Number(value)))), 0);
            // clamp decimals if needed
            if (decimals > ((_a = this.max_decimals) !== null && _a !== void 0 ? _a : 99)) decimals = this.max_decimals;
            // Format
            value = parseFloat(value).toFixed(decimals);
            // Convert 0.0 to 0 if needed
            if (parseFloat(value) === 0) value = "0";
        }
        // adjust unit if required
        if (unit) {
            if (this.ring_size === 1) {
                if (unit.startsWith("\xb0")) {
                    value = `${value}\xb0`;
                    unit = "";
                } else unit = unit.slice(0, 1);
            } else if (unit !== "%") unit = ` ${unit}`;
        }
        const middleFontScale = [
            1,
            0.8,
            0.75,
            0.72,
            0.71,
            0.7
        ][this.ring_size - 1];
        const bottomFontSize = [
            20,
            15,
            11,
            10,
            9,
            7.5
        ][this.ring_size - 1];
        switch(position){
            case $efd7d73b5aabc0e1$exports.POS.TOP:
                {
                    const yShift = this.scale === $efd7d73b5aabc0e1$exports.SCALE.TICKS_LABELS ? -22 : -25;
                    return renderValueUnitElement(12, 12, 0, yShift, "top marker");
                }
            case $efd7d73b5aabc0e1$exports.POS.MIDDLE:
                if (this.ring_size === 1 || [
                    "%",
                    ""
                ].includes(unit)) {
                    // Single line: small ring, or small unit
                    const unitScale = 0.8;
                    const fontSize = 42 * scaleFontSize(unit, unitScale) * middleFontScale;
                    const unitSize = fontSize * 0.8;
                    const className = `middle ${this.ring_size === 1 ? "tight" : ""}`;
                    return renderValueUnitElement(fontSize, unitSize, 0, 0, className);
                } else {
                    // Place the unit on a second line
                    const fontSize = 38 * scaleFontSize() * middleFontScale;
                    const unitSize = 15 * middleFontScale;
                    const unitShift = 22 - (this.ring_size === 2 ? 2 : 0);
                    return (0, $hRcWJ$svg)`
            ${renderTextElement(value, fontSize, 0, 0, "middle")}
            ${renderTextElement(unit, unitSize, 0, unitShift, "middle unit")}
          `;
                }
            case $efd7d73b5aabc0e1$exports.POS.BELOW_DIAL:
                {
                    // Dial case: position below the centre point
                    const unitScale = 0.8;
                    const fontSize = 20 * scaleFontSize(unit, unitScale, 4) * middleFontScale;
                    const unitSize = fontSize * 0.8;
                    const className = "lower-middle";
                    // render the SVG
                    return renderValueUnitElement(fontSize, unitSize, 0, 18, className);
                }
            case $efd7d73b5aabc0e1$exports.POS.BOTTOM:
                {
                    let yShift = 41;
                    let className = "bottom";
                    if (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED) {
                        yShift -= 15;
                        className += " closed";
                    }
                    return renderValueUnitElement(bottomFontSize, bottomFontSize, 0, yShift, className);
                }
            case $efd7d73b5aabc0e1$exports.POS.MIN:
                {
                    const xShift = -32 + [
                        0,
                        6,
                        6,
                        4,
                        3.8,
                        3.2
                    ][this.ring_size - 1];
                    const yShift = 41 - (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 10 : 0);
                    return renderTextElement(value, bottomFontSize, xShift, yShift, "bottom", "start");
                }
            case $efd7d73b5aabc0e1$exports.POS.MAX:
                {
                    const xShift = 32 - [
                        0,
                        6,
                        6,
                        4,
                        3.8,
                        3.2
                    ][this.ring_size - 1];
                    const yShift = 41 - (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED ? 10 : 0);
                    return renderTextElement(value, bottomFontSize, xShift, yShift, "bottom", "end");
                }
        }
    };
}


var $473753ecfe0955bf$exports = {};
"use strict";
var $473753ecfe0955bf$var$__classPrivateFieldSet = $473753ecfe0955bf$exports && $473753ecfe0955bf$exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var $473753ecfe0955bf$var$__classPrivateFieldGet = $473753ecfe0955bf$exports && $473753ecfe0955bf$exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var $473753ecfe0955bf$var$_ColourGradientScale_instances, $473753ecfe0955bf$var$_ColourGradientScale_grad, $473753ecfe0955bf$var$_ColourGradientScale_minValue, $473753ecfe0955bf$var$_ColourGradientScale_maxValue, $473753ecfe0955bf$var$_ColourGradientScale_gradStart, $473753ecfe0955bf$var$_ColourGradientScale_gradEnd, $473753ecfe0955bf$var$_ColourGradientScale_isSingleColour, $473753ecfe0955bf$var$_ColourGradientScale_scaleToGrad;
Object.defineProperty($473753ecfe0955bf$exports, "__esModule", {
    value: true
});
$473753ecfe0955bf$exports.ColourGradientScale = void 0;

class $473753ecfe0955bf$var$ColourGradientScale {
    constructor(gradDef, scaleDef = {
        "gradStart": 0,
        "gradEnd": 100,
        "minValue": 0,
        "maxValue": 100
    }){
        $473753ecfe0955bf$var$_ColourGradientScale_instances.add(this);
        // internal grad scale representation
        // array of { value, colour }
        $473753ecfe0955bf$var$_ColourGradientScale_grad.set(this, []);
        // scaling end points for raw values
        $473753ecfe0955bf$var$_ColourGradientScale_minValue.set(this, 0); //minValue;
        $473753ecfe0955bf$var$_ColourGradientScale_maxValue.set(this, 100); //maxValue;
        // scale the grad to constrained endpoints if required
        $473753ecfe0955bf$var$_ColourGradientScale_gradStart.set(this, 0);
        $473753ecfe0955bf$var$_ColourGradientScale_gradEnd.set(this, 100);
        $473753ecfe0955bf$var$_ColourGradientScale_isSingleColour.set(this, false);
        if (typeof gradDef === "object" && !Array.isArray(gradDef)) {
            // gradDef is a dictionary, so build the grad array
            // Store the scale definitions
            $473753ecfe0955bf$var$__classPrivateFieldSet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradStart, scaleDef.gradStart || 0, "f");
            $473753ecfe0955bf$var$__classPrivateFieldSet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradEnd, scaleDef.gradEnd || 100, "f");
            $473753ecfe0955bf$var$__classPrivateFieldSet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, scaleDef.minValue || 0, "f");
            $473753ecfe0955bf$var$__classPrivateFieldSet(this, $473753ecfe0955bf$var$_ColourGradientScale_maxValue, scaleDef.maxValue || 100, "f");
            // Map and store the grad
            for (const [val, col] of Object.entries(gradDef)){
                // convert % entries to raw values if needed
                const rawValue = val.endsWith("%") ? $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, "f") + parseFloat(val) / 100.0 * ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_maxValue, "f") - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, "f")) : parseFloat(val);
                // apply HA colours if supplied
                const colour = $efd7d73b5aabc0e1$exports.HA_COLOURS[col] || col;
                // scale and add to the grad array
                $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").push({
                    value: $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_instances, "m", $473753ecfe0955bf$var$_ColourGradientScale_scaleToGrad).call(this, rawValue),
                    colour: colour
                });
            }
            // Sort the grad in case the definition was out of order
            $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").sort((a, b)=>a.value - b.value);
            // Extend the grad to 0% and 100% by repeating end point colours if needed
            if ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[0].value > 0) $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").unshift({
                value: 0,
                colour: $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[0].colour
            });
            const lastGrad = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").at(-1);
            if (lastGrad && lastGrad.value < 100) $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").push({
                value: 100,
                colour: lastGrad.colour
            });
        } else {
            // gradDef is a block colour, so treat as such
            $473753ecfe0955bf$var$__classPrivateFieldSet(this, $473753ecfe0955bf$var$_ColourGradientScale_isSingleColour, true, "f");
            if (typeof gradDef === "string") {
                const colour = $efd7d73b5aabc0e1$exports.HA_COLOURS[gradDef] || gradDef;
                $473753ecfe0955bf$var$__classPrivateFieldSet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, [
                    {
                        value: 0,
                        colour: colour
                    },
                    {
                        value: 100,
                        colour: colour
                    }
                ], "f");
            } else throw new Error("Invalid gradDef: expected string for single-colour mode.");
        }
    }
    getConicGradientCss(opacity = 1) {
        // if we've just got a single colour, just return it
        if ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_isSingleColour, "f")) return `background: color-mix(in srgb, ${$473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[0].colour} var(--rt-ring-background-opacity, ${100.0 * opacity}%), transparent);`;
        // build the gradient
        const gradCSS = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").map((grad)=>{
            return `color-mix(in srgb, ${grad.colour} var(--rt-ring-background-opacity, ${100.0 * opacity}%), transparent) ${grad.value}%`;
        });
        // return the full CSS
        return `background-image: conic-gradient(
        from 180deg,
        ${gradCSS.join(", ")}
      );
    `;
    }
    getSolidColourAtGradPct(gradPct) {
        // convert the angle to a value on the grad
        const rawValue = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, "f") + (gradPct - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradStart, "f")) / ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradEnd, "f") - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradStart, "f")) * ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_maxValue, "f") - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, "f"));
        // get the colour at that value
        return this.getSolidColour(rawValue);
    }
    getSolidColour(rawValue = 0) {
        if (Number.isNaN(rawValue)) rawValue = 0; // just in case
        // is it a single colour?
        if ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_isSingleColour, "f")) return $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[0].colour;
        // are we out of range?
        const endGrad = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").at(-1);
        if (!endGrad) throw new Error("No gradient defined");
        if ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_instances, "m", $473753ecfe0955bf$var$_ColourGradientScale_scaleToGrad).call(this, rawValue) < $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[0].value) return $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[0].colour;
        if ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_instances, "m", $473753ecfe0955bf$var$_ColourGradientScale_scaleToGrad).call(this, rawValue) > endGrad.value) return endGrad.colour;
        // mix a colour from the grad at rawValue
        const gradValue = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_instances, "m", $473753ecfe0955bf$var$_ColourGradientScale_scaleToGrad).call(this, rawValue);
        // is it a direct match?
        const entry = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").find((g)=>g.value === gradValue);
        if (entry) return entry.colour;
        let lowEntry = undefined;
        for(let i = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").length - 1; i >= 0; i--)if ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[i].value < gradValue) {
            lowEntry = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f")[i];
            break;
        }
        const highEntry = $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_grad, "f").find((g)=>g.value > gradValue);
        if (!lowEntry || !highEntry) throw new Error(`No low entry found for grad value ${gradValue}`);
        // are the two entries the same?
        if (lowEntry.colour === highEntry.colour) return lowEntry.colour;
        // ok, mix a colour
        const ratio = 100.0 * (gradValue - lowEntry.value) / (highEntry.value - lowEntry.value);
        return `color-mix(in srgb,
        ${lowEntry.colour} ${100 - ratio}%,
        ${highEntry.colour} ${ratio}%
      )
    `;
    }
}
$473753ecfe0955bf$exports.ColourGradientScale = $473753ecfe0955bf$var$ColourGradientScale;
$473753ecfe0955bf$var$_ColourGradientScale_grad = new WeakMap(), $473753ecfe0955bf$var$_ColourGradientScale_minValue = new WeakMap(), $473753ecfe0955bf$var$_ColourGradientScale_maxValue = new WeakMap(), $473753ecfe0955bf$var$_ColourGradientScale_gradStart = new WeakMap(), $473753ecfe0955bf$var$_ColourGradientScale_gradEnd = new WeakMap(), $473753ecfe0955bf$var$_ColourGradientScale_isSingleColour = new WeakMap(), $473753ecfe0955bf$var$_ColourGradientScale_instances = new WeakSet(), $473753ecfe0955bf$var$_ColourGradientScale_scaleToGrad = function _ColourGradientScale_scaleToGrad(rawValue) {
    // convert the rawValue to % on the grad, constrained to the operating
    // of the grad
    return $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradStart, "f") + (rawValue - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, "f")) / ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_maxValue, "f") - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_minValue, "f")) * ($473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradEnd, "f") - $473753ecfe0955bf$var$__classPrivateFieldGet(this, $473753ecfe0955bf$var$_ColourGradientScale_gradStart, "f"));
};




/* ---------- component ---------- */ class $55f6c947fc198e2c$var$RtRingSvg extends $hRcWJ$LitElement {
    /* Lit “properties” ---------------- */ static get properties() {
        return {
            ring_type: {},
            indicator: {},
            scale: {},
            ring_size: {},
            colour: {
                attribute: false
            },
            state: {
                attribute: false
            },
            display_state: {
                attribute: false
            },
            marker_value: {
                attribute: false
            },
            marker_colour: {
                attribute: false
            },
            marker2_value: {
                attribute: false
            },
            marker2_colour: {
                attribute: false
            },
            min: {
                attribute: false
            },
            max: {
                attribute: false
            },
            icon: {
                attribute: false
            },
            colourise_icon: {
                attribute: false
            },
            name: {
                attribute: false
            },
            bottom_element: {
                attribute: false
            },
            middle_element: {
                attribute: false
            },
            top_element: {
                attribute: false
            },
            bottom_name: {
                attribute: false
            },
            min_sig_figs: {
                attribute: false
            },
            max_decimals: {
                attribute: false
            },
            hass: {
                attribute: false
            }
        };
    }
    /* ctor & mix-in wiring ------------- */ constructor(...args){
        // LitElement constructor
        super();
        /* Private working vars ------------- */ $55f6c947fc198e2c$var$_RtRingSvg_grad.set(this, void 0);
        this._outerRadius = $efd7d73b5aabc0e1$exports.VIEW_BOX / 2;
        this._hasMarker = false;
        this._startDegrees = 60;
        this._endDegrees = 300;
        this._ringWidth = 10;
        this._noState = false;
        (0, $c142528481ab1522$exports.extendWithRenderText)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $d319be45cbef2331$exports.extendWithRenderScale)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $9bbe49c420e11bf2$exports.extendWithRenderRings)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $549e7574147a113a$exports.extendWithRenderPointer)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $102a9a0603f0ad95$exports.extendWithRenderMarker)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $be6ca3f981cfe9d7$exports.extendWithRenderIcon)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $951361eae0377902$exports.extendWithRenderDot)(new $55f6c947fc198e2c$var$RtRingSvg());
        (0, $b2190ce543d88b94$exports.extendWithRenderCompass)(new $55f6c947fc198e2c$var$RtRingSvg());
        this._grad = new $473753ecfe0955bf$exports.ColourGradientScale("grey");
    }
    /* ---------- configuration helpers ---------- */ configureRing() {
        var _a, _b;
        this._outerRadius = $efd7d73b5aabc0e1$exports.VIEW_BOX / 2;
        this._hasMarker = (0, $a99931ec60826f34$exports.isNumber)(this.marker_value);
        if (this.bottom_element === $efd7d73b5aabc0e1$exports.BE.NAME) this.bottom_name = this.bottom_name || this.name;
        // default angles
        this._startDegrees = 60;
        this._endDegrees = 300;
        // Adjust for ring type / bottom layout
        if (this.ring_type.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS) || this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED) {
            this._startDegrees = 0;
            this._endDegrees = 359.999;
        } else {
            const shortNameOk = this.bottom_element === $efd7d73b5aabc0e1$exports.BE.NAME && this.bottom_name.length <= [
                3,
                6,
                8,
                10,
                12,
                14
            ][this.ring_size - 1];
            if ([
                $efd7d73b5aabc0e1$exports.BE.ICON,
                $efd7d73b5aabc0e1$exports.BE.NONE,
                $efd7d73b5aabc0e1$exports.BE.UNIT
            ].includes(this.bottom_element) || shortNameOk || this.bottom_element === $efd7d73b5aabc0e1$exports.BE.MIN_MAX && this.ring_size > 1 || this.bottom_element.includes($efd7d73b5aabc0e1$exports.BE.VALUE) && this.ring_size > 1) {
                this._startDegrees = 45;
                this._endDegrees = 315;
            }
        }
        /* Units ----------------------------------- */ this._ringUnit = (_a = this.state) === null || _a === void 0 ? void 0 : _a.attributes["unit_of_measurement"];
        this._displayUnit = (_b = this.display_state) === null || _b === void 0 ? void 0 : _b.attributes["unit_of_measurement"];
        /* Gradient setup --------------------------- */ const scaleCfg = {
            minValue: this.min,
            maxValue: this.max,
            gradStart: 100 * this._startDegrees / 360,
            gradEnd: 100 * this._endDegrees / 360
        };
        this._grad = new $473753ecfe0955bf$exports.ColourGradientScale(this.colour, scaleCfg);
        this.marker_colour = $efd7d73b5aabc0e1$exports.HA_COLOURS[this.marker_colour] || this.marker_colour;
        this.marker2_colour = $efd7d73b5aabc0e1$exports.HA_COLOURS[this.marker2_colour] || this.marker2_colour;
        this._ringWidth = [
            10,
            8,
            7,
            6,
            5.5,
            5
        ][this.ring_size - 1] * (this.scale === $efd7d73b5aabc0e1$exports.SCALE.NONE ? 1 : 0.85);
    }
    /* Top / middle / bottom element helpers ----- */ getTopElementSvg() {
        var _a, _b;
        switch(this.top_element){
            case $efd7d73b5aabc0e1$exports.TE.MARKER:
                return this.renderText(this.marker_value, "", $efd7d73b5aabc0e1$exports.POS.TOP);
            case $efd7d73b5aabc0e1$exports.TE.MARKER_UNIT:
                return this.renderText(this.marker_value, (_a = this._displayUnit) !== null && _a !== void 0 ? _a : "", $efd7d73b5aabc0e1$exports.POS.TOP);
            case $efd7d73b5aabc0e1$exports.TE.UNIT:
                return this.renderText((_b = this._displayUnit) !== null && _b !== void 0 ? _b : "", "", $efd7d73b5aabc0e1$exports.POS.TOP);
            case $efd7d73b5aabc0e1$exports.TE.MARKER_DIR:
                return this.renderText((0, $a99931ec60826f34$exports.degreesToCompass)(this.marker_value), "", $efd7d73b5aabc0e1$exports.POS.TOP);
            default:
                return $hRcWJ$nothing;
        }
    }
    getMiddleElementSvg() {
        var _a, _b;
        switch(this.middle_element){
            case $efd7d73b5aabc0e1$exports.ME.VALUE:
            case $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT:
            case $efd7d73b5aabc0e1$exports.ME.RING_VALUE:
            case $efd7d73b5aabc0e1$exports.ME.RING_VALUE_UNIT:
                if (this._noState) return $hRcWJ$nothing;
                const val = [
                    $efd7d73b5aabc0e1$exports.ME.RING_VALUE,
                    $efd7d73b5aabc0e1$exports.ME.RING_VALUE_UNIT
                ].includes(this.middle_element) ? this.state.state : this.display_state.state;
                let unit = "";
                if (this.middle_element === $efd7d73b5aabc0e1$exports.ME.VALUE_UNIT) unit = (_a = this._displayUnit) !== null && _a !== void 0 ? _a : "";
                if (this.middle_element === $efd7d73b5aabc0e1$exports.ME.RING_VALUE_UNIT) unit = (_b = this._ringUnit) !== null && _b !== void 0 ? _b : "";
                const position = this.indicator === $efd7d73b5aabc0e1$exports.IND.POINTER ? $efd7d73b5aabc0e1$exports.POS.BELOW_DIAL : $efd7d73b5aabc0e1$exports.POS.MIDDLE;
                return this.renderText(val, unit, position);
            default:
                return $hRcWJ$nothing;
        }
    }
    getBottomElementSvg() {
        var _a, _b, _c, _d;
        if (this.ring_type.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS)) return $hRcWJ$nothing;
        switch(this.bottom_element){
            case $efd7d73b5aabc0e1$exports.BE.NAME:
                return this.renderText(this.bottom_name, "", $efd7d73b5aabc0e1$exports.POS.BOTTOM);
            case $efd7d73b5aabc0e1$exports.BE.UNIT:
                return this.renderText((_a = this._displayUnit) !== null && _a !== void 0 ? _a : "", "", $efd7d73b5aabc0e1$exports.POS.BOTTOM);
            case $efd7d73b5aabc0e1$exports.BE.RING_UNIT:
                return this.renderText((_b = this._ringUnit) !== null && _b !== void 0 ? _b : "", "", $efd7d73b5aabc0e1$exports.POS.BOTTOM);
            case $efd7d73b5aabc0e1$exports.BE.MIN_MAX:
                if (this.ring_type === $efd7d73b5aabc0e1$exports.RT.CLOSED) return $hRcWJ$nothing;
                const minText = Math.round(this.min);
                const maxText = this.max - this.min < 0.01 ? "\u2013" : Math.round(this.max);
                return (0, $hRcWJ$svg)`
          ${this.renderText(minText, "", $efd7d73b5aabc0e1$exports.POS.MIN)}
          ${this.renderText(maxText, "", $efd7d73b5aabc0e1$exports.POS.MAX)}
        `;
            case $efd7d73b5aabc0e1$exports.BE.VALUE:
            case $efd7d73b5aabc0e1$exports.BE.VALUE_UNIT:
            case $efd7d73b5aabc0e1$exports.BE.RING_VALUE:
            case $efd7d73b5aabc0e1$exports.BE.RING_VALUE_UNIT:
                if (this._noState) return $hRcWJ$nothing;
                const value = [
                    $efd7d73b5aabc0e1$exports.BE.RING_VALUE,
                    $efd7d73b5aabc0e1$exports.BE.RING_VALUE_UNIT
                ].includes(this.bottom_element) ? this.state.state : this.display_state.state;
                let unit = "";
                if (this.bottom_element === $efd7d73b5aabc0e1$exports.BE.VALUE_UNIT) unit = (_c = this._displayUnit) !== null && _c !== void 0 ? _c : "";
                if (this.bottom_element === $efd7d73b5aabc0e1$exports.BE.RING_VALUE_UNIT) unit = (_d = this._ringUnit) !== null && _d !== void 0 ? _d : "";
                return this.renderText(value, unit, $efd7d73b5aabc0e1$exports.POS.BOTTOM);
            default:
                return $hRcWJ$nothing;
        }
    }
    /* ---------- Lit render() ---------- */ render() {
        var _a;
        this.configureRing();
        this._noState = [
            "unknown",
            "unavailable"
        ].includes(this.state.state);
        let clampedState = (0, $a99931ec60826f34$exports.clamp)(Number(this.state.state), this.min, this.max);
        let statePoint = this._startDegrees + (this._endDegrees - this._startDegrees) * (clampedState - this.min) / (this.max - this.min);
        if (this._noState) {
            clampedState = this.min;
            statePoint = this._startDegrees;
            this._grad = new $473753ecfe0955bf$exports.ColourGradientScale("grey");
        }
        /* Opacity presets ----------------- */ let ringBackgroundOpacity = 0.15;
        if (this.indicator === $efd7d73b5aabc0e1$exports.IND.DOT) ringBackgroundOpacity = 0.7;
        else if (this.indicator === $efd7d73b5aabc0e1$exports.IND.POINTER) ringBackgroundOpacity = 0.07;
        else if (this.scale === $efd7d73b5aabc0e1$exports.IND.NONE) ringBackgroundOpacity = 0.15;
        /* Ring background ----------------- */ const ringBackground = this.ring_type === $efd7d73b5aabc0e1$exports.RT.NONE ? $hRcWJ$nothing : this.ring_type.startsWith($efd7d73b5aabc0e1$exports.RT.COMPASS) ? this.renderCompass() : this.renderGradRing(this._startDegrees, this._endDegrees, ringBackgroundOpacity);
        /* Indicator ----------------------- */ let indicatorBottom = $hRcWJ$nothing;
        let indicatorTop = $hRcWJ$nothing;
        if (this.ring_type !== $efd7d73b5aabc0e1$exports.RT.NONE && !this._noState) switch(this.indicator){
            case $efd7d73b5aabc0e1$exports.IND.ARC:
                indicatorBottom = (_a = this.renderRings) === null || _a === void 0 ? void 0 : _a.call(this, this._startDegrees, statePoint, this.state.state);
                break;
            case $efd7d73b5aabc0e1$exports.IND.DOT:
                indicatorBottom = this.renderDot(statePoint, this.state.state);
                break;
            case $efd7d73b5aabc0e1$exports.IND.POINTER:
                indicatorTop = this.renderPointer(statePoint);
                break;
            default:
                break;
        }
        /* Scale --------------------------- */ const scale = this.scale === $efd7d73b5aabc0e1$exports.SCALE.NONE ? $hRcWJ$nothing : this.renderScale(this.indicator === $efd7d73b5aabc0e1$exports.IND.POINTER ? 0.7 : 0.2);
        /* Markers ------------------------- */ const marker = (0, $a99931ec60826f34$exports.isNumber)(this.marker_value) && !this._noState ? this.renderMarker(this.marker_value, this.marker_colour) : $hRcWJ$nothing;
        const marker2 = (0, $a99931ec60826f34$exports.isNumber)(this.marker2_value) && !this._noState ? this.renderMarker(this.marker2_value, this.marker2_colour) : $hRcWJ$nothing;
        /* Icon ---------------------------- */ let stateColourValue;
        if (this.colourise_icon) stateColourValue = this.state.state;
        const iconHtml = this.middle_element === $efd7d73b5aabc0e1$exports.ME.ICON ? this.renderIcon($efd7d73b5aabc0e1$exports.POS.MIDDLE, this.display_state, stateColourValue) : this.top_element === $efd7d73b5aabc0e1$exports.TE.ICON ? this.renderIcon($efd7d73b5aabc0e1$exports.POS.TOP, this.display_state, stateColourValue) : this.bottom_element === $efd7d73b5aabc0e1$exports.BE.ICON ? this.renderIcon($efd7d73b5aabc0e1$exports.POS.BOTTOM, this.display_state, stateColourValue) : $hRcWJ$nothing;
        /* Assembled SVG ------------------- */ return (0, $hRcWJ$html)`
      ${iconHtml}
      <svg
        viewBox="0 0 ${$efd7d73b5aabc0e1$exports.VIEW_BOX} ${$efd7d73b5aabc0e1$exports.VIEW_BOX}"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        role="img"
        aria-hidden="true"
      >
        <g class="elements">
          ${this.getTopElementSvg()}
          ${this.getMiddleElementSvg()}
          ${this.getBottomElementSvg()}
        </g>
        <g class="ring">
          ${ringBackground}
          ${scale}
        </g>
        <g class="indicators">
          ${indicatorBottom}
          ${marker2}
          ${marker}
          ${indicatorTop}
        </g>
      </svg>
    `;
    }
}
$55f6c947fc198e2c$exports.RtRingSvg = $55f6c947fc198e2c$var$RtRingSvg;
$55f6c947fc198e2c$var$_RtRingSvg_grad = new WeakMap();
/* ---------- Lit styles ---------- */ $55f6c947fc198e2c$var$RtRingSvg.styles = (0, $hRcWJ$css)`
    :host {
      display: var(--ha-icon-display, inline-flex);
      align-items: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      fill: var(--icon-primary-color, currentcolor);
    }

    svg {
      width: 100%;
      height: 100%;
      pointer-events: none;
      display: block;
      position: absolute;
      inset: 0;
      overflow: visible;
    }

    path.primary-path {
      opacity: var(--icon-primary-opactity, 1);
    }
    path.secondary-path {
      fill: var(--icon-secondary-color, currentcolor);
      opacity: var(--icon-secondary-opactity, 0.5);
    }

    text {
      font-family: Geist, var(--ha-font-family-body);
      font-optical-sizing: auto;
      font-style: normal;
      color: var(--primary-text-color);
      font-weight: 600;
    }

    text.middle {
      letter-spacing: -0.3px;
    }
    text.middle.tight {
      letter-spacing: -1.1px;
    }
    text.lower-middle {
      letter-spacing: -0.2px;
    }
    text.middle.unit {
      letter-spacing: 0;
      opacity: var(--rt-background-text-opacity, 0.6);
      font-weight: 500;
    }
    text.bottom.closed {
      letter-spacing: -0.2px;
      opacity: var(--rt-background-text-opacity, 0.6);
      font-weight: 500;
    }
    text.top.marker {
      opacity: var(--rt-background-text-opacity, 0.6);
      font-weight: 500;
    }

    ha-state-icon.icon.top {
      color: var(
        --rt-icon-color,
        var(
          --rt-icon-state-color,
          color-mix(
            in srgb,
            var(--primary-text-color, #212121) var(--rt-top-icon-opacity, 50%),
            transparent
          )
        )
      );
    }
    ha-state-icon.icon {
      color: var(
        --rt-icon-color,
        var(--rt-icon-state-color, var(--tile-icon-color))
      );
    }

    text.compass.cardinal {
      font-weight: 800;
    }
    g.scale text {
      font-weight: 300;
      letter-spacing: 0;
      opacity: var(--rt-scale-text-opacity, 0.5);
      fill: var(--primary-text-color, #212121);
    }
    .scale .ticks {
      stroke: var(--primary-text-color, #212121);
    }
    .pointer {
      stroke: var(--rt-pointer-colour, orange);
      fill: var(--rt-pointer-colour, orange);
    }
  `;
/* Register element */ customElements.define("rt-ring-svg", $55f6c947fc198e2c$var$RtRingSvg);



const $97845d1997314720$var$pkg = $97845d1997314720$var$__importStar((parcelRequire("7Wxnt")));
console.info(`%c ring-tile-card %c v${$97845d1997314720$var$pkg.version} `, 'color: yellow; font-weight: bold; background: darkblue', 'color: white; font-weight: bold; background: dimgray');
(0, $94ff6df8efb89b41$exports.addFonts)();
customElements.define("ring-tile", $706064f87829af5f$exports.RingTile);
customElements.define("rt-info", $0e4094fdb9f56610$exports.RtInfo);
customElements.define("rt-ring", $6b0251d01b9a9c16$exports.RtRing);
customElements.define("rt-ring-svg", $55f6c947fc198e2c$exports.RtRingSvg);
window.customCards = window.customCards || [];
window.customCards.push({
    type: "ring-tile",
    name: "Ring Tile Card",
    preview: true,
    description: "Add a ring to your sensor tile cards to visualise sensor state."
});


export {$97845d1997314720$exports as default};
