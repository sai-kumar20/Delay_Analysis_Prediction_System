function PredictionInsights({ equipmentData, monsoonData }) {

    if (
        !equipmentData.length ||
        !monsoonData.length
    ) return null;

    const highestDelay = equipmentData.reduce((a, b) =>
        a.predicted_delay > b.predicted_delay ? a : b
    );

    const highestRisk = equipmentData.find(
        x => x.risk.includes("HIGH")
    ) || highestDelay;

    const highestMonsoon = monsoonData.reduce((a, b) =>
        a.predicted_delay > b.predicted_delay ? a : b
    );

    return (

        <>

            <div
                style={{
                    marginTop: "35px",
                    marginBottom: "35px",
                    padding: "20px",
                    background: "#f8fbff",
                    borderLeft: "6px solid #06233d",
                    borderRadius: "10px"
                }}
            >

                <h2 style={{ color: "#06233d" }}>
                    Equipment Prediction Insights
                </h2>

                <p>
                    <b>Highest Predicted Delay :</b>{" "}
                    {highestDelay.equipment} is predicted to
                    experience the highest delay
                    (≈ {highestDelay.predicted_delay} hrs).
                </p>

                <p>
                    <b>Highest Risk Equipment :</b>{" "}
                    {highestRisk.equipment} has the highest
                    predicted failure risk.
                </p>

                <p>
                    <b>Equipment Health :</b>{" "}
                    {highestRisk.health}
                </p>

                <p>
                    <b>Recommendation :</b>{" "}
                    {highestRisk.recommendation}
                </p>

            </div>

            <div
                style={{
                    marginTop: "20px",
                    marginBottom: "35px",
                    padding: "20px",
                    background: "#f8fbff",
                    borderLeft: "6px solid #2E7D32",
                    borderRadius: "10px"
                }}
            >

                <h2 style={{ color: "#2E7D32" }}>
                    Monsoon Prediction Insights
                </h2>

                <p>
                    <b>Highest Predicted Conveyor Delay :</b>{" "}
                    {highestMonsoon.conveyor} is predicted to
                    experience the highest delay
                    (≈ {highestMonsoon.predicted_delay} hrs).
                </p>

                <p>
                    <b>Failure Probability :</b>{" "}
                    {highestMonsoon.failure_probability}
                </p>

                <p>
                    <b>Risk Level :</b>{" "}
                    {highestMonsoon.risk}
                </p>

                <p>
                    <b>Recommendation :</b>{" "}
                    {highestMonsoon.recommendation}
                </p>

            </div>

        </>

    );

}

export default PredictionInsights;