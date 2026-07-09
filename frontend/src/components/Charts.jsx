import "../styles/charts.css";

import BarChartCard from "./Charts/BarChartCard";
import PieChartCard from "./Charts/PieChartCard";
import ScatterChartCard from "./Charts/ScatterChartCard";
import HistogramCard from "./Charts/HistogramCard";

function Charts({ analysisType, data }) {

  if (!data || data.length === 0) return null;

  const chartLayout = (leftChart, rightChart) => (
    <div className="charts-grid">
      {leftChart}
      {rightChart}
    </div>
  );

  switch (analysisType) {

    case "Shop Wise Analysis":

      return chartLayout(

        <BarChartCard
          data={data}
          xKey="shop_code"
          yKey="total_delay_hours"
          title="Delay Hours by Shop"
          xLabel="Shop Code"
          yLabel="Delay Hours (hrs)"
        />,

        <PieChartCard
          data={data}
          nameKey="shop_code"
          valueKey="total_delay_hours"
          title="Delay Contribution by Shop"
          prefix="Shop-"
        />

      );

    case "Equipment Wise Analysis":

      return chartLayout(

        <BarChartCard
          data={data}
          xKey="equipment"
          yKey="total_delay_hours"
          title="Equipment Delay Hours"
          xLabel="Equipment"
          yLabel="Delay Hours (hrs)"
          layout="vertical"
        />,

        <ScatterChartCard
          data={data}
          xKey="total_delays"
          yKey="avg_delay_hours"
          title="Delay Frequency vs Average Delay"
          xLabel="Total Delays"
          yLabel="Average Delay (hrs)"
        />

      );

    case "Agency Wise Analysis":

      return chartLayout(

        <BarChartCard
          data={data}
          xKey="agency_code"
          yKey="total_delay_hours"
          title="Delay Hours by Agency"
          xLabel="Agency"
          yLabel="Delay Hours (hrs)"
        />,

        <PieChartCard
          data={data}
          nameKey="agency_code"
          valueKey="total_delay_hours"
          title="Agency Delay Contribution"
        />

      );

    case "Duration Wise Analysis":

      return chartLayout(

        <HistogramCard
          data={data}
          xKey="duration_range"
          yKey="total_delays"
          title="Delay Duration Distribution"
          xLabel="Duration Range"
          yLabel="Number of Delay Events"
        />,

        <PieChartCard
          data={data}
          nameKey="duration_range"
          valueKey="total_delays"
          title="Share of Delay Events"
        />

      );

    case "Conveyor Wise Analysis":

      return chartLayout(

        <BarChartCard
          data={data}
          xKey="remarks"
          yKey="total_delay_hours"
          title="Delay Hours by Conveyor"
          xLabel="Conveyor"
          yLabel="Delay Hours (hrs)"
          layout="vertical"
        />,

        <PieChartCard
          data={data}
          nameKey="remarks"
          valueKey="percentage"
          title="Conveyor Failure Contribution"
        />

      );

    case "Season Wise Analysis":

      return chartLayout(

        <BarChartCard
          data={data}
          xKey="season"
          yKey="total_delay_hours"
          title="Delay Hours by Season"
          xLabel="Season"
          yLabel="Delay Hours (hrs)"
        />,

        <PieChartCard
          data={data}
          nameKey="season"
          valueKey="total_delay_hours"
          title="Season Contribution"
        />

      );

    default:
      return null;
  }

}

export default Charts;