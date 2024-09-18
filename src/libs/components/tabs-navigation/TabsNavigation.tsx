import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { AppRoute, TabName, TabNameToIcon } from "../../enums/enums";
import { useHiddenObserver } from "../../hooks/hooks";
import { DraggableTab, Select, Tab } from "../components";
import styles from "./TabsNavigation.module.scss";

export const TabsNavigation: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>(TabName.DASHBOARD);
	const [pinnedTabs, setPinnedTabs] = useState<string[]>([TabName.DASHBOARD]);
	const [allTabs, setAllTabs] = useState<string[]>(Object.keys(TabName));
	const navigate = useNavigate();
	const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const hiddenTabs = useHiddenObserver(tabRefs.current);

	const tabs = allTabs.map((key) => {
		const tabLabel = TabName[key as keyof typeof TabName];
		const IconComponent = TabNameToIcon[tabLabel as keyof typeof TabNameToIcon];

		return {
			label: tabLabel,
			path: AppRoute[key as keyof typeof AppRoute],
			Icon: IconComponent,
		};
	});

	const pinnedTabsList = tabs.filter((tab) => pinnedTabs.includes(tab.label));

	const handleTabClick = (path: string, label: string) => {
		setActiveTab(label);
		navigate(path);
	};

	const handlePinToggle = (label: string) => {
		setPinnedTabs((prev) =>
			prev.includes(label)
				? prev.filter((tab) => tab !== label)
				: [...prev, label],
		);
	};

	const movePinnedTab = (fromIndex: number, toIndex: number) => {
		const updatedPinnedTabs = Array.from(pinnedTabs);
		const [movedTab] = updatedPinnedTabs.splice(fromIndex, 1);
		updatedPinnedTabs.splice(toIndex, 0, movedTab);
		setPinnedTabs(updatedPinnedTabs);
	};

	const moveAllTab = (fromIndex: number, toIndex: number) => {
		const updatedAllTabs = Array.from(allTabs);
		const [movedTab] = updatedAllTabs.splice(fromIndex, 1);
		updatedAllTabs.splice(toIndex, 0, movedTab);
		setAllTabs(updatedAllTabs);
	};

	const visibleTabs = tabs.filter((tab) => tab.label !== activeTab);

	const hiddenTabsOptions = Array.from(hiddenTabs)
		.filter((label) => label !== activeTab)
		.map((label) => {
			const tab = tabs.find((tab) => tab.label === label);
			return tab ? { label: tab.label, Icon: tab.Icon } : null;
		})
		.filter((tab) => tab !== null);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.tabsNavigation}>
				<div className={styles.pinnedTabsContainer}>
					{pinnedTabsList.map((tab, index) => (
						<DraggableTab
							key={tab.label}
							index={index}
							moveTab={movePinnedTab}
							containerType="pinnedTabs"
							tab={
								<Tab
									label={activeTab === tab.label ? tab.label : ""}
									Icon={tab.Icon}
									isActive={activeTab === tab.label}
									onClick={() => handleTabClick(tab.path, tab.label)}
									isPinned={true}
									showActionIcon={false}
								/>
							}
						/>
					))}
				</div>
				<div className={styles.allTabsContainer}>
					{visibleTabs.map((tab, index) => (
						<DraggableTab
							key={tab.label}
							index={index}
							moveTab={moveAllTab}
							containerType="allTabs"
							tab={
								<Tab
									label={tab.label}
									Icon={tab.Icon}
									isActive={false}
									onClick={() => handlePinToggle(tab.label)}
									ref={(el) => {
										if (el) tabRefs.current[tab.label] = el;
									}}
									data-label={tab.label}
									isPinned={pinnedTabs.includes(tab.label)}
									showActionIcon={true}
								/>
							}
						/>
					))}
				</div>
				{hiddenTabsOptions.length > 0 && (
					<Select
						options={
							hiddenTabsOptions as Array<{
								label: string;
								Icon?: React.ElementType;
							}>
						}
						onTogglePin={handlePinToggle}
						pinnedTabs={pinnedTabs}
					/>
				)}
			</div>
		</DndProvider>
	);
};
