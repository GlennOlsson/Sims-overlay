import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import gui from "./images/gui.png";
import Modal from "./Modal";

import Person from "./Person";

// For scaling the gui in the lower left corner
const width = 1920;
const height = 1080;

const guiScaling = 0.5;

const host = "http://8862-188-151-144-92.ngrok.io"
// const host = "http://localhost:8000"

export default function SimsGui() {

	let [selectedPerson, setSelectedPerson] = useState(null);
	let [modalText, setModal] = useState(null);
	let [money, setMoney] = useState("§86");

	const fetchCurrentPerson = () => {
		let url = host + "/current-character"

		return fetch(url)
			.then(r => r.json())
			.then(json => {
				setSelectedPerson(json)
			})
	}

	const fetchModal = () => {
		let url = host + "/modal"
		return fetch(url)
			.then(r => r.json())
			.then(json => {
				setModal(json["text"])
			})
	}

	const fetchMoney = () => {
		let url = host + "/money"
		return fetch(url)
			.then(r => r.json())
			.then(json => {
				//Split up into parts of 3 chars and add §
				let moneyStr = json["money"] + ""
				
				let money = ""
				for(var i = moneyStr.length - 1; i >= 0; i--) {
					money = moneyStr[i] + money;
					if(i !== 0 && i % 3 === 0)
						money = " " + money
				}

				setMoney("§" + money)
			})
	}

	const refetch = () => {
		setTimeout(() => {
			Promise.all([
				fetchCurrentPerson(),
				fetchModal(),
				fetchMoney()
			]).then(() => {
				// refetch()
			})
		}, 5000)
	}

	//Code only runs once, not every time the state is updated
	useEffect(refetch, []);

	return (
		<>
			<div className="Gui">
				<Webcam
					style={{
						position: "absolute",
						zIndex: -2,
						alignSelf: "flex-start",
					}}
					videoConstraints={{ height, width }}
				/>

				<img
					alt={"meaningful text"}
					src={gui}
					style={{
						height: height * guiScaling,
						width: width * guiScaling,
						marginTop: 180,
						marginLeft: -10,
						zIndex: 0,
						position: "absolute",
					}}
				/>

				{ modalText && <Modal text={modalText} />}

				<p style={{
					backgroundColor: "rgb(106,166,174)",
					width: 73,
					height: 14,
					top: 673,
					left: 19,
					borderRadius: 30,
					position: 'absolute',
					fontSize: 10,
					textAlign: 'center',
					color: "rgb(0, 14, 77)",
					verticalAlign: "middle",
					paddingTop: 1
				}}>
					{money}
				</p>
			</div>

			{selectedPerson && <Person person={selectedPerson} />}
		</>	
	);
}
