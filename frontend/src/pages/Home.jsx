import DynamicTable from "../components/DynamicTable";
import { useState } from "react";
import api from "../services/api";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import "../styles/home.css";
import "../styles/form.css";
import logo from "../assets/vsp_logo.png";

function Home() {
  const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState("Shop Wise Analysis");

  const [selectedMonthYear, setSelectedMonthYear] = useState("2025-01");

  const [shopCode, setShopCode] = useState("");

  const monthYearOptions = [
    { value: "2023-07", label: "July-2023" },
    { value: "2023-08", label: "August-2023" },
    { value: "2023-09", label: "September-2023" },
    { value: "2023-10", label: "October-2023" },
    { value: "2023-11", label: "November-2023" },
    { value: "2023-12", label: "December-2023" },

    { value: "2024-01", label: "January-2024" },
    { value: "2024-02", label: "February-2024" },
    { value: "2024-03", label: "March-2024" },
    { value: "2024-04", label: "April-2024" },
    { value: "2024-05", label: "May-2024" },
    { value: "2024-06", label: "June-2024" },
    { value: "2024-07", label: "July-2024" },
    { value: "2024-08", label: "August-2024" },
    { value: "2024-09", label: "September-2024" },
    { value: "2024-10", label: "October-2024" },
    { value: "2024-11", label: "November-2024" },
    { value: "2024-12", label: "December-2024" },

    { value: "2025-01", label: "January-2025" },
    { value: "2025-02", label: "February-2025" },
    { value: "2025-03", label: "March-2025" },
  ];

  const shopOptions = [
  { label: "RMHP", codes: "1,2" },
  { label: "CO", codes: "3" },
  { label: "SP", codes: "4" },
  { label: "BF", codes: "5" },
  { label: "SMS", codes: "6" },
  { label: "BAR MILL", codes: "7" },
  { label: "BILLET MILL", codes: "7" },
  { label: "WRM", codes: "8" },
  { label: "MMSM", codes: "9" },
  { label: "TPP", codes: "10" },
  { label: "UTIL", codes: "11" },
  { label: "SHOP-12", codes: "12" },
  { label: "DNW", codes: "14" },
  { label: "CRMP", codes: "15" }
];

  const handleAnalyze = async () => {

  setLoading(true);
setData([]);

  try {

    let endpoint = "";

    const [year, month] = selectedMonthYear.split("-");

    if (analysisType === "Shop Wise Analysis") {
      endpoint = `/shop-wise?month=${Number(month)}&year=${year}`;
    }

    else if (analysisType === "Equipment Wise Analysis") {
      endpoint = `/equipment-wise?shop_code=${shopCode}&month=${Number(month)}&year=${year}`;
    }

    else if (analysisType === "Agency Wise Analysis") {
      endpoint = `/agency-wise?month=${Number(month)}&year=${year}`;
    }

    else if (analysisType === "Duration Wise Analysis") {
      endpoint = "/duration-wise";
    }

    else if (analysisType === "Conveyor Wise Analysis") {
      endpoint = "/conveyor-wise";
    }

    else if (analysisType === "Season Wise Analysis") {
      endpoint = "/season-wise";
    }

    const response = await api.get(endpoint);

    setData(response.data);
setLoading(false);

  } catch (error) {
    console.error(error);
    setLoading(false);
}
};
  return (
  <div className="home-container">

    <header className="header">

    <img
        src={logo}
        alt="VSP Logo"
        className="company-logo"
    />

    <div className="logo-section">

        <h2>Visakhapatnam Steel Plant</h2>

        <p>Delay Analysis & Prediction System</p>

    </div>

</header>

    <main className="main-content">

      <div className="card">

        <div className="control-panel">

          <select
            value={analysisType}
            onChange={(e) => {
              setAnalysisType(e.target.value);
              setData([]);
            }}
          >
            <option>Shop Wise Analysis</option>
            <option>Equipment Wise Analysis</option>
            <option>Agency Wise Analysis</option>
            <option>Duration Wise Analysis</option>
            <option>Conveyor Wise Analysis</option>
            <option>Season Wise Analysis</option>
          </select>

          {(analysisType === "Shop Wise Analysis" ||
            analysisType === "Equipment Wise Analysis" ||
            analysisType === "Agency Wise Analysis") && (

            <select
              value={selectedMonthYear}
              onChange={(e) =>
                setSelectedMonthYear(e.target.value)
              }
            >
              {monthYearOptions.map((item) => (

                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>

              ))}
            </select>

          )}

          {analysisType === "Equipment Wise Analysis" && (

  <select
    value={shopCode}
    onChange={(e) => setShopCode(e.target.value)}
  >

    <option value="">
      Select Shop Description
    </option>

    {shopOptions.map((shop) => (

      <option
        key={shop.label}
        value={shop.codes}
      >
        {shop.label}
      </option>

    ))}

  </select>

)}

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
          >
            Analyze
          </button>

        </div>

        <hr />

        {loading && (

    <div
        style={{
            padding: "40px",
            textAlign: "center",
            fontSize: "22px",
            color: "#06233d",
            fontWeight: "bold"
        }}
    >
        Loading Analysis...
    </div>

)}

        <SummaryCards
          analysisType={analysisType}
          data={data}
        />

        <Charts
          analysisType={analysisType}
          data={data}
        />

        <Insights
          analysisType={analysisType}
          data={data}
        />

        <h3>Results</h3>

        <DynamicTable
          analysisType={analysisType}
          data={data}
        />

      </div>

    </main>

  </div>
);
}

export default Home;