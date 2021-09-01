
from threading import Thread
import threading

import time
import requests

sims = ["agnes", "isabel", "albin", "george", "emilia", "oscar"]

while True:
    for name in sims:
        print(name)
        requests.post("http://localhost:8000/current-character", json={"name": name})
        time.sleep(3)