export const THEME_NAME = {
	themeSimplicity: "ThemeSimplicity",
	themeTraditional: "ThemeTraditional",
	themeGoogle: "ThemeGoogle",
}

export const themeInfo = {
	[THEME_NAME.themeSimplicity]: {
		id: THEME_NAME.themeSimplicity,
		name: "The Simplicity (default theme)",
		description: "Power in simplicity",
		preview: [
			"/themes/simplicity/preview/1.png",
			"/themes/simplicity/preview/2.png",
			"/themes/simplicity/preview/3.png",
		],
		version: "1.0"
	},
	[THEME_NAME.themeTraditional]: {
		id: THEME_NAME.themeTraditional,
		name: "The Traditional",
		description: "Your old school day",
		preview: [
			"/themes/traditional/preview/1.png",
			"/themes/traditional/preview/2.png",
			"/themes/traditional/preview/3.png",
		],
		version: "1.0"
	},
	[THEME_NAME.themeGoogle]: {
		id: THEME_NAME.themeGoogle,
		name: "The Google",
		description: "A modern look for Google fans",
		preview: [
			"/themes/google/preview/1.png",
			"/themes/google/preview/2.png",
			"/themes/google/preview/3.png",
		],
		version: "1.0"
	},
}