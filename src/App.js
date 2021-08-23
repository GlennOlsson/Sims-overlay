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
          position: "absolute"
        }}
      />

    <Bar x={602} y={607} percentage={50} />

    <Bar x={602} y={635} percentage={50} />

    <Bar x={602} y={663} percentage={50} />

    <Bar x={602} y={691} percentage={50} />

    <Bar x={741} y={607} percentage={50} />

    <Bar x={741} y={635} percentage={50} />

    <Bar x={741} y={663} percentage={50} />

    <Bar x={741} y={691} percentage={50} />

      
		</div>
	);
}

function Bar(props) {

  const height = 8
  const barWidth = 90
  const greenWidth = barWidth * (props.percentage / 100)

  const x = props.x
  const y = props.y

  const radius = 20

  return (
    <>
      <div style={{
        height: height,
        width: barWidth,
        left: x,
        top: y,
        backgroundColor: 'rgb(81,96,89)',
        position: "absolute",
        borderRadius: radius
      }} />

      <div style={{
        height: height,
        width: greenWidth,
        left: x,
        top: y,
        backgroundColor: 'rgb(83,183,83)',
        position: "absolute",
        borderRadius: radius
      }} /> 
    </>
  )
}

export default App;
