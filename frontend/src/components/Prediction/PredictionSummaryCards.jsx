import { useState } from "react";

function PredictionSummaryCards({ equipmentData, monsoonData }) {

    const [hovered, setHovered] = useState(null);

    if (!equipmentData || equipmentData.length === 0)
        return null;

    const highRisk = equipmentData.filter(
        x => x.risk.includes("HIGH")
    ).length;

    const mediumRisk = equipmentData.filter(
        x => x.risk.includes("MEDIUM")
    ).length;

    const lowRisk = equipmentData.filter(
        x => x.risk.includes("LOW")
    ).length;

    const avgDelay = (
        equipmentData.reduce(
            (sum, item) => sum + Number(item.predicted_delay),
            0
        ) / equipmentData.length
    ).toFixed(2);

    const monsoonTotal = monsoonData
        ? monsoonData.length
        : 0;

    const cards = [

        {
            title: "🔴 High Risk Equipment",
            value: `${highRisk} Equipment`
        },

        {
            title: "🟡 Medium Risk Equipment",
            value: `${mediumRisk} Equipment`
        },

        {
            title: "🟢 Low Risk Equipment",
            value: `${lowRisk} Equipment`
        },

        {
            title: "⚡ Average Predicted Delay",
            value: `${avgDelay} hrs`
        },

        {
            title: "🌧 Monsoon Predictions",
            value: `${monsoonTotal} Conveyors`
        }

    ];

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(5,1fr)",
                gap: "18px",
                marginTop: "30px",
                marginBottom: "35px"
            }}
        >

            {

                cards.map((card, index) => (

                    <div

                        key={index}

                        onMouseEnter={() => setHovered(index)}

                        onMouseLeave={() => setHovered(null)}

                        style={{

                            background: "#06233d",

                            color: "white",

                            padding: "25px",

                            borderRadius: "12px",

                            textAlign: "center",

                            cursor: "pointer",

                            transition: "all .3s ease",

                            boxShadow:
                                hovered === index
                                    ? "0 12px 25px rgba(0,0,0,.35)"
                                    : "0 4px 15px rgba(0,0,0,.25)",

                            transform:
                                hovered === index
                                    ? "translateY(-8px)"
                                    : "translateY(0)"

                        }}

                    >

                        <h3
                            style={{
                                marginBottom: "20px",
                                fontSize: "24px"
                            }}
                        >
                            {card.title}
                        </h3>

                        <h1
                            style={{
                                fontSize: "28px",
                                margin: 0,
                                fontWeight: "bold"
                            }}
                        >
                            {card.value}
                        </h1>

                    </div>

                ))

            }

        </div>

    );

}

export default PredictionSummaryCards;