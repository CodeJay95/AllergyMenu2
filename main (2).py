from flask import Flask, render_template, request, jsonify
import pandas as pd
import io
import csv
import json

app = Flask(__name__, static_folder="", template_folder="")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file provided"}), 400

    if file:
        data = []
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_input = csv.reader(stream)
        headers = next(csv_input)
        for row in csv_input:
            data.append(dict(zip(headers, row)))

        return jsonify(data)
    else:
        return jsonify({"error": "File upload failed"}), 500

@app.route("/menu", methods=["GET"])
def menu():
    # Code to render the menu.html template with the menu data
    pass

@app.route("/filter", methods=["POST"])
def filter_menu():
    # Code to filter the menu based on allergens and return the filtered data
    pass

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

