
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PredVars import PredVar
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import pickle
import math

app = FastAPI()

origins = [
    "https://job-tracker-with-salary-prediction.netlify.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pickle_in = open("linearReg.pkl","rb")
model=pickle.load(pickle_in)

model_1=pickle.load(open("decisionTreeRegressor.pkl","rb"))

pickle_in_2 = open("randomForestRegressor.pkl","rb")
model_2=pickle.load(pickle_in_2)

@app.post('/modelData')
def model_data():
    df = pd.read_csv("LR-Pred.csv")

    y_test = df['Actual_Salary']
    y_pred = df['Predicted_Salary']

    mae_lr = mean_absolute_error(y_test,y_pred)
    mse_lr = mean_squared_error(y_test,y_pred)
    rmse_lr = math.sqrt(mse_lr)
    r2_lr = r2_score(y_test,y_pred)

    # ----------------------------------

    df2 = pd.read_csv("DTR-Pred.csv")

    y_test_2 = df2['Actual_Salary']
    y_pred_2 = df2['Predicted_Salary']

    mae_dtr = mean_absolute_error(y_test_2,y_pred_2)
    mse_dtr = mean_squared_error(y_test_2,y_pred_2)
    rmse_dtr = math.sqrt(mse_dtr)
    r2_dtr = r2_score(y_test_2,y_pred_2)

    # ----------------------------------

    df3 = pd.read_csv("RF-Pred.csv")

    y_test_3 = df3['Actual_Salary']
    y_pred_3 = df3['Predicted_Salary']

    mae_rf = mean_absolute_error(y_test_3,y_pred_3)
    mse_rf = mean_squared_error(y_test_3,y_pred_3)
    rmse_rf = math.sqrt(mse_rf)
    r2_rf = r2_score(y_test_3,y_pred_3)

    return {
        "lr" : {
            "mae" : mae_lr,
            "mse" : mse_lr,
            "rmse" : rmse_lr,
            "r2" : r2_lr
        },
        "dtr" : {
            "mae" : mae_dtr,
            "mse" : mse_dtr,
            "rmse" : rmse_dtr,
            "r2" : r2_dtr
        },
        "rf" : {
            "mae" : mae_rf,
            "mse" : mse_rf,
            "rmse" : rmse_rf,
            "r2" : r2_rf
        }
    }

# @app.get('/{name}')
# def get_name(name: str):
#     return {'Welcome': f'{name}'}

@app.post('/predict')
def predict_income(data:PredVar):
    print(data)
    data = data.dict()
    print(data)
    age = data['age']
    gender = data['gender']
    education_level = data['education_level']
    job_title = data['job_title']
    years_of_experience = data['years_of_experience']
    modelnum = data['modelnum']

    # print(model.predict([[age,gender,education_level,job_title,years_of_experience]]))


    if(modelnum == 0):
        prediction = model.predict([[age, gender, education_level, job_title, years_of_experience]])
    
    if(modelnum == 1):
        prediction = model_1.predict([[age, gender, education_level, job_title, years_of_experience]])
    
    if(modelnum == 2):
        prediction = model_2.predict([[age, gender, education_level, job_title, years_of_experience]])

    print(prediction)
    return {
        'prediction': prediction[0]
    }

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

# run backend
# uvicorn app:app --reload