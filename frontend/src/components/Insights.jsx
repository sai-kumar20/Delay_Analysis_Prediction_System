function Insights({ analysisType, data }) {

  if (!data || data.length === 0) return null;

  if (analysisType === "Shop Wise Analysis") {

    const highest = data.reduce((a, b) =>
      a.total_delay_hours > b.total_delay_hours ? a : b
    );

    const lowest = data.reduce((a, b) =>
      a.total_delay_hours < b.total_delay_hours ? a : b
    );

    const totalHours = data.reduce(
      (sum, item) => sum + Number(item.total_delay_hours),
      0
    );

    const totalDelays = data.reduce(
      (sum, item) => sum + Number(item.total_delays),
      0
    );

    const avgDelay =
      data.reduce(
        (sum, item) => sum + Number(item.avg_delay_hours),
        0
      ) / data.length;

    return (

      <div
        style={{
          background: "#ffffff",
          marginTop: "30px",
          marginBottom: "30px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 3px 12px rgba(0,0,0,.15)"
        }}
      >

        <h2
          style={{
            color: "#06233d",
            marginBottom: "20px"
          }}
        >
          💡 Analysis Insights
        </h2>

        <ul
          style={{
            lineHeight: "2",
            fontSize: "17px"
          }}
        >

          <li>
            <b>Highest Delay Shop :</b>{" "}
            Shop-{highest.shop_code} recorded{" "}
            {highest.total_delay_hours.toFixed(2)} hours.
          </li>

          <li>
            <b>Lowest Delay Shop :</b>{" "}
            Shop-{lowest.shop_code} recorded{" "}
            {lowest.total_delay_hours.toFixed(2)} hours.
          </li>

          <li>
            <b>Total Delay Hours :</b>{" "}
            {totalHours.toFixed(2)} hours.
          </li>

          <li>
            <b>Total Delay Events :</b>{" "}
            {totalDelays}
          </li>

          <li>
            <b>Average Delay :</b>{" "}
            {avgDelay.toFixed(2)} hours.
          </li>

          <li>
            <b>Recommendation :</b>{" "}
            Prioritize preventive maintenance for
            <b> Shop-{highest.shop_code}</b>
            {" "}to reduce production delays.
          </li>

        </ul>

      </div>

    );

  }
  if (analysisType === "Equipment Wise Analysis") {

  const highestHours = data.reduce((a, b) =>
    a.total_delay_hours > b.total_delay_hours ? a : b
  );

  const highestEvents = data.reduce((a, b) =>
    a.total_delays > b.total_delays ? a : b
  );

  const highestAvg = data.reduce((a, b) =>
    a.avg_delay_hours > b.avg_delay_hours ? a : b
  );

  return (

    <div
      style={{
        background: "#ffffff",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,.15)"
      }}
    >

      <h2
        style={{
          color: "#06233d",
          marginBottom: "20px"
        }}
      >
        💡 Equipment Insights
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px"
        }}
      >

        <li>
          <b>Highest Delay Hours :</b> {highestHours.equipment} recorded{" "}
          {highestHours.total_delay_hours.toFixed(2)} hrs.
        </li>

        <li>
          <b>Highest Delay Events :</b> {highestEvents.equipment} recorded{" "}
          {highestEvents.total_delays} events.
        </li>

        <li>
          <b>Highest Average Delay :</b> {highestAvg.equipment} recorded{" "}
          {highestAvg.avg_delay_hours.toFixed(2)} hrs/event.
        </li>

        <li>
          <b>Recommendation :</b> Inspect{" "}
          <b>{highestHours.equipment}</b> first and schedule preventive maintenance.
        </li>

      </ul>

    </div>

  );

}
if (analysisType === "Agency Wise Analysis") {

  const highestHours = data.reduce((a, b) =>
    a.total_delay_hours > b.total_delay_hours ? a : b
  );

  const highestEvents = data.reduce((a, b) =>
    a.total_delays > b.total_delays ? a : b
  );

  const highestAvg = data.reduce((a, b) =>
    a.avg_delay_hours > b.avg_delay_hours ? a : b
  );

  return (

    <div
      style={{
        background: "#ffffff",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,.15)"
      }}
    >

      <h2
        style={{
          color: "#06233d",
          marginBottom: "20px"
        }}
      >
        💡 Agency Insights
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px"
        }}
      >

        <li>
          <b>Highest Delay Hours :</b> {highestHours.agency_code} recorded{" "}
          {highestHours.total_delay_hours.toFixed(2)} hrs.
        </li>

        <li>
          <b>Highest Delay Events :</b> {highestEvents.agency_code} recorded{" "}
          {highestEvents.total_delays} events.
        </li>

        <li>
          <b>Highest Average Delay :</b> {highestAvg.agency_code} recorded{" "}
          {highestAvg.avg_delay_hours.toFixed(2)} hrs/event.
        </li>

        <li>
          <b>Recommendation :</b> Review the performance of{" "}
          <b>{highestHours.agency_code}</b> and improve maintenance coordination.
        </li>

      </ul>

    </div>

  );

}
if (analysisType === "Duration Wise Analysis") {

  const mostCommon = data.reduce((a, b) =>
    a.total_delays > b.total_delays ? a : b
  );

  const longest = data.reduce((a, b) =>
    a.max_delay > b.max_delay ? a : b
  );

  return (

    <div
      style={{
        background: "#ffffff",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,.15)"
      }}
    >

      <h2
        style={{
          color: "#06233d",
          marginBottom: "20px"
        }}
      >
        💡 Duration Insights
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px"
        }}
      >

        <li>
          <b>Most Common Duration :</b> {mostCommon.duration_range}
        </li>

        <li>
          <b>Total Delay Events :</b> {mostCommon.total_delays}
        </li>

        <li>
          <b>Longest Recorded Delay :</b> {longest.max_delay.toFixed(2)} hrs
        </li>

        <li>
          <b>Recommendation :</b> Focus on reducing delays longer than 10 hours through preventive maintenance and faster response.
        </li>

      </ul>

    </div>

  );

}
if (analysisType === "Conveyor Wise Analysis") {

  const highest = data.reduce((a, b) =>
    a.total_delay_hours > b.total_delay_hours ? a : b
  );

  return (

    <div
      style={{
        background: "#ffffff",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,.15)"
      }}
    >

      <h2
        style={{
          color: "#06233d",
          marginBottom: "20px"
        }}
      >
        💡 Conveyor Insights
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px"
        }}
      >

        <li>
          <b>Highest Delay Conveyor :</b> {highest.remarks}
        </li>

        <li>
          <b>Total Delay Hours :</b> {highest.total_delay_hours.toFixed(2)} hrs
        </li>

        <li>
          <b>Contribution :</b> {highest.percentage.toFixed(2)}%
        </li>

        <li>
          <b>Recommendation :</b> Prioritize inspection of <b>{highest.remarks}</b> to reduce conveyor-related downtime.
        </li>

      </ul>

    </div>

  );

}
if (analysisType === "Season Wise Analysis") {

  const highest = data.reduce((a, b) =>
    a.total_delay_hours > b.total_delay_hours ? a : b
  );

  return (

    <div
      style={{
        background: "#ffffff",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,.15)"
      }}
    >

      <h2
        style={{
          color: "#06233d",
          marginBottom: "20px"
        }}
      >
        💡 Season Insights
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px"
        }}
      >

        <li>
          <b>Highest Delay Season :</b> {highest.season}
        </li>

        <li>
          <b>Total Delay Hours :</b> {highest.total_delay_hours.toFixed(2)} hrs
        </li>

        <li>
          <b>Average Delay :</b> {highest.avg_delay_hours.toFixed(2)} hrs
        </li>

        <li>
          <b>Recommendation :</b> Increase preventive maintenance before the <b>{highest.season}</b> season to reduce operational delays.
        </li>

      </ul>

    </div>

  );

}

  return null;
}

export default Insights;