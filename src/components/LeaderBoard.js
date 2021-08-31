function LeaderBoard(props){
    let onGoHome = ()=>{
        props.display({
            home:true,
            leaderboard:false,
          })
    }

    let leaderboard =localStorage.getItem("leaderboard") ? JSON.parse(localStorage.getItem("leaderboard")) : "";
    let userScore=""
    if(leaderboard==="") {
        userScore=<p> Nothing to record, play Quiz and save your score  </p>
    }else{
        userScore=leaderboard.map((item,index)=>{
            return(
                <p key={index}> {Object.keys(item)[0]} - {item[Object.keys(item)[0]]} </p>
            )
        })
    }

    return(
        <div className="leader-board">
            <p>Leaderboard</p>
            {userScore}
            <button type="button" className="button play" onClick={onGoHome}>Go Home <i className="fas fa-home"></i></button>

        </div>
    )
}

export default LeaderBoard