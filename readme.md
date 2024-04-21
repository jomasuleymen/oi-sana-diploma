# Oi-Sana

## Introduction

This repository contains the source code for [Oi-Sana](https://oi-sana.kz).

## Prerequisites

Before starting the project, ensure you have the following prerequisites installed:

- Node.js v20
- TypeScript
- Docker
- PM2 (globally)

### Installing Prerequisites

#### Node.js v20

To install Node.js v20, follow the instructions provided on the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/)

#### TypeScript
TypeScript can be installed globally using npm (Node Package Manager) by running the following command:

```bash
npm install -g typescript
```

#### Docker
Install Docker according to the instructions provided on the official Docker website: [Get Docker](https://www.docker.com/)


## Getting Started
To start the project, follow these steps:

- Navigate to the 'server' folder.
- Run the Docker Compose file using the following command:
	```bash
	docker-compose up -d
	```
- After Docker containers are up and running, run the following commands:

	```bash
	npm run migration:generate
	npm run migration:run
	```
	These commands are necessary to generate and apply database migrations, ensuring that the database schema is up-to-date with the latest changes.

- Finally, start the project by running:
	```bash
	npm run start
	```