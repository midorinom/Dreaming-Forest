import type { BossesProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";

export default function Bosses({ region }: BossesProps) {
  dayjs.extend(utc);
  dayjs.extend(isoWeek);

  const now = dayjs().utc();
  let nextThursday = now.isoWeekday(4);
  if (now.isoWeekday() >= 4) {
    nextThursday = nextThursday.add(1, "week");
  }
  nextThursday = nextThursday.startOf("day");
  const endOfDay = dayjs().utc().endOf("day");

  const bossesTimer = `${nextThursday.diff(now, "day")}d${endOfDay.diff(
    now,
    "hour"
  )}h`;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full mt-2">
        <div className="w-4/5 bg-base-100 collapse collapse-open">
          <div className="pt-3 text-4xl font-medium collapse-title text-info underline-dreamy-neutral underline-offset-8">
            Bosses
          </div>
          <div className="absolute text-2xl top-1 right-2 text-info">
            {bossesTimer}
          </div>
          <div className="collapse-content max-h-[50vh]"></div>
        </div>
      </div>
    </div>
  );
}
