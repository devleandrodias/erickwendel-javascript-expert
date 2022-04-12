import chalk from "chalk";
import draftLog from "draftlog";
import readline from "readline";
import chalkTable from "chalk-table";

import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.data = {};
    this.print = {};
    this.terminal = {};
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  initializeTerminal(database, language) {
    draftLog(console).addLineListener(process.stdin);

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((x) => new Person(x).formatted(language));

    const table = chalkTable(this.getTableOptions(), data);

    this.data = data;
    this.print = console.draft(table);
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("km Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
      ],
    };
  }
}
