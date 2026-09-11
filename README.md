# Miyoko

**Archived Discord bot project demonstrating modular command handling, event-driven architecture, database-backed configuration, moderation, music playback, XP progression, and member verification.**

> **Archive notice:** Miyoko was originally developed in 2021 and is preserved as a portfolio snapshot of an earlier project. The repository is not actively maintained, and its Discord.js-era dependencies and external APIs may require modernization before the bot can run today.

## Project Overview

Miyoko was built as a multipurpose Discord bot designed to combine common server-management and community features into a single application. As the project grew, the codebase was separated into reusable command categories, event handlers, player events, and database models instead of keeping all behavior in one file.

For my portfolio, this project represents early experience building a larger event-driven application, integrating third-party libraries, persisting server-specific data, and organizing a growing JavaScript codebase.

## What the Project Demonstrates

- **Modular command architecture** with dynamically loaded command categories, aliases, permission checks, and cooldowns.
- **Event-driven design** for Discord events such as messages, member joins, member leaves, and client readiness.
- **Moderation tooling** including role, mute, kick, ban, message-clear, and channel-management workflows.
- **Music playback** with queue management, playback controls, search, looping, seeking, filters, and player event handling.
- **XP and ranking systems** backed by persistent data, including generated rank cards and leaderboard functionality.
- **Server-specific configuration** such as custom command prefixes stored through MongoDB-backed models.
- **Member verification** using generated verification codes, DM-based challenges, temporary role gating, and retry handling.
- **Third-party integrations** for music, generated graphics, conversational responses, and persistent storage.

## Architecture

```text
Miyoko-Simplified/
├── commands/
│   ├── Info/          # Help, rank, leaderboard, prefix, uptime, etc.
│   ├── Moderation/    # Server moderation and permission-based commands
│   └── Music/         # Playback and queue-management commands
├── events/            # Discord client event handlers
├── handler/           # Command, event, and client-loading infrastructure
├── models/            # MongoDB/Mongoose data models
├── player/            # Music-player event handlers
├── index.js           # Application entry point
├── mongo.js           # Database connection helper
└── config.json        # Non-secret bot configuration
```

The command loader scans command categories at runtime and registers commands and aliases into Discord.js collections. Event modules are loaded separately and attached to the client based on their filenames, allowing new commands and events to be added without expanding the main application file.

## Core Systems

### Command & Permission Handling

Commands are organized by category and loaded dynamically. Each command can define its own aliases, cooldown, required member permissions, and required bot permissions. This keeps authorization behavior close to the command that needs it while the shared message handler performs the checks consistently.

### Persistent Guild Configuration

Miyoko uses MongoDB-backed models for server-specific state such as custom command prefixes. The XP/ranking system also persists user progression by Discord server rather than treating all users as part of one global leaderboard.

### Music System

The bot integrates a dedicated player layer for voice-channel music playback. Music commands cover queue operations and common playback controls, while separate player event modules handle events such as track additions, empty voice channels, search results, and disconnects.

### Moderation & Member Onboarding

Moderation commands apply Discord permission checks before executing administrative actions. The onboarding flow assigns a temporary role, sends a verification challenge through DM, allows retry attempts, and removes the temporary restriction after successful verification.

### Community Features

The project includes XP progression, rank-card generation, leaderboards, customizable prefixes, informational commands, welcome behavior, and a basic conversational-response integration.

## Technology Used

**JavaScript / Node.js** · **Discord.js** · **MongoDB / Mongoose** · **discord-player** · **discord-xp** · **Canvacord / Canvas** · **FFmpeg** · **dotenv**

## Archive / Modernization Notes

This repository intentionally represents the original generation of the project rather than a modern rewrite. If I were rebuilding Miyoko today, I would migrate the bot to the current Discord.js interaction model, replace hard-coded server-specific IDs with configuration, centralize validation and error handling, add automated tests and linting, improve structured logging, and modernize dependency and secret-management practices.

The project is therefore best viewed as an **engineering archive and portfolio artifact**, not a production-ready Discord bot or currently hosted service.

## Acknowledgements

The original README credited [eritislami/evobot](https://github.com/eritislami/evobot) for the music system. That historical credit is retained here.

## Development Context

Miyoko was one of my earliest larger software projects, originally built when I was 16 and learning how to structure applications beyond small scripts. Parts of the initial command-handling structure were adapted from community templates and learning resources, which I then extended with Miyoko's moderation, verification, music, XP, configuration, and event-driven features.

The repository is intentionally preserved close to its original form. Its rough edges, architectural decisions, and commit history reflect how I approached software development at that stage and provide useful context alongside my more recent work.
