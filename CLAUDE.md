# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Raycast extension for macOS that captures the path of the currently open Finder window and opens it in a new VS Code window. Requires VS Code with shell extensions configured so the `code` command is available in the terminal.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Run extension in development mode (hot reload in Raycast)
npm run build    # Production build
npm run lint     # Lint
npm run fix-lint # Auto-fix lint issues
```

## Architecture

Single `no-view` command (`src/open-in-vscode.ts`) — no UI is rendered. It:
1. Runs an AppleScript via `osascript` to get `POSIX path` of the front Finder window
2. Shells out `code "<path>"` to open VS Code
3. Shows a `Toast` (success or failure)

## Key Assumption

Requires the `code` CLI on PATH. Install via VS Code: Cmd+Shift+P → "Shell Command: Install 'code' command in PATH".
