from sklearn.svm import SVC
from sklearn.metrics import accuracy_score  
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(student_data_encodings, student_labels, test_size=0.2, random_state=42)

# Initialize SVM classifier
svm_classifier = SVC(kernel='rbf', C=1.0, probability=True)

# Train the classifier
svm_classifier.fit(X_train, y_train)

# Make predictions on test data
y_pred = svm_classifier.predict(X_test)

# Evaluate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy of SVM : {accuracy}")