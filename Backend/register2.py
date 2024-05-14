import sys
import face_recognition
import requests
import json
n = len(sys.argv)

total_encodings=[]
count=int(sys.argv[8])
# print("count of images is ",count )
for i in range(count):
    student_image=face_recognition.load_image_file('/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/temp/image_'+str(i)+'.jpg')
    student_face_encoding = face_recognition.face_encodings(student_image)
    if(len(student_face_encoding)==0):
        continue
    # student_face_encoding = student_face_encoding[0]
    total_encodings.append(student_face_encoding[0].tolist())
# print(len(student_face_encoding))
if(len(total_encodings)<4):
    print(0)
else:
    type(total_encodings)
    r = requests.post('http://localhost:5000/admin/addstudent', json={
        "name": sys.argv[1],
        "email": sys.argv[2],
        "regId": sys.argv[3],
        "branch": sys.argv[4],
        "division": sys.argv[5],
        "year": sys.argv[6],
        "facial_feature":total_encodings,
        "roll":sys.argv[7]
    })
    
    print(1)