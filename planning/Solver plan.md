# Sudoku solver

I'll need seperate solvers for sudoku's, depending on what information I need.
- Brute force solver (has no solution / has 1 solution / has N solutions)
- Logical solver (apply existing techniques to find the next deduction step by step)
- Trial and error solver (when variations enter the mix, there is no way to create a function for each possible technique, so this should search for deductions using the least amount of steps)

To do this in a way that is hopefully somewhat extendable to sudoku variations, I'll need a consistent starting point:
- The sudoku grid is given in a `(number | "")[][]` array. 
- Standard sudoku rules are assumed (irregular regions will need some attention)
- Extra rules are given in an array of functions that each have a "ruletype" attribute.

