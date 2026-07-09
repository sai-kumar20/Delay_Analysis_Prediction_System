import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

function BarChartCard({
  data,
  xKey,
  yKey,
  title,
  xLabel,
  yLabel,
  color = "#437099",
  layout = "horizontal"
}) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,.15)"
      }}
    >

      <h3
        style={{
          textAlign: "center",
          marginBottom: "15px",
          color: "#06233d"
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <BarChart
          data={data}
          layout={layout}
          margin={{
            top: 15,
            right: 25,
            left: 20,
            bottom: 20
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.35}
          />

          {layout === "horizontal" ? (

            <>

              <XAxis
                dataKey={xKey}
                tick={{
                  fontSize: 12
                }}
                interval={0}
                angle={0}
                label={{
                  value: xLabel,
                  position: "insideBottom",
                  offset: -5
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12
                }}
                label={{
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft"
                }}
              />

            </>

          ) : (

            <>

              <XAxis
                type="number"
                tick={{
                  fontSize: 12
                }}
                label={{
                  value: yLabel,
                  position: "insideBottom",
                  offset: -5
                }}
              />

              <YAxis
                type="category"
                dataKey={xKey}
                width={120}
                tick={{
                  fontSize: 12
                }}
                label={{
                  value: xLabel,
                  angle: -90,
                  position: "insideLeft"
                }}
              />

            </>

          )}

          <Tooltip
            formatter={(value) => [
              Number(value).toFixed(2),
              yLabel
            ]}
          />

          <Legend />

          <Bar
            dataKey={yKey}
            fill={color}
            radius={[8, 8, 0, 0]}
            barSize={28}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default BarChartCard;