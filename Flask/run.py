from main.app import create_app
from main.tools.database  import db
if __name__ == '__main__':
    app = create_app()
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost/flask'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    app.run(host='0.0.0.0', debug=True, port=5000)
    
    