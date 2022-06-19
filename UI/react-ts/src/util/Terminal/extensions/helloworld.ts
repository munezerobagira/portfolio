//TODO: use the power of typescipt
export default function helloworldTeminalExtension(command) {
  if (command[1]) return this.write("Hello world");
  return this.write("Hello world");
}
