import type { ClassFieldProps } from "@/app/lib/definitions/characters-definitions";
import ClassSelect from "./ClassSelect";

export default function ClassField({
  maplestoryClass,
  setMaplestoryClass,
  isTopCard,
  isPrimaryBackground,
}: ClassFieldProps) {
  return (
    <div className="relative col-start-2 row-start-3 w-2/3">
      <ClassSelect
        maplestoryClass={maplestoryClass}
        setMaplestoryClass={setMaplestoryClass}
        isTopCard={isTopCard}
        isPrimaryBackground={isPrimaryBackground}
      />
    </div>
  );
}
