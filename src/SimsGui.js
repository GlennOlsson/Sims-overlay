import Webcam from "react-webcam";
import gui from "./images/gui.png";

import Person from "./Person";

// For scaling the gui in the lower left corner
const width = 1920;
const height = 1080;
const guiScaling = 0.5;

export default function SimsGui() {

	const person = {
		name: "Albin",
		needs: {
			hunger: 30,
			comfort: 50,
			bladder: 30,
			energy: 34,
			fun: 23,
			social: 23,
			hygiene: 4,
			environment: 100,
		}
	
	}
	
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

			<Person person={person} />
		</>	
	);
}
