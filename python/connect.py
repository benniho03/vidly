import psycopg2
import pandas as pd

def connect():
    """ Connect to the PostgreSQL database server """
    try:
        # connecting to the PostgreSQL server
        with psycopg2.connect("postgresql://gruppe2:on21-6:d2@db-postgresql-fra1-94996-do-user-6859634-0.c.db.ondigitalocean.com:25060/gruppe2") as conn:
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
    print(videos)
