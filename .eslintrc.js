module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@next/next/recommended",
		"plugin:react-hooks/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:jsx-a11y/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"jsx-a11y"
	],
	"rules": {
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		]
	},
	"settings": {
		"import/resolver": {
			"alias": {
				"map": [
					["@hehe", "./a/b/c"],
					["@redux", "./redux/*"],
					["@layout", "./layout/*"],
					["@styles", "./styles/*"],
					["@helpers", "./helpers/*"],
					["@component", "./component/*"],
					["@theme", "./components/Themes/*"],
					["@common", "./components/common/*"],
					["@signup", "./components/Signup/*"],
					["@widget", "./components/widget/*"],
					["@ticket", "./components/Tickets/*"],
					["@backend", "./components/BackEnd/*"],
					["@gallery", "./components/Gallery/*"],
					["@settings", "./components/settings/*"],
					["@documentation", "./components/Documentation/*"],
				]
			}
		}
	}
}
