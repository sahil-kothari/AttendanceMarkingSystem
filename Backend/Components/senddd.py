import time
import cv2
import numpy as np
import face_recognition
import json
import requests
import asyncio
from predict_pipeline import get_predictions

with open('/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/Components/labels.json', 'r') as json_file:
    labels = json.load(json_file)

# cap = cv2.VideoCapture(0)

regIds = set()
async def work():
    img_path = '/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/testing7.jpg'  # Replace 'path_to_your_image.jpg' with the actual path to your image file
    img = cv2.imread(img_path)
    imgS = cv2.resize(img, (0,0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    # Detect faces in the current frame
    facesCurrFrame = face_recognition.face_locations(img)
    encodesCurrFrame = face_recognition.face_encodings(img, facesCurrFrame)
    # print(encodesCurrFrame)
    print('encodesCurrFrame: ',encodesCurrFrame)

    # Do something with the face detections
    y_pred = get_predictions(encodesCurrFrame)
        
    print(type(y_pred))
    for students in y_pred:
        regIds.add(labels[str(int(students[0]))])
        print(labels[str(int(students[0]))])
        
    # print(labels[str(int(students[0]))])
    print(regIds)
    # Wait for 10 seconds before the next iteration
    # time.sleep(10)

async def make_request():
    if regIds:
        # requests.post('http://localhost:5000/student/markattendance', json=list(regIds))
        print("aaya post mai")

async def main():
    # Create message asynchronously
    await work()
    await make_request()
    


# Run the asyncio event loop
asyncio.run(main())