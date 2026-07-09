import "../../styles/table.css";

function MonsoonPredictionTable({ data }) {

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
                Monsoon Conveyor Prediction Report
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

                            <th>Conveyor</th>

                            <th>Predicted Delay (hrs)</th>

                            <th>Risk</th>

                            <th>Failure Probability</th>

                            <th>Recommendation</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.map((item, index) => (

                                <tr key={index}>

                                    <td>{item.conveyor}</td>

                                    <td>{item.predicted_delay}</td>

                                    <td>{item.risk}</td>

                                    <td>{item.failure_probability}</td>

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

export default MonsoonPredictionTable;