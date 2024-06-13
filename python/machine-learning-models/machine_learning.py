import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from linear_regression import linear_regression
from random_forest_regressor import random_forest_regression
import pandas as pd
from connect import get_all_videos
from utils import preprocess_input, preprocess_data, remove_outliers
from sklearn.model_selection import train_test_split

if __name__ == '__main__':
    videos = get_all_videos()
    if videos is not None:
        input = pd.DataFrame({
            'title':'Start to finish: 30 days of garden landscaping in just 10 minutes',
            'description':'Watch 30 days of landscape gardening condensed into 1x 10-minute video. The process from initial clearing to finishing up with planting on this unique landscape garden project by Avery Landscapes for a private customer.',
            'duration': [600],
            'month': [6],
            'weekday': [2],
            'hour': [18]
        })
        videos = preprocess_data(videos)
        videos = remove_outliers(videos, ['duration', 'titlecharlength', 'descriptioncharlength', 'month', 'weekday', 'hour', 'viewCount', 'commentCount', 'likeCount'])
        print("Anzahl Daten gesamt: ", len(videos)) # Null-Daten & Ausreißer sind raus
        input = preprocess_input(input)    

        # Likes berechnen
        X = videos[['duration', 'titlecharlength', 'descriptioncharlength', 'month', 'weekday', 'hour']] # Muss mit Input übereinstimmen
        y = videos['likeCount']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        predictedLikes, r2_sc1 = random_forest_regression(X_train, X_test, y_train, y_test, input)
        input['likeCount'] = predictedLikes # fügt berechnetes Feld zum Input hinzu

        # Comments berechnen
        X = videos[['duration', 'titlecharlength', 'descriptioncharlength', 'month', 'weekday', 'hour', 'likeCount']] # Muss mit Input übereinstimmen
        y = videos['commentCount']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        predictedComments, r2_sc2 = random_forest_regression(X_train, X_test, y_train, y_test, input)
        input['commentCount'] = predictedComments # fügt berechnetes Feld zum Input hinzu

        # Views berechnen
        X = videos[['duration', 'titlecharlength', 'descriptioncharlength', 'month', 'weekday', 'hour', 'likeCount', 'commentCount']] # Muss mit Input übereinstimmen
        y = videos['viewCount']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        predictedViews, r2_sc3 = random_forest_regression(X_train, X_test, y_train, y_test, input)
        
        print(f"Likes: {predictedLikes}, Comments: {predictedComments}, Views: {predictedViews}")
        print(f"Wahrscheinlichkeit: {r2_sc1*r2_sc2*r2_sc3}")
