#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import { spawn } from "child_process";
import updateNotifier from "update-notifier";
import fs from "fs";
import path from "path";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url)),
);

// notice user for update
const notifier = updateNotifier({ pkg });
notifier.notify();

async function main() {
  const config = loadConfig();

  const selected = await showMenu(config.commands);

  if (selected === "exit") {
    console.log("Bye");
    return;
  }

  console.log(`Running ${selected}`);
  RunCommand(selected);
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
  const process = spawn(command, {
    stdio: "inherit",
    shell: true,
  });

  process.on("close", (code) => {
    console.log(`\nProcess exited with code ${code}`);
  });
}

console.log("CLI STARTED");
main();
