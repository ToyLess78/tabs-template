import { TabName } from "../../../enums/enums";
import type { TabsState } from "./tabs-actions";

export const initialState: TabsState = {
	activeTab: TabName.DASHBOARD,
	pinnedTabs: [TabName.DASHBOARD],
	allTabs: Object.keys(TabName),
};
