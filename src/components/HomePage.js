
function HomePage (props){
let onPlay=()=>{
    props.display({
        home:false,
        quiz:true,
      })
}
let onLeaderboard = () =>{
    props.display({
        home:false,
        leaderboard:true,
      })
}

let onSetting =()=> {
    props.display({
        home:false,
        setting:true
    })
}

    return(
        <div className="homepage">
            <h1>Are You Ready?</h1>
            <button type="button" className="button play" onClick={onPlay}>Play <i className="fas fa-gamepad"></i></button>
            <button type="button" className="button high-scores" onClick={onLeaderboard}>High Scores <i className="fas fa-crown"></i></button>
            <button type="button" className="button setting" onClick={onSetting}>Setting <i className="fas fa-cog"></i></button>
        </div>
    )
}

export default HomePage