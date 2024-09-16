import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute, TabName, TabNameToIcon } from "../../enums/enums";
import { Tab } from "../tab/Tab";
import styles from "./TabsNavigation.module.scss";

export const TabsNavigation: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>(TabName.DASHBOARD);
	const navigate = useNavigate();

	const tabs = Object.keys(TabName).map((key) => {
		const tabLabel = TabName[key as keyof typeof TabName];
		const IconComponent = TabNameToIcon[tabLabel as keyof typeof TabNameToIcon];

		return {
			label: tabLabel,
			path: AppRoute[key as keyof typeof AppRoute],
			Icon: IconComponent,
		};
	});

	const handleTabClick = (path: string, label: string) => {
		setActiveTab(label);
		navigate(path);
	};

	return (
		<div className={styles.tabsContainer}>
			{tabs.map((tab) => (
				<Tab
					key={tab.label}
					label={tab.label}
					Icon={tab.Icon}
					isActive={activeTab === tab.label}
					onClick={() => handleTabClick(tab.path, tab.label)}
				/>
			))}
		</div>
	);
};
