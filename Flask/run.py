from main.app import create_app
import threading
from main.distance.calculate import calculate


if __name__ == '__main__':
    app = create_app()
    t = threading.Thread(target=calculate)
    t.start()
    app.run(host='0.0.0.0', debug=True, port=5000)