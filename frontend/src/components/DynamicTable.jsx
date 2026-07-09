import "../styles/table.css";

function DynamicTable({ analysisType, data }) {

  if (!data || data.length === 0) {
    return (
      <div className="no-data">
        No data available.
      </div>
    );
  }

  let columns = [];

  switch (analysisType) {

    case "Shop Wise Analysis":
      columns = [
        { key: "shop_code", label: "Shop Code" },
        { key: "total_delays", label: "Total Delays" },
        { key: "total_delay_hours", label: "Total Hours" },
        { key: "avg_delay_hours", label: "Avg Delay" }
      ];
      break;

    case "Equipment Wise Analysis":
      columns = [
        { key: "equipment", label: "Equipment" },
        { key: "total_delays", label: "Total Delays" },
        { key: "total_delay_hours", label: "Total Hours" },
        { key: "avg_delay_hours", label: "Avg Delay" }
      ];
      break;

    case "Agency Wise Analysis":
      columns = [
        { key: "agency_code", label: "Agency Code" },
        { key: "total_delays", label: "Total Delays" },
        { key: "total_delay_hours", label: "Total Hours" },
        { key: "avg_delay_hours", label: "Avg Delay" }
      ];
      break;

    case "Duration Wise Analysis":
      columns = [
        { key: "duration_range", label: "Duration Range" },
        { key: "total_delays", label: "Total Delays" },
        { key: "avg_delay", label: "Average Delay (hrs)" },
        { key: "max_delay", label: "Maximum Delay (hrs)" }
      ];
      break;

    case "Conveyor Wise Analysis":
      columns = [
        { key: "remarks", label: "Conveyor" },
        { key: "total_delays", label: "Total Delays" },
        { key: "total_delay_hours", label: "Total Hours" },
        { key: "percentage", label: "Contribution (%)" }
      ];
      break;

    case "Season Wise Analysis":
      columns = [
        { key: "season", label: "Season" },
        { key: "total_delays", label: "Total Delays" },
        { key: "total_delay_hours", label: "Total Hours" }
      ];
      break;

    default:
      columns = [];
  }

  return (

    <div className="table-container">

      <table className="analysis-table">

        <thead>

          <tr>

            {columns.map((column) => (

              <th key={column.key}>
                {column.label}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr key={index}>

              {columns.map((column) => (

                <td key={column.key}>

  {(
    column.key === "total_delay_hours" ||
    column.key === "avg_delay_hours" ||
    column.key === "avg_delay" ||
    column.key === "max_delay"
  )
    ? Number(row[column.key]).toFixed(2)
    : row[column.key]
  }

</td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default DynamicTable;