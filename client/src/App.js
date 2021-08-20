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
  const [whoIsX,setWhoIsX] = useState("");
  const [player1,setPlayer1] = useState(0);
  const [player2,setPlayer2] = useState(0);
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

    let flag = false;
    for(let i=0;i<board.length;i++)
      for(let j=0;j<board[i].length;j++)
        if(board[i][j]==="")
          flag = true;
    if(!flag)
    {
      console.log("HERE");
      setTurn("X");
      setWinner(null);
      setBoard([["","",""],["","",""],["","",""]]);
      setWhoIsX("");
    }
  },[board])

  useEffect(()=>{
    if(winner!==null)
    {
      let count1 = player1;
      let count2 = player2;
      if(winner==="X")
        {
          if(whoIsX==="player1")  
            {
              count1 += 1;
              setPlayer1(count1);
            }
          else
           { 
            count2 += 1;
            setPlayer2(count2)
           }
        }
      else if(winner==="O")
        {
           if(whoIsX==="player1")  
           {
            count1 += 1;
            setPlayer1(count1);
          }
          else
            { 
              count2 += 1;
              setPlayer2(count2)
             }
        }
    }
    // eslint-disable-next-line
  },[winner])

  useEffect(()=>{
    if(whoIsX==="")
      {
        Math.floor(Math.random() * 2) + 1===1?setWhoIsX("player1"):setWhoIsX("player2");
      }

  },[whoIsX])

  return (
    <div className="App">
    <div className ="name">Tic Tac Toe </div>
    <div className ="line">
     <div className = "whoIsX">{`${whoIsX} is X`}</div>
     <div className ="again" onClick={()=>{setWhoIsX("");setPlayer2(0);setPlayer1(0);setTurn("X");setWinner(null);setBoard([["","",""],["","",""],["","",""]]);}}>Restart</div>
     </div>
     {winner!==null?<Confetti width={width} height={height}/>:null}     
     <div className="game">
     <div className ="player">{`player 1 won ${player1} times`}</div>
     {winner===null?
     <div className = "board">
     <div className = "row"> {row(board[0],0)} </div>
     <div className = "row"> {row(board[1],1)} </div>
     <div className = "row"> {row(board[2],2)} </div>
     </div>:<div  className = "board win"> {winner} Won the game <div className ="startAgain" onClick={()=>{setWhoIsX("");setTurn("X");setWinner(null);setBoard([["","",""],["","",""],["","",""]]);}}>Start Again</div></div>}
     <div className ="player">{`player 2 won ${player2} times`}</div>
     </div>
    </div>
  );
}

export default App;
