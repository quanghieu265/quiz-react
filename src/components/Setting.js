

function Setting(props){
    let onGoHome = () => {
        props.display({
            home: true,
            setting: false,
        })
    }

    let onCheckMode=()=>{
        props.darkmode[0]()
    }

    let onCheckTheme=()=>{
        props.theme[0]()
    }
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Setting</th>
                        <th>On/Off</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dark Mode</td>
                        <td>
                            <input type="checkbox" checked={props.darkmode[1]} onChange={onCheckMode}></input>
                        </td>
                    </tr>
                    <tr>
                    <td>Music</td>
                        <td>
                            <input type="checkbox" checked={props.theme[1]} onChange={onCheckTheme}></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="button play" onClick={onGoHome}>Go Home <i className="fas fa-home"></i></button>
        </div>
    )
}

export default Setting