const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000;





const API_KEY = "F29cIH5nUuI7AqmRQqB_8gobqskFhn_iwK-5AypfKX11";

const attrition = {
  DailyRate: 0.29,
  DistanceFromHome: 8.32,
  HourlyRate: -20.13,
  MonthlyIncome: -232.20,
  MonthlyRate: -23231.14,
  NumCompaniesWorked: 0.52,
  OverTime: 100.00,
  StockOptionLevel: -20.93,
  TrainingTimesLastYear: -0.62,
  YearsAtCompany: -0.65,
  YearsInCurrentRole: -0.62,
  YearsSinceLastPromotion: 20.37,
  YearsWithCurrManager: -0.60,
  BusinessTravel_Travel_Frequently: 1.00,
  BusinessTravel_Travel_Rarely: 0.00,
  Department_Research_Development: 1.00,
  Department_Sales: 0.00,
  Education_Below_College: 0.00,
  Education_College: 0.00,
  Education_Doctor: 0.00,
  Education_Master: 0.00,
  EducationField_Life_Sciences: 1.00,
  EducationField_Marketing: 0.00,
  EducationField_Medical: 0.00,
  EducationField_Other: 0.00,
  EducationField_Technical_Degree: 0.00,
  EnvironmentSatisfaction_Low: 0.00,
  EnvironmentSatisfaction_Medium: 0.00,
  EnvironmentSatisfaction_Very_High: 1.00,
  Gender_Male: 1.00,
  JobInvolvement_Low: 1.00,
  JobInvolvement_Medium: 0.00,
  JobInvolvement_Very_High: 0.00,
  JobLevel_Executive_Management: 0.00,
  JobLevel_First_level_Management: 0.00,
  JobLevel_Middle_Management: 0.00,
  JobLevel_Senior_Staff: 0.00,
  JobRole_Human_Resources: 0.00,
  JobRole_Laboratory_Technician: 0.00,
  JobRole_Manager: 0.00,
  JobRole_Manufacturing_Director: 0.00,
  JobRole_Research_Director: 1.00,
  JobRole_Research_Scientist: 0.00,
  JobRole_Sales_Executive: 0.00,
  JobRole_Sales_Representative: 0.00,
  JobSatisfaction_Low: 1.00,
  JobSatisfaction_Medium: 0.00,
  JobSatisfaction_Very_High: 0.00,
  MaritalStatus_Married: 0.00,
  MaritalStatus_Single: 1.00,
  PerformanceRating_Outstanding: 0.00,
  RelationshipSatisfaction_Low: 1.00,
  RelationshipSatisfaction_Medium: 0.00,
  RelationshipSatisfaction_Very_High: 0.00,
  WorkLifeBalance_Better: 0.00,
  WorkLifeBalance_Good: 0.00
};

const no_attrition = {
    "DailyRate": 0.82,
    "DistanceFromHome": 1.5,
    "HourlyRate": -3.42,
    "MonthlyIncome": -0.78,
    "MonthlyRate": -0.31,
    "NumCompaniesWorked": 2.53,
    "OverTime": 0.00,
    "StockOptionLevel": 0.24,
    "TrainingTimesLastYear": -0.62,
    "YearsAtCompany": -0.82,
    "YearsInCurrentRole": -0.62,
    "YearsSinceLastPromotion": -0.06,
    "YearsWithCurrManager": -0.60,
    "BusinessTravel_Travel_Frequently": 0.00,
    "BusinessTravel_Travel_Rarely": 1.00,
    "Department_Research & Development": 1.00,
    "Department_Sales": 0.00,
    "Education_Below College": 0.00,
    "Education_College": 0.00,
    "Education_Doctor": 0.00,
    "Education_Master": 1.00,
    "EducationField_Life Sciences": 0.00,
    "EducationField_Marketing": 0.00,
    "EducationField_Medical": 0.00,
    "EducationField_Other": 0.00,
    "EducationField_Technical Degree": 1.00,
    "EnvironmentSatisfaction_Low": 0.00,
    "EnvironmentSatisfaction_Medium": 0.00,
    "EnvironmentSatisfaction_Very High": 0.00,
    "Gender_Male": 0.00,
    "JobInvolvement_Low": 0.00,
    "JobInvolvement_Medium": 0.00,
    "JobInvolvement_Very High": 0.00,
    "JobLevel_Executive Management": 0.00,
    "JobLevel_First-level Management": 0.00,
    "JobLevel_Middle Management": 0.00,
    "JobLevel_Senior Staff": 0.00,
    "JobRole_Human Resources": 0.00,
    "JobRole_Laboratory Technician": 1.00,
    "JobRole_Manager": 0.00,
    "JobRole_Manufacturing Director": 0.00,
    "JobRole_Research Director": 0.00,
    "JobRole_Research Scientist": 0.00,
    "JobRole_Sales Executive": 0.00,
    "JobRole_Sales Representative": 0.00,
    "JobSatisfaction_Low": 0.00,
    "JobSatisfaction_Medium": 1.00,
    "JobSatisfaction_Very High": 0.00,
    "MaritalStatus_Married": 1.00,
    "MaritalStatus_Single": 0.00,
    "PerformanceRating_Outstanding": 0.00,
    "RelationshipSatisfaction_Low": 0.00,
    "RelationshipSatisfaction_Medium": 1.00,
    "RelationshipSatisfaction_Very High": 0.00,
    "WorkLifeBalance_Better": 0.00,
    "WorkLifeBalance_Good": 1.00
}

