
export default function Bar(props) {

	const height = 8
	const barWidth = 90
	const greenWidth = barWidth * (props.percentage / 100)
  
	const x = props.x
	const y = props.y
  
	const radius = 20


	//Redder when lower precentage 
	const red = (100 - props.percentage) +  83
  
	return (
	  <>
		<div style={{
		  height: height,
		  width: barWidth,
		  left: x,
		  top: y,
		  backgroundColor: 'rgb(81,96,89)',
		  position: "absolute",
		  borderRadius: radius,
		  zIndex: 2,
		}} />
  
		<div style={{
		  height: height,
		  width: greenWidth,
		  left: x,
		  top: y,
		  backgroundColor: 'rgb(' + red + ',183,83)',
		  position: "absolute",
		  borderRadius: radius,
		  zIndex: 3,
		}} /> 
	  </>
	)
  }