from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
from utils import preprocess_data, remove_outliers

def random_forest_regression(videos, input):
    videos = preprocess_data(videos)
    videos = remove_outliers(videos, ['likeCount', 'commentCount', 'duration', 'viewCount'])

    X = videos[['likeCount', 'commentCount', 'duration', 'month', 'weekday', 'hour']]
    y = videos['viewCount']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    
    print("-- Random Forest Regression --")
    print(f"R^2 Score: {r2}")    
    predictedViews = model.predict(input)
    print(f"Predicted Views: {predictedViews[0]}")
