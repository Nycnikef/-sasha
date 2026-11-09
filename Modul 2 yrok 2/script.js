document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Яка з цих риб хижа?",
            answers: ["Карась", "Щука", "Плотва", "Лящ"],
            correct: 1
        },
        {
            question: "Яка особливість поведінки Щуки є визначальною під час її полювання в заростях водної рослинності?",
            answers: ["Вона довго переслідує здобич на відкритій воді на швидкій течії", "Вона полює із засідки,різко атакувавши здобич на короткій відстані", "Вона фільтрує планктон та дрібні організми з мулу", "Вона полює виключно у нічний час у верхніх шарах води"],
            correct: 1
        },
        {
            question: "До мирних (не хижих риб) риб України належить",
            answers: ["Короп", "Судак", "Окунь", "Жерех"],
            correct: 0
        },
        {
            question: "Який найбільший прісноводний хижак водится у річках та озерах України",
            answers: ["Щука", "Судак", "Сом європейський"],
            correct: 2
        },
        {
            question: "Яка з цих риб має характерні темні смуги на боках та колючі шипи на спинному плавці?",
            answers: ["Короп", "Карась", "Лящ", "Окунь", "Судак"],
            correct: 3
        },
        {
            question: "Яка мирна риба має високе,сплюснуте з боків тіло і шукає іжу в мулі",
            answers: ["Ніяка", "Щука", "Судак", "Лящ"],
            correct: 3
        },
    ];

    const questionTitle = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startButton = document.querySelector('#start-btn');
    const restartButton = document.querySelector('#restart-btn');
    const resultText = document.querySelector('#result-text');
    const scoreBar = document.querySelector('#score-display');
    const timeBar = document.querySelector('#timer')

    let questionIndex = 0;
    let score = 0;
    let timer;
    let interval

    function showQuestion(question) {
        clearInterval(interval)
        startTime()
        answersContainer.innerHTML = '';
        questionTitle.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.innerText = answer;

            button.addEventListener('click', () => {
                checkAnswer(i, button);
            });

            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(answerIndex, button) {
        const correctIndex = questions[questionIndex].correct;

        const buttons = answersContainer.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);

        if (answerIndex === correctIndex) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            buttons[correctIndex].classList.add('correct');
        }

        if (scoreBar) {
            scoreBar.innerText = 'Бали: ' + score;
        }

        timer = setTimeout(nextQuestion, 1000);
    }

    function startGame() {
        clearTimeout(timer);

        score = 0;
        questionIndex = 0;

        if (scoreBar) {
            scoreBar.innerText = 'Бали: 0';
        }

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        showQuestion(questions[questionIndex]);
    }

    function nextQuestion() {
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

   function showResult() {
    quizScreen.classList.add('hide');
    startScreen.classList.add('hide');
    resultScreen.classList.remove('hide');

    const accuracy = Math.round((score / questions.length) * 100);

    let rankMessage = "";

    if (score <= 1) {
        rankMessage = "ТИ ВЗАГАЛІ НЕ РИБАК";
    } else if (score <= 3) {
        rankMessage = "ПОЧАТКОВИЙ РИБАК";
    } else if (score === 4) {
        rankMessage = "ПРОДВИНУТИЙ РИБАК";
    } else if (score >= 5) {
        rankMessage = "МАЙСТЕР РИБАЛКИ";
    }

    resultText.innerText = `Твій результат: ${score} з ${questions.length}. Точність: ${accuracy}%. ${rankMessage}`;
}
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
function startTime(){
        timer = 20
        timeBar.innerText = `Час: ${timer}`
        interval = setInterval(() => {
            timer--;
            timeBar.innerText = `Час: ${timer}`
            if (timer <= 0){
                clearInterval(interval)
                nextQuestion()
            }
        }, 1000)
}

});