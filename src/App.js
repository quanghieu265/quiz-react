
import './App.css';
import HomePage from './components/HomePage'
import Quiz from './components/Quiz';
import EndGame from './components/EndGame'
import LeaderBoard from './components/LeaderBoard'
import Setting from './components/Setting'
import PlaySound from './components/PlaySound'
import { useState } from 'react'

function App() {
  const [displayPage, setDisplayPage] = useState({
    home: true,
    quiz: false,
    endgame: false,
    leaderboard: false,
    setting: false,
  })
  const [darkMode,setDarkMode]=useState(true)
  const [result, setResult] = useState("")
  const [themeSong,setThemeSong]=useState(false)
  let onDisplay = (value) => {
    setDisplayPage(value)
  }

  let onResult = (value) => {
    setResult(value)

  }

  let onDarkMode =()=>{
    setDarkMode(!darkMode)
  }

  let onThemeChange = () =>{
    setThemeSong(!themeSong)
  }
  
  let dark_mode= darkMode? { backgroundColor:"#18191A",color:"#e4e6eb"} : { backgroundColor:"#F0F2F5",color:"#050505"}

  return (
    <div className="container" style={dark_mode}>
      <PlaySound theme={themeSong} memo={true}/>
      <div className="content">
        {displayPage.home === true ? <HomePage display={onDisplay} /> : ""}
        {displayPage.quiz === true ? <Quiz display={onDisplay} result={onResult} /> : ""}
        {displayPage.endgame === true ? <EndGame display={onDisplay} score={result} /> : ""}
        {displayPage.leaderboard === true ? <LeaderBoard display={onDisplay} /> : ""}
        {displayPage.setting === true ? <Setting display={onDisplay} darkmode={[onDarkMode,darkMode]} theme={[onThemeChange,themeSong]} /> : ""}
      </div>
    </div>
  );
}

export default App;
