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

cap = cv2.VideoCapture(0)

regIds = set()
timeout = time.time() + 30

while True:

    if time.time() > timeout:
        break
    
    # Read the current frame from the camera
    # success, img = cap.read()

    img_path = '/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/testing5.jpg'  # Replace 'path_to_your_image.jpg' with the actual path to your image file
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
        # print(labels[str(int(students[0]))])
    print(regIds)
    # Wait for 10 seconds before the next iteration
    # time.sleep(10)
    if regIds:
        requests.post('http://localhost:5000/student/markattendance', json=list(regIds))
        print("aaya post mai")
    
    
    


# <class 'list'>
# [array([-0.13154042,  0.16982888,  0.0396742 , -0.09131372, -0.07757845,
#        -0.0298305 , -0.0290482 , -0.12181913,  0.17162819, -0.07585067,
#         0.23574956, -0.02281332, -0.18456514, -0.11433313, -0.00348313,
#         0.12637918, -0.05346264, -0.16824341, -0.1328814 , -0.0588815 ,
#        -0.06322405, -0.06216414, -0.00464602,  0.04206044, -0.05698693,
#        -0.3602066 , -0.10857488, -0.13019258, -0.00997404, -0.12232017,
#         0.02311534, -0.025194  , -0.18023266, -0.1469797 , -0.03211133,
#         0.04911065, -0.05469289,  0.0100889 ,  0.16778578,  0.02958287,
#        -0.17908485,  0.01634832,  0.03901756,  0.30646041,  0.17580958,
#         0.08650387,  0.04209696, -0.04397572,  0.05133251, -0.20650741,
#         0.12200947,  0.07421152,  0.19166689, -0.00324653,  0.13006157,
#        -0.08952958, -0.00895393,  0.09990396, -0.19537158,  0.06880233,
#         0.08695402, -0.01006133, -0.10742269, -0.0337641 ,  0.31194702,
#         0.21310724, -0.08783656, -0.05278742,  0.22648749, -0.09687817,
#        -0.02470072,  0.02721746, -0.08232773, -0.15470493, -0.23554465,
#         0.10964128,  0.37607387,  0.16200601, -0.21082717, -0.05728156,
#        -0.11443358,  0.04041062,  0.03635214, -0.00390096, -0.13902828,
#        -0.00948926, -0.05320477, -0.00502022,  0.14830288,  0.0193305 ,
#        -0.04467854,  0.17235731, -0.01080223, -0.02218613,  0.03272419,
#        -0.00929582, -0.08555014, -0.03748704, -0.17409448, -0.08334788,
#         0.09864164, -0.03674697,  0.0158544 ,  0.10002398, -0.17729124,
#         0.07867741,  0.00673148, -0.02781559,  0.00637661,  0.09636205,
#        -0.05602078, -0.10161095,  0.16741545, -0.17250209,  0.19374658,
#         0.15037946, -0.04474225,  0.07709615,  0.11648364,  0.04138473,
#         0.02745335, -0.0469699 , -0.11020021, -0.07119846,  0.07411568,
#        -0.01927345,  0.09559332,  0.04375702])]