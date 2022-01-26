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
		"react": {
			"version": "detect"
		},
		"import/resolver": {
			"alias": {
				"map": [
					["@redux", "./redux"],
					["@layout", "./layout"],
					["@styles", "./styles"],
					["@helpers", "./helpers"],
					["@components", "./components"],
					["@pages", "./pages"]
				]
			}
		}
	}
}
