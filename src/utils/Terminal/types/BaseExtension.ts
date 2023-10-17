import Terminal from "../Terminal";
export interface LoadExtensionObject {
  terminal: Terminal;
  command?: string;
  manPage: string;
  defaultCommand: string;
}
export interface ExtensionObject {
  terminal: Terminal;
  command?: string;
}
export abstract class BaseExtension extends Terminal {
  constructor(extensionObject: LoadExtensionObject) {
    super();

    extensionObject.terminal.addExtension(
      this.extension,
      extensionObject.command || extensionObject.defaultCommand,
      extensionObject.manPage
    );
  }

  extension(args) {}
}

