import type { TabsAction, TabsState } from "./tabs-actions";

export const tabsReducer = (
	state: TabsState,
	action: TabsAction,
): TabsState => {
	switch (action.type) {
		case "SET_ACTIVE_TAB":
			return { ...state, activeTab: action.payload };
		case "PIN_TOGGLE": {
			const isPinned = state.pinnedTabs.includes(action.payload);
			return {
				...state,
				pinnedTabs: isPinned
					? state.pinnedTabs.filter((tab) => tab !== action.payload)
					: [...state.pinnedTabs, action.payload],
			};
		}
		case "MOVE_PINNED_TAB": {
			const updatedPinnedTabs = Array.from(state.pinnedTabs);
			const [movedPinnedTab] = updatedPinnedTabs.splice(action.fromIndex, 1);
			updatedPinnedTabs.splice(action.toIndex, 0, movedPinnedTab);
			return { ...state, pinnedTabs: updatedPinnedTabs };
		}
		case "MOVE_ALL_TAB": {
			const updatedAllTabs = Array.from(state.allTabs);
			const [movedAllTab] = updatedAllTabs.splice(action.fromIndex, 1);
			updatedAllTabs.splice(action.toIndex, 0, movedAllTab);
			return { ...state, allTabs: updatedAllTabs };
		}
		default:
			return state;
	}
};
