from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from utils import preprocess_data, remove_outliers

def linear_regression(videos, input):
    videos = preprocess_data(videos)

    # Ausreiser entfernen
    videos = remove_outliers(videos, ['likeCount', 'commentCount', 'duration', 'viewCount'])

    X = videos[['likeCount', 'commentCount', 'duration', 'month', 'weekday', 'hour']]
    y = videos['viewCount']

    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    
    print("-- Linear Regression --")
    print(f"R^2 Score: {r2}")    
    predictedViews = model.predict(input)
    print(f"Predicted Views: {predictedViews[0]}")
