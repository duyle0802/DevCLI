# MyCLI

A simple and flexible CLI tool to run custom commands defined in your project using a `.mycli.json` configuration file.

---

## Installation

Install globally via npm:

```bash
npm install -g mycli
```

---

## Usage

Navigate to your project directory and run:

```bash
mycli
```

---

## Configuration

Create a `.mycli.json` file in the root of your project:

```json
{
  "commands": {
    "Start Dev": "npm run dev",
    "Run Server": "php artisan serve",
    "Check PHP Version": "php -v"
  }
}
```

---

## How It Works

* MyCLI reads the `.mycli.json` file in your current working directory
* Displays a list of commands as a menu
* Executes the selected command in your terminal

---

## Example

```bash
$ mycli
✔ Choose action › Start Dev
Running npm run dev
```

---

## Requirements

* Node.js >= 18
* Commands must be valid shell commands on your system

---

## Features

* Simple and lightweight
* Config-driven (no hardcoded commands)
* Works with any tech stack (Node.js, Laravel, etc.)
* Interactive CLI menu

---

## Roadmap

* Add `init` command to generate `.mycli.json`
* Improve command parsing (support args safely)
* Add command groups / categories
* Add support for environment variables
* Add CI/CD integration helpers

---

## Development

Clone the repository:

```bash
git clone <your-repo-url>
cd mycli
npm install
```

Run locally:

```bash
node cli.js
```

---

## License

MIT
