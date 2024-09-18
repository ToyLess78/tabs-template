import { useDrag, useDrop } from "react-dnd";

interface DraggableTabProps {
	tab: React.ReactNode;
	index: number;
	moveTab: (fromIndex: number, toIndex: number) => void;
	containerType: string;
}

export const DraggableTab: React.FC<DraggableTabProps> = ({
	tab,
	index,
	moveTab,
	containerType,
}) => {
	const [, ref] = useDrag({
		type: containerType,
		item: { index },
	});

	const [, drop] = useDrop({
		accept: containerType,
		hover(item: { index: number }) {
			if (item.index !== index) {
				moveTab(item.index, index);
				item.index = index;
			}
		},
	});

	return <div ref={(node) => ref(drop(node))}>{tab}</div>;
};
