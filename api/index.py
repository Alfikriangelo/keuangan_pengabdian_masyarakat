from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('name')
    password = data.get('password')

    # Bandingkan data dengan input pengguna
    if username == 'admin' and password == 'admin':
        user_data = {'name': 'admin', 'email': 'admin@example.com'}
        return jsonify(user_data)
    else:
        return jsonify({'error': 'Login failed. Check your username and password.'}), 401


if __name__ == '__main__': 
    app.run()