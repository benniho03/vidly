
from flask import Flask, jsonify, request
from machine_learning import machine_learning_script
import json

app = Flask(__name__)

@app.route("/", methods=["POST"])

def api_function():
    data = json.loads(request.data)

    title = data['title']
    description = data['description']
    duration = data['duration']
    month = data['month']
    weekday = data['weekday']
    hour = data['hour']
    totalChannelViews = data['totalChannelViews']
    subscriberCount = data['subscriberCount']
    videoCount = data['videoCount']

    predictedLikes, predictedComments, predictedViews, possibility = machine_learning_script(title, description, duration, month, weekday, hour, totalChannelViews, subscriberCount, videoCount)

    return jsonify({
        'predictedLikes': predictedLikes,
        'predictedComments': predictedComments,
        'predictedViews': predictedViews,
        'possibility': possibility
    })
    