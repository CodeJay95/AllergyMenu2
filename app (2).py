from flask import Flask, render_template, request
import main

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/run-script', methods=['POST'])
def run_script():
    user_input = request.form['user_input']
    result = main.run_your_function(user_input)  # Replace with the function that processes user input
    return {'result': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
