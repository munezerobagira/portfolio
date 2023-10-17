import { BaseExtension, ExtensionObject } from "../types/BaseExtension";

export default class ManExtension extends BaseExtension {
  static defaultCommand = "man";
  static manPage = "A manual page";
  constructor({ terminal, command }: ExtensionObject) {
    super({
      defaultCommand: "man",
      command,
      manPage: "Display help commands",
      terminal,
    });
  }
  extension(args: any): void {
    if (!args[1]) return this.write("Please provide an arguments");
    const command: string = args[1];
    const systemCommand = this.systemEmvironment.find(
      (c) => c.command == command
    );
    if (!systemCommand) this.write(command + " command is not found");
    this.write(systemCommand.description);
  }
}

