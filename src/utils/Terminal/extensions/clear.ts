import { BaseExtension, ExtensionObject } from "../types/BaseExtension";

export default class ClearExtension extends BaseExtension {
  static defaultCommand = "clear";
  static manPage = "An extension to clear screen";
  constructor({ terminal, command }: ExtensionObject) {
    super({
      defaultCommand: "clear",
      command,
      manPage: "clear screen",
      terminal,
    });
  }
  extension(args: any): void {
    this.outputDisplay.innerHTML = "";
    this.write("");
  }
}

