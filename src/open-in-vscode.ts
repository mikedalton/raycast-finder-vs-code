import { showToast, Toast } from "@raycast/api";
import { execFile, exec } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const execAsync = promisify(exec);

const APPLESCRIPT = `
  tell application "Finder"
    if (count of windows) is 0 then error "No Finder windows are open"
    set frontWindow to front window
    set folderPath to POSIX path of (target of frontWindow as alias)
    return folderPath
  end tell
`;

export default async function main() {
  let folderPath: string;

  try {
    const { stdout } = await execFileAsync("osascript", ["-e", APPLESCRIPT]);
    folderPath = stdout.trim();
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not get Finder path",
      message: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  try {
    await execAsync(`code "${folderPath}"`);
    await showToast({
      style: Toast.Style.Success,
      title: "Opened in VS Code",
      message: folderPath,
    });
  } catch {
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not open VS Code",
      message: `Ensure the "code" CLI is installed (VS Code → Shell Command: Install 'code' command in PATH)`,
    });
  }
}
