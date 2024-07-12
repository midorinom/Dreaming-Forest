import type { ClassFieldProps } from "@/app/lib/definitions/welcome-definitions";
import ClassSelect from "./ClassSelect";

export default function ClassField({ setMaplestoryClass }: ClassFieldProps) {
  return (
    <div className="relative w-1/2 col-start-2 row-start-3">
      <ClassSelect setMaplestoryClass={setMaplestoryClass} />
    </div>
  );
}
