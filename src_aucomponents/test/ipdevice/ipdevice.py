import time
import math
from flask import Flask, request, jsonify

app = Flask(__name__)
data_posted= [128]
data_max=256
data_posted_time= ['2021-09-13']

# Helper function to return a response with status code and CORS headers
@app.after_request
def prepare_response(response):
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
    return response

@app.route('/')
def info():
    data = 10*math.sin(time.time()/10)
    return '''<html><head><meta http-equiv="refresh" content="5" /></head><body>
    This is test service ipdevice consuming and producing artifitial data from simulator. Refresh rate 5 seconds<br/></br/>
    Endpoints:<br/>
    /simulatordata <br/>
    /simulatordataall <br/>
    /devicedata <br/><br/>

    device:<progress value="'''+str(data)+'" max="10">'+str(data)+'</progress><i>'+str(data)+'</i><br/>simulator:<progress value="'+str(data_posted[-1])+'" max="'+str(data_max)+'">'+str(data_posted[-1])+'</progress><i>'+str(data_posted[-1])+'</i></body>'


@app.route('/simulatordata', methods=['POST'])
def simulatordatapost():
    data = float(request.data)
    data_posted.append(data)
    data_posted_time.append(time.strftime('%Y-%m-%d'))
    return jsonify(success=True)

@app.route('/simulatordata', methods=['GET'])
def simulatordataget():
    return jsonify(success=True, data=data_posted[-1])

@app.route('/simulatordatahtml', methods=['GET'])
def simulatordatahtml():
    return '<html><head><meta http-equiv="refresh" content="5" /></head><body>simulator:<progress value="'+str(data_posted[-1])+'" max="'+str(data_max)+'">'+str(data_posted[-1])+'</progress><i>'+str(data_posted[-1])+'</i></body>'


@app.route('/simulatordataall', methods=['GET'])
def simulatordatagetall():
    return jsonify(success=True, data=data_posted, time=data_posted_time)

@app.route('/simulatordata/<index>', methods=['PUT'])
def simulatordataput(index):
    data = request.data
    data_poste[index] = data
    data_posted_time[index] = time.strftime('%Y-%m-%d')
    return jsonify(success=True, data=data)

@app.route('/devicedata', methods = ['GET'])
def devicedata():
    data = 10*math.sin(time.time()/10)
    return str(data)

@app.route('/devicedatahtml', methods=['GET'])
def devicedatahtml():
    data = 10*math.sin(time.time()/10)
    return '<html><head><meta http-equiv="refresh" content="5" /></head><body>device:<progress value="'+str(data)+'" max="10">'+str(data)+'</progress><i>'+str(data)+'</i></body>'



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
