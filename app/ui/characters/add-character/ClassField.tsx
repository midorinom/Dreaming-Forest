import type { ClassFieldProps } from "@/app/lib/definitions/characters-definitions";
import ClassSelect from "./ClassSelect";

export default function ClassField({
  setMaplestoryClass,
  submitClicked,
}: ClassFieldProps) {
  return (
    <div className="relative col-start-2 row-start-3 w-3/5">
      <ClassSelect
        setMaplestoryClass={setMaplestoryClass}
        submitClicked={submitClicked}
      />
    </div>
  );
}
