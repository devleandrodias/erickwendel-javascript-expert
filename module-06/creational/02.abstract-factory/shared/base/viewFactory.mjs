import NotImplementedExeception from "../notImplementedException.mjs";

export default class ViewFactory {
  createTable() {
    throw new NotImplementedExeception(this.createTable.name);
  }
}
