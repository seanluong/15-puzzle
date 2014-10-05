15 Puzzle
=========

## Introduction
15 Puzzle is a [sliding puzzle](http://en.wikipedia.org/wiki/Sliding_puzzle) in which players try to rearrange a 2D-board in order to reach a predefined target state of the board.

This game consists of a 4x4 board with 15 tiles, numbered from 1 to 15. There is one empty cell that allows players to change the state of the board by swapping the empty cell with 1 of its adjacent cells. The image below shows the target state of the puzzle:

![target-state](https://github.com/xuanluong/15-puzzle/blob/master/images/target-state.png)
### How to play?

+ **PC**: 
  + Press  ![wasd](https://github.com/xuanluong/15-puzzle/blob/master/images/wasd.png) to move **the empty cell**.
  + Press  ![keys](https://github.com/xuanluong/15-puzzle/blob/master/images/keys.png)  to move in **the tiles**.
+ **Mobile**: swipe on the board to move the empty cell.

The empty cell is moved in the reverse direction of the key pressed/swipe.

### Screenshot

![screeshot](https://raw.githubusercontent.com/xuanluong/15-puzzle/master/screenshot.png)

## Development

The implementation makes use of the following libraries:
+ [AngularJS](https://angularjs.org/)
+ [angular-gestures](https://github.com/wzr1337/angular-gestures)
+ [UI Bootstrap](http://angular-ui.github.io/bootstrap/) for `AngularJS`
+ [jQuery](http://jquery.com/)

Besides, [Grunt](http://gruntjs.com/) and some of its modules (`jshint`, `cssmin`, `concat`, `qunit`) are used to help automating the development process. To use `Grunt`, we need [NodeJS](http://nodejs.org/). [Bower](http://bower.io/) is used for managing dependencies on front-end librraries (`AngularJS`, `jQuery`, `angular-gestures`).

## Contribution

Any contribution is welcome. You can raise issues, report bugs, or even fork-code-push and send a pull-request. 
