import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import gui from "./images/gui.png";
import Modal from "./Modal";

import Person from "./Person";

import Sidebar from "./Sidebar";

// For scaling the gui in the lower left corner
const width = 1920;
const height = 1080;
const yOffset = 100;
const guiScaling = 0.68;

const host = "http://127.0.0.1:8000"

export default function SimsGui() {
	let [selectedPerson, setSelectedPerson] = useState(null);
	let [modalText, setModal] = useState(null);

	const fetchCurrentPerson = () => {
		let url = host + "/current-character";

		return fetch(url)
			.then((r) => r.json())
			.then((json) => {
				setSelectedPerson(json);
			});
	};

	const fetchModal = () => {
		let url = host + "/modal";
		return fetch(url)
			.then((r) => r.json())
			.then((json) => {
				setModal(json["text"]);
			});
	};

	//Code only runs once, not every time the state is updated
	useEffect(() => {
		const refetch = () => {
			setTimeout(() => {
				Promise.all([fetchCurrentPerson(), fetchModal()]).then(() => {
					refetch();
				});
			}, 500);
		};
		refetch();
	}, []);

	const getCurrentTime = () => {
		const today = new Date();
		return today.getHours() + ":" + today.getMinutes();
	}

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
					height={1080+"px"}
					width={1920+"px"}
				/>

				<img
					alt={"meaningful text"}
					src={gui}
					style={{
						height: 1417 * guiScaling,
						width: 1920 * guiScaling,
						marginTop: 10 + yOffset,
						marginLeft: -10,
						zIndex: 2,
						position: "absolute",
						mirrored: false,
					}}
				/>

				{modalText && <Modal text={modalText} />}
			</div>

			<div
				style={{
					width: 40,
					height: 180,
					backgroundColor: "rgb(123, 136, 202)",
					top: 770+yOffset,
					left: 752,
					position: "absolute",
					zIndex: 0
				}}
			></div>

			<Sidebar selected={selectedPerson} />

			{selectedPerson && <Person person={selectedPerson}/>}

			<p
				style={{
					backgroundColor: "rgb(106,166,174)",
					width: 120,
					height: 18,
					top: 887+yOffset,
					left: 265,
					borderRadius: 30,
					position: "absolute",
					fontSize: 12,
					textAlign: "center",
					color: "rgb(0, 14, 77)",
					verticalAlign: "middle",
					paddingTop: 1,
					fontWeight: "bold",
					zIndex: 3,
				}}
			>
				Sat {getCurrentTime()}
			</p>
		</>
	);
}
