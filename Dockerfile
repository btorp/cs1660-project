# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.6.5

EXPOSE 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

ENV GOOGLE_APPLICATION_CREDENTIALS CS1660Project-9364ed924f2a.json

# Install pip requirements
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
ADD . /app

#CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
CMD ["flask", "run", "--host=0.0.0.0"]
