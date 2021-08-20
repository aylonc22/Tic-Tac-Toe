import {useState,useEffect} from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './App.css';

function App() {
  const [board,setBoard] =useState([
    ["","",""],
    ["","",""],
    ["","",""]
  ]); 
  const [turn,setTurn] = useState("X")
  const [winner,setWinner] = useState(null);
  const row = (row,i)=>row.map((e,index)=><div key={index} className ="cell" onClick={()=>handleClick(i,index)}>{e}</div>)
  const handleClick = (i,index)=>{
   if( board[i][index]==="")
   {
    let newBoard = [...board];    
    newBoard[i][index] = turn;
    setBoard(newBoard);
    turn==="X"?setTurn("O"):setTurn("X");
   }
  }
  const { width, height } = useWindowSize()
  useEffect(()=>{
    if((board[0][0]==="X" && board[0][1]==="X" && board[0][2]==="X")
    ||(board[1][0]==="X" && board[1][1]==="X" && board[1][2]==="X")
    ||(board[2][0]==="X" && board[2][1]==="X" && board[2][2]==="X")
    ||(board[0][0]==="X" && board[1][0]==="X" && board[2][0]==="X")
    ||(board[0][1]==="X" && board[1][1]==="X" && board[2][1]==="X")
    ||(board[0][2]==="X" && board[1][2]==="X" && board[2][2]==="X")
    ||(board[0][0]==="X" && board[1][1]==="X" && board[2][2]==="X")
    ||(board[0][2]==="X" && board[1][1]==="X" && board[2][0]==="X"))
    setWinner("X");
    else if((board[0][0]==="O" && board[0][1]==="O" && board[0][2]==="O")
    ||(board[1][0]==="O" && board[1][1]==="O" && board[1][2]==="O")
    ||(board[2][0]==="O" && board[2][1]==="O" && board[2][2]==="O")
    ||(board[0][0]==="O" && board[1][0]==="O" && board[2][0]==="O")
    ||(board[0][1]==="O" && board[1][1]==="O" && board[2][1]==="O")
    ||(board[0][2]==="O" && board[1][2]==="O" && board[2][2]==="O")
    ||(board[0][0]==="O" && board[1][1]==="O" && board[2][2]==="O")
    ||(board[0][2]==="O" && board[1][1]==="O" && board[2][0]==="O"))
    setWinner("O");
  },[board])

  return (
    <div className="App">
     {winner!==null?<Confetti width={width} height={height}/>:null}
     <div className ="name">Tic Tac Toe </div>
     {winner===null?<div
      className = "board">
     <div className = "row"> {row(board[0],0)} </div>
     <div className = "row"> {row(board[1],1)} </div>
     <div className = "row"> {row(board[2],2)} </div>
     </div>:<div  className = "board win"> {winner} Won the game <div className ="startAgain" onClick={()=>{setWinner(null);setBoard([["","",""],["","",""],["","",""]]);}}>Start Again</div></div>}
    </div>
  );
}

export default App;
