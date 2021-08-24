

const modalWidth = 600
const modalHeight = 300

export default function Modal({ text }) {
	return (
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
				padding: 10,
				fontSize: 20
			}}>
				{text}
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
	)
}