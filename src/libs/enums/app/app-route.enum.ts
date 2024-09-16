import { TabName } from "../enums";

type AppRouteType = {
	ANY: "*";
	DASHBOARD: "/";
} & {
	[key in Exclude<
		keyof typeof TabName,
		"DASHBOARD"
	>]: `/${(typeof TabName)[key]}`;
};

export const AppRoute: AppRouteType = {
	ANY: "*",
	DASHBOARD: "/",
	...(Object.fromEntries(
		Object.entries(TabName)
			.filter(([key]) => key !== "DASHBOARD")
			.map(([key, value]) => [key, `/${value}`]),
	) as Omit<AppRouteType, "ANY" | "DASHBOARD">),
};
