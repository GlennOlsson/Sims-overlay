import avatars from "./avatars";


export default function Sidebar({selected}) {

    const people = [
        "agnes",
        "isabel",
        "albin",
        "george",
		"emilia",
		"oscar",
    ]

    const imgHeight = 50;
    const imgWidth = 50;

    const startX = 21;
    const startY = 150;
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
                            zIndex: 2,
                            position: "absolute",
                        }}
					/>
				)
			}) }
        </div>
    )
}