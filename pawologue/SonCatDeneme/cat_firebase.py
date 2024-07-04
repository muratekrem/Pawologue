import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# Firebase yapılandırması
cred = credentials.Certificate('C:\\Users\\TERM\\Desktop\\SonCatDeneme\\serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app)

# Veriyi yükleme
datasetOzellik = pd.read_excel("encodedcatsS.xlsx")
datasetTrainE = pd.read_excel('cat_matris.xlsx').iloc[:, 1:]

# KNN modelini oluşturma
knn = KNeighborsClassifier(n_neighbors=3, metric='euclidean', weights='distance')

# Modeli eğitme
knn.fit(datasetOzellik, datasetTrainE)

# Yeni kedi için tahmin yapma fonksiyonu
def predict_new_cat(features):
    features_df = pd.DataFrame([features], columns=datasetOzellik.columns)
    prediction = knn.predict(features_df)
    
    matching_indices = []
    for i, row in enumerate(prediction[0]):
        if row == 1:
            matching_indices.append(i)
    
    return matching_indices

# Firestore'dan kedi bilgilerini çekme
def get_cat_info_from_firebase(matching_indices):
    matching_rows = []
    for index in matching_indices:
        doc_ref = db.collection('CatDBMatch').document(str(index))
        doc = doc_ref.get()
        if doc.exists:
            matching_rows.append(doc.to_dict())
    return matching_rows

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']
    matching_indices = predict_new_cat(features)
    matches = get_cat_info_from_firebase(matching_indices)
    
    # Eşleşenleri tersten sıralama
    reversed_matches = list(reversed(matches))
    
    return jsonify({'matches': reversed_matches})

if __name__ == '__main__':
    app.run(debug=True)
