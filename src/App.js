
import './App.css';
import HomePage from './components/HomePage'
import Quiz from './components/Quiz';
import EndGame from './components/EndGame'
import LeaderBoard from './components/LeaderBoard'
import {useState} from 'react'

function App() {
  const [displayPage,setDisplayPage] = useState({
    home:true,
    quiz:false,
    endgame:false,
    leaderboard:false,
  })
  const [result,setResult] = useState("")
  let onDisplay= (value) => {
    setDisplayPage(value)
  }

  let onResult= (value) => {
    setResult(value)

  }

  return (
   <div className="container">
    {displayPage.home === true ? <HomePage display={onDisplay}/> : ""}
    {displayPage.quiz === true ? <Quiz display={onDisplay} result={onResult}/> : ""}
    {displayPage.endgame === true ? <EndGame display={onDisplay} score={result}/> : ""}
    {displayPage.leaderboard === true ? <LeaderBoard display={onDisplay} /> : ""}
   </div>
  );
}

export default App;
