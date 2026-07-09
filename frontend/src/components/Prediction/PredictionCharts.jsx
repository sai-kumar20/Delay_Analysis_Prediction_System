import BarChartCard from "../Charts/BarChartCard";

function PredictionCharts({ equipmentData, monsoonData }) {

    if (!equipmentData || equipmentData.length === 0)
        return null;

    // Top 10 Equipment by Predicted Delay
    const topEquipment = [...equipmentData]
        .sort((a, b) => b.predicted_delay - a.predicted_delay)
        .slice(0, 10);

    return (

        <>

            {/* Equipment Prediction */}

            <div
                style={{
                    marginTop: "30px",
                    marginBottom: "30px"
                }}
            >

                <BarChartCard
                    data={topEquipment}
                    xKey="equipment"
                    yKey="predicted_delay"
                    title="Predicted Delay by Equipment"
                    xLabel="Equipment"
                    yLabel="Predicted Delay (hrs)"
                    layout="vertical"
                />

            </div>

            {/* Monsoon Prediction */}

            {

                monsoonData &&
                monsoonData.length > 0 &&

                <div
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px"
                    }}
                >

                    <BarChartCard
                        data={monsoonData}
                        xKey="conveyor"
                        yKey="predicted_delay"
                        title="Predicted Conveyor Delay During Monsoon"
                        xLabel="Conveyor"
                        yLabel="Predicted Delay (hrs)"
                        layout="vertical"
                    />

                </div>

            }

        </>

    );

}

export default PredictionCharts;