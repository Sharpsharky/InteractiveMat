# Interactive Mat

This project simulates an interactive mat where each tile can either be pressed (represented by 1) or unpressed (0).

## Task Highlights

- In the second part of the project, a pixel orbits around a specified center point on the mat. When it reaches the mat’s edge, it "bounces" off, reversing its direction.

- To improve readability, chalk is used to highlight 1s in a distinct color, making it easier to distinguish pressed tiles from unpressed ones.

- I've spent about 4.5 hours on the task. I was trying to optimize the calculation of the angle of the next step of an orbiting pixel knowing that by increasing the radius by 1, the amount of pixels in the circumference of the circle increase linearly by 4. It appeared that the angle doesn't change linearly since the computations skipped certain pixels. Finally, I change the angle by 1 degree and check if the pixel is not the same as the previous one. 

## How To Start

- Install chalk:
```sh
npm install chalk
```
- Start both tasks by typing: 
```sh
node ex1.js
```
```sh
node ex2.js
```