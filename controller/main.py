import requests
import time

import PySimpleGUI as sg
from PySimpleGUI.PySimpleGUI import Checkbox

from mapper import controller_to_backend, backend_to_controller

url = "http://192.168.1.105:8000"

def generate_layout(name: str):
    layout = [
        [sg.Text("Money"), sg.Input("", size=(15, 1), key=f"{name}_value_money")],
        [sg.Column([
            [sg.Text("Hunger",     pad=(0, 21))],
            [sg.Text("Comfort",    pad=(0, 21))],
            [sg.Text("Bladder",    pad=(0, 21))],
            [sg.Text("Energy",     pad=(0, 21))],
            [sg.Text("Fun",        pad=(0, 21))],
            [sg.Text("Social",     pad=(0, 21))],
            [sg.Text("Hygiene",    pad=(0, 21))],
            [sg.Text("Environment",pad=(0, 21))],
        ]), sg.Column([
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_hunger")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_comfort")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_bladder")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_energy")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_fun")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_social")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_hygiene")],
            [sg.Slider(range=(0,100), default_value=50, orientation="h", pad=(0,10,), key=f"{name}_value_environment")]
        ])],
    ]

    return layout

albin_layout = generate_layout("albin")
george_layout = generate_layout("george")
emilia_layout = generate_layout("emilia")
oscar_layout = generate_layout("oscar")
agnes_layout = generate_layout("agnes")
isabel_layout = generate_layout("isabel")

selection = (
    "albin",
    "george",
    "emilia",
    "oscar",
    "agnes",
    "isabel",
)

width = max(map(len, selection))+5

layout = [
    [
        sg.Text("Selected character"),
        sg.Combo(selection, size=(width, 5), enable_events=True, key='selected_character'),
        sg.Stretch(),
        sg.Button("Update", button_color="green"),
        sg.Checkbox("Auto update", key="auto_update")
    ],
    [sg.Checkbox("Cycle through characters", key="cycle_char_checkbox")],
    [sg.TabGroup(
        [[
            sg.Tab("Albin", albin_layout, key="tab_albin"),
            sg.Tab("George", george_layout, key="tab_george"),
            sg.Tab("Emilia", emilia_layout, key="tab_emilia"),
            sg.Tab("Oscar", oscar_layout, key="tab_oscar"),
            sg.Tab("Agnes", agnes_layout, key="tab_agnes"),
            sg.Tab("Isabel", isabel_layout, key="tab_isabel"),
        ]],
        key='tab_group',
        expand_y=True,
        expand_x=True
    )]
]

window = sg.Window(
    'Character settings',
    layout,
    resizable=True,
    default_element_size=(12, 1),
    finalize=True
)

def fetch_initial_values():
    resp = requests.get(f"{url}/everything")
    controller_values = backend_to_controller(**resp.json())

    for val in controller_values:
        window[val].update(controller_values[val])

def send_values(values):
    backend_values = controller_to_backend(**values)
    resp = requests.post(f"{url}/everything", json=backend_values)
    if resp.status_code != 200:
        raise Exception("Fault")

fetch_initial_values()
prev_values = None
last_update = 0
prev_index = 0
last_cycle = 0
while True:
    event, values = window.read(timeout=60)

    if values != prev_values:
        prev_values = values
        print(f"New values: {values}")

        if values["auto_update"]:
            # Update backend
            send_values(prev_values)

    if event != "__TIMEOUT__":
        print(f"New event {event}")
        if event == "Update":
            # Update backend
            send_values(prev_values)

    if values["cycle_char_checkbox"]:
        if time.time() - last_cycle > 2: # seconds

            last_cycle = time.time()
            index = prev_index + 1
            index = 0 if index > len(selection)-1 else index
            prev_index = index

            window["selected_character"].update(list(selection)[index])
            send_values(values)

    if time.time() - last_update > 1:
        last_update = time.time()
        fetch_initial_values()

    if event == sg.WIN_CLOSED:
        break

window.close()