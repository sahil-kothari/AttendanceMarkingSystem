import cv2
import numpy as np
import face_recognition
from datetime import datetime
import requests
import time
data = requests.get('http://localhost:5000/student/getencodings').json()
facialFeatures=[]
allRegIds = []
for encode in data:
    facialFeatures.append(encode['facial_feature'])
    allRegIds.append(encode['regId'])

cap = cv2.VideoCapture(0)

regIds = set()
timeout = time.time() + 30
while True:
    if time.time() > timeout:
        break
    success,img = cap.read()
    imgS = cv2.resize(img,(0,0),None,0.25,0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    facesCurrFrame = face_recognition.face_locations(imgS)
    encodesCurrFrame = face_recognition.face_encodings(imgS,facesCurrFrame)

    for encodeFace, faceLoc in zip(encodesCurrFrame,facesCurrFrame):
        matches = face_recognition.compare_faces(facialFeatures,encodeFace)
        faceDist = face_recognition.face_distance(facialFeatures,encodeFace)
        matchIndex = np.argmin(faceDist)

        if matches[matchIndex]:
            regId = allRegIds[matchIndex].upper()
            # print(regId)
            y1,x2,y2,x1 = faceLoc
            y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
            cv2.rectangle(img, (x1,y1), (x2,y2), (0,255,0), 2)
            cv2.rectangle(img, (x1, y2-35), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, regId, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            regIds.add(regId)
    cv2.imshow('Webcam',img)
    cv2.waitKey(1)
requests.post('http://localhost:5000/student/markattendance', json=list(regIds))