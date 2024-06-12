import { ClassFieldProps } from "@/app/lib/definitions/first-timer-definitions";
import ClassSelect from "./ClassSelect";

export default function ClassField({ setMaplestoryClass }: ClassFieldProps) {
  return (
    <div className="relative col-start-2 row-start-3 w-4/5">
      <ClassSelect setMaplestoryClass={setMaplestoryClass} />
    </div>
  );
}
