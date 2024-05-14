import cv2
import numpy as np
import face_recognition
from datetime import datetime
import requests
import time

# Fetch facial encodings and registration IDs from the server
data = requests.get('http://localhost:5000/student/getencodings').json()
facialFeatures = [np.array(encode['facial_feature']) for encode in data]
allRegIds = [encode['regId'].upper() for encode in data]

# Initialize video capture from the webcam
cap = cv2.VideoCapture(0)

# Adjust camera resolution for better face detection
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1024)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

# Set timeout to run the script for a fixed duration
timeout = time.time() + 30

while True:
    # Capture frame from the webcam
    success, img = cap.read()

    # Resize frame to improve processing speed
    imgS = cv2.resize(img, (0, 0), None, 0.5, 0.5)

    # Convert image from BGR to RGB (required by face_recognition library)
    rgb_img = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    # Detect faces in the current frame
    facesCurrFrame = face_recognition.face_locations(rgb_img, model="cnn")

    # Encode faces in the current frame
    encodesCurrFrame = face_recognition.face_encodings(rgb_img, facesCurrFrame)

    regIds = set()  # Initialize set to store detected registration IDs

    # Iterate over each detected face
    for encodeFace, faceLoc in zip(encodesCurrFrame, facesCurrFrame):
        # Compare the detected face with the registered faces
        matches = face_recognition.compare_faces(facialFeatures, encodeFace)
        faceDist = face_recognition.face_distance(facialFeatures, encodeFace)

        # Iterate over each match
        for i, match in enumerate(matches):
            if match:
                regId = allRegIds[i]

                # Add detected registration ID to the set
                regIds.add(regId)

                # Draw rectangle around the detected face
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 2, x2 * 2, y2 * 2, x1 * 2
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

                # Draw text (registration ID) on the image
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                cv2.putText(img, regId, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

    # Display the processed image
    cv2.imshow('Webcam', img)
    cv2.waitKey(1)

    # Send detected registration IDs to mark attendance
    if regIds:
        requests.post('http://localhost:5000/student/markattendance', json=list(regIds))

# Release video capture object and close all windows
cap.release()
cv2.destroyAllWindows()
