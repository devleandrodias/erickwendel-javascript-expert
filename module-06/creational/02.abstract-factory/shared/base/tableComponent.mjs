import NotImplementedExeception from "../notImplementedException.mjs";

export default class TableComponent {
  render(data) {
    throw new NotImplementedExeception(this.render.name);
  }
}
