import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function HistogramCard({
  data,
  xKey,
  yKey,
  title,
  xLabel,
  yLabel,
  color = "#27AE60"
}) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,.15)"
      }}
    >

      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey={xKey}
            label={{
              value: xLabel,
              position: "insideBottom",
              offset: -5
            }}
          />

          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip
            formatter={(value) => [
              value,
              yLabel
            ]}
          />

          <Legend />

          <Bar
            dataKey={yKey}
            name="Delay Count"
            fill={color}
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default HistogramCard;