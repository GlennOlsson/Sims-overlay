import avatars from "./avatars";


export default function Sidebar({selected}) {

    const people = [
        "albin",
        "george",
		"emilia",
		"oscar"
    ]

    const imgHeight = 50;
    const imgWidth = 50;

    const startX = 21;
    const startY = 270;
    const ySpacing = 10;

    return(
        <div>
            {people.map((name, index) => {

				const isSelected = selected && selected.name.toLowerCase() === name

				const imageName = isSelected ? name + "_selected" : name + "_unselected"

				const image = avatars[imageName]

				return (
					<img
						alt={name}
						key={index}
						src={image}
                        style={{
                            height: imgHeight,
                            width: imgWidth,
                            marginTop: startY + index * (ySpacing + imgHeight),
                            marginLeft: startX,
                            zIndex: 1,
                            position: "absolute",
                        }}
					/>
				)
			}) }
        </div>
    )
}