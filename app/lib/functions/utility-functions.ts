import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import { UUID } from "crypto";
import {
  Character,
  DateTimes,
} from "@/app/lib/definitions/general-definitions";

export function getDateTimes(
  region: string,
  resetDate?: Date,
): undefined | DateTimes {
  dayjs.extend(utc);
  dayjs.extend(isoWeek);

  let now: Dayjs;
  let startOfDay: Dayjs;
  let endOfDay: Dayjs;
  let dayOfWeek: number;
  let nextResetDay: Dayjs | undefined;
  let nextThursday: Dayjs;

  switch (region) {
    case "MSEA":
      now = dayjs().utcOffset(8);
      startOfDay = dayjs().utcOffset(8).startOf("day");
      endOfDay = dayjs().utcOffset(8).endOf("day");
      nextThursday = now.isoWeekday(4);

      if (resetDate) {
        dayOfWeek = dayjs(resetDate).utcOffset(8).isoWeekday();
        nextResetDay = now.isoWeekday(dayOfWeek);
        if (now.isoWeekday() >= dayOfWeek) {
          nextResetDay = nextResetDay.add(1, "week");
        }
        nextResetDay = nextResetDay.startOf("day");
      }
      break;

    case "GMS":
      now = dayjs().utc();
      startOfDay = dayjs().utc().startOf("day");
      endOfDay = dayjs().utc().endOf("day");
      nextThursday = now.isoWeekday(4);

      if (resetDate) {
        dayOfWeek = dayjs(resetDate).utc().isoWeekday();
        nextResetDay = now.isoWeekday(dayOfWeek);
        if (now.isoWeekday() >= dayOfWeek) {
          nextResetDay = nextResetDay.add(1, "week");
        }
        nextResetDay = nextResetDay.startOf("day");
      }
      break;

    default:
      console.error("No region");
      return undefined;
  }

  if (now.isoWeekday() >= 4) {
    nextThursday = nextThursday.add(1, "week");
  }
  nextThursday = nextThursday.startOf("day");

  const dateTimes = {
    now: now,
    startOfDay: startOfDay,
    endOfDay: endOfDay,
    nextThursday: nextThursday,
    nextResetDay: nextResetDay,
  };

  return dateTimes;
}

export async function storeImage(
  userId: UUID,
  character: Character,
  image: File,
) {
  const imagePath = `characters/${userId}/${character.ign}`;

  const response = await fetch(`/api/character-images?imagepath=${imagePath}`, {
    method: "PUT",
    body: image,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  const { url } = await response.json();
  character.image = url;
}
