#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import { spawn } from "child_process";

function RunCommand(command, args) {
  const process = spawn(command, args, {
    stdio: "inherit",
  });

  process.on("close", (code) => {
    console.log(`\nProcess exited with code ${code}`);
  });
}

async function main() {
  const answer = await select({
    message: "Choose action",
    choices: [
      { name: "Run Laravel server", value: "laravel" },
      { name: "Run Node app", value: "node" },
      { name: "Exit", value: "exit" },
    ],
  });
  switch (answer) {
    case "laravel":
      console.log("Starting Laravel Server...");
      RunCommand("php", ["artisan", "serve"]);
      break;
    case "node":
      console.log("Running index.js...");
      RunCommand("node", ["index.js"]);
      break;
    default:
      console.log("Bye");
  }
}

main();
console.log("CLI STARTED");
console.log("TTY:", process.stdout.isTTY);
