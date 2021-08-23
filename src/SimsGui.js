import { useState } from "react";
import Webcam from "react-webcam";
import gui from "./images/gui.png";

import Person from "./Person";

// For scaling the gui in the lower left corner
const width = 1920;
const height = 1080;

const modalWidth = 600
const modalHeight = 300

const guiScaling = 0.5;

const host = "http://055f-188-151-144-92.ngrok.io"
// const host = "http://localhost:8000"

export default function SimsGui() {

	let [selectedPerson, setSelectedPerson] = useState(null);

	const fetchPeople = () => {
		let url = host + "/current-character"

		return fetch(url)
			.then(r => r.json())
			.then(json => {
				setSelectedPerson(json)
			})
	}

	const refetch = () => {
		setTimeout(() => {
			fetchPeople()
				.then(() => {
					// refetch()
				})
		}, 5000)
	}

	refetch()

	const money = "§100 000"

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

				<div style={{
					width: modalWidth,
					height: modalHeight,
					backgroundColor: "rgba(30,88,225,0.7)",
					top: 170,
					left: 350,
					position: "absolute",
					borderRadius: 30
				}}>

					<div style={{
						width: modalWidth - 30,
						height: modalHeight - 100,
						margin: 15,
						backgroundColor: "rgba(72,131,217,0.7)",
						borderRadius: 30,
						borderColor: "#003075",
						borderWidth: 2,
						border: "solid",
					}}> 
					<p style={{
						padding: 10
					}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Egestas pretium aenean pharetra magna ac. Sit amet facilisis magna etiam tempor orci eu lobortis. Quisque egestas diam in arcu cursus. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Faucibus pulvinar elementum integer enim. Feugiat in fermentum posuere urna. Et magnis dis parturient montes nascetur 
					</p>
					</div>

					<div style={{
						width: 90,
						height: 40,
						backgroundColor: "rgba(72,131,217,0.7)",
						borderRadius: 20,
						borderColor: "#003075",
						borderWidth: 2,
						border: "solid",
						marginLeft: (modalWidth - 30) / 2 - 35,
					}}> 
					<p style={{
						verticalAlign: 'middle',
						textAlign: 'center',
						fontSize: 30,
						height: "100%",
						marginTop: 0,
						flex: 1
					}}>
						OK
					</p>
					</div>

				</div>

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
