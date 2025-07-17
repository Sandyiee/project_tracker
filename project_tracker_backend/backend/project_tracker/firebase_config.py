import firebase_admin
from firebase_admin import credentials

if not firebase_admin._apps:
    cred = credentials.Certificate(r"D:\work\project_tracker\project_tracker_backend\backend\project_tracker\firebase-adminsdk.json")
    firebase_admin.initialize_app(cred)



