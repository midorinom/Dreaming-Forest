import type { WeekliesProps } from "@/app/lib/definitions/dashboard-definitions";

export default function Weeklies({ dailies, weeklies }: WeekliesProps) {
  return (
    <div
      className={`collapse w-[36vw] ${
        (weeklies.length === 0 || dailies.length === 0) && "collapse-open"
      } bg-secondary`}
    >
      {weeklies.length > 0 && <input type="radio" name="accordion" />}
      <div
        className={`${
          weeklies.length === 0 && "mb-1"
        } collapse-title pt-3 text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral`}
      >
        Weeklies
      </div>
      {weeklies.length > 0 && (
        <div className="collapse-content max-h-[41vh]"></div>
      )}
    </div>
  );
}
