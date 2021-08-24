
	
import Bar from "./Bar";

export default function Person({ person }) {
	const {
		hunger,
		comfort,
		bladder,
		energy,
		fun,
		social,
		hygiene,
		environment
	} = {...person.needs}

	//Split up into parts of 3 chars and add §
	const moneyStr = person.money + ""

	let money = ""
	for(var i = 0; i < moneyStr.length; i++) {
		if(i !== 0 && i % 3 === 0)
			money = " " + money
		let index = moneyStr.length - i - 1;
		money = moneyStr[index] + money;
	}

	money = "§" + money

	
	const getHealthBar = () => {
		const needSum = hunger +
			+ comfort
			+ bladder
			+ energy
			+ fun
			+ social
			+ hygiene
			+ environment
		
		const healthPercentage = needSum / 800
		const greenBarHeight = 63 * ( 2 * healthPercentage - 1)

		const greenBarColor = healthPercentage === 800 ? "green" : "white"

		return (
			<div>

			{(healthPercentage > 0.5) && <div
				style={{
					width: 38,
					height: greenBarHeight,
					backgroundColor: greenBarColor,
					top: 573 + (63 - greenBarHeight),
					left: 545,
					position: "absolute",
				}}
			></div>}
			
			{(healthPercentage <= 0.5) && <div
				style={{
					width: 38,
					//when x (health) is 0.5, height is 0. When x is 0 height is 67 (1*67)
					height: 67 * ( -2 * healthPercentage + 1),
					backgroundColor: "red",
					top: 635,
					left: 545,
					position: "absolute",
				}}
			></div>}
			</div>
		)
	}

	return (
		<>
			<Bar x={602} y={607} percentage={hunger} />

			<Bar x={602} y={634} percentage={comfort} />

			<Bar x={602} y={662} percentage={bladder} />

			<Bar x={602} y={689} percentage={energy} />

			<Bar x={741} y={607} percentage={fun} />

			<Bar x={741} y={634} percentage={social} />

			<Bar x={741} y={662} percentage={hygiene} />

			<Bar x={741} y={689} percentage={environment} />

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
					paddingTop: 1,
					fontWeight: 'bold'
				}}>
					{money}
				</p>
			
			{getHealthBar()}
		</>
	)

}