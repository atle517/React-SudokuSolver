/* eslint-disable no-labels */
import React, { Component } from 'react';
import './App.css';
import Cell from './components/Cell';
import Solver from './solver';

class App extends Component {

  constructor(props) {
    super(props)

    //Set our sudoku size
    this.width = 9;
    this.height = 9;

    this.state = {
      board: this.createBoard(this.width, this.height),     //Our sudoku board
      invalidSudoku: false                                  //If the sudoku in the board is valid
    }

  }

  //Creates a 9x9 2D-array (sudoku board) with (0, 0) starting in the top left
  createBoard(w, h) {

    let board = [];

    for (let i = 0; i < w; i++) {
      board[i] = [];

      for (let j = 0; j < h; j++) {
        board[i].push(0);
      }
    }

    return board;
  }

  //Changes the value in the state board
  changeValue = (i, j, num) => {

    //Create a copy of our current board
    let newBoard = this.state.board;
    newBoard[i][j] = num;

    //Update our state with the new board
    this.setState({
      board: newBoard,
      invalidSudoku: false                  //Since the sudoku changed we can set invalid to be false
    }, () => {
      this.setState({ state: this.state }); //Force a re-render after it's done with setting the state
    });
  }

  solve = () => {

    //Create a solvedBoard from the Solver class. It either returns as an 2D-array or bool
    let solvedBoard = new Solver(this.state.board);

    //If it's an array then it should be a valid solution. Set it as the current board
    if (Array.isArray(solvedBoard)) {
      this.setState({
        board: solvedBoard,
      }, () => {
        this.setState({ state: this.state }); //Force re-render
      });
    }else{
      //If it's not a valid array, then it's not a valid sudoku.
      this.setState({
        invalidSudoku: true                   //Set it as an invalid sudoku          
      }, () => {
        this.setState({ state: this.state }); //Force re-render
      });
    }
  }

  render() {
    return (
      <div className="App">

        <h1>Sudoko Solver</h1>

        {/* Show a table that shakes if it's an invalid sudoku. Using date as an key so that it shakes every time it re-renders*/}
        <table className={this.state.invalidSudoku ? "shake" : ""} key={new Date()}> 
          <tbody>
            {
              // Loop through the board and render a Cell for every number
              this.state.board.map((row, i) => (
                <tr key={i * 9}>
                  {row.map((cell, j) => <td key={(i * 9) + j + 1}> <Cell changeValue={this.changeValue} i={i} j={j} value={this.state.board[i][j]} /> </td>)}
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="button-submit" onClick={() => this.solve()}>Solve!</button>

        {/* Render an error message if the sudoku is not valid */}
        {this.state.invalidSudoku ? <h4 key={new Date() + 1} className="text-error">Not a valid sudoku!</h4> : ''}

      </div>
    );
  }
}

export default App;
