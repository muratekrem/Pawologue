import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Veriyi yükleme
datasetOzellik = pd.read_excel("encodeddogs.xlsx")
datasetTrainE = pd.read_excel('Dogmatch2.xlsx').iloc[:, 1:]  
dogs_dataset = pd.read_excel("Dogss_Dataset.xlsx")

# KNN modelini oluşturma
knn = KNeighborsClassifier(n_neighbors=5, metric='euclidean', weights='distance')

# Modeli eğitme
knn.fit(datasetOzellik, datasetTrainE)

# Yeni köpek için tahmin yapma fonksiyonu
def predict_new_dog(features):
    features_df = pd.DataFrame([features], columns=datasetOzellik.columns)
    prediction = knn.predict(features_df)
    
    matching_indices = []
    for i, row in enumerate(prediction[0]):
        if row == 1:
            matching_indices.append(i)
    
    matching_rows = dogs_dataset.iloc[matching_indices].to_dict(orient='records')
    return matching_rows

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']
    matches = predict_new_dog(features)
    
    # Eşleşenleri tersten sıralama
    reversed_matches = list(reversed(matches))
    
    return jsonify({'matches': reversed_matches})

if __name__ == '__main__':
    app.run(debug=True)
