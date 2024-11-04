from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import text
import datetime
 
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

def get_available_parking_spots(lot_id):
    # Query to get available parking spots for the given lot_id
    available_spots = db.session.query(Spot).filter(
        Spot.lot_id == lot_id,
        Spot.is_reserved == False  # Only select spots that are not reserved
    ).all()

    return available_spots

def return_available_spots(lot_id):
    available_spots = get_available_parking_spots(lot_id)

    if available_spots:
        spots_list = [
            {                                             #list of dictionaries
                'spot_id': spot.spot_id,                  #lists all the available spots, to print as choices for manager
                'spot_number': spot.spot_number,
                'is_reserved': spot.is_reserved
            }
            for spot in available_spots
        ]
        return spots_list
    else:
        return []


@app.route("/api/users", methods=['GET'])          # default route, remove in next push
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

@app.route('/student/<id>',methods=['GET','POST'])
def students(id):
    try:
      x = db.session.execute(text("SELECT EXISTS (SELECT 1 FROM student WHERE student_id = :student_id) AS id_exists"),{'student_id':id}).scalar()
      return jsonify(x)
    except:
      return jsonify(-1)

@app.route('/create_student/<srn>/<name1>/<name2>/<contact>',methods=['GET','POST'])   #to create new user
def create_students(srn,name1,name2,contact):
   try:
      db.session.execute(text('CALL add_student(:student_id, :first_name, :last_name, :contact)'),{
            'student_id': srn,
            'first_name': name1,
            'last_name': name2,
            'contact': contact
        })
      return 'Student Created Successfully'
   except:
    return 'Error Creating Student, maybe student already exists, pls check your details'
   
@app.route('/reserve/<vehicle>/<spot>',methods=['GET','POST'])         # for vehicle reservation
def reserve(vehicle,spot):
   try:
      db.session.execute(text('CALL create_reservation(:p_vehicle_id,:p_spot_id,:p_start_time)'),{'p_vehicle_id':vehicle,'p_spot_id':spot,'p_start_time':datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
      db.session.commit()
      return 'ran fine'
   except:
      return 'errors returned'

@app.route('/close_reservation/<id>/<license>',methods=['GET','POST'])       #closing reservations
def close_res(id,license):
   try:
    db.session.execute(text('CALL close_reservation_by_student_and_vehicle(:p_student_id,:p_license_plate)'),{'p_student_id':str(id),'p_license_plate':str(license)})
    db.session.commit()
    return '1'
   except:
      return '0'   

@app.route('/admin/<id>',methods=['GET','POST'])       #for admin login
def admin(id):
    try:
      x = db.session.execute(text("SELECT EXISTS (SELECT 1 FROM lot_manager WHERE manager_id = :manager_id) AS id_exists"),{'manager_id':id}).scalar()
      return jsonify(x)
    except:
      return jsonify(-1)

@app.route('/available_spots/<id>',methods=['GET','POST'])     # available spots
def spots_left(id):
   return return_available_spots(id)

@app.route('/student_deet/<id>',methods=['GET','POST'])
def details(id):
   x = db.session.query(Student).filter(
      Student.student_id == id
   ).all()
   return x

@app.route('/get_reserves/<id>',methods=['GET','POST'])
def reservations(id):
   x = db.session.execute(text('CALL check_student_reservations(:p_student_id)'),{'p_student_id':id})
   y = [list(z) for z in x.fetchall()]
   #print(y)
   return jsonify(y)

@app.route('/get_veh/<id>')
def get_veh(id):
   x = db.session.execute(text('CALL check_student_vehicles(:p_student_id)') ,{'p_student_id':id})
   y = [list(z) for z in x.fetchall()]
   return jsonify(y)

if __name__=="__main__":
    app.run(debug=True,port=8080)