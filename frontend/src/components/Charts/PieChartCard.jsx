import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#1f4e79",
  "#2e75b6",
  "#5b9bd5",
  "#70ad47",
  "#ffc000",
  "#ed7d31",
  "#c00000",
  "#7f6000",
  "#548235",
  "#4472c4",
  "#7030a0",
  "#00b0f0",
  "#92d050",
  "#ff5050",
  "#9966ff"
];

function PieChartCard({
  data,
  nameKey,
  valueKey,
  title,
  prefix = ""
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
          color: "#0b4070"
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            innerRadius={85}
            outerRadius={135}

            label={({ percent }) => {

              const p = percent * 100;

              if (p < 5) return "";

              return `${p.toFixed(0)}%`;

            }}

            labelLine={false}

          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip

            formatter={(value, name) => [

              `${Number(value).toFixed(2)}`,

              title

            ]}

          />

          <Legend

            formatter={(value) => `${prefix}${value}`}

            verticalAlign="bottom"

            height={50}

          />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PieChartCard;