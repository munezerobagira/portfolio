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
  }
  initateTerminal() {
    this.initateMinimize();
    this.initiateMaximize();
    this.initiateClose();
    this.acceptInput();
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
      this.terminal.value = this.getTerminalContext();
    }.bind(this);
    this.terminalInput.clearInput();
    this.terminalInput.focus();
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
    let value = this.terminalInput.value;
    value.replace(this.getTerminalContext(), "");
    this.userInput = value;
  }
  inputHandler(event) {
    // console.log(event.key);
    switch (event.key) {
      case "Enter":
        this.setUserInput();
        event.preventDefault();
        this.commandsHistory.history.push(this.userInput);
        this.intrepreter();
        event.target.value = this.getTerminalContext();
        break;
      case "Backspace":
        if (event.target.value == this.getTerminalContext())
          event.preventDefault();
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.commandsHistory.active >= 0)
          this.terminalInput.value =
            this.commandsHistory.history[this.commandsHistory.active];
        else
          this.commandsHistory.active = this.commandsHistory.history.length - 1;
        this.commandsHistory.active -= 1;

      default:
    }
    return;
  }

  intrepreter() {
    if (this.userInput == this.getTerminalContext())
      this.outputDisplay.innerHTML += this.userInput + "<br>";
  }
}

const terminal = new Terminal("terminal");
