import "./App.css";
import Webcam from "react-webcam";
import gui from "./images/gui.png"

const width = 1920;
const height = 1080;

const guiScaling = 0.5;

function App() {
	return (
		<div className="App">
			<Webcam
				style={{
					position: "absolute",
					zIndex: -1,
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
          zIndex: 100
        }}
      />
		</div>
	);
}

export default App;
