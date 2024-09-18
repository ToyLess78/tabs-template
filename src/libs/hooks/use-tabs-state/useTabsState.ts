import { useEffect, useReducer } from "react";
import { AppRoute, TabName, TabNameToIcon } from "../../enums/enums";
import { initialState } from "./libs/tabs-initial.state";
import { tabsReducer } from "./libs/tabs-reducer";

export const useTabsState = () => {
	const [state, dispatch] = useReducer(tabsReducer, initialState, (initial) => {
		const savedState = localStorage.getItem("tabsState");
		return savedState ? JSON.parse(savedState) : initial;
	});

	useEffect(() => {
		localStorage.setItem("tabsState", JSON.stringify(state));
	}, [state]);

	const tabs = state.allTabs.map((key) => {
		const tabLabel = TabName[key as keyof typeof TabName];
		const IconComponent = TabNameToIcon[tabLabel as keyof typeof TabNameToIcon];

		return {
			label: tabLabel,
			path: AppRoute[key as keyof typeof AppRoute],
			Icon: IconComponent,
		};
	});

	const setActiveTab = (label: string) => {
		dispatch({ type: "SET_ACTIVE_TAB", payload: label });
	};

	const togglePinTab = (label: string) => {
		dispatch({ type: "PIN_TOGGLE", payload: label });
	};

	const movePinnedTab = (fromIndex: number, toIndex: number) => {
		dispatch({ type: "MOVE_PINNED_TAB", fromIndex, toIndex });
	};

	const moveAllTab = (fromIndex: number, toIndex: number) => {
		dispatch({ type: "MOVE_ALL_TAB", fromIndex, toIndex });
	};

	return {
		state,
		tabs,
		setActiveTab,
		togglePinTab,
		movePinnedTab,
		moveAllTab,
	};
};
