import { RingTile } from "./ring-tile";
import { addFonts } from "./helpers/ringTileFonts";
import { RtInfo } from "./rt-info";
import { RtRing } from "./rt-ring";
import { RtRingSvg } from "./rt-ring-svg";
import * as pkg from "../package.json";

console.info(
  `%c ring-tile-card %c v${pkg.version} `,
  'color: yellow; font-weight: bold; background: darkblue',
  'color: white; font-weight: bold; background: dimgray',
);

addFonts();

customElements.define("ring-tile", RingTile);
customElements.define("rt-info", RtInfo);
customElements.define("rt-ring", RtRing);
customElements.define("rt-ring-svg", RtRingSvg);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ring-tile",
  name: "Ring Tile Card",
  preview: true,
  description:
    "Add a ring to your sensor tile cards to visualise sensor state.",
});
