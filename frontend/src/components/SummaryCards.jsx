import "../styles/cards.css";

function SummaryCards({ analysisType, data }) {

  if (!data || data.length === 0) return null;

  let totalDelays = 0;
  let totalHours = 0;
  let avgDelay = 0;
  let highestName = "-";

  // =========================
  // Calculate Totals
  // =========================

  data.forEach((item) => {

    totalDelays += Number(item.total_delays || 0);

    totalHours += Number(
      item.total_delay_hours ||
      item.max_delay ||
      0
    );

    avgDelay += Number(
      item.avg_delay_hours ||
      item.avg_delay ||
      0
    );

  });

  avgDelay = avgDelay / data.length;

  // =========================
  // Highest Value
  // =========================

  switch (analysisType) {

    case "Shop Wise Analysis":
      highestName = data.reduce((a, b) =>
        a.total_delays > b.total_delays ? a : b
      ).shop_code;
      break;

    case "Equipment Wise Analysis":
      highestName = data.reduce((a, b) =>
        a.total_delays > b.total_delays ? a : b
      ).equipment;
      break;

    case "Agency Wise Analysis":
      highestName = data.reduce((a, b) =>
        a.total_delays > b.total_delays ? a : b
      ).agency_code;
      break;

    case "Duration Wise Analysis":
  highestName = data.reduce((a, b) =>
    a.max_delay > b.max_delay ? a : b
  ).duration_range;
  break;

    case "Conveyor Wise Analysis":
      highestName = data.reduce((a, b) =>
        a.total_delays > b.total_delays ? a : b
      ).remarks;
      break;

    case "Season Wise Analysis":
      highestName = data.reduce((a, b) =>
        a.total_delays > b.total_delays ? a : b
      ).season;
      break;

    default:
      highestName = "-";
  }

  // =========================
  // Dynamic Titles
  // =========================

  let highestTitle = "Highest";
  let highestValueDisplay = highestName;

  switch (analysisType) {

    case "Shop Wise Analysis":
      highestTitle = "Highest Delay Shop";
      highestValueDisplay = `Shop-${highestName}`;
      break;

    case "Equipment Wise Analysis":
      highestTitle = "Highest Delay Equipment";
      highestValueDisplay = highestName;
      break;

    case "Agency Wise Analysis":
      highestTitle = "Highest Delay Agency";
      highestValueDisplay = highestName;
      break;

    case "Duration Wise Analysis":
  highestTitle = "Longest Duration Range";
  highestValueDisplay = highestName;
  break;

    case "Conveyor Wise Analysis":
      highestTitle = "Highest Delay Conveyor";
      highestValueDisplay = highestName;
      break;

    case "Season Wise Analysis":
      highestTitle = "Critical Season";
      highestValueDisplay = highestName;
      break;

    default:
      highestTitle = "Highest";
      highestValueDisplay = highestName;
  }

  return (

    <div className="summary-grid">

      <Card
        title="Total Delays"
        value={`${totalDelays} Events`}
      />

      <Card
        title="Total Hours"
        value={`${totalHours.toFixed(2)} hrs`}
      />

      <Card
        title="Average Delay"
        value={`${avgDelay.toFixed(2)} hrs`}
      />

      <Card
        title={highestTitle}
        value={highestValueDisplay}
      />

    </div>

  );
}

function Card({ title, value }) {

  return (

    <div className="summary-card">

      <h4>{title}</h4>

      <h2>{value}</h2>

    </div>

  );

}

export default SummaryCards;