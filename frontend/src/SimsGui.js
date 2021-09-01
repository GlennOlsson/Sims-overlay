import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import gui from "./images/gui.png";
import Modal from "./Modal";

import Person from "./Person";

import Sidebar from "./Sidebar";

// For scaling the gui in the lower left corner
const width = 1920;
const height = 1080;

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
			}, 2000);
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
					height={1080+"px"}
					width={1920+"px"}
				/>

				<img
					alt={"meaningful text"}
					src={gui}
					style={{
						height: 1417 * guiScaling,
						width: 1920 * guiScaling,
						marginTop: 10,
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
					top: 770,
					left: 752,
					position: "absolute",
					zIndex: 0
				}}
			></div>

			<Sidebar selected={selectedPerson} />

			{selectedPerson && <Person person={selectedPerson}/>}
		</>
	);
}
