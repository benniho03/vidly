import pandas as pd
from sklearn.discriminant_analysis import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score
from connect import get_all_videos

from textBlob import add_sentiment_analysis_columns

def preprocess_data(videos):
    # Strings aus DB in numerische Werte umwandeln
    videos['title_length'] = videos['title'].apply(len)
    videos['title_word_count'] = videos['title'].apply(lambda x: len(x.split()))
    videos['des_length'] = videos['description'].apply(len)
    videos['des_word_count'] = videos['description'].apply(lambda x: len(x.split()))
    videos['caption'] = videos['caption'].apply(lambda x: 0 if len(x) == 0 else 1)
    #textBlob vorbereitung
    videos = add_sentiment_analysis_columns(videos) 
    # unbrauchbare Spalten entfernen
    videos = videos.drop(columns=['id', 'videoId', 'title', 'thumbnail', 'description', 'channel', 'publishedAt', 'tags', 'topicCategories', 'language', 'query', 'createdat', 'updatedat', 'categoryid'])
    # Spalten mit Null entfernen
    videos = videos.dropna()
    return videos

def preprocess_userinput(input):
    # Strings aus Nutzereingabe in numerische Werte umwandeln
    input['title_length'] = input['title'].apply(len)
    input['title_word_count'] = input['title'].apply(lambda x: len(x.split()))
    input['des_length'] = input['description'].apply(len)
    input['des_word_count'] = input['description'].apply(lambda x: len(x.split()))
    input['caption'] = input['caption'].apply(lambda x: 0 if len(x) == 0 else 1)
    input = input.drop(columns=['title', 'description'])
    return input


def linear_regression(videos, input):
    videos = preprocess_data(videos)
    input = preprocess_userinput(input)

    # Multiple Lineare Regression
    x = videos.drop(columns="viewCount")
    y = videos['viewCount']
    
    # Daten skalieren
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x)
    input_scaled = scaler.transform(input)

    
    # RegressionesModell initialisieren und trainieren
    lr = LinearRegression()
    lr.fit(x_scaled, y) # trainieren

    # Train-Test-Split um Güte zu berechnen
    x_train, X_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.2, random_state=0)

    # Modellgüte berechnen
    y_pred = lr.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    probability = r2 * 100  # Wahrscheinlichkeit in Prozent

    predictedViews = lr.predict(input_scaled)

    print(f"Views: {predictedViews[0]}, Wahrscheinlichkeit: {probability} %")

   
    # Zeit und Tag mit einbauen
    # Timestamp einbauen
    # Das gleiche für commenCount, viewCount

if __name__ == '__main__':
    videos = get_all_videos()
    if videos is not None:
        input = pd.DataFrame({
            'title': "Elderly Couple SHOCKED at 4 HOUR garden makeover!",
            'description': "An elderly couple over 90 with declining health asked me to transform their garden into a blank slate for a family member to maintain; with the right tools, I cleared it in four hours, making it easier for their grandson to keep tidy. They were amazed at the transformation. Thanks for watching. Martin The Garden Guy. (Some tools used: Okatsune Pruners https://amzn.to/3PvZjNQ, Wolf Garten Leaf Rake https://amzn.to/3rrePlV, Handle https://amzn.to/3taA6B4, Garden Trowel https://amzn.to/4aH8l2V, Garden Fork https://amzn.to/3yTNJqQ)",
            'likeCount': 0,
            'commentCount': 0,
            'duration': 1260,
            'caption': ["aiwjdia"]
        })
        linear_regression(videos, input)