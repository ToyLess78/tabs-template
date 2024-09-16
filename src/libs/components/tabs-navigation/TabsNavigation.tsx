import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute, TabName, TabNameToIcon } from "../../enums/enums";
import { Select, Tab } from "../components";
import styles from "./TabsNavigation.module.scss";

export const TabsNavigation: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>(TabName.DASHBOARD);
	const [pinnedTabs, setPinnedTabs] = useState<string[]>([TabName.DASHBOARD]);
	const [hiddenTabs, setHiddenTabs] = useState<Set<string>>(new Set());
	const navigate = useNavigate();
	const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const newHiddenTabs = entries.reduce((acc, entry) => {
					const tabLabel = entry.target.getAttribute("data-label") || "";
					entry.isIntersecting ? acc.delete(tabLabel) : acc.add(tabLabel);
					return acc;
				}, new Set(hiddenTabs));

				if (
					newHiddenTabs.size !== hiddenTabs.size ||
					!Array.from(newHiddenTabs).every((tab) => hiddenTabs.has(tab))
				) {
					setHiddenTabs(newHiddenTabs);
				}
			},
			{ root: null, threshold: 0.1 },
		);

		Object.values(tabRefs.current).forEach((tab) => {
			tab && observer.observe(tab);
		});

		return () => {
			observer.disconnect();
		};
	}, [tabs.length, hiddenTabs]);

	useEffect(() => {
		console.log("Hidden tabs:", Array.from(hiddenTabs));
	}, [hiddenTabs]);

	const hiddenTabsOptions = Array.from(hiddenTabs)
		.map((label) => {
			const tab = tabs.find((tab) => tab.label === label);
			return tab ? { label: tab.label, Icon: tab.Icon } : null;
		})
		.filter((tab) => tab !== null);

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
			<div className={styles.allTabsContainer}>
				{tabs.map((tab) => (
					<Tab
						key={tab.label}
						label={tab.label}
						Icon={tab.Icon}
						isActive={false}
						onClick={() => handlePinToggle(tab.label)}
						ref={(el) => {
							if (el) tabRefs.current[tab.label] = el;
						}}
						data-label={tab.label}
					/>
				))}
			</div>
			<Select
				options={
					hiddenTabsOptions as Array<{
						label: string;
						Icon?: React.ElementType;
					}>
				}
				onTogglePin={handlePinToggle}
			/>
		</div>
	);
};
