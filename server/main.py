from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                'Tejas',
                'Shikha',
                'Mom',
                'Dad'
            ]
        }
    )



@app.route('/admin',methods=['GET'])
def admin(user):
    if user=='Tejas':
        return True

if __name__=="__main__":
    app.run(debug=True,port=8080)