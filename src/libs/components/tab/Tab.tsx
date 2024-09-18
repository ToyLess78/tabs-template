import { forwardRef } from "react";
import { SlPin } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";
import "animate.css";
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
				className={`${styles.tab} ${isActive ? styles.active : ""} animate__animated animate__zoomIn`}
				onClick={onClick}
			>
				<Icon className={styles.icon} />
				{label && (
					<span className={`${styles.label} animate__animated animate__fadeIn`}>
						{label}
					</span>
				)}
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
