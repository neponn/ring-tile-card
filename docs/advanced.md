**docs** | [Read me](../README.md) | [Installation](install.md) | [Examples](examples.md) | [Configuration](config.md) | **Advanced** |

# Advanced configuration

`ring-tile` doesn't support templating. To avoid complexity, `ring-tile` has been designed to work well with [`card-mod`](https://github.com/thomasloven/lovelace-card-mod), which supports templating very well. 

If you haven't used it before, `card-mod` is an awesome plugin that enables you to dynamically manipulate the styling of any Home Assistant card. Make sure you are familiar with it before reading on.

There are two ways in which `ring-tile` has been designed for `card-mod` use: [overriding CSS colour variables](#overriding-css-colour-variables) and [manipulating `ring-tile` HTML / SVG elements](#manipulating-ring-tile-html--svg-elements).

## Overriding CSS colour variables

Best to start with an example. First, an example of **dynamic** styling. This example makes use of `card_mod` to set a CSS variable based on the state of an entity by using a template.

<img src="img/ad-battery-charging.png" width="250">

```yaml
type: custom:ring-tile
entity: sensor.iphone_battery_level
card_mod:
  style: |
    * {
      --rt-icon-colour: {{ 
          "darkorange" 
          if states("sensor.iphone_battery_state") == "Charging"
          else "var(--)" 
        }};
    }
```

In this example, the colour of the icon is changed to `darkorange` if the iPhone battery is charging (default colour if not). This is achieved by using a `card_mod` style template to dynamically update the `--rt-icon-colour` CSS variable.

Another example: you can **statically** change the opacity of the ring background.

<img src="img/ad-ring-background.png" width="250">

```yaml
type: custom:ring-tile
entity: sensor.humidity
ring_size: 2
card_mod:
  style: |
    * {
      --rt-ring-background-opacity: 20%;
    }
```

For static styling you can alternatively use the `tweaks` config option:

```yaml
type: custom:ring-tile
entity: sensor.humidity
ring_size: 2
tweaks:
  rt-ring-background-opacity: 20%
```

Important to note that the `tweaks` method only supports static styling; if you want to style something dynamically (with a template), you'll need to use the `card_mod` option.

### CSS variables available

`ring-tile` exposes a bunch of CSS variables that you can manipulate. As described above, you can use these either with `card_mod` (use the CSS variable), or &mdash; for static styling &mdash; via the `tweaks` config option. There are also a few inbuilt `tweaks` options that take care of common CSS styling jobs.

| CSS variable | `tweaks` option | Purpose | Type | Default |
|--------------|-----------------|---------|------|---------|
| `--rt-icon-colour` | `rt-icon-colour` | Override icon colour | CSS colour code | `ha_blue` middle and bottom positions; `ha_grey` top |
| `--card-mod-icon` | N/A | Override the configured icon for dynamic styling (`card_mod` [feature](https://github.com/thomasloven/lovelace-card-mod#changing-icons)). Use the `icon` config option for static cases | HA icon code (eg `mdi:eye`) | per config |
| `--rt-top-icon-opacity` | `rt-top-icon-opacity` | Icon opacity when rendered in top position | `0%`-`100%` | `50%` |
| `--rt-ring-colour` | `rt-ring-colour` | Override the ring colour (most useful for dynamic styling) | CSS colour code | As configured in `colours` config option |
| `--rt-ring-background-opacity` | `rt-ring-background-opacity` | Opacity used for the ring background  | `0%`-`100%` | depends on ring |
| `--rt-pointer-colour` | `rt-pointer-colour` | Override the `pointer` colour | CSS colour code | `orange` |
| `--rt-marker-colour` | `rt-marker-colour` | Override the `marker` colour | CSS colour code | grey |
| `--rt-marker2-colour` | `rt-marker2-colour` | Override the `marker2` colour | CSS colour code | light grey |
| `--rt-background-text-opacity` | `rt-background-text-opacity` | Text opacity used for top, bottom and units | `0`-`1` | `0.6` |
| `--rt-scale-text-opacity` | `rt-scale-text-opacity` | Text opacity used for scale labels | `0`-`1` | `0.5` |
| `--rt-font-family` | `rt-font-family` | Override the font used to render the ring (does not apply to info area) | Font name | Geist |
| `--rt-ring-svg-size` | `rt-ring-svg-size` | Override the overall size of the ring enabling arbitrary scaling. **Caution!** may cause unappealling results! | Size literal (eg `53px`) | Scales with `ring_size` |
| N/A | `transparent_tile` | No background and no border | Boolean | `False` |
| N/A | `tile_rows` | Customise the total height of the `ring-tile` card | `1.0`-`6.0`, card layout row units | `ring_size` row units |
| N/A | `tile_columns` | Customise the total width of the `ring-tile` card | `1.5`-`12.0`, card layout column units | 6 column units |

Note: `colour` may also be spelled `color`.

`rt-ring-svg-size`, `transparent_tile`, `tile_rows` and `tile_columns` can be used in combination with other layout cards to build highly customised tiles. For example:

<img src="img/ad-custom-layout.png" width="250px">

<details>

<summary>Config:</summary>

```yaml
type: custom:vertical-stack-in-card
cards:
  - type: custom:layout-card
    layout_type: custom:horizontal-layout
    layout:
      width: 60
    cards:
      - type: custom:ring-tile
        entity: sensor.temperature_lounge
        ring_size: 2
        ring_only: true
        bottom_element: name
        min_sig_figs: 3
        tweaks:
          transparent_tile: true
          rt-ring-svg-size: 60px
      - type: custom:ring-tile
        entity: sensor.temperature_study
        ring_size: 2
        ring_only: true
        bottom_element: name
        min_sig_figs: 3
        tweaks:
          transparent_tile: true
          rt-ring-svg-size: 60px
      - type: custom:ring-tile
        entity: sensor.media
        ring_size: 2
        ring_only: true
        bottom_element: name
        min_sig_figs: 3
        tweaks:
          transparent_tile: true
          rt-ring-svg-size: 60px
grid_options:
  columns: 6
  rows: 2
```

</details>


### Home Assistant friendly colours

Note that [colour shortcuts](config.md/#home-assistant-friendly-colour-shortcuts) provided by `ring-tile` **do not** work with `card_mod`. You can achieve a similar result using Home Assistant built in CSS colour variables, [see below](#ha-friendly-colour-alternatives). Colour shortcuts **do** work with `tweaks` options, however.

## Manipulating ring-tile HTML / SVG elements

You can get even more dynamic control over `ring-tile` by directly manipulating the HTML / SVG elements themselves. 

### Example

<img src="img/ad-marker-visibility.png" width="500">

My study is only heated if I am working at home. To show when my study is being heated, I only show the thermostat setpoint as a marker when I am working at home. To do this, I target the `visibility` attribute of the `g.marker` SVG element, which sits below the `rt-ring-svg` element, separated by a shadow-root (`$`). Config as follows:

```yaml
type: custom:ring-tile
entity: sensor.temperature_study
marker: input_number.study_boost_temperature
bottom_element: none
card_mod:
  style:
    rt-ring-svg $: |
      g.marker {
        visibility: {{ 
          'hidden' if states('binary_sensor.working_at_home') == 'off' 
          else 'visible'
        }};
      }
```

### Ring tile DOM structure

`ring-tile` uses structured class names to make it easier to select elements for targeted `card-mod` styling. Here are a few guidelines.

* The top level element is `ring-tile`
* Ring elements live in a shadow-root inside `rt-ring-svg`
  * To access ring elements, use `rt-ring-svg $: |` before selecting the targeted elements (like in the example above)
* All elements are rendered as SVG, split into three groups, with class names assigned as follows:
  * `elements`: these are the `top` / `middle` / `bottom` elements
  * `ring`: the ring itself, plus an optional `scale` group, containing:
    * `ticks` and `labels` groups
  * `indicators`: a group containing the indicator and markers:
    * `dot` indicator consisting of `dot` and `dot-outline`
    * `arc` indicator consisting of `ring-solid`
    * `pointer` indicator consists of SVG objects with class names `pointer` and `pointer-centre` contained in a group
    * `marker` group

The easiest way to find your way around the DOM is to use a browser inspector (F12 / ⌘-shift-C).

## Handy custom sensors for use with ring-tiles

I have made a few custom sensors to help with certain `ring-tile` use cases. Fair warning: there might be better ways to do these things, but this is how I did it.

### Pressure 6 hours ago

When configuring a barometer, it's helpful to add a marker that shows the pressure a little while ago so that you can see atmospheric pressure trends. I found 6 hours prior works well.

Assuming you have an an atmospheric pressure sensor named `sensor.pressure` and `sensor`s are tracked in your [recorder](https://www.home-assistant.io/integrations/recorder/) database, you can define an `sql` sensor that looks back in history. Note there is a risk that `sql` sensors break if the HA devs change the database schema.

```yaml
sql:
  - name: Pressure 6 hours ago
    db_url: !secret recorder_db
    query: >
      SELECT ROUND(avg(CAST(s.mean AS DECIMAL(10, 1))), 1) pressure_6hr_ago,
          COUNT(*) samples
      FROM statistics_short_term s
          LEFT JOIN statistics_meta sm ON (s.metadata_id = sm.id)
      WHERE sm.statistic_id = 'sensor.pressure'
          AND unix_timestamp(NOW()) - s.start_ts > (5.8 * 3600)
          AND unix_timestamp(NOW()) - s.start_ts < (6.2 * 3600)
          AND s.mean != 'unknown'
          AND s.mean != 'unavailable'
      LIMIT 1
    column: pressure_6hr_ago
    unit_of_measurement: mbar
    device_class: pressure
    state_class: measurement
```

### Wind direction average

When using a compass ring to show wind direction and strength, I find my rooftop wind sensor produces quite noisy results as it spins about in the wind. But over the long term, general direction is quite reliable. I find that a wind direction marker based on a circular mean over the past 15 minutes works pretty well.

Assuming your wind direction sensor is named `sensor.wind_direction`:

```yaml
sensor:
  - platform: statistics
    name: Wind direction 15 min
    entity_id: sensor.wind_direction
    state_characteristic: mean_circular
    max_age:
      minutes: 15
```

## HA friendly colour alternatives

Home assistant comes with a bunch of CSS colour variables, which you can use in your `card_mod` styles to match the HA aesthetic:

- ![#212121](https://placehold.co/15x15/212121/212121.png) / ![#e1e1e1](https://placehold.co/15x15/e1e1e1/e1e1e1.png) `--primary-text-color:` `#212121` / `#e1e1e1` (Adapts to light / dark)

- ![#727272](https://placehold.co/15x15/727272/727272.png) / ![#9b9b9b](https://placehold.co/15x15/9b9b9b/9b9b9b.png) `--secondary-text-color:` `#727272` / `9b9b9b` (Adapts to light / dark)

- ![#bdbdbd](https://placehold.co/15x15/bdbdbd/bdbdbd.png) / ![#6f6f6f](https://placehold.co/15x15/6f6f6f/6f6f6f.png) `--disabled-color:` `#bdbdbd` / `#6f6f6f` (Adapts to light / dark)

- ![#ffffff](img/white-swatch.svg) / ![#1c1c1c](https://placehold.co/15x15/1c1c1c/1c1c1c.png) `--card-background-color:` `#ffffff` / `#1c1c1c` (Adapts to light / dark)

- ![#44739e](https://placehold.co/15x15/44739e/44739e.png) `--state-icon-color:` `#44739e`

- ![#f44336](https://placehold.co/15x15/f44336/f44336.png) `--red-color:` `#f44336`

- ![#e91e63](https://placehold.co/15x15/e91e63/e91e63.png) `--pink-color:` `#e91e63`

- ![#926bc7](https://placehold.co/15x15/926bc7/926bc7.png) `--purple-color:` `#926bc7`

- ![#926bc7](https://placehold.co/15x15/926bc7/926bc7.png) `--deep-purple-color:` `#926bc7`

- ![#3f51b5](https://placehold.co/15x15/3f51b5/3f51b5.png) `--indigo-color:` `#3f51b5`

- ![#2196f3](https://placehold.co/15x15/2196f3/2196f3.png) `--blue-color:` `#2196f3`

- ![#03a9f4](https://placehold.co/15x15/03a9f4/03a9f4.png) `--light-blue-color:` `#03a9f4`

- ![#00bcd4](https://placehold.co/15x15/00bcd4/00bcd4.png) `--cyan-color:` `#00bcd4`

- ![#009688](https://placehold.co/15x15/009688/009688.png) `--teal-color:` `#009688`

- ![#4caf50](https://placehold.co/15x15/4caf50/4caf50.png) `--green-color:` `#4caf50`

- ![#8bc34a](https://placehold.co/15x15/8bc34a/8bc34a.png) `--light-green-color:` `#8bc34a`

- ![#cddc39](https://placehold.co/15x15/cddc39/cddc39.png) `--lime-color:` `#cddc39`

- ![#ffeb3b](https://placehold.co/15x15/ffeb3b/ffeb3b.png) `--yellow-color:` `#ffeb3b`

- ![#ff9800](https://placehold.co/15x15/ff9800/ff9800.png) `--amber-color:` `#ff9800`

- ![#ff9800](https://placehold.co/15x15/ff9800/ff9800.png) `--orange-color:` `#ff9800`

- ![#ff6f22](https://placehold.co/15x15/ff6f22/ff6f22.png) `--deep-orange-color:` `#ff6f22`

- ![#795548](https://placehold.co/15x15/795548/795548.png) `--brown-color:` `#795548`

**Note!** Home Assistant devs may change these at any time!

##

**docs** | [Read me](../README.md) | [Installation](install.md) | [Examples](examples.md) | [Configuration](config.md) | **Advanced** |
