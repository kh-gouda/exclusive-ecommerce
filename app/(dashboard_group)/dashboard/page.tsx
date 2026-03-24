import {
  countActiveUsers,
  countProducts,
  countUsers,
  sumTotalOrderAmounts,
  sumTotalOrderAmountsCurrentYear,
} from "@/app/lib/utils";
import RevenueChart from "@ui/dashboard/RevenueCart";
import StatisticsCard from "@ui/dashboard/StatisticsCard";

export default async function DashBoardPage() {
  const productsCount = await countProducts();
  const usersCount = await countUsers();
  const activeUsers = await countActiveUsers();
  const totalRevenues = await sumTotalOrderAmounts();

  console.log(totalRevenues[0]);

  const totalRevenuesCurrentYear = await sumTotalOrderAmountsCurrentYear();
  return (
    <div>
      <div className="flex items-center gap-4 *:flex-1">
        <StatisticsCard
          title="Total Products"
          count={productsCount[0].count}
          unit="products"
          unitPosition="after"
        />
        <StatisticsCard
          title="Registered Users"
          count={usersCount[0].count}
          unit="users"
          unitPosition="after"
        />
        <StatisticsCard
          title="Active Users"
          count={activeUsers[0].count}
          unit="users"
          unitPosition="after"
        />
      </div>
      <div className="flex items-center gap-4 *:flex-1">
        <StatisticsCard
          title="Total Revenues"
          count={totalRevenues[0].sum}
          unit="$"
          unitPosition="before"
        />
        <StatisticsCard
          title="Total Revenues Current Year"
          count={totalRevenuesCurrentYear[0].sum}
          unit="$"
          unitPosition="before"
        />
      </div>
      <RevenueChart />
    </div>
  );
}
