
import Phaser from "phaser";
import "./style.css";

const W = 800;
const H = 600;
const MATCH_SECONDS = 120;

class SoccerScene extends Phaser.Scene {
  constructor() {
    super("SoccerScene");
  }

  create() {
    this.score = [0, 0];
    this.timeLeft = MATCH_SECONDS;
    this.matchOver = false;
    this.lastKick = 0;

    // Field
    this.add.rectangle(W / 2, H / 2, W, H, 0x176b3a);
    this.add.rectangle(W / 2, H / 2, W - 24, H - 24)
      .setStrokeStyle(3, 0xffffff);
    this.add.line(W / 2, H / 2, W / 2, 12, W / 2, H - 12, 0xffffff);
    this.add.circle(W / 2, H / 2, 65, 0x176b3a)
      .setStrokeStyle(3, 0xffffff);

    // Goals at left and right ends
    this.add.rectangle(12, H / 2, 24, 160, 0xffffff, 0.25);
    this.add.rectangle(W - 12, H / 2, 24, 160, 0xffffff, 0.25);

    // HUD
    this.add.rectangle(W / 2, 30, 330, 46, 0x102c1d, 0.95)
      .setStrokeStyle(1, 0x8ce0a5);

    this.scoreText = this.add.text(W / 2, 16, "BLUE  0  -  0  RED", {
      fontFamily: "Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#ffffff"
    }).setOrigin(0.5, 0);

    this.timerText = this.add.text(W / 2, 65, "02:00", {
      fontFamily: "Arial",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#ffe28a"
    }).setOrigin(0.5);

    // Players and ball
    this.blue = this.add.circle(260, 300, 19, 0x36a2ff)
      .setStrokeStyle(3, 0xffffff);
    this.red = this.add.circle(540, 300, 19, 0xff5050)
      .setStrokeStyle(3, 0xffffff);
    this.ball = this.add.circle(400, 300, 11, 0xffffff)
      .setStrokeStyle(2, 0x202020);

    this.ballVelocity = new Phaser.Math.Vector2(0, 0);

    // AI goalkeeper guards the right goal
    this.keeper = this.add.rectangle(W - 42, 300, 15, 64, 0xffd54a)
      .setStrokeStyle(2, 0xffffff);

    this.add.text(W / 2, H - 45,
      "BLUE: WASD + SPACE     RED: ARROWS + ENTER", {
        fontFamily: "Arial",
        fontSize: "15px",
        color: "#ffffff",
        backgroundColor: "#103d25",
        padding: { x: 10, y: 8 }
      }).setOrigin(0.5);

    this.message = this.add.text(W / 2, H / 2 - 115, "", {
      fontFamily: "Arial",
      fontSize: "34px",
      fontStyle: "bold",
      color: "#ffffff",
      stroke: "#103d25",
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(5);

    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      blueKick: Phaser.Input.Keyboard.KeyCodes.SPACE,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      redKick: Phaser.Input.Keyboard.KeyCodes.ENTER,
      restart: Phaser.Input.Keyboard.KeyCodes.R
    });

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.matchOver) return;
        this.timeLeft--;
        this.updateHUD();
        if (this.timeLeft <= 0) this.finishMatch();
      }
    });

    this.add.text(18, 15, "AI MINI SOCCER", {
      fontFamily: "Arial",
      fontSize: "16px",
      fontStyle: "bold",
      color: "#d9ffe5"
    });
  }

  movePlayer(player, dx, dy, speed, delta) {
    const length = Math.hypot(dx, dy);
    if (length > 0) {
      player.x += (dx / length) * speed * delta / 1000;
      player.y += (dy / length) * speed * delta / 1000;
    }
    player.x = Phaser.Math.Clamp(player.x, 42, W - 42);
    player.y = Phaser.Math.Clamp(player.y, 55, H - 55);
  }

  kick(player, directionX, directionY) {
    const distance = Phaser.Math.Distance.Between(
      player.x, player.y, this.ball.x, this.ball.y
    );
    if (distance < 48) {
      const length = Math.hypot(directionX, directionY) || 1;
      this.ballVelocity.set(
        directionX / length * 440,
        directionY / length * 440
      );
    }
  }

  update(_time, delta) {
    if (this.matchOver) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
        this.scene.restart();
      }
      return;
    }

    const blueDX = Number(this.keys.d.isDown) - Number(this.keys.a.isDown);
    const blueDY = Number(this.keys.s.isDown) - Number(this.keys.w.isDown);
    const redDX = Number(this.keys.right.isDown) - Number(this.keys.left.isDown);
    const redDY = Number(this.keys.down.isDown) - Number(this.keys.up.isDown);

    this.movePlayer(this.blue, blueDX, blueDY, 240, delta);
    this.movePlayer(this.red, redDX, redDY, 240, delta);

    if (Phaser.Input.Keyboard.JustDown(this.keys.blueKick)) {
      this.kick(this.blue, 1, (this.ball.y - this.blue.y) / 45);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys.redKick)) {
      this.kick(this.red, -1, (this.ball.y - this.red.y) / 45);
    }

    // Predict the ball's vertical position for the AI goalkeeper
    const prediction = Phaser.Math.Clamp(
      this.ball.y + this.ballVelocity.y * 0.22,
      225, 375
    );
    this.keeper.y = Phaser.Math.Linear(
      this.keeper.y, prediction, Math.min(1, delta / 180)
    );

    // Move the ball and apply friction
    this.ball.x += this.ballVelocity.x * delta / 1000;
    this.ball.y += this.ballVelocity.y * delta / 1000;
    this.ballVelocity.scale(Math.pow(0.985, delta / 16.67));

    // Bounce off top and bottom
    if (this.ball.y < 25 || this.ball.y > H - 25) {
      this.ball.y = Phaser.Math.Clamp(this.ball.y, 25, H - 25);
      this.ballVelocity.y *= -0.8;
    }

    // Player-ball contact
    for (const player of [this.blue, this.red]) {
      const dx = this.ball.x - player.x;
      const dy = this.ball.y - player.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 30 && dist > 0) {
        this.ball.x = player.x + dx / dist * 30;
        this.ball.y = player.y + dy / dist * 30;
        this.ballVelocity.x += dx / dist * 55;
        this.ballVelocity.y += dy / dist * 55;
      }
    }

    // AI goalkeeper blocks the ball
    if (
      this.ball.x > W - 65 &&
      Math.abs(this.ball.y - this.keeper.y) < 43 &&
      this.ballVelocity.x > 0
    ) {
      this.ball.x = W - 68;
      this.ballVelocity.x *= -0.85;
      this.ballVelocity.y += (this.ball.y - this.keeper.y) * 2;
    }

    // Goals
    if (this.ball.x < 22 || this.ball.x > W - 22) {
      if (Math.abs(this.ball.y - H / 2) < 80) {
        const scorer = this.ball.x < W / 2 ? 1 : 0;
        this.score[scorer]++;
        this.message.setText(scorer === 0 ? "BLUE SCORES!" : "RED SCORES!");
        this.updateHUD();
        this.ballVelocity.set(0, 0);
        this.time.delayedCall(900, () => {
          if (!this.matchOver) {
            this.ball.setPosition(W / 2, H / 2);
            this.blue.setPosition(260, 300);
            this.red.setPosition(540, 300);
            this.keeper.y = 300;
            this.message.setText("");
          }
        });
      } else {
        this.ball.x = Phaser.Math.Clamp(this.ball.x, 25, W - 25);
        this.ballVelocity.x *= -0.7;
      }
    }

    // Keep objects inside the pitch
    this.blue.x = Phaser.Math.Clamp(this.blue.x, 35, W - 35);
    this.red.x = Phaser.Math.Clamp(this.red.x, 35, W - 35);
  }

  updateHUD() {
    this.scoreText.setText(`BLUE  ${this.score[0]}  -  ${this.score[1]}  RED`);
    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    this.timerText.setText(
      `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    );
  }

  finishMatch() {
    this.matchOver = true;
    let result = "DRAW!";
    if (this.score[0] > this.score[1]) result = "BLUE WINS!";
    if (this.score[1] > this.score[0]) result = "RED WINS!";
    this.message.setText(`${result}\nPress R to restart`);
    this.message.setFontSize(32);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: W,
  height: H,
  parent: "game",
  backgroundColor: "#176b3a",
  scene: SoccerScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
});
