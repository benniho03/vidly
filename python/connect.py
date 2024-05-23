import psycopg2
from config import load_config

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
        cur.execute("SELECT * FROM videos")
        videos = cur.fetchall()
        # map the videos to a dictionary
        videos_dict = []
        for video in videos:
            videos_dict.append({
                'id': video[0],
                'videoId': video[1],
                'title': video[2],
                'thumbnail': video[4],
                'description': video[5],
                'channel': video[6],
                'likeCount': video[7],
                'commentCount': video[8],
                'viewCount': video[9],
                'duration': video[10],
                'publishedAt': video[11],
                'caption': video[12],
                'tags': video[13],
                'topicCategories': video[14],
                'language': video[15],
                'query': video[16]
            })
        return videos_dict

    except Exception as e:
        print(e)
    finally:
        if db is not None:
            db.close()
            print('Database connection closed.')



if __name__ == '__main__':
    videos = getAllVideos()
    print(videos[0])