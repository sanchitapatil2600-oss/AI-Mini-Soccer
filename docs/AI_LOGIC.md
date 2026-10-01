# AI Mini Soccer -- AI Logic and Implementation

## 1. AI Objective

The AI component controls the goalkeeper and attempts to make saves by
predicting the future position of the ball.

## 2. AI Inputs

The goalkeeper AI uses: - Ball X position - Ball Y position - Ball X
velocity - Ball Y velocity - Goalkeeper X position - Goalkeeper movement
limits

## 3. Prediction

The basic prediction formula is:

`Predicted Position = Current Position + Velocity × Prediction Time`

For the horizontal direction:

`Predicted X = Ball X + Ball Velocity X × Prediction Time`

## 4. Decision Logic

The goalkeeper compares the predicted ball position with its own
position.

``` text
If predicted X is significantly left:
    Move left

If predicted X is significantly right:
    Move right

If predicted X is close:
    Stay
```

## 5. Movement

The goalkeeper moves gradually rather than instantly teleporting.

Its movement speed is limited, and its position is restricted to the
goal area.

## 6. Reaction Area

The goalkeeper should react more strongly when the ball is approaching
the goal.

This prevents unnecessary movement when the ball is far away.

## 7. Example

Suppose: - Ball X = 500 - Ball velocity X = -50 - Prediction time = 0.5
seconds

Then:

`Predicted X = 500 + (-50 × 0.5)`

`Predicted X = 475`

If the goalkeeper is at X = 520, it should move left.

## 8. Suggested Functions

The `goalkeeperAI.js` file can contain: - `calculatePrediction()` -
`decideMovement()` - `updateGoalkeeper()`

## 9. Difficulty Levels

Optional levels: - Easy: lower speed and shorter prediction time -
Medium: normal speed and prediction - Hard: higher speed and faster
reaction

## 10. Why Simple AI?

A rule-based prediction system is suitable because it: - Is easy to
implement - Runs efficiently on mobile devices - Does not require a
large dataset - Does not require a heavy machine-learning framework - Is
easy to debug - Is easy to explain during a viva

## 11. AI Testing

Test the goalkeeper when: - Ball moves left - Ball moves right - Ball
moves toward the center - Ball moves away from the goal - Ball is
stationary - Ball approaches from different angles - Goalkeeper reaches
its movement boundary

## 12. Success Criteria

The AI should: - Automatically move the goalkeeper - Use ball movement
for prediction - Stay within its goal area - Make some successful
saves - Avoid excessive random movement - Move smoothly

## 13. Future AI Improvements

Future versions may include: - Bounce prediction - More advanced
trajectory prediction - Adaptive difficulty - AI opponent - Machine
learning - Reinforcement learning - Different goalkeeper strategies
