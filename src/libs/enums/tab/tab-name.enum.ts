export const TabName = {
	DASHBOARD: "dashboard",
	BANKING: "banking",
	TELEFONIE: "telefonie",
	ACCOUNTING: "accounting",
	VERKAUF: "verkauf",
	STATISTIK: "statistik",
	POST_OFFICE: "post-office",
	ADMINISTRATION: "administration",
	HELP: "help",
	WARENBESTAND: "warenbestand",
	AUSWAHLLISTEN: "auswahllisten",
	EINKAUF: "einkauf",
	RECHN: "rechn",
	LAGERVERWALTUNG: "lagerverwaltung",
} as const;

export type TabNameType = (typeof TabName)[keyof typeof TabName];
