FROM python:3.10
# Or any preferred Python version.
ADD . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python", "-m", "flask", "--app", "./machine-learning-models/api", "run"]
# Or enter the name of your unique directory and parameter set.