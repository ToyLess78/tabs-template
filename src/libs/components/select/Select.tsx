import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Tab } from "../tab/Tab";
import "animate.css";
import styles from "./Select.module.scss";

interface SelectProps {
	options: Array<{ label: string; Icon?: React.ElementType }>;
	onTogglePin: (label: string) => void;
	pinnedTabs: string[];
}

export const Select: React.FC<SelectProps> = ({
	options,
	onTogglePin,
	pinnedTabs,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isFullyClosed, setIsFullyClosed] = useState(true);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const toggleDropdown = () => {
		setIsOpen((prevState) => {
			if (!prevState) {
				setIsFullyClosed(false);
			}
			return !prevState;
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleAnimationEnd = () => {
		if (!isOpen) {
			setIsFullyClosed(true);
		}
	};

	return (
		<div ref={dropdownRef} className={styles.dropdownContainer}>
			<button className={styles.dropdownButton} onClick={toggleDropdown}>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</button>
			{(!isFullyClosed || isOpen) && (
				<div
					className={`${styles.dropdownMenu} animate__animated ${isOpen ? "animate__fadeIn" : "animate__fadeOut"}`}
					onAnimationEnd={handleAnimationEnd}
				>
					{options.map((option) => (
						<Tab
							key={option.label}
							label={option.label}
							Icon={option.Icon!}
							isActive={false}
							onClick={() => onTogglePin(option.label)}
							isPinned={pinnedTabs.includes(option.label)}
							showActionIcon={true}
						/>
					))}
				</div>
			)}
		</div>
	);
};
