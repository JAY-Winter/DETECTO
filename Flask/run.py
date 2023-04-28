from main.app import create_app
import sys
import os

if __name__ == '__main__':
    sys.path.append(os.path.abspath(os.path.dirname(__file__)))
    app = create_app()
    app.run(host='0.0.0.0', debug=True, port=5000)
