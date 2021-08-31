
import React from "react"
import Sound from "react-sound"
import theme from "./../theme/theme.mp3"

function PlaySound(props){
    console.log(props.theme)
    return(
        <div>
            <Sound
            url={theme}
            playStatus={
                props.theme ? Sound.status.PLAYING : Sound.status.STOPPED
            }
            playFromPosition={300}
            volume={50}
            loop={true}
            
            />
        </div>
    )
}

export default React.memo(PlaySound)