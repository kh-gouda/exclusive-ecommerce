export default function StatisticsCard({
  title,
  count,
  unit,
  unitPosition,
}: {
  title: string;
  count: number;
  unit: string;
  unitPosition: string;
}) {
  return (
    <div className="text-center shadow rounded-2xl mb-7.5">
      <h3 className="bg-identity text-white-color rounded-t-2xl p-2">
        {title}
      </h3>
      <p className="p-2">
        {unitPosition === "before" ? unit + " " : null}
        {count}
        {unitPosition === "after" ? " " + unit : null}
      </p>
    </div>
  );
}
