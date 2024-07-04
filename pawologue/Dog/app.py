from flask import Flask, request, jsonify
from flask_cors import CORS  # flask_cors modülünü içe aktarın
from DogMatch import model  # model.py dosyasından 'model' örneğini içe aktarıyoruz

app = Flask(__name__)
CORS(app)  # CORS'u etkinleştirin

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']  # Gönderilen veriyi al
    prediction = model.predict(features)  # Modelden tahmin al
    return jsonify({'indices': prediction})  # Tahmini JSON formatında döndür

if __name__ == '__main__':
    app.run(debug=True)
