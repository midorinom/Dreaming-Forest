import type { ClassFieldProps } from "@/app/lib/definitions/characters-definitions";
import ClassSelect from "./ClassSelect";

export default function ClassField({
  setMaplestoryClass,
  isTopCard,
}: ClassFieldProps) {
  return (
    <div className="relative col-start-2 row-start-3 w-2/3">
      <ClassSelect
        setMaplestoryClass={setMaplestoryClass}
        isTopCard={isTopCard}
      />
    </div>
  );
}
