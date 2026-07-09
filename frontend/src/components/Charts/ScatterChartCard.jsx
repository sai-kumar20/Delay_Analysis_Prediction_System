import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function ScatterChartCard({
  data,
  xKey,
  yKey,
  title,
  xLabel,
  yLabel,
  color = "#E67E22"
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

        <ScatterChart>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey={xKey}
            name={xLabel}
            label={{
              value: xLabel,
              position: "insideBottom",
              offset: -5
            }}
          />

          <YAxis
            type="number"
            dataKey={yKey}
            name={yLabel}
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
          />

          <Legend />

          <Scatter
            name="Equipment"
            data={data}
            fill={color}
          />

        </ScatterChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ScatterChartCard;