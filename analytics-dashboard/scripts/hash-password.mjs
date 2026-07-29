import { randomBytes, scryptSync } from "node:crypto";
import { emitKeypressEvents } from "node:readline";

if (!process.stdin.isTTY) {
  console.error("Run this command in an interactive terminal.");
  process.exit(1);
}

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdout.write("Choose the analytics password: ");

let password = "";

process.stdin.on("keypress", (character, key) => {
  if (key?.ctrl && key.name === "c") {
    process.stdout.write("\n");
    process.exit(130);
  }

  if (key?.name === "return") {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdout.write("\n");

    if (password.length < 12) {
      console.error("Use at least 12 characters.");
      process.exit(1);
    }

    const salt = randomBytes(16);
    const hash = scryptSync(password, salt, 64);
    console.log(`scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`);
    return;
  }

  if (key?.name === "backspace") {
    if (password.length > 0) {
      password = password.slice(0, -1);
      process.stdout.write("\b \b");
    }
    return;
  }

  if (character && !key?.ctrl && !key?.meta) {
    password += character;
    process.stdout.write("•");
  }
});
