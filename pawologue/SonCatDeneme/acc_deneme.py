import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report

# Verileri yükleyin
datasetOzellik = pd.read_excel("encodedcatsS.xlsx")
datasetTrainE = pd.read_excel('cat_matris.xlsx').iloc[:, 1:]

# Verileri eğitim ve test setlerine ayırın
X_train, X_test, y_train, y_test = train_test_split(datasetOzellik, datasetTrainE, test_size=0.2, random_state=42)

# Modeli oluşturun ve eğitin
knn = KNeighborsClassifier(n_neighbors=3, metric='cosine', weights='distance')
knn.fit(X_train, y_train)

# Test seti ile tahmin yapın
y_pred = knn.predict(X_test)

# Doğruluğu hesaplayın
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")

