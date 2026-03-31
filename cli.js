#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import { spawn } from "child_process";
import updateNotifier from "update-notifier";
import fs from "fs";
import path from "path";
import readline from "readline";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
);

function waitForEnter() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("", () => {
      rl.close();
      resolve();
    });
  });
}

// notice user for update
const notifier = updateNotifier({ pkg });
notifier.notify();

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === "init") {
    initConfig();
    return;
  }
  const config = loadConfig();
  while (true) {
    console.log("\n================================\n");

    const selected = await showMenu(config.commands);

    if (selected === "exit") {
      console.log("Bye");
      return;
    }

    console.log(`\n>>>>> Running: ${selected}\n`);

    await RunCommand(selected);

    console.log(`\n>>>>> Done. Press Enter to continue....`);
    await waitForEnter();
  }
}

function loadConfig() {
  const configPath = path.join(process.cwd(), ".mycli.json");

  if (!fs.existsSync(configPath)) {
    console.log("No, .mycli.json found in this folder");
    process.exit(1);
  }

  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw);
}

async function showMenu(commands) {
  const choices = Object.keys(commands).map((key) => ({
    name: key,
    value: commands[key],
  }));

  choices.push({ name: "Exit", value: "exit" });

  const answer = await select({
    message: "Choose action",
    choices,
  });

  return answer;
}

function RunCommand(command) {
  return new Promise((resolve) => {
    const child = spawn(command, {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      console.log(`\nProcess exited with code ${code}`);
      resolve();
    });
  });
}

function initConfig() {
  const configPath = path.join(process.cwd(), ".mycli.json");
  if (fs.existsSync(configPath)) {
    console.log(".mycli.json already exists");
    return;
  }
  const defaultConfig = {
    commands: {
      "Start Dev": "npm run dev",
      "Run Server": "php artisan serve",
      "Check Node Version": "node -v",
    },
  };
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log(".mycli.json created successfully");
}

main();