async function getToken() {
    const url = "https://iam.cloud.ibm.com/identity/token";
    const params = new URLSearchParams();
    params.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
    params.append("apikey", API_KEY);

	console.log(params);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: params
    });

    if (!response.ok) {
        throw new Error(`Error getting token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function apiPost(scoring_url, token, payload) {
    const response = await fetch(scoring_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Error in API post: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}



function getRandomAttributes() {
    return Math.random() < 0.1 ? attrition : no_attrition;
  }


app.get('/prediction', (req, res) => {
    /*
    (async () => {
        try {
            const token = await getToken();
            console.log(token);
            // NOTE: manually define and pass the array(s) of values to be scored in the next line
            const payload = {
                input_data: [
                    {
                        fields: [
                                    "DailyRate",
                                    "DistanceFromHome",
                                    "HourlyRate",
                                    "MonthlyIncome",
                                    "MonthlyRate",
                                    "NumCompaniesWorked",
                                    "OverTime",
                                    "StockOptionLevel",
                                    "TrainingTimesLastYear",
                                    "YearsAtCompany",
                                    "YearsInCurrentRole",
                                    "YearsSinceLastPromotion",
                                    "YearsWithCurrManager",
                                    "BusinessTravel_Travel_Frequently",
                                    "BusinessTravel_Travel_Rarely",
                                    "Department_Research & Development",
                                    "Department_Sales",
                                    "Education_Below College",
                                    "Education_College",
                                    "Education_Doctor",
                                    "Education_Master",
                                    "EducationField_Life Sciences",
                                    "EducationField_Marketing",
                                    "EducationField_Medical",
                                    "EducationField_Other",
                                    "EducationField_Technical Degree",
                                    "EnvironmentSatisfaction_Low",
                                    "EnvironmentSatisfaction_Medium",
                                    "EnvironmentSatisfaction_Very High",
                                    "Gender_Male",
                                    "JobInvolvement_Low",
                                    "JobInvolvement_Medium",
                                    "JobInvolvement_Very High",
                                    "JobLevel_Executive Management",
                                    "JobLevel_First-level Management",
                                    "JobLevel_Middle Management",
                                    "JobLevel_Senior Staff",
                                    "JobRole_Human Resources",
                                    "JobRole_Laboratory Technician",
                                    "JobRole_Manager",
                                    "JobRole_Manufacturing Director",
                                    "JobRole_Research Director",
                                    "JobRole_Research Scientist",
                                    "JobRole_Sales Executive",
                                    "JobRole_Sales Representative",
                                    "JobSatisfaction_Low",
                                    "JobSatisfaction_Medium",
                                    "JobSatisfaction_Very High",
                                    "MaritalStatus_Married",
                                    "MaritalStatus_Single",
                                    "PerformanceRating_Outstanding",
                                    "RelationshipSatisfaction_Low",
                                    "RelationshipSatisfaction_Medium",
                                    "RelationshipSatisfaction_Very High",
                                    "WorkLifeBalance_Better",
                                    "WorkLifeBalance_Good"
                            ], // replace with actual fields
                        values: [
                            Object.values(getRandomAttributes())
                        ]
                    }
                ]
            };
    
    
            const scoring_url = "https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/e2a8331c-efa1-474f-a60d-eb67cccba489/predictions?version=2021-05-01";
            const result = await apiPost(scoring_url, token, payload);
            console.log(result.predictions[0].values[0]);
            let final_pred = result.predictions[0].values[0][0];
            let final_text
            final_pred == 0 ?final_text = "No risk of Attrition, the Employee will probably not leave the company!" : final_text = "Risk of Attrition, Employee will probably leave the company."
            res.json({prediction: final_pred, text: final_text})
    
        } catch (error) {
            console.error(error);
        }
    })();
    
    */
    let final_pred = Math.round(Math.random());
    let final_text
    final_pred == 0 ?final_text = "No risk of Attrition, the Employee will probably not leave the company!" : final_text = "Risk of Attrition, Employee will probably leave the company."
    res.json({prediction: final_pred, text: final_text})
});

app.get('/', (req, res) => {
    res.send("<h1>App works!</h1>")
})


  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });