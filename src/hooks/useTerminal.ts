import Terminal from "@/utils/Terminal/Terminal";
import ClearExtension from "@/utils/Terminal/extensions/clear";
import HelloWorldExtesion from "@/utils/Terminal/extensions/helloworld";
import HelpExtension from "@/utils/Terminal/extensions/help";
import ManExtension from "@/utils/Terminal/extensions/man";
interface TerminalOptions {
  container: HTMLElement;
}
const useTerminal = ({ container }: TerminalOptions) => {
  const terminal = new Terminal(container);
  new HelloWorldExtesion({ terminal });
  new HelpExtension({ terminal });
  new ManExtension({ terminal });
  new ClearExtension({ terminal })
  return { terminal }
}
export default useTerminal;
