import pandas as pd
from textblob import TextBlob
from connect import getAllVideos

def add_sentiment_analysis_columns(videos):
    """
    Fügt die Spalten 'title_polarity' und 'title_subjective' zum DataFrame 'videos' hinzu,
    basierend auf der Sentiment-Analyse der Titel.
    
    Args:
    videos (pd.DataFrame): DataFrame, der eine Spalte 'title' enthält.
    
    Returns:
    pd.DataFrame: Der ursprüngliche DataFrame mit den neuen Spalten 'title_polarity' und 'title_subjective'.
    """
    # Sicherstellen, dass die Spalte 'title' als String behandelt wird
    videos['title'] = videos['title'].astype(str)
    videos['description'] = videos['description'].astype(str)

    # Neue Spalten für Polarität und Subjektivität erstellen
    videos['title_polarity'] = videos['title'].apply(lambda title: TextBlob(title).sentiment.polarity)
    videos['title_subjective'] = videos['title'].apply(lambda title: TextBlob(title).sentiment.subjectivity)

    videos['description_polarity'] = videos['description'].apply(lambda description: TextBlob(description).sentiment.polarity)
    videos['description_subjective'] = videos['description'].apply(lambda description: TextBlob(description).sentiment.subjectivity)
    return videos


def title_polarity(title):
	return title.apply(lambda title: TextBlob(title).sentiment.polarity)

def title_subjectivity(title):
	return title.apply(lambda title: TextBlob(title).sentiment.subjectivity)

def title_polarity(description):
	return description.apply(lambda description: TextBlob(description).sentiment.polarity)

def title_subjectivity(description):
	return description.apply(lambda description: TextBlob(description).sentiment.subjectivity)
