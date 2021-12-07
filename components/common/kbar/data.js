/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.0     ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

// import Actions from "./Actions"
// import APIReference from "./APIReference"
// import GettingStarted from "./GettingStarted"
// import Overview from "./Overview"
// import Shortcuts from "./Shortcuts"
// import State from "./State"
// import UndoRedo from "./UndoRedo"

const kbar_demo_data = {
	introduction: {
		name: "Introduction",
		slug: "/docs",
		children: {
			overview: {
				name: "Overview",
				slug: "/docs/overview",
				component: null,//Overview,
				section: "Overview",
			},
			gettingStarted: {
				name: "Getting started",
				slug: "/docs/getting-started",
				component: null,//GettingStarted,
				section: "Overview",
			},
		},
	},
	concepts: {
		name: "Concepts",
		slug: "/concepts",
		children: {
			overview: {
				name: "Actions",
				slug: "/docs/concepts/actions",
				component: null,//Actions,
				section: "Concepts",
			},
			shortcuts: {
				name: "Shortcuts",
				slug: "/docs/concepts/shortcuts",
				component: null,//Shortcuts,
				section: "Concepts",
			},
			accessingState: {
				name: "State",
				slug: "/docs/concepts/state",
				component: null,//State,
				section: "Concepts",
			},
			history: {
				name: "Undo/Redo",
				slug: "/docs/concepts/history",
				component: null,//UndoRedo,
				section: "Concepts",
			},
		},
	},
	apiReference: {
		name: "API Reference",
		slug: "/api",
		children: {
			useStore: {
				name: "useStore",
				slug: "/docs/api/#useStore",
				component: null,//APIReference,
				section: "API Reference",
			},
			kbarProvider: {
				name: "KBarProvider",
				slug: "/docs/api/#KBarProvider",
				component: null,//APIReference,
				section: "API Reference",
			},
			kbarPortal: {
				name: "KBarPortal",
				slug: "/docs/api/#KBarPortal",
				component: null,//APIReference,
				section: "API Reference",
			},
			kbarAnimator: {
				name: "KBarAnimator",
				slug: "/docs/api/#KBarAnimator",
				component: null,//APIReference,
				section: "API Reference",
			},
			kbarSearch: {
				name: "KBarSearch",
				slug: "/docs/api/#KBarSearch",
				component: null,//APIReference,
				section: "API Reference",
			},
			kbarResults: {
				name: "KBarResults",
				slug: "/docs/api/#KBarResults",
				component: null,//APIReference,
				section: "API Reference",
			},
			useKBar: {
				name: "useKBar",
				slug: "/docs/api/#useKBar",
				component: null,//APIReference,
				section: "API Reference",
			},
			historyImpl: {
				name: "HistoryImpl",
				slug: "/docs/api/#HistoryImpl",
				component: null,//APIReference,
				section: "API Reference",
			},
		},
	},
	tutorials: {
		name: "Tutorials",
		slug: "/tutorials",
		children: {
			basic: {
				name: "Basic tutorial",
				slug: "/docs/tutorials/basic",
				component: null,//null,
				section: "Tutorials",
			},
			custom: {
				name: "Custom styles",
				slug: "/docs/tutorials/custom-styles",
				component: null,//null,
				section: "Tutorials",
			},
		},
	},
}

export default kbar_demo_data