import psycopg2
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential
from keras.layers import Dense
from sklearn.metrics import mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt
from textblob import TextBlob
from connect import get_videos_no_music
import shap



# Daten vorverarbeiten
def preprocess_data(df):
    # Nur relevante Spalten auswählen
    df['title_length'] = df['title'].apply(len)
    df['title_word_count'] = df['title'].apply(lambda x: len(x.split()))
    df['des_length'] = df['description'].apply(len)
    df['des_word_count'] = df['description'].apply(lambda x: len(x.split()))
    df['caption'] = df['caption'].apply(lambda x: 0 if len(x) == 0 else 1)
    df['title'] = df['title'].astype(str)
    df['description'] = df['description'].astype(str)

    # Neue Spalten für Polarität und Subjektivität erstellen
    df['title_polarity'] = df['title'].apply(lambda title: TextBlob(title).sentiment.polarity)
    df['title_subjective'] = df['title'].apply(lambda title: TextBlob(title).sentiment.subjectivity)

    df['description_polarity'] = df['description'].apply(lambda description: TextBlob(description).sentiment.polarity)
    df['description_subjective'] = df['description'].apply(lambda description: TextBlob(description).sentiment.subjectivity)

    #Spalten für Monat, Tag und Stunde berechnen
    df['month'] = df['publishedAt'].dt.month
    df['weekday'] = df['publishedAt'].dt.weekday + 1
    df['hour'] = df['publishedAt'].dt.hour

    df = df[['likeCount', 'commentCount', 'duration', 'viewCount', 'month', 'weekday', 'hour', 'title_length']]
    # Fehlende Werte entfernen
    df = df.dropna()
    
    # Features und Zielwert (viewCount) trennen
    X = df[['likeCount', 'commentCount','duration', 'month', 'weekday', 'hour', 'title_length']]
    y = df['viewCount']
    
    # Daten in Trainings- und Testsets aufteilen
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Daten normalisieren (StandardScaler)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    return X_train, X_test, y_train, y_test

# Neuronales Netzwerk erstellen und trainieren
def create_and_train_model(X_train, y_train):
    model = Sequential()
    model.add(Dense(256, input_dim=X_train.shape[1], activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(1, activation='linear'))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, y_train, epochs=200, batch_size=20, verbose=1)
    return model


# Vorhersagen treffen
def predict_views(model, X_test):
    predictions = model.predict(X_test)
    return predictions

# Hauptprogramm
# if __name__ == "__main__":
#     df = get_all_videos()
#     if df is not None:
#         X_train, X_test, y_train, y_test = preprocess_data(df)
#         model = create_and_train_model(X_train, y_train)
#         predictions = predict_views(model, X_test)
#         print(predictions)

#neue Erweiterung
def predict_and_evaluate(model, X_test, y_test):
    predictions = model.predict(X_test)  
    # Konvertiere die Vorhersagen in eine flache Liste
    predictions = predictions.flatten()
    
    # Berechne die Fehlermaße
    mse = mean_squared_error(y_test, predictions)
    mae = mean_absolute_error(y_test, predictions)
    
    print(f"Mean Squared Error (MSE): {mse}")
    print(f"Mean Absolute Error (MAE): {mae}")

    
    # Plot der Vorhersagen gegen die echten Werte
    plt.figure(figsize=(10, 6))
    plt.scatter(y_test, predictions, alpha=0.5)
    plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], color='red')
    plt.xlabel('Tatsächliche Ansichten')
    plt.ylabel('Vorhergesagte Ansichten')
    plt.title('Vorhergesagte vs. Tatsächliche Ansichten')
    plt.show()
    
    return predictions

# SHAP Values berechnen
def compute_shap_values(model, X_train):
    explainer = shap.DeepExplainer(model, X_train)
    shap_values = explainer.shap_values(X_train)
    
    # Plot SHAP Summary
    shap.summary_plot(shap_values, X_train, feature_names=['likeCount', 'commentCount', 'duration', 'month', 'weekday', 'hour'])

# Hauptprogramm
if __name__ == "__main__":
    df = get_videos_no_music()
    if df is not None:
        X_train, X_test, y_train, y_test = preprocess_data(df)
        model = create_and_train_model(X_train, y_train)
        predictions = predict_and_evaluate(model, X_test, y_test)
        print(predictions)
        compute_shap_values(model, X_train)