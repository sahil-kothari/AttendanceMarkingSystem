import sys
import pandas as pd
import numpy as np
from exception import CustomException
from utils import load_object
import json

class PredictPipeline:
    def __init__(self):
        pass

    def predict(self, features):
        try:
            model_path = 'artifact\model.pkl'
            model = load_object(file_path= model_path)
            prediction_prob =model.predict_proba(features)[0]
            max_prob = np.max(prediction_prob)
            print('max prob is : ',max_prob)
            preds = model.predict(features)
            
            if max_prob>=0.5:
                return preds
            else:
                return None
        except Exception as e:
            raise CustomException(e, sys)
        
    # def predicts(self, features):
    #     try:
    #         model_path = 'artifact\model.pkl'
    #         model=load_object(file_path= model_path)
    #         prediction_prob =model.predict_proba([features])[0]
    #         max_prob = np.max(prediction_prob)
    #         predicted_label = model.classes_[np.argmax(prediction_prob)]
        
def get_predictions(features: list):
    pp = PredictPipeline()
    output = []
    numfaces = len(features)
    print(f"faces detected: {numfaces}")
    for i in range(numfaces):
        X_test = np.array(features[i])
        y_pred = pp.predict(X_test.reshape(1, -1))
        if(y_pred)!=None:
            output.append(y_pred)

    return output


if __name__ == "__main__":
    json_path = "/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/Components/testpredict.json"

    with open(json_path, 'r') as json_file:
        X_test = json.load(json_file)

    X_test = np.array(X_test[0]["facial_feature"][0])

    # df = pd.DataFrame(columns=["X"])

    # df.at[0, 'X'] = X_test

    # pp = PredictPipeline()
    # y_pred = pp.predict(df)
    pp = PredictPipeline()
    X_test = np.array(X_test)
    y_pred = pp.predict(X_test.reshape(1, -1))

    print(y_pred)
    