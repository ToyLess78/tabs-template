import styles from "./Tab.module.scss";

interface TabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	Icon: React.ElementType;
	isPinned?: boolean;
}

export const Tab: React.FC<TabProps> = ({
	label,
	isActive,
	onClick,
	Icon,
	isPinned,
}) => {
	return (
		<div
			className={`${styles.tab} ${isActive ? styles.active : ""} ${isPinned ? styles.pinned : ""}`}
			onClick={onClick}
		>
			<Icon className={styles.icon} />
			{label && <span>{label}</span>}
		</div>
	);
};
