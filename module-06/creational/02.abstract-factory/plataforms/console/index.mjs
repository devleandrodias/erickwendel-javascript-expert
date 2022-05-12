import TableConsoleComponent from "./table.mjs";
import ViewFactory from "../../shared/base/viewFactory.mjs";

export default class ConsoleFactory extends ViewFactory {
  createTable() {
    return new TableConsoleComponent();
  }
}
