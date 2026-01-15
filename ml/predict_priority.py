import sys
import joblib

model = joblib.load("priority_model.pkl")

text = sys.argv[1]
prediction = model.predict([text])

print(prediction[0])
