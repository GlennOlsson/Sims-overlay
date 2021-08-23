import "./App.css";
import Webcam from "react-webcam";

const width = 1000;
const height = 500;

function App() {
	return (
		<div className="App">
			<Webcam
				style={{
					position: "relative",
					zIndex: 0,
					alignSelf: "flex-start",
				}}
				videoConstraints={{ height, width }}
			/>

			<div
				style={{
					backgroundColor: "blue",
					zIndex: 100,
					position: "relative",
					height: 10,
					width: 10,
				}}
			/>
		</div>
	);
}

export default App;
