from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import text
 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Kilo-141AR@localhost/pesu_parking'     #'mysql+pymysql://username:password@localhost/db_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False                                           # when committing

db = SQLAlchemy(app)
Base = automap_base()
cors = CORS(app, origins='*')

with app.app_context():
   Base.prepare(db.engine, reflect=True)

Manager = Base.classes.lot_manager
Lot = Base.classes.parking_lot
Spot = Base.classes.parking_spot
Reservation = Base.classes.reservation
Student = Base.classes.student
Vehicle = Base.classes.vehicle


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

@app.route('/student',methods=['GET','POST'])
def students():
    return

@app.route('/close_reservation/<id>/<license>',methods=['GET','POST'])
def close_res(id,license):
   try:
    db.session.execute(text('CALL close_reservation_by_student_and_vehicle(:p_student_id,:p_license_plate)'),{'p_student_id':str(id),'p_license_plate':str(license)})
    db.session.commit()
    return 'Closed Reservation Successfully'
   except:
      return 'error was raised because of non existent reservation or because of incorrect details'   

@app.route('/admin',methods=['GET'])
def admin(user):
    if user=='Tejas':
        return True
    

if __name__=="__main__":
    app.run(debug=True,port=8080)