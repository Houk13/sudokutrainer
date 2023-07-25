# Sudoku generation

different types of puzzles I want to feature:
- Quick scanning: Last digit(s) in row/col/box / naked single/
- Spot the naked single: In a complete sudoku-grid, click the naked single cell.
- Place the digit: The highlighted cell can be determined with the current information.
- Remove a candidate: One of the candidates of the highlighted cell can be removed using current information.
- Next step: A half-finished sudoku puzzle is presented and any correct deduction will solve the puzzle. 

For **Place the digit** and **Remove a candidate** the highlighted cell should be the easiest deduction currently in the puzzle, where difficulty is determined by the order given in: https://www.sudokuwiki.org/sudoku.htm. 

For **Next step** there should be one strategy that works better than other strategies of similar complexity. Still any correct input should be accepted, as a correct deduction can lead to multiple correct fills or eliminations. Also different people spot different tactics with different difficulty. 
Also, the technique does not have to be an existing sudokuwiki technique, especially if sudoku variations are added to the mix.

---

There are two strategies of obtaining puzzles:
- Generate them om a way that the desired technique is the next logical step.
- Use existing puzzles, solve them and save the moments where a suitable technique is used.

Generating puzzles will become exponentially complex with increasing complexity of the desired technique, but has the advantage that an infinite amount of puzzles can be generated. And if done efficiently, no database is needed to store these puzzles as new ones can always be made.

Using existing puzzles does require storage, though this also allows user feedback for the puzzles like difficulty, clarity, tags, etc.
I'll need a source of sudoku's preferable automated as not every sudoku will have suitable spots where 1 deduction is the clear next step, so I'll need a lot.
I also need a solver that doesn't brute force, but tries to apply specific techniques.
Then from that information I'll need some way to determine what (if any) positions in the solve could be decent puzzles.
(This still seems simpler than writing something that generates sudokus with 3D Medusa'S or Finned Swordfishes)

---

In order to have something to put on the site, generating simpler puzzles seems the way to go. This will work great for **Quick Scanning** and **Spot the naked single**. And for **Place the digit** and **Remove a candidate** the basic strategies (1-6 of sudokuwiki) should be doable. (Maybe even some of 7-12).