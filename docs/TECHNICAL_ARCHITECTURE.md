# AI Mini Soccer -- Technical Architecture

## 1. Architecture Overview

The application uses a client-server architecture for multiplayer
functionality.

### High-Level Flow

``` text
Mobile / Browser
       |
       v
Phaser.js Game Client
       |
       +--> Game Logic
       +--> AI Goalkeeper
       +--> Multiplayer Client
       |
       v
Node.js + Socket.IO Server
       |
       v
Other Player
```

## 2. Client

The client is responsible for: - Rendering the game - Handling player
input - Player movement - Ball interaction - Goals and scoring - Timer -
AI logic - User interface - Communication with the multiplayer server

Technologies: - HTML - CSS - JavaScript - Phaser.js

## 3. Main Client Files

-   `main.js` -- Phaser configuration and startup
-   `game.js` -- main game scene and game flow
-   `player.js` -- player movement and kicking
-   `ball.js` -- ball physics and goal detection
-   `goalkeeperAI.js` -- AI prediction and movement
-   `multiplayer.js` -- Socket.IO client communication
-   `ui.js` -- menus, HUD, timer, pause, result and touch controls

## 4. Server

The Node.js server with Socket.IO is responsible for: - Player
connections - Game rooms - Player assignment - Receiving player
actions - Broadcasting game state - Synchronizing important events -
Handling disconnections

## 5. Network Events

Planned events: - `joinGame` - `playerJoined` - `playerMove` -
`playerUpdate` - `kick` - `ballUpdate` - `goal` - `gameState` -
`gameOver` - `playerLeft`

## 6. Data Flow

Player input is processed by the client and relevant actions are sent to
the server. The server validates and broadcasts the required state or
event to the other connected player.

## 7. Database

A database is not required for the MVP.

A future version may use a database for: - User accounts -
Leaderboards - Match history - Player statistics

## 8. Mobile Packaging

Capacitor will be used to package the web-based game as an Android
application.

Android Studio may be required later for building and testing the final
APK.

## 9. Security

-   Validate client inputs on the server.
-   Do not store passwords or secrets in source code.
-   Do not commit `.env` files containing secrets.
-   Keep private tokens and certificates out of GitHub.

## 10. Development Principle

The project follows:

**Build → Test → Fix → Commit → Continue**

The local Player vs AI version remains the fallback MVP if online
multiplayer becomes difficult.
