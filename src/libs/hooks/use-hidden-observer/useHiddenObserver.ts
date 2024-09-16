import { useEffect, useState } from "react";

export const useHiddenObserver = (tabRefs: {
	[key: string]: HTMLDivElement | null;
}) => {
	const [hiddenTabs, setHiddenTabs] = useState<Set<string>>(new Set());

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

		Object.values(tabRefs).forEach((tab) => {
			tab && observer.observe(tab);
		});

		return () => {
			observer.disconnect();
		};
	}, [tabRefs, hiddenTabs]);

	return hiddenTabs;
};
