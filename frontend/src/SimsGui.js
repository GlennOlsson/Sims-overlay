import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import gui from "./images/gui.png";
import Modal from "./Modal";

import Person from "./Person";

import avatars from "./avatars";
import Sidebar from "./Sidebar";

// For scaling the gui in the lower left corner
const width = 1920;
const height = 1080;

const guiScaling = 0.5;

const host = "http://a51e-188-151-144-92.ngrok.io";
// const host = "http://localhost:8000"

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
			}, 5000);
		};
		refetch();
	}, []);

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

				{modalText && <Modal text={modalText} />}
			</div>

			<div
				style={{
					width: 38,
					height: 135,
					backgroundColor: "rgb(123, 136, 202)",
					top: 569,
					left: 545,
					position: "absolute",
				}}
			></div>

			<Sidebar selected={selectedPerson} />

			{selectedPerson && <Person person={selectedPerson}/>}
		</>
	);
}
