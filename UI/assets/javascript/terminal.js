class Terminal {
  constructor(elementId) {
    // create terminal
    this.terminal = document.createElement("div");
    this.terminal.classList.add("sostene-terminal", "margin-nav");
    //titlebar
    this.titleBar = document.createElement("div");

    this.action = document.createElement("ul");
    this.maximizeButton = document.createElement("li");
    this.minimizeButton = document.createElement("li");
    this.closeButton = document.createElement("li");
    this.minimizeButton.innerHTML = "-";
    this.maximizeButton.innerHTML = "O";
    this.closeButton.innerHTML = "X";

    this.titleBar.classList.add("titlebar");
    this.action.classList.add("action");
    this.maximizeButton.classList.add("terminal-maximize");
    this.minimizeButton.classList.add("terminal-minimize");
    this.closeButton.classList.add("terminal-close");

    this.action.append(
      this.maximizeButton,
      this.minimizeButton,
      this.closeButton
    );
    this.titleBar.appendChild(this.action);

    this.terminalBody = document.createElement("div");
    this.outputDisplay = document.createElement("div");
    this.outputDisplay.clearDisplay = function () {
      this.outputDisplay.innerHTML = "";
    }.bind(this);
    this.terminalInput = document.createElement("textarea");
    this.terminalBody.append(this.outputDisplay, this.terminalInput);

    this.terminalInput.classList.add("terminal-input");
    this.terminal.append(this.titleBar, this.terminalBody);

    this.terminalLocation = document.getElementById(elementId);
    if (!this.terminalLocation) this.terminalLocation = document.body;

    this.terminalBody.classList.add("terminal-body");
    this.terminalLocation.prepend(this.terminal);
    this.user = { name: "guest", group: "fan", mode: "guest" };
    this.userInput = "";
    // this.storage = window.localStorage;
    this.initateTerminal();
    this.commandsHistory = { active: null, history: [] };
    this.systemEmvironment = [];
  }
  initateTerminal() {
    this.initateMinimize();
    this.initiateMaximize();
    this.initiateClose();
    this.acceptInput();
    this.terminal.draggable = true;
    this.terminal.addEventListener("click", () => {
      this.terminalInput.focus();
    });
  }
  initateMinimize() {
    this.minimizeButton.addEventListener("click", () => {
      this.terminal.classList.remove("maximized");
      this.terminal.classList.remove("closed");
    });
  }
  initiateMaximize() {
    this.maximizeButton.addEventListener("click", () => {
      this.terminal.classList.remove("closed");
      this.terminal.classList.add("maximized");
    });
  }
  initiateClose() {
    this.closeButton.addEventListener("click", () => {
      this.terminal.classList.remove("maximized");
      this.terminal.classList.add("closed");
    });
  }
  acceptInput() {
    this.terminalInput.value = this.getTerminalContext();
    this.terminalInput.clearInput = function () {
      this.terminalInput.value = this.getTerminalContext();
    }.bind(this);
    this.terminalInput.clearInput();
    this.terminalInput.focus();
    this.terminalInput.setSelectionRange(
      this.getTerminalContext().length,
      this.getTerminalContext().length
    );
    this.terminalInput.addEventListener("click", () => {
      if (
        this.terminalInput.selectionStart < this.getTerminalContext().length
      ) {
        this.terminalInput.setSelectionRange(
          this.getTerminalContext().length,
          this.getTerminalContext().length
        );
      }
    });

    this.terminalInput.addEventListener(
      "keydown",
      this.inputHandler.bind(this)
    );
  }
  getTerminalContext() {
    return `${this.user.name}@sostene-protofolio${
      this.user.mode == "guest" ? "$ " : "# "
    }`;
  }
  setUserInput() {
    setTimeout(
      function () {
        let value = this.terminalInput.value;
        // let terminalContext=this.getTerminalContext()
        value = value.replace(this.getTerminalContext(), "");
        this.userInput = value;
      }.bind(this),
      0
    );
  }
  inputHandler(event) {
    console.log(event.key);
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        this.setUserInput();
        if (!this.commandsHistory.history.includes(this.userInput))
          this.commandsHistory.history.push(this.userInput);
        this.commandsHistory.active = this.commandsHistory.history.length;
        this.intrepreter();
        this.terminalInput.clearInput();
        break;
      case "Backspace":
      case "Delete":
        if (
          this.terminalInput.selectionStart <= this.getTerminalContext().length
        )
          event.preventDefault();
        this.setUserInput();
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.commandsHistory.active > 0) this.commandsHistory.active -= 1;
        console.log(this.commandsHistory.active);
        // if (this.commandsHistory.active >= 0)
        //   this.terminalInput.value =
        //     this.commandsHistory.history[this.commandsHistory.active];
        // else
        //   this.commandsHistory.active = this.commandsHistory.history.length - 1;
        // this.commandsHistory.active -= 1;
        break;

      default:
        this.setUserInput();
    }
    return;
  }
  write(message = "", startBreak = true) {
    let output = `${this.terminalInput.value}${
      startBreak ? "</br>" : ""
    } ${message}</br>`;

    this.outputDisplay.innerHTML += output;
  }
  intrepreter() {
    if (!this.userInput) return this.write("", false);
    let excuter;
    let command = this.userInput.trim().split(/\s+/g);
    for (let environment of this.systemEmvironment) {
      if (command[0] == environment.command) {
        excuter = environment.function;
        break;
      }
    }
    if (excuter) return excuter(this.userInput);
    this.write("Unkown command " + command[0]);
  }
}

const terminal = new Terminal("terminal");
const addPulgin = function (pulgin, command, description) {
  pulgin = pulgin.bind(this);
  this.systemEmvironment.push({
    command,
    description,
    function: pulgin,
  });
}.bind(terminal);

let helloWorld = function (command) {
  if (command[1]) return this.write("Hello world");
  return this.write("Hello world");
};
let clear = function (command) {
  return this.outputDisplay.clearDisplay();
};
let help = function () {
  let output = "";
  for (let command of this.systemEmvironment) {
    output += command.command + " - " + command.description + "<br>";
  }
  this.write(output);
};
addPulgin(helloWorld, "helloworld", "a command to display hello world");
addPulgin(clear, "clear", "a command to clear the screen");
addPulgin(help, "help", "a command to display all available command");
