import sys
import face_recognition
import requests
n = len(sys.argv)

student_image = face_recognition.load_image_file(sys.argv[1])
student_face_encoding = face_recognition.face_encodings(student_image)
# print(len(student_face_encoding))
if(len(student_face_encoding)==0):
    print(0)
else:
    student_face_encoding = student_face_encoding[0]
    type(student_face_encoding)
    r = requests.post('http://localhost:5000/admin/addstudent', json={
        "name": sys.argv[2],
        "email": sys.argv[3],
        "regId": sys.argv[4],
        "branch": sys.argv[5],
        "division": sys.argv[6],
        "year": sys.argv[7],
        "facial_feature":student_face_encoding.tolist(),
        "roll":sys.argv[8]
    })
    print(1)