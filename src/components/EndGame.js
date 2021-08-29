function EndGame(props) {
    let onGoHome = () => {
        props.display({
            home: true,
            endgame: false,
        })
    }

    let onPlay = () => {
        props.display({
            endgame: false,
            quiz: true,
        })
    }

    let name = ""
    let onInputName = (event) => {
        name = event.target.value;
    }

    let saveData = localStorage.getItem("leaderboard") ? JSON.parse(localStorage.getItem("leaderboard")) : []
    let onSave = (event) => {
        event.preventDefault();

        saveData.push({[name]:props.score})
        localStorage.setItem("leaderboard", JSON.stringify(saveData))
        props.display({
            endgame: false,
            leaderboard: true,
        })
    }

    return (
        <div className="end-game">
            <p>Your Score: {props.score}</p>
            <p>Enter your name below to</p>
            <p> save your score!</p>
            <form className="form-end" onSubmit={onSave}>
            <input className="input" type="text" placeholder="Enter your name" onChange={onInputName} required></input>
            <button type="submit" className="button play">Save <i className="fas fa-save"></i></button>
            </form>
            <button type="button" className="button play" onClick={onPlay}>Play Again <i className="fas fa-gamepad"></i></button>
            <button type="button" className="button play" onClick={onGoHome}>Go Home <i className="fas fa-home"></i></button>
        </div>
    )
}
export default EndGame