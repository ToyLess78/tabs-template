import { Outlet } from "react-router-dom";
import { TabsNavigation } from "../components";

export const Layout: React.FC = () => {
	return (
		<>
			<TabsNavigation />
			<Outlet />
		</>
	);
};
