import { forwardRef } from "react";
import styles from "./Tab.module.scss";

interface TabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	Icon: React.ElementType;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(
	({ label, isActive, onClick, Icon }, ref) => {
		return (
			<div
				ref={ref}
				data-label={label}
				className={`${styles.tab} ${isActive ? styles.active : ""}`}
				onClick={onClick}
			>
				<Icon className={styles.icon} />
				<span>{label}</span>
			</div>
		);
	},
);

Tab.displayName = "Tab";
