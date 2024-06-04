import psycopg2
from config import load_config
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

def connect():
    """ Connect to the PostgreSQL database server """
    try:
        # connecting to the PostgreSQL server
        with psycopg2.connect("postgresql://gruppe2:on21-6:d2@64.226.66.241:25060/gruppe2") as conn:
            print('Connected to the PostgreSQL server.')
            return conn
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

def getAllVideos():
    try:
        db = connect()
        cur = db.cursor()

        # SQL-Abfrage ausführen
        cur.execute("SELECT * FROM videos")
        videos = cur.fetchall()

        # Spaltennamen abrufen
        column_names = [desc[0] for desc in cur.description]

        # Daten in ein DataFrame laden
        df_videos = pd.DataFrame(videos, columns=column_names)
        print(df_videos['publishedAt'])
        return df_videos

    except Exception as e:
        print(e)
    finally:
        if db is not None:
            cur.close()
            db.close()
            print('Database connection closed.')



if __name__ == '__main__':
    videos = getAllVideos()
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


    # Zeit und Tag mit einbauen
    # Timestamp einbauen
    # Das gleiche für commenCount, viewCount