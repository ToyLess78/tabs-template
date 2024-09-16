import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute, TabName, TabNameToIcon } from "../../enums/enums";
import { Select, Tab } from "../components";
import styles from "./TabsNavigation.module.scss";

export const TabsNavigation: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>(TabName.DASHBOARD);
	const [pinnedTabs, setPinnedTabs] = useState<string[]>([TabName.DASHBOARD]);
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

	const pinnedTabsList = tabs.filter((tab) => pinnedTabs.includes(tab.label));
	const unpinnedTabsList = tabs.filter(
		(tab) => !pinnedTabs.includes(tab.label),
	);

	const handleTabClick = (path: string, label: string) => {
		setActiveTab(label);
		navigate(path);
	};

	const handlePinToggle = (label: string) => {
		setPinnedTabs((prev) => {
			if (prev.includes(label)) {
				return prev.filter((tab) => tab !== label);
			}
			return [...prev, label];
		});
	};

	return (
		<div className={styles.tabsNavigation}>
			<div className={styles.pinnedTabsContainer}>
				{pinnedTabsList.map((tab) => (
					<Tab
						key={tab.label}
						label={activeTab === tab.label ? tab.label : ""}
						Icon={tab.Icon}
						isActive={activeTab === tab.label}
						onClick={() => handleTabClick(tab.path, tab.label)}
					/>
				))}
			</div>
			<div className={styles.unpinnedTabsContainer}>
				{tabs.map((tab) => (
					<Tab
						key={tab.label}
						label={tab.label}
						Icon={tab.Icon}
						isActive={false}
						onClick={() => handlePinToggle(tab.label)}
					/>
				))}
			</div>
			<Select options={unpinnedTabsList} onTogglePin={handlePinToggle} />
		</div>
	);
};
