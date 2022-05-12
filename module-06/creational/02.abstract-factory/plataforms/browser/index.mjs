import TableBrowserComponent from "./table.mjs";
import ViewFactory from "../../shared/base/viewFactory.mjs";

export default class BrowserFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent();
  }
}
