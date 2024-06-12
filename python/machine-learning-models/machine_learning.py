import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from linear_regression import linear_regression
from random_forest_regressor import random_forest_regression
import pandas as pd
from connect import get_all_videos

if __name__ == '__main__':
    videos = get_all_videos()
    print("Anzahl Daten gesamt: ", len(videos))
    if videos is not None:
        input = pd.DataFrame({
            'likeCount': [400],
            'commentCount': [12],
            'duration': [345],
            'month': [6],
            'weekday': [2],
            'hour': [18]
        })
        linear_regression(videos, input)
        random_forest_regression(videos, input)

