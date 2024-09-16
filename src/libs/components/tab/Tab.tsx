import styles from "./Tab.module.scss";

interface TabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	Icon: React.ElementType;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick, Icon }) => {
	return (
		<div
			className={`${styles.tab} ${isActive ? styles.active : ""}`}
			onClick={onClick}
		>
			<Icon className={styles.icon} />
			<span>{label}</span>
		</div>
	);
};
