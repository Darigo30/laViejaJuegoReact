import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
//Estado para armar el tablero  
const [board, setBoard] = useState(Array(9).fill(null))
//Estado para ver quien le toca el turno del tablero
const [turn, setTurn] = useState(TURNS.X)
//null no hay ganador, false empate
const [winner, setWinner] = useState(null)

//resetear juego
const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

//Funcion para ver quien tiene el turno
const updateBoard = (index) => {

  if(board[index] || winner ) return

  //Actualizar el tablero
  const newBoard = [...board] // el useState es inmutable 
  newBoard[index] = turn
  setBoard(newBoard)

  //Cambiar el turno
  const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)

  //revisar si hay ganador
  const newWinner = checkWinnerFrom(newBoard)
  if(newWinner) {
    confetti()
    setWinner(newWinner) // ojo esto no es sincrono, no bloquea la ejecución de lo que venga
  } else if (checkEndGame(newBoard)) {
    setWinner(false) // empate y termina el juego
  }
}

return (
  <main className='board'>
    <h1>La Vieja 🇻🇪</h1>
    <button onClick={resetGame}>Reset del juego</button>
    {/* Juegos */}
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}> {board[index]} </Square>
            )
          })
        }
      </section>
      {/* Turnos */}
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
)
}

export default App
