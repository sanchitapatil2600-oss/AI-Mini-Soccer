# ⚽ AI Mini Soccer

### A Simple Multiplayer 2D Mobile Soccer Game with an AI-Based Goalkeeper

AI Mini Soccer is a simple 2D soccer game designed for mobile devices. The game combines **multiplayer gameplay** with a lightweight **AI-controlled goalkeeper** that predicts the future position of the ball and moves accordingly.

The project is being developed using **JavaScript and Phaser.js**, with **Node.js and Socket.IO** planned for multiplayer functionality.

---

## 🎮 Project Overview

The goal of the project is to create an easy-to-play soccer game that demonstrates:

* 2D game development
* Artificial Intelligence
* Multiplayer networking
* Mobile-friendly controls
* Web technologies

The game focuses on simple gameplay rather than complex FIFA-style mechanics.

---

## ✨ Main Features

* ⚽ Simple 2D soccer gameplay
* 👤 Player movement
* 🥅 Goalkeeper
* 🤖 AI-based goalkeeper movement
* 💥 Ball kicking and collision
* 🏆 Score system
* ⏱️ Match timer
* 👥 Multiplayer support
* 📱 Mobile-friendly touch controls
* 🌐 Browser-based development and testing
* 📦 Android app support through Capacitor

---

## 🤖 AI Goalkeeper

The goalkeeper uses a simple prediction-based AI system.

The AI observes:

* Ball position
* Ball velocity
* Goalkeeper position

It then estimates where the ball will be in the near future.

### Prediction Formula

```text
Predicted Position =
Current Position + Velocity × Prediction Time
```

For example:

```text
Predicted X = Ball X + Ball Velocity X × Prediction Time
```

The goalkeeper then decides whether to:

* Move Left
* Stay
* Move Right

The AI is intentionally kept simple so that it is:

* Fast
* Easy to understand
* Easy to debug
* Suitable for mobile devices
* Easy to explain during project presentation

---

## 👥 Multiplayer

The project supports multiplayer gameplay using:

* Node.js
* Socket.IO
* JavaScript

The planned architecture is:

```text
Player 1
   ↓
Socket.IO Server
   ↓
Player 2
```

The server will synchronize important game information such as:

* Player positions
* Ball position
* Ball movement
* Kicks
* Goals
* Scores
* Match status

The first working version may use local gameplay or Player vs AI before two-device multiplayer is implemented.

---

## 📱 Mobile Support

The game is designed with mobile devices in mind.

Mobile features include:

* Touch-friendly controls
* Large buttons
* Responsive layout
* Landscape-oriented gameplay
* Mobile-friendly game interface

The final web game can be packaged as an Android application using **Capacitor**.

---

## 🛠️ Technology Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| HTML       | Game page structure       |
| CSS        | UI and responsive design  |
| JavaScript | Game logic                |
| Phaser.js  | 2D game development       |
| Node.js    | Backend/server            |
| Socket.IO  | Multiplayer communication |
| Capacitor  | Android app packaging     |
| Git        | Version control           |
