import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "../libs/components/components";
import { AppRoute, TabName } from "../libs/enums/enums";
import { pages } from "../pages/pages";

export const router = createBrowserRouter(
	[
		{
			path: AppRoute.DASHBOARD,
			element: <Layout />,
			children: [
				...Object.keys(TabName).map((tabName) => ({
					path: AppRoute[tabName as keyof typeof TabName],
					element: React.createElement(pages[tabName as keyof typeof TabName]),
				})),
				{
					path: AppRoute.ANY,
					element: <Navigate to={AppRoute.DASHBOARD} />,
				},
			],
		},
	],
	{
		basename: "/tabs-template",
	},
);
