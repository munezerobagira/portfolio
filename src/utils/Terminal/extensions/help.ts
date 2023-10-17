import { BaseExtension, ExtensionObject } from "../types/BaseExtension";

export default class HelpExtension extends BaseExtension {
  static defaultCommand = "help";
  static manPage = "List all available command";
  constructor({ terminal, command }: ExtensionObject) {
    super({
      defaultCommand: "help",
      command,
      manPage: "Display help commands",
      terminal,
    });
  }
  extension(args: any): void {
    const helpString: string = this.systemEmvironment
      .map(
        (c) => `
      ------------
      - ${c.command}
      ${c.description}
      `
      )
      .join("");
    this.write(helpString);
  }
}

