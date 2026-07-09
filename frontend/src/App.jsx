import { useState } from "react";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
function App() {
  const [page, setPage] = useState("dashboard");
  return (
    <>
      {
        page === "dashboard"
          ?
          <Home />
          :
          <Prediction />
      }
      <div
        style={{
          background: "#06233d",
          padding: "12px 0",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          boxShadow: "0 -2px 8px rgba(0,0,0,.15)"
        }}
      >
        <button
          onClick={() => setPage("dashboard")}
          style={{
            padding: "10px 28px",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            background:
              page === "dashboard"
                ? "#ffffff"
                : "#d6e4f2",
            color: "#06233d"
          }}
        >
          Analysis Dashboard
        </button>

        <button
          onClick={() => setPage("prediction")}
          style={{
            padding: "10px 28px",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            background:
              page === "prediction"
                ? "#ffffff"
                : "#d6e4f2",
            color: "#06233d"
          }}
        >
          Prediction Dashboard
        </button>
      </div>
    </>
  );
}
export default App;