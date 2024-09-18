export interface TabsState {
	activeTab: string;
	pinnedTabs: string[];
	allTabs: string[];
}

export type TabsAction =
	| { type: "SET_ACTIVE_TAB"; payload: string }
	| { type: "PIN_TOGGLE"; payload: string }
	| { type: "MOVE_PINNED_TAB"; fromIndex: number; toIndex: number }
	| { type: "MOVE_ALL_TAB"; fromIndex: number; toIndex: number };
