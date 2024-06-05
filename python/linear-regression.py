import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score
from connect import getAllVideos

def linearRegression(videos):
    # Strings in numerische Werte umwandeln
    videos['title_length'] = videos['title'].apply(len)
    videos['title_word_count'] = videos['title'].apply(lambda x: len(x.split()))
    videos['des_length'] = videos['description'].apply(len)
    videos['des_word_count'] = videos['description'].apply(lambda x: len(x.split()))
    videos['caption'] = videos['caption'].apply(lambda x: 0 if len(x) == 0 else 1)
    # unbrauchbare Spalten entfernen
    videos = videos.drop(columns=['id', 'videoId', 'title', 'thumbnail', 'description', 'channel', 'publishedAt', 'tags', 'topicCategories', 'language', 'query', 'createdat', 'updatedat', 'categoryid'])
    # Spalten mit Null entfernen
    videos = videos.dropna()

    # Multiple Lineare Regression
    X = videos.drop(columns="viewCount")
    y = videos['viewCount']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 0)
    lr = LinearRegression()

    lr.fit(X_train, y_train)
    c = lr.intercept_
    m = lr.coef_

    y_pred_train = lr.predict(X_train)

    # print(r2_score(y_train, y_pred_train))

    y_pred_test = lr.predict(X_test)

    plt.scatter(y_test, y_pred_test)
    plt.xlabel("Actual Views")
    plt.ylabel("Predicted Views")

    print(r2_score(y_test, y_pred_test))

    # Multiple Lineare Regression auslaugern
    # Zeit und Tag mit einbauen
    # Timestamp einbauen
    # Das gleiche für commenCount, viewCount

if __name__ == '__main__':
    videos = getAllVideos()
    if videos is not None:
        linearRegression(videos)