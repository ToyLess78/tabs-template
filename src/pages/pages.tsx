import { TabName } from "../libs/enums/enums";

const createPageComponent = (name: string) => {
	return () => <h2 style={{ textTransform: "capitalize" }}>{name} Page</h2>;
};

const pages = Object.keys(TabName).reduce(
	(acc, key) => {
		acc[key as keyof typeof TabName] = createPageComponent(
			TabName[key as keyof typeof TabName],
		);
		return acc;
	},
	{} as Record<keyof typeof TabName, React.FC>,
);

export default pages;
