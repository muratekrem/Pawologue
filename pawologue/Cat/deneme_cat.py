from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)
CORS(app)

# Veriyi yükleme
datasetOzellik = pd.read_excel("encodedcatsS.xlsx")
datasetTrainE = pd.read_excel('cat_matris.xlsx').iloc[:, 1:]
cats_dataset = pd.read_excel("Cat_Dataset.xlsx")

# KNN modelini oluşturma
knn = KNeighborsClassifier(n_neighbors=3, metric='euclidean', weights='distance')

# Modeli eğitme
knn.fit(datasetOzellik, datasetTrainE)

# Yeni kedi için tahmin yapma fonksiyonu
def predict_new_cat(features):
    features_df = pd.DataFrame([features], columns=datasetOzellik.columns)
    prediction = knn.predict(features_df)
    
    # 1 olarak tahmin edilen indisleri bulma
    matching_indices = [i for i, val in enumerate(prediction[0]) if val == 1]
    
    return matching_indices

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']
    matching_indices = predict_new_cat(features)
    
    return jsonify({'indices': matching_indices})

if __name__ == '__main__':
    app.run(debug=True)