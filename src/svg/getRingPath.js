import { VIEW_BOX } from "../const";
import { getCoordFromDegrees } from "../helpers/utilities";

export function getRingPath(startAngle, endAngle, outerRadius, width) {
  const radius = outerRadius - width / 2;
  const longPathFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

  const start = getCoordFromDegrees(startAngle, radius, VIEW_BOX).join(" ");
  const end = getCoordFromDegrees(endAngle, radius, VIEW_BOX).join(" ");

  const commands = [];
  commands.push(`M ${start}`);
  commands.push(`A ${radius} ${radius} 0 ${longPathFlag} 1 ${end}`);
  const segment = commands.join(" ");

  return segment;
}
