import sys
import os
from dataclasses import dataclass

from sklearn.ensemble import (
    RandomForestClassifier
)
from sklearn.svm import SVC
from sklearn.metrics import r2_score
from sklearn.tree import DecisionTreeClassifier

from utils import save_object, evaluate_models, evaluate_SVM
from exception import CustomException
from logger import logging

@dataclass 
class ModelTrainerConfig:
    trained_model_file_path = os.path.join("artifact", "model.pkl")

class ModelTrainer:
    def __init__(self):
        self.model_trainer_config = ModelTrainerConfig()
            
    def initiate_model_trainer(self, train_array, test_array):
        try:
            # logging.info("Spliting training and test input data")
            X_train, y_train, X_test, y_test = (
                train_array[:,:-1],
                train_array[:,-1],
                test_array[:,:-1],
                test_array[:,-1]
            )
            # print('X_train: ',X_train)
            # print('y_train: ',y_train)
            # print('X_test: ',X_test)
            # print('y_test: ',y_test)
            # evaluate_SVM(X_train,X_test,y_train,y_test)

        
            models = {
                "Random Forest": RandomForestClassifier(),
                "Decision Tree": DecisionTreeClassifier(),
                "SVC": SVC(),
                # "Gradient Boosting": GradientBoostingRegressor(),
                # "Linear Regression": LinearRegression(),
                # "XGBRegressor": XGBRegressor(),
                # "CatBoosting Regressor": CatBoostRegressor(verbose=False),
                # "AdaBoost Regressor": AdaBoostRegressor(),
            }

            params={
                "Decision Tree": {
                    'criterion':['log_loss', 'gini', 'entropy'],
                    'splitter':['best','random'],
                    'max_features':['sqrt','log2'],
                },
                "Random Forest":{
                    'criterion':['log_loss', 'gini', 'entropy'],
                 
                    'max_features':['sqrt','log2',None],
                    'n_estimators': [8,16,32,64,128,256]
                },
                "SVC":{
                    'kernel':['rbf'],
                    'C':[1.0],
                    'probability':[True]
                }

            }

            model_report:dict = evaluate_models(X_train, X_test, y_train, y_test, models, params)

            # to get best model score from dict
            best_model_score = max(model_report.values())

            # to get best model name from dict
            best_model_name = list(model_report.keys())[
                list(model_report.values()).index(best_model_score)
            ]
            print('Best Model name is : ',best_model_name)

            best_model = models[best_model_name]

            if best_model_score < 0.6:
                raise CustomException("No model suitable for this dataset")
            logging.info("Best model found for both training and test dataset")

            save_object(
                file_path= self.model_trainer_config.trained_model_file_path,
                obj= best_model
            )

            predicted = best_model.predict(X_test)
            best_model_r2_score = r2_score(y_test, predicted)
            return best_model_r2_score

        except Exception as e:
            raise CustomException(e, sys)