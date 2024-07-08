export default function DailiesWeeklies() {
  return (
    <div className="flex flex-col items-end mt-2 w-full">
      <div className="w-[36vw] collapse bg-primary">
        <input type="radio" name="accordion" defaultChecked />
        <div className="collapse-title pt-3 text-4xl text-info font-medium underline-dreamy-neutral underline-offset-8">
          Dailies
        </div>
        <div className="collapse-content max-h-[41vh]"></div>
      </div>
      <div className="w-[36vw] collapse bg-secondary">
        <input type="radio" name="accordion" />
        <div className="collapse-title pt-3 text-4xl text-info font-medium underline-dreamy-neutral underline-offset-8">
          Weeklies
        </div>
        <div className="collapse-content max-h-[41vh]"></div>
      </div>
    </div>
  );
}
