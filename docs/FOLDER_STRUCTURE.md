# AI Mini Soccer -- Project Folder Structure

## 1. Final Structure

``` text
AI-Mini-Soccer/
│
├── client/
│   ├── src/
│   │   ├── main.js
│   │   ├── game.js
│   │   ├── player.js
│   │   ├── ball.js
│   │   ├── goalkeeperAI.js
│   │   ├── multiplayer.js
│   │   └── ui.js
│   │
│   ├── assets/
│   │   ├── players/
│   │   ├── field/
│   │   ├── ball/
│   │   ├── sounds/
│   │   └── ui/
│   │
│   ├── index.html
│   └── style.css
│
├── server/
│   └── server.js
│
├── docs/
│   ├── PROJECT_PROPOSAL.md
│   ├── GAME_SPECIFICATION.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── AI_LOGIC.md
│   ├── MULTIPLAYER.md
│   ├── UI_UX_DESIGN.md
│   ├── FOLDER_STRUCTURE.md
│   ├── DEVELOPMENT_ROADMAP.md
│   ├── TESTING_PLAN.md
│   └── FUTURE_SCOPE.md
│
├── README.md
├── package.json
├── .gitignore
└── LICENSE
```

## 2. File Responsibilities

### `main.js`

Starts and configures Phaser.

### `game.js`

Controls the main game scene and overall game flow.

### `player.js`

Handles player creation, movement, and kicking.

### `ball.js`

Handles ball movement, simple physics, collision, and goal detection.

### `goalkeeperAI.js`

Contains the goalkeeper prediction and decision-making logic.

### `multiplayer.js`

Handles Socket.IO client communication.

### `ui.js`

Handles menus, scoreboard, timer, pause screen, result screen, waiting
screen, and touch controls.

### `server.js`

Runs the Node.js server and manages multiplayer connections, rooms, and
game-state communication.

## 3. Assets

Assets are separated by purpose: - `players/` -- player graphics -
`field/` -- field graphics - `ball/` -- ball graphics - `sounds/` --
sound effects - `ui/` -- interface graphics

## 4. Documentation

The `docs/` folder contains the main technical and project documents.

## 5. Organization Principle

Each file should have one primary responsibility. For example, AI logic
should remain in `goalkeeperAI.js` instead of being mixed into player or
game files.
