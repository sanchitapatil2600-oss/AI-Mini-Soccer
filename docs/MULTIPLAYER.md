# AI Mini Soccer -- Multiplayer Architecture and Implementation

## 1. Objective

The multiplayer system allows two players to participate in the same
soccer match and see synchronized game events.

## 2. Architecture

``` text
Player 1 Device
       |
       v
Node.js + Socket.IO Server
       |
       v
Player 2 Device
```

## 3. Technologies

-   Node.js
-   Socket.IO
-   JavaScript
-   Phaser.js
-   HTML/CSS
-   Capacitor

## 4. Connection Flow

1.  Player opens the game.
2.  Client connects to the server.
3.  Player sends a join request.
4.  Server checks for an available game room.
5.  Server assigns the player.
6.  A second player joins.
7.  Server starts the match.
8.  Players exchange required game information through the server.

## 5. Game Room

The MVP supports a maximum of two players in a match.

## 6. Synchronized Data

The multiplayer system may synchronize: - Player ID - Player position -
Player movement - Player actions - Ball position - Ball velocity -
Score - Timer - Match status - Goal events - Connection state

## 7. Events

Planned Socket.IO events: - `joinGame` - `playerJoined` - `playerMove` -
`playerUpdate` - `kick` - `ballUpdate` - `goal` - `gameState` -
`gameOver` - `playerLeft`

## 8. Server Responsibilities

The server manages: - Connections - Game rooms - Player assignment -
Input validation - State communication - Goal events - Disconnect
handling

## 9. Client Responsibilities

The client manages: - Rendering - User input - Local player movement -
Opponent display - UI - Scoreboard - Timer - Received game events

## 10. Synchronization Strategy

The project will use event-based communication where practical rather
than sending unnecessary data continuously.

Important events such as kicks and goals should be communicated through
the server so both players receive the same event.

## 11. Goal Synchronization

When a goal occurs: 1. Goal event is detected. 2. Server receives or
validates the event. 3. Score is updated. 4. Updated score is broadcast.
5. Ball is reset. 6. Match continues.

## 12. Disconnect Handling

If a player disconnects, the remaining player should receive a
notification. The match may pause or end depending on the
implementation.

## 13. Security

The server should validate important inputs instead of trusting all
client data.

## 14. Fallback Strategy

Development priority: 1. Player vs AI 2. Same-device multiplayer if
practical 3. Two-device online multiplayer

This ensures a working MVP even if networking requires additional
debugging.

## 15. Testing

Test: - One player waiting - Two players connecting - Player movement
synchronization - Kick synchronization - Goal synchronization - Score
synchronization - Disconnect handling - New match after disconnect
