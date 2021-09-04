import avatars from "./avatars";
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
		environment,
	} = { ...person.needs };

	const yOffset = 100;

	//Split up into parts of 3 chars and add §
	const moneyStr = person.money + "";

	let money = "";
	for (var i = 0; i < moneyStr.length; i++) {
		if (i !== 0 && i % 3 === 0) money = " " + money;
		let index = moneyStr.length - i - 1;
		money = moneyStr[index] + money;
	}

	money = "§" + money;

	const avatarName = "profile_" + person.name.toLowerCase()

	const avatar = avatars[avatarName]

	const getHealthBar = () => {
		const needSum =
			hunger +
			comfort +
			bladder +
			energy +
			fun +
			social +
			hygiene +
			environment;

		const healthPercentage = needSum / 800;
		const greenBarHeight = 88 * (2 * healthPercentage - 1);

		const greenBarColor = healthPercentage > 0.99 ? "white" : "rgb(83,183,83)";

		const healthbarStartX = 752;
		const healthBarWidth = 40;

		return (
			<div>
				{healthPercentage > 0.5 && (
					<div
						style={{
							width: healthBarWidth,
							height: greenBarHeight,
							backgroundColor: greenBarColor,
							top: 770 + yOffset + (90 - greenBarHeight),
							left: healthbarStartX,
							position: "absolute",
							zIndex: 0,
						}}
					></div>
				)}

				{healthPercentage <= 0.5 && (
					<div
						style={{
							width: healthBarWidth,
							//when x (health) is 0.5, height is 0. When x is 0 height is 67 (1*67)
							height: 88 * (-2 * healthPercentage + 1),
							backgroundColor: "red",
							top: 860 + yOffset,
							left: healthbarStartX,
							position: "absolute",
							zIndex: 0,
						}}
					></div>
				)}
			</div>
		);
	};

	return (
		<>
			<Bar x={821} y={820+ yOffset} percentage={hunger} />

			<Bar x={821} y={857+ yOffset} percentage={comfort} />

			<Bar x={821} y={894+ yOffset} percentage={bladder} />

			<Bar x={821} y={932+ yOffset} percentage={energy} />

			<Bar x={1010} y={820+ yOffset} percentage={fun} />

			<Bar x={1010} y={857+ yOffset} percentage={social} />

			<Bar x={1010} y={894+ yOffset} percentage={hygiene} />

			<Bar x={1010} y={932+ yOffset} percentage={environment} />

			<p
				style={{
					backgroundColor: "rgb(106,166,174)",
					width: 100,
					height: 20,
					top: 913 + yOffset,
					left: 29,
					borderRadius: 30,
					position: "absolute",
					fontSize: 12,
					textAlign: "center",
					color: "rgb(0, 14, 77)",
					verticalAlign: "middle",
					paddingTop: 1,
					fontWeight: "bold",
					zIndex: 3,
				}}
			>
				{money}
			</p>

			<img
				alt={"Avatar"}
				src={avatar}
				style={{
					height: 130,
					width: 130,
					marginTop: 708 + yOffset,
					marginLeft: 275,
					zIndex: 3,
					position: "absolute",
				}}
			/>

			{getHealthBar()}
		</>
	);
}
