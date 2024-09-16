import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Tab } from "../tab/Tab";
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
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
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

	return (
		<div ref={dropdownRef} className={styles.dropdownContainer}>
			<button className={styles.dropdownButton} onClick={toggleDropdown}>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</button>
			{isOpen && (
				<div className={styles.dropdownMenu}>
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
