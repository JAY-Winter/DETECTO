from main.app import create_app
import threading
from main.distance.calculate import calculate
from main.distance.pro_thread import doProcess

if __name__ == '__main__':
    app = create_app()
    t = threading.Thread(target=calculate,args=[0,])
    t.start()
    t2 = threading.Thread(target=calculate,args=[1,])
    t2.start()
    t3 = threading.Thread(target=calculate,args=[2,])
    t3.start()
    t1 = threading.Thread(target=doProcess)
    t1.start()
    app.run(host='0.0.0.0', debug=True, port=5000)