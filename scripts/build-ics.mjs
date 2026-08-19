/* Regenerate the .ics calendar files from the schedule data.
   Usage:  npm run calendar     (writes into ./calendar) */
import { writeFileSync, mkdirSync } from "node:fs";
import { buildWeeksIcs, buildMilestonesIcs, buildDailyIcs, buildAllIcs } from "../src/lib/ics.js";

mkdirSync("calendar", { recursive: true });
const files = [
  ["calendar/putnam-milestones.ics", buildMilestonesIcs()],
  ["calendar/putnam-weeks.ics", buildWeeksIcs()],
  ["calendar/putnam-daily.ics", buildDailyIcs()],
  ["calendar/putnam-all.ics", buildAllIcs()],
];
for (const [path, text] of files) {
  writeFileSync(path, text, "utf8");
  console.log(`${path.padEnd(34)} ${(text.match(/BEGIN:VEVENT/g) || []).length} events, ${(text.length / 1024).toFixed(1)} KB`);
}
