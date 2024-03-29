@app.route('/update_data/<id>', methods=['PUT'])
def update_data(id):
    data = request.get_json()

    file_path = os.path.join(app.config['FOLDER_DATA'], 'data.json')

    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            existing_data = json.load(file)
        
        for entry in existing_data:
            if entry["id"] == id:
                # Hapus entri terakhir dari history jika status sama dengan yang baru
                if entry["history"] and entry["history"][-1]["status"] == data["status"]:
                    entry["history"].pop()
                
                # Tambahkan entri baru ke history
                entry["history"].append({
                    "tanggal_terima": data["tanggal_terima"],
                    "penerima": data["penerima"],
                    "kategori": data["kategori"],
                    "nominal": data["nominal"],
                    "status": data["status"]
                })

                break

        # Tulis kembali hanya bagian yang diperbarui
        with open(file_path, 'w') as file:
            json.dump(existing_data, file, indent=2)
        
        return jsonify({'message': f'Data with ID {id} has been updated'}), 200
    else:
        return jsonify({'error': 'Data file not found'}), 404

