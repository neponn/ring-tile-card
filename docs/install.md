**docs** | [Read me](../README.md) | **Installation** | [Examples](examples.md) | [Configuration](config.md) | [Advanced](advanced.md) |

# Installation

HACS is the recommended way to install `ring-tile` card. If you haven't already installed HACS, [follow the instructions](https://www.hacs.xyz/docs/use/#getting-started-with-hacs).

## One button HACS install (try first)

A one click installation may work for you.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=neponn&repository=ring-tile-card&category=plugin)

## HACS install

Use HACS to install `ring-tile` card.

Because `ring-tile` card is not yet available in the main HACS repository, you need to manually add this repository:

1. Click HACS in your sidebar
2. Click the three dots at the top right of the HACS window
3. Choose "Custom repositories"
4. In "Repository" enter `neponn/ring-tile-card`
5. In "Type" choose "Dashboard"
6. Hit "Add"

To install `ring-tile` card:

1. In the main HACS window, enter "Ring-tile card" in the search box at the top of the window
2. In the "Ring-tile card" row, click the three dots at the right and choose "Download"

### Add a reference

You may need to add a reference to `ring-tile` card. If you use the graphical frontend editor:

1. Check that Advanced Mode is enabled in your user profile (click your user name in the side bar to get there)
2. Navigate to Configuration -> Lovelace Dashboards -> Resources Tab. Hit the orange (+) icon
3. Enter the path `/hacsfiles/ring-tile-card.js` and select type "JavaScript Module"
4. Restart Home Assistant

If you configure the frontend via YAML, add a reference to `ring-tile-card.js` inside your `configuration.yaml`:

```yaml
resources:
  - url: /hacsfiles/ring-tile-card.js
    type: module
```

## Add a ring-tile card to your dashboard

You can use the GUI editor to add a `ring-tile` card:

1. Select "Edit dashboard" from the three dots at the top right of your dashboard
2. Click a "+" button on your dashboard where you would like to add a `ring-tile` card
3. Search for Ring Tile Card and click on it
4. Enter your sensor entity in the `entity:` line in the YAML config
5. Customise using additional YAML config as you desire!

## Up next

Get started with [examples](examples.md).

##

**docs** | [Read me](../README.md) | **Installation** | [Examples](examples.md) | [Configuration](config.md) | [Advanced](advanced.md) |