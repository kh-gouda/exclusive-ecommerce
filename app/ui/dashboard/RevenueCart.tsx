import { fetchRevenueChartData, generateYAxis } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default async function RevenueChart() {
  const revenue = await fetchRevenueChartData();
  const chartData = revenue.map((month) => ({
    month: month.month,
    totalamount: Number(month.totalamount),
  }));
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(chartData);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h3 className={`mb-4 text-xl md:text-2xl`}>Revenue Chart</h3>

      <div className="rounded-2xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {chartData.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-identity"
                style={{
                  height: `${(chartHeight / topLabel) * month.totalamount}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h4 className="ml-2 text-sm text-gray-500 ">Current Year</h4>
        </div>
      </div>
    </div>
  );
}
