# MyCLI

MyCLI is a simple command-line interface (CLI) tool built with Node.js to help developers quickly run common development commands such as starting a Laravel server or running a Node.js application.

## Overview

This project demonstrates how to build a basic interactive CLI using modern Node.js. It provides a menu-driven interface that allows users to select and execute predefined commands.

## Features

* Interactive command selection
* Run Laravel development server (`php artisan serve`)
* Run Node.js application (`node index.js`)
* Uses child processes to execute system commands
* Simple and extensible structure

## Requirements

* Node.js (version 18 or higher recommended)
* PHP (required for Laravel commands)
* A Laravel project (for Laravel-related commands)

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/mycli.git
cd mycli
```

### Install dependencies

```bash
npm install
```

## Usage

### Run locally

```bash
node cli.js
```

### Install globally (for development)

```bash
npm link
```

Then run:

```bash
mycli
```

### Install globally (production-style)

```bash
npm install -g .
```

Then run:

```bash
mycli
```

## Example

```
Choose action
> Run Laravel server
  Run Node app
  Exit
```

## Project Structure

```
mycli/
├── cli.js
├── package.json
├── package-lock.json
└── node_modules/
```

## How It Works

* The CLI displays a list of actions using an interactive prompt.
* Based on user selection, it executes the corresponding command.
* Commands are executed using Node.js `child_process.spawn`.
* Output is streamed directly to the terminal.

## Configuration

Currently, commands are hardcoded in the source code. Future versions may support external configuration files (e.g., JSON or YAML).

## Versioning

This project follows Semantic Versioning.

* PATCH version for bug fixes
* MINOR version for new features
* MAJOR version for breaking changes

## Updating

If installed globally, update the CLI using:

```bash
npm install -g mycli@latest
```

## Future Improvements

* Detect project type automatically (Laravel, Node.js, etc.)
* Support custom user-defined commands
* Add configuration file support
* Improve terminal UI and user experience
* Add logging and error handling enhancements

## License

MIT
