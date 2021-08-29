
import { useState, useEffect } from "react"


let QUIZ_CASE = [
    {
        id: 1,
        question: "Nhà Thanh có ao bèo 1.000m2, ngày hôm sau số lượng bèo sẽ nở gấp đôi ngày hôm trước, đến ngày thứ 18 thì bèo đã nở được nửa ao. Vậy đến ngày thứ bao nhiêu thì bèo sẽ nở đầy ao?",
        choices: ["Ngày thứ 1", "Ngày thứ 19", "Ngày thứ 36", "Ngày thứ 42"],
        answer: "Ngày thứ 19"
    },
    {
        id: 2,
        question: "Minh 4 tuổi, tuổi anh Minh gấp 3 lần tuổi Minh. Khi anh Minh bao nhiêu tuổi thì tuổi anh Minh chỉ còn gấp đôi tuổi Minh? ",
        choices: ["20", "18", "14", "16"],
        answer: "18"
    },
    {
        id: 3,
        question: "Tiền thuê 1 chỗ đậu xe trong gara là 10 đôla/tuần hoặc 30 đôla/tháng. Một người có thể tiết kiệm được bao nhiêu tiền trong 1 năm nếu thuê theo tháng?",
        choices: ["140", "160", "240", "260"],
        answer: "160"
    }
]

let quiz_counter = 1;
let score = 0;
let current_quest = 0
function Quiz(props) {
    const [quizCase, setQuizCase] = useState(QUIZ_CASE[current_quest])
    const [timeCount, setTimeCount] = useState("")
    const [choiceIndex, setChoiceIndex] = useState("")
    // function
    let onSelect = (index) => {
        if (quizCase.choices[index] === quizCase.answer) {
            setChoiceIndex(quizCase.answer)
            score += 100;
            quiz_counter += 1;
            current_quest += 1
            setTimeout(function () {
                setChoiceIndex("")
                setQuizCase(QUIZ_CASE[current_quest])

            }, 1000);

        } else {
            setChoiceIndex(quizCase.answer)
            quiz_counter += 1;
            current_quest += 1
            setTimeout(function () {
                setChoiceIndex("")
                setQuizCase(QUIZ_CASE[current_quest])

            }, 1000);

        }
    }


    let onDone = () => {
        props.display({
            endgame: true,
            quiz: false,
        })
        props.result(score)

    }


    // useEffect
    useEffect(() => {
        if (quizCase === undefined) {
            onDone();
            score = 0;
            quiz_counter = 1;
            current_quest = 0
        }
    })


    useEffect((() => {
        let time = 20
        setTimeCount(time)
        let interval = setInterval(function () {
            time--;
            setTimeCount(time)

        }, 1000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }), [quizCase])

    useEffect(() => {
        if (timeCount === 0) {
            quiz_counter += 1;
            current_quest += 1
            setQuizCase(QUIZ_CASE[current_quest])
        }
    }, [timeCount])




    // Render
    let quiz_length = ""
    let choices = ""
    let question = ""

    if (quizCase) {
        quiz_length = QUIZ_CASE.length;
        question = quizCase.question
        choices = quizCase.choices.map((item, index) => {
            let order = ["A", "B", "C", "D"]
            return (
                <div className={`choice ${choiceIndex && quizCase.choices[index] === choiceIndex ? "right-answer" : ""} ${choiceIndex && quizCase.choices[index] !== choiceIndex ? "wrong-answer" : ""}`} key={index} onClick={() => onSelect(index)}>
                    <span>{order[index]}</span>
                    <span>{item}</span>
                </div>
            )
        })
    }


    return (
        <div className="quiz">
            <div className="info-quiz">
                <div className="info-question">
                    <p>Question {quiz_counter} of {quiz_length}</p>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: `${quiz_counter / quiz_length * 100}%` }}></div>
                    </div>
                </div>
                <div className="info-time">
                    <p>Time Left</p>
                    <p>{timeCount}s</p>
                </div>
                <div className="info-score">
                    <p>Score</p>
                    <p>{score}</p>
                </div>
            </div>
            <div className="question">
                <p>{question}</p>
                <div className="answer">
                    {choices}
                </div>
            </div>
        </div>
    )
}

export default Quiz