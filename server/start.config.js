module.exports = {
	apps: [
		{
			name: "oi-sana",
			script: "dist/src/main.js",
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
