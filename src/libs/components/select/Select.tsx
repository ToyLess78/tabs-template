import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Select.module.scss";

interface SelectProps {
	options: Array<{ label: string; Icon?: React.ElementType }>;
	onTogglePin: (label: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, onTogglePin }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.dropdownContainer}>
			<button className={styles.dropdownButton} onClick={toggleDropdown}>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</button>
			{isOpen && (
				<div className={styles.dropdownMenu}>
					{options.map((option) => (
						<div
							key={option.label}
							className={styles.dropdownItem}
							onClick={() => onTogglePin(option.label)}
						>
							{option.Icon && <option.Icon className={styles.icon} />}
							<span>{option.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
