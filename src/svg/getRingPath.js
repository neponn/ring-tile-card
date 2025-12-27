import { VIEW_BOX } from "../const";
import { getCoordFromDegrees } from "../helpers/utilities";

export function getRingPath(startAngle, endAngle, outerRadius, width) {
  const innerRadius = outerRadius - width;
  const longPathFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const outerStart = getCoordFromDegrees(
    startAngle,
    outerRadius,
    VIEW_BOX
  ).join(" ");
  const outerEnd = getCoordFromDegrees(endAngle, outerRadius, VIEW_BOX).join(
    " "
  );
  const innerStart = getCoordFromDegrees(
    endAngle,
    innerRadius,
    VIEW_BOX
  ).join(" ");
  const innerEnd = getCoordFromDegrees(
    startAngle,
    innerRadius,
    VIEW_BOX
  ).join(" ");
  const commands = [];
  commands.push(`M ${outerStart}`);
  commands.push(
    `A ${outerRadius} ${outerRadius} 0 ${longPathFlag} 1 ${outerEnd}`
  );
  commands.push(`A ${width / 2} ${width / 2} 0 0 1 ${innerStart}`);
  commands.push(
    `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 0 ${innerEnd}`
  );
  commands.push(`A ${width / 2} ${width / 2} 0 0 1 ${outerStart}`);
  const segment = commands.join(" ");
  return segment;
}

export function getRingPath2(startAngle, endAngle, outerRadius, width){
  const radius = outerRadius-width/2;
  const longPathFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const start = getCoordFromDegrees(
    startAngle,
    radius,
    VIEW_BOX
  ).join(" ");
  const end = getCoordFromDegrees(endAngle, radius, VIEW_BOX).join(
    " "
  );
  const commands = [];
  commands.push(`M ${start}`);
  commands.push(
    `A ${radius} ${radius} 0 ${longPathFlag} 1 ${end}`
  );
  const segment = commands.join(" ");
  return segment;
}
