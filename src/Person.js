
	
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
		</>
	)

}