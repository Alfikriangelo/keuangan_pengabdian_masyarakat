from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

FOLDER_DATA = r'C:/codingan/github pribadi/Keuangan_pengabdian_masyarakat/src/component/Table'
app.config['FOLDER_DATA'] = FOLDER_DATA

def generate_new_id(existing_data):
    max_id = max(int(entry["id"]) for entry in existing_data) if existing_data else 0
    
    # Buat ID baru dengan menambahkan 1 ke ID tertinggi
    new_id = str(max_id + 1)
    return new_id

def find_data_rekap_by_id(id):
    file_path = os.path.join(app.config['FOLDER_DATA'], 'data.json')

    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
        
        for entry in existing_data:
            if entry["id"] == id:
                return entry
        
    return None

def is_name_exists(existing_data, nama):
    # Periksa apakah nama sudah ada dalam data
    return any(entry["nama"] == nama for entry in existing_data)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('name')
    password = data.get('password')

    if username == 'admin' and password == 'admin':
        user_data = {'name': 'admin', 'email': 'admin@example.com'}
        return jsonify(user_data)
    else:
        return jsonify({'error': 'Login failed. Check your username and password.'}), 401
    
@app.route('/save_data_rekap', methods=['POST'])
def save_data_rekap():
    data = request.get_json()

    file_path = os.path.join(app.config['FOLDER_DATA'], 'data.json')

    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
    else:
        existing_data = []

    # Periksa apakah nama sudah ada
    if is_name_exists(existing_data, data["nama"]):
        return jsonify({'error': 'Nama sudah ada'}), 400

    # Generate new ID
    new_id = generate_new_id(existing_data)

    # Buat entri data baru dengan ID baru
    new_entry = {
        "id": new_id,
        "nama": data["nama"],
        "history": [{
            "tanggal_terima": data["tanggal_terima"],
            "penerima": data["penerima"],
            "kategori": data["kategori"],
            "nominal": data["nominal"],
            "status": data["status"]
        }]  
    }

    existing_data.append(new_entry)

    with open(file_path, 'w') as file:
        json.dump(existing_data, file, indent=2)

    return jsonify({'message': 'Data telah disimpan', 'id': new_id}), 200


@app.route('/delete_data/<id>', methods=['DELETE'])
def delete_data(id):
    file_path = os.path.join(app.config['FOLDER_DATA'], 'data.json')

    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
        
        index_to_delete = None
        for i, entry in enumerate(existing_data):
            if entry["id"] == id:
                index_to_delete = i
                break
        
        if index_to_delete is not None:
            del existing_data[index_to_delete]
            
            for i, entry in enumerate(existing_data):
                entry["id"] = str(i + 1)
            
            with open(file_path, 'w') as file:
                json.dump(existing_data, file, indent=2)
            
            return jsonify({'message': f'Data with ID {id} has been deleted'}), 200
        else:
            return jsonify({'error': f'Data with ID {id} not found'}), 404
    else:
        return jsonify({'error': 'Data file not found'}), 404


@app.route('/get_data/<id>', methods=['GET'])
def get_data(id):
    data = find_data_rekap_by_id(id)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'Data not found'}), 404

@app.route('/update_data/<id>', methods=['PUT'])
def update_data(id):
    data = request.get_json()

    file_path = os.path.join(app.config['FOLDER_DATA'], 'data.json')

    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
        
        for entry in existing_data:
            if entry["id"] == id:
                # Memperbarui bidang yang ada sesuai permintaan klien
                for key in data:
                    if key in entry:
                        entry[key] = data[key]

                # Tambahkan riwayat perubahan
                history_entry = {key: data.get(key, entry.get(key, "")) for key in ["tanggal_terima", "penerima", "kategori", "nominal", "status"]}
                entry["history"].append(history_entry)

                break

        with open(file_path, 'w') as file:
            json.dump(existing_data, file, indent=2)
        
        return jsonify({'message': f'Data with ID {id} has been updated'}), 200
    else:
        return jsonify({'error': 'Data file not found'}), 404


if __name__ == '__main__': 
    app.run()