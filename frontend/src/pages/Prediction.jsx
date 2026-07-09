import { useEffect, useState } from "react";
import api from "../services/api";

import PredictionSummaryCards from "../components/Prediction/PredictionSummaryCards";
import PredictionCharts from "../components/Prediction/PredictionCharts";
import EquipmentPredictionTable from "../components/Prediction/EquipmentPredictionTable";
import MonsoonPredictionTable from "../components/Prediction/MonsoonPredictionTable";
import logo from "../assets/vsp_logo.png";
import PredictionInsights from "../components/Prediction/PredictionInsights";
function Prediction() {

    const [equipmentData, setEquipmentData] = useState([]);
    const [monsoonData, setMonsoonData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadPredictionReports = async () => {

        setLoading(true);

        try {

            const equipmentResponse =
                await api.get("/equipment-prediction");

            const monsoonResponse =
                await api.get("/monsoon-prediction");

            setEquipmentData(equipmentResponse.data);

            setMonsoonData(monsoonResponse.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load prediction reports.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPredictionReports();

    }, []);

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

                    <button
                        onClick={loadPredictionReports}
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        Refresh Prediction Report
                    </button>

                    {

                        loading

                        ?

                        <h3>Loading Prediction Report...</h3>

                        :

                        <>

                            <PredictionSummaryCards
                                equipmentData={equipmentData}
                                monsoonData={monsoonData}
                            />

                            <PredictionCharts
                                equipmentData={equipmentData}
                                monsoonData={monsoonData}
                            />

                            <PredictionInsights
                            equipmentData={equipmentData}
                            monsoonData={monsoonData}
                            />

                            <EquipmentPredictionTable
                                data={equipmentData}
                            />

                            <MonsoonPredictionTable
                                data={monsoonData}
                            />

                        </>

                    }

                </div>

            </main>

        </div>

    );

}

export default Prediction;