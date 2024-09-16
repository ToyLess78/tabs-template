import { forwardRef } from "react";
import { SlPin } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";
import styles from "./Tab.module.scss";

interface TabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	Icon: React.ElementType;
	isPinned: boolean;
	showActionIcon?: boolean;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(
	({ label, isActive, onClick, Icon, isPinned, showActionIcon }, ref) => {
		return (
			<div
				ref={ref}
				data-label={label}
				className={`${styles.tab} ${isActive ? styles.active : ""}`}
				onClick={onClick}
			>
				<Icon className={styles.icon} />
				<span>{label}</span>
				{showActionIcon &&
					(!isPinned ? (
						<SlPin size={16} className={styles.iconAction} />
					) : (
						<TiDeleteOutline className={styles.iconAction} />
					))}
			</div>
		);
	},
);

Tab.displayName = "Tab";
