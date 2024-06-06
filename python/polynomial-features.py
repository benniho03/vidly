import pandas as pd
from sklearn.discriminant_analysis import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score, mean_squared_error
from connect import get_all_videos

def preprocess_data(videos):
    videos = videos.drop(columns=['id', 'videoId', 'title', 'thumbnail', 'description', 'channel', 'publishedAt', 'tags', 'topicCategories', 'language', 'query', 'createdat', 'updatedat', 'categoryid', 'caption'])
    videos = videos.dropna()
    return videos

def preprocess_userinput(input):
    return input


def linear_regression(videos, input):
    videos = preprocess_data(videos)
    input = preprocess_userinput(input)

    X = videos[['likeCount', 'commentCount', 'duration']]
    y = videos['viewCount']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    
    print(f"R^2 Score: {r2}")    
    predictedViews = model.predict(input)
    print(f"Predicted Views: {predictedViews[0]}")

if __name__ == '__main__':
    videos = get_all_videos()
    if videos is not None:
        input = pd.DataFrame({
            'likeCount': [50000],
            'commentCount': [1200],
            'duration': [1260]
        })
        linear_regression(videos, input)