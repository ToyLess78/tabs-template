import { useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { useHiddenObserver, useTabsState } from "../../hooks/hooks";
import { DraggableTab, Select, Tab } from "../components";
import styles from "./TabsNavigation.module.scss";

export const TabsNavigation: React.FC = () => {
	const { state, tabs, setActiveTab, togglePinTab, movePinnedTab, moveAllTab } =
		useTabsState();
	const navigate = useNavigate();
	const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const hiddenTabs = useHiddenObserver(tabRefs.current);

	const pinnedTabsList = tabs.filter((tab) =>
		state.pinnedTabs.includes(tab.label),
	);

	const handleTabClick = (path: string, label: string) => {
		setActiveTab(label);
		navigate(path);
	};

	const visibleTabs = tabs.filter((tab) => tab.label !== state.activeTab);

	const hiddenTabsOptions = Array.from(hiddenTabs)
		.filter((label) => label !== state.activeTab)
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
									label={state.activeTab === tab.label ? tab.label : ""}
									Icon={tab.Icon}
									isActive={state.activeTab === tab.label}
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
									onClick={() => togglePinTab(tab.label)}
									ref={(el) => {
										if (el) tabRefs.current[tab.label] = el;
									}}
									data-label={tab.label}
									isPinned={state.pinnedTabs.includes(tab.label)}
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
						onTogglePin={togglePinTab}
						pinnedTabs={state.pinnedTabs}
					/>
				)}
			</div>
		</DndProvider>
	);
};
