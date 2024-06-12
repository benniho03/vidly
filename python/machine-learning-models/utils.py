import pandas as pd

def preprocess_data(videos):
    videos['publishedAt'] = pd.to_datetime(videos['publishedAt'])
    videos['month'] = videos['publishedAt'].dt.month
    videos['weekday'] = videos['publishedAt'].dt.weekday + 1
    videos['hour'] = videos['publishedAt'].dt.hour
    videos = videos.drop(columns=['id', 'videoId', 'title', 'thumbnail', 'description', 'channel', 'publishedAt', 'tags', 'topicCategories', 'language', 'query', 'createdat', 'updatedat', 'categoryid', 'caption', 'titlecharlength', 'titlewordcount', 'descriptioncharlength', 'descriptionwordcount', 'publishedattime', 'publishedatday', 'likesperviewrate', 'commentsperviewrate', 'includestitleemoji'])
    videos = videos.dropna()
    return videos

def remove_outliers(df, columns): # Funktion von Chat GPT
    for col in columns: 
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]
    return df
