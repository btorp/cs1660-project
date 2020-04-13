from flask import Flask
from flask import render_template
from flask import request, redirect, url_for
from google.cloud import dataproc_v1

app = Flask(__name__)
client = dataproc_v1.JobControllerClient(client_options={
    'api_endpoint': 'us-west1-dataproc.googleapis.com:443'
})
cluster_name = 'cluster-68f2'
project_id = 'cs1660-project-273704'
region = 'us-west1'

jar_path = 'gs://dataproc-staging-us-west1-111951681325-6zye7tue/JAR/invertedindex.jar'
input_file = 'gs://dataproc-staging-us-west1-111951681325-6zye7tue/'
output_path = 'gs://dataproc-staging-us-west1-111951681325-6zye7tue/output'

#response = client.submit_job(project_id, region, job)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        folder = request.data.decode()
        file_path = input_file + folder
        print (file_path)
        job = {
            'placement': {
            'cluster_name': cluster_name
            },
            'hadoop_job': {
                'main_jar_file_uri': jar_path,
                'jar_file_uris': [jar_path],
                'args': ['InvertedIndex',
                    file_path,
                    output_path]
            }
        }
        response = client.submit_job(project_id, region, job)
        return redirect(url_for('load'))
    return render_template('home.html')

@app.route('/load', methods=['GET'])
def load():
    return render_template('load.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/search/results', methods=['GET', 'POST'])
def search_results():
    return render_template('search_results.html')

@app.route('/top-n')
def top_n():
    return render_template('top_n.html')

@app.route('/top-n/results', methods=['GET', 'POST'])
def top_n_results():
    return render_template('top_n_results.html')