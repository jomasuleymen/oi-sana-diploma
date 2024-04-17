module.exports = {
	apps: [
		{
			name: "oi-sana",
			script: "./dist/src/main.js",
			instances: 1,
			autorestart: true,
			watch: false,
			env: {
				NODE_ENV: "production",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
