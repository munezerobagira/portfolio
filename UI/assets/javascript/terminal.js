/**
 * We have the terminal here
 * **/
// if (terminalMaximize) {
//   terminalForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     let command = terminalInput.value.trim();
//     if (command.startsWith("color")) {
//       color = command.split(" ")[1];
//       terminal.style.backgroundColor = color;
//     } else {
//       alert("command unknown");
//     }
//     terminalInput.value = "";
//   });
//   terminalMaximize.addEventListener("click", () => {
//     terminal.classList.remove("closed");
//     terminal.classList.add("maximized");
//   });
//   terminalMinimize.addEventListener("click", () => {
//     terminal.classList.remove("maximized");
//     terminal.classList.remove("closed");
//   });
//   terminalClose.addEventListener("click", () => {
//     terminal.classList.remove("maximized");
//     terminal.classList.add("closed");
//   });
//   terminal.addEventListener("click", () => {
//     terminalInput.focus();
//   });
// }

class Terminal {
  constructor() {
    this.terminalMaximizeButton = document.querySelector("#terminal-maximize");
    this.terminalMinimizeButton = document.querySelector("#terminal-minimize");
    this.terminalCloseButton = document.querySelector("#terminal-close");
    this.terminal = document.querySelector("#terminal");
    this.terminalInput = document.querySelector("#terminal-input");
    this.terminalForm = document.querySelector("#terminal-form");
    this.storage = window.localStorage;
    this.initateTerminal();
  }
  initateTerminal() {
    this.initateMinimize();
    this.initiateMaximize();
    this.initiateClose();
    this.initiateFocus();
  }
  initateMinimize() {
    this.terminalMinimizeButton.addEventListener("click", () => {
      this.terminal.classList.remove("maximized");
      this.terminal.classList.remove("closed");
    });
  }
  initiateMaximize() {
    this.terminalMaximizeButton.addEventListener("click", () => {
      this.terminal.classList.remove("closed");
      this.terminal.classList.add("maximized");
    });
  }
  initiateClose() {
    this.terminalCloseButton.addEventListener("click", () => {
      this.terminal.classList.remove("maximized");
      this.terminal.classList.add("closed");
    });
  }
  initiateFocus() {
    this.terminalInput.focus();
    this.terminal.addEventListener("click", () => {
      this.terminalInput.focus();
    });
  }
}
const terminal = new Terminal();

class Pulgin extends Terminal {
  constr;
}
