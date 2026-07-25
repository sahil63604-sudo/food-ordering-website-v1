import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function RevenueChart({data,pieData }) {

  const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
];

console.log("pieData =", pieData);
  return (
<section className="grid grid-cols-2 gap-6">

  <div className="bg-white rounded-3xl p-6 shadow-md">
    <div className=" border border-orange-100">
      <h2 className="text-xl font-bold mb-4">
        Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Line
   dataKey="revenue"
   stroke="#f97316"
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

 <div className="bg-white rounded-3xl p-6 shadow-md border border-orange-100">
  <h2 className="text-xl font-bold mb-4">
    Order Status
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData || []}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#f97316"
        label
      >
        {pieData?.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

</section>
  );
}
