import type { ClassFieldProps } from "@/app/lib/definitions/welcome-definitions";
import ClassSelect from "./ClassSelect";

export default function ClassField({ setMaplestoryClass }: ClassFieldProps) {
  return (
    <div className="relative col-start-2 row-start-3 w-1/2">
      <ClassSelect setMaplestoryClass={setMaplestoryClass} />
    </div>
  );
}
