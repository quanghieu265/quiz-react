
import { useState, useEffect, useRef } from "react"
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
    function shuffleArray(array) {
        let test=array
        for (let i = test.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [test[i], test[j]] = [test[j], test[i]];
        }
        return test;    
    }
    
function Quiz(props) {
    let quiz_counter = useRef(1)
    let current_quest = useRef(0)
    let score=useRef(0)

    const [quizCase, setQuizCase] = useState("")
    const [timeCount, setTimeCount] = useState("")
    const [choiceIndex, setChoiceIndex] = useState("")
    const [choiceAnswer, setChoiceAnswer] = useState("")

    // function
    let onSelect = (index) => {
        setChoiceIndex(index)
        setChoiceAnswer(quizCase.answer)
        if (quizCase.choices[index] === quizCase.answer) {
            score.current  += 100;
            setTimeout(function () {
                setChoiceIndex("")
                setChoiceAnswer("")
                quiz_counter.current  += 1;
                current_quest.current  += 1
                setQuizCase(QUIZ_CASE[current_quest.current])
            }, 1000);

        } else {
            setTimeout(function () {
                setChoiceIndex("")
                setChoiceAnswer("")
                quiz_counter.current  += 1;
                current_quest.current  += 1
                setQuizCase(QUIZ_CASE[current_quest.current ])

            }, 1000);

        }
    }


    let onDone = () => {
        props.display({
            endgame: true,
            quiz: false,
        })
        props.result(score.current )

    }


    // useEffect
    useEffect(()=>{
        shuffleArray(QUIZ_CASE);
        setQuizCase(QUIZ_CASE[current_quest.current])
    },[])

    useEffect(() => {
        if (quizCase === undefined) {
            onDone();
            score.current= 0;
            quiz_counter.current  = 1;
            current_quest.current  = 0
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
            quiz_counter.current  += 1;
            current_quest.current  += 1
            setQuizCase(QUIZ_CASE[current_quest.current ])
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
                <div className={`choice
                ${choiceIndex !== index && choiceIndex !==""? "disable-click" : ""}
                 ${choiceIndex === index && quizCase.choices[index] === choiceAnswer ? "right-answer" : ""}
                 ${choiceIndex === index && quizCase.choices[index] !== choiceAnswer ? "wrong-answer" : ""}
                 `}
                  key={index} onClick={() => onSelect(index)}>
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
                    <p>Question {quiz_counter.current } of {quiz_length}</p>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: `${quiz_counter.current  / quiz_length * 100}%` }}></div>
                    </div>
                </div>
                <div className="info-time">
                    <p>Time</p>
                    <p>{timeCount}s</p>
                </div>
                <div className="info-score">
                    <p>Score</p>
                    <p>{score.current }</p>
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