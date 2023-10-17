import { BaseExtension, ExtensionObject } from "../types/BaseExtension";

export default class HelloWorldExtesion extends BaseExtension {
  constructor({ terminal, command }: ExtensionObject) {
    super({
      defaultCommand: "hi",
      manPage: "A sample extension",
      terminal,
    });
  }
  extension(args: any): void {
    if (args[1]) return this.write("Hello world");
    return this.write("Hello world");
  }
}

