import { Outlet } from "react-router-dom";
import { TabsNavigation } from "../components";

export const Layout: React.FC = () => {
	return (
		<>
			<TabsNavigation />
			<div style={{ margin: "15px 0", flexGrow: 1, backgroundColor: "white" }}>
				<Outlet />
			</div>
		</>
	);
};
