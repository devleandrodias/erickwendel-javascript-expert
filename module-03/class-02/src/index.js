import chalk from "chalk";
import Person from "./person.js";
import database from "../database.json";

import { save } from "./repository.js";

import TerminalController from "./terminalController.js";

const STOP_TERMINAL = "exit";
const DEFAULT_LANGUAGE = "pt-BR";

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
  try {
    const answer = await terminalController.question(chalk.yellow("Insert: "));

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal();
      console.log(chalk.yellow("Process terminated!"));
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));
    await save(person);
    return mainLoop();
  } catch (error) {
    console.error(chalk.red(error));
    return mainLoop();
  }
}

await mainLoop();
