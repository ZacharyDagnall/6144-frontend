TO-DONE List
* other moves
*** left, down, up
*** save to DB
* smush
* score
*** just tack on score to DOM
*** save to DB
* add a random new tile
*** on a random blank tile (either 3 or 6)
* fail state
*** if no blanks exist && no possible smushes
****** no smushes: no two adjacent twins
** what to do when game over !!
* picking up a game where you left off
* signing in
* new game button
*** create request
*** make new board
*** load new board
** list of *your* scores before you click on a game
** list of leaderboard scores when you are clicked on a game
**delete button for a score
**quit button
** change on backend names of games ("soff" = 6144)

TO-DO list
* what to do when game over, after alert is closed (doesn't quite work right now?) 
** make stuff pretty (Thursday) (CSS)
** take a look at logout button from connect 4 
** sleep gameover alert
** Fix open game scores showing


Doably Stretchy
All "Grid" Games
** 6144                 (6144 and variants start with 0 and build up to a high score)
**** Fib6144 - Zak
** TicTacToe - Zak     (TTT and Connect 4 have to start with a medium number score and deduct points with each move)
** Connect 4 - Zak              (can i find a way to have the user select an emoji to play with as their token? 
                                    Easy on the inside of my js to pass the code for the emoji around, but how to receive the input?)
** Lights Out - Pat     (Lights Out should start with a high number score and deduct points with each move)
Maybe:
** BattleShip
** Memory


*** refactor / put some repeat code into methods !
*** put repeat methods into index.js instead of in the individual games
***** rename similarly named methods

Zak:
* in Connect 4, doesnt register a lose immediately, waits until next click... why?
* 