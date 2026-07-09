import "../../styles/table.css";

function EquipmentPredictionTable({ data }) {

    if (!data || data.length === 0)
        return null;

    return (

        <div
            style={{
                marginTop: "35px",
                marginBottom: "35px"
            }}
        >

            <h2
                style={{
                    textAlign: "center",
                    color: "#06233d",
                    marginBottom: "20px"
                }}
            >
                Equipment Failure Prediction Report
            </h2>

            <div
                className="table-container"
                style={{
                    width: "95%",
                    margin: "0 auto"
                }}
            >

                <table className="analysis-table">

                    <thead>

                        <tr>

                            <th>Equipment</th>

                            <th>Predicted Delay (hrs)</th>

                            <th>Risk</th>

                            <th>Failure Probability</th>

                            <th>Health</th>

                            <th>Recommendation</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.map((item, index) => (

                                <tr key={index}>

                                    <td>{item.equipment}</td>

                                    <td>{item.predicted_delay}</td>

                                    <td>{item.risk}</td>

                                    <td>{item.failure_probability}</td>

                                    <td>{item.health}</td>

                                    <td>{item.recommendation}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default EquipmentPredictionTable;