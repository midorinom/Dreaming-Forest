export default function GenericSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-1/2">
      <div className="skeleton h-72 w-full"></div>
      <div className="skeleton h-8 w-28"></div>
      <div className="skeleton h-8 w-full"></div>
      <div className="skeleton h-8 w-full"></div>
    </div>
  );
}
