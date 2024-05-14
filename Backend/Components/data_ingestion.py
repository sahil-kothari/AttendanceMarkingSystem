import json
import pandas as pd
import numpy as np
from model_trainer import ModelTrainer, ModelTrainerConfig

with open('/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/dataFinal.json', 'r') as json_file:
    data = json.load(json_file)

encodings = []
ids = []

labels = {}
reverse_label = {}
val = 0

for i in data:
    if i["regId"] in labels:
        id = labels[i["regId"]]
    else:
        labels[i["regId"]] = val
        reverse_label[val] = i["regId"]
        id = val
        val += 1
    for encoding in i["facial_feature"]:
        encodings.append(encoding)
        ids.append(id)

with open('labels.json', 'w') as fp:
    json.dump(reverse_label, fp)

X_test = np.array(encodings)
y_test = np.array(ids)

arr = np.c_[
    X_test, y_test
]

np.random.shuffle(arr)
train_arr, test_arr = arr[50:,:], arr[:50,:]

model_trainer = ModelTrainer()
print(model_trainer.initiate_model_trainer(train_arr, test_arr))
print(labels)
