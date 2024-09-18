import {
	FaBox,
	FaCashRegister,
	FaChartLine,
	FaClipboardList,
	FaEnvelope,
	FaHome,
	FaLayerGroup,
	FaList,
	FaMoneyBillWave,
	FaPhone,
	FaQuestionCircle,
	FaShoppingCart,
	FaTools,
	FaWarehouse,
} from "react-icons/fa";

import { TabName } from "../enums";

export const TabNameToIcon = {
	[TabName.DASHBOARD]: FaHome,
	[TabName.BANKING]: FaMoneyBillWave,
	[TabName.TELEFONIE]: FaPhone,
	[TabName.ACCOUNTING]: FaClipboardList,
	[TabName.VERKAUF]: FaShoppingCart,
	[TabName.STATISTIK]: FaChartLine,
	[TabName.POST_OFFICE]: FaEnvelope,
	[TabName.ADMINISTRATION]: FaTools,
	[TabName.HELP]: FaQuestionCircle,
	[TabName.WARENBESTAND]: FaBox,
	[TabName.AUSWAHLLISTEN]: FaList,
	[TabName.EINKAUF]: FaCashRegister,
	[TabName.RECHN]: FaLayerGroup,
	[TabName.LAGERVERWALTUNG]: FaWarehouse,
} as const;
