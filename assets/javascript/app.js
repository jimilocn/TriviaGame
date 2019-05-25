// allows the html to load first before running any functions
$(document).ready(function () {
    // allows for the popover button in the top left to function. this is taken from bootstrap website
    $('[data-toggle="popover"]').popover({
        // title within the popover
        title: 'Fill in the Blank!',
    });
    console.log("BOOM");

    // click start to start game


    // 20 second counter for each question

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var notAnswered = 0;
    var questionNumber = 0;
    var time = 15;
    var index = 0;
    var questionsDiv = $("#question");
    var answersDiv = $("#answers");
    var dqNameDiv = $("#dqName");
    var timerDiv = $("#timer");
    var mamaRu = "<img src='assets/images/sad.png'>";


    // array of questions\
    var questions = [
        {
            queen: "__________ Delano",
            answers: ["Adore", "Airy", "Adonis", "Althea"],
            rightAnswer: "Adore",
            animate: "<img src='assets/images/adore.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/delano.gif'>"
        },
        {
            queen: "__________ Act",
            answers: ["Christy", "Clara", "Courtney", "Cassie"],
            rightAnswer: "Courtney",
            animate: "<img src='assets/images/courtney.gif'>",
            lose: "<img src='assets/images/bye.gif'>",
            name: "<img src='assets/images/act.gif'>"
        },
        {
            queen: "Bianca __________ Rio",
            answers: ["Des", "Del", "De", "Dio"],
            rightAnswer: "Del",
            animate: "<img src='assets/images/bianca.gif'>",
            lose: "<img src='assets/images/sashay.gif'>",
            name: "<img src='assets/images/rio.gif'>"
        },
        {
            queen: "Lagaja __________",
            answers: ["Eleganza", "Elite", "Estranja", "Elaeja"],
            rightAnswer: "Estranja",
            animate: "<img src='assets/images/laganja.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/estranja.gif'>"
        },
        {
            queen: "Gia __________",
            answers: ["Gunn", "Gee", "Gia", "Grande"],
            rightAnswer: "Gunn",
            animate: "<img src='assets/images/gia.gif'>",
            lose: "<img src='assets/images/bye.gif'>",
            name: "<img src='assets/images/gunn.gif'>"
        },
        {
            queen: "Sharon __________",
            answers: ["Needles", "Yo'Mama", "Karen", "Tips"],
            rightAnswer: "Needles",
            animate: "<img src='assets/images/Sharon.gif'>",
            lose: "<img src='assets/images/sashay.gif'>",
            name: "<img src='assets/images/needles.gif'>"
        },
        {
            queen: "Bob The __________ Queen",
            answers: ["Beauty", "Dairy", "Drag", "Celestial"],
            rightAnswer: "Drag",
            animate: "<img src='assets/images/bob.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/queen.gif'>"
        },
        {
            queen: "Plastique __________",
            answers: ["Recycle", "Bag", "Tiara", "Barbie"],
            rightAnswer: "Tiara",
            animate: "<img src='assets/images/plastique.gif'>",
            lose: "<img src='assets/images/bye.gif'>",
            name: "<img src='assets/images/tiara.gif'>"
        },
        {
            queen: "Trixie __________",
            answers: ["Mattel", "Mixie", "Madeline", "Mix"],
            rightAnswer: "Mattel",
            animate: "<img src='assets/images/trixie.gif'>",
            lose: "<img src='assets/images/sashay.gif'>",
            name: "<img src='assets/images/mattel.gif'>"
        },
        {
            queen: "Alyssa __________",
            answers: ["Matthews", "Edwards", "Smith", "Jones"],
            rightAnswer: "Edwards",
            animate: "<img src='assets/images/alyssa.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/edwards.gif'>"
        },
    ];

    function win() {
        correctAnswers++;
        questionNumber++;
        var queenGif = $(questions[index].animate);
        questionsDiv.html(queenGif);
        dqNameDiv.html(questions[index].name);
        answersDiv.empty();
        timerDiv.empty();
        clearInterval(clock);
        setTimeout(nextQuestion, 4000);
    };

    function lose() {
        incorrectAnswers++;
        questionNumber++;
        var loseGif = $(questions[index].lose);
        questionsDiv.html(loseGif);
        dqNameDiv.html(mamaRu);
        answersDiv.empty();
        timerDiv.empty();
        clearInterval(clock);
        setTimeout(nextQuestion, 4000);
    };

    function unanswered() {
        notAnswered++;
        questionNumber++;
        var loseGif = $(questions[index].lose);
        questionsDiv.html(loseGif);
        dqNameDiv.html(mamaRu);
        answersDiv.empty();
        timerDiv.empty();
        clearInterval(clock);
        setTimeout(nextQuestion, 4000);

    }

    function runTime() {
        timerDiv.empty();
        clock = setInterval(countDown, 1000);
        function countDown() {
            timerDiv.html("<h2>You have " + time + " left</h2>");

            if (time > 0) {
                time--;
            };

            if (time === 0) {
                clearInterval(clock);
                unanswered();
            };

        }
    }

    function nextQuestion() {
        if (questionNumber < questions.length) {
            time = 15;
            runTime();
            index++;
            questionsDiv.empty();
            answersDiv.empty();
            dqNameDiv.empty();
            showTrivia();
        }

        else {
            results();
        }
    };

    function results() {
        dqNameDiv.empty();
        questionsDiv.empty();
        answersDiv.empty();
        timerDiv.empty();
        answersDiv.html("correct answers: " + correctAnswers + "<br>");
        answersDiv.append("incorrect answers: " + incorrectAnswers + "<br>");
        answersDiv.append("unanswered: " + notAnswered);
        var resetButton = $("<button>");
        resetButton.html("<h1> Try Again <h1>");
        timerDiv.html(resetButton);
        resetButton.on("click", function () {
            resetAll();
        });
    };
    function resetAll() {
        dqNameDiv.empty();
        questionsDiv.empty();
        answersDiv.empty();
        timerDiv.empty();
        correctAnswers = 0;
        incorrectAnswers = 0;
        notAnswered = 0;
        questionNumber = 0;
        time = 15;
        index = 0;
        showTrivia();
        runTime();
    }

    function showTrivia() {
        questionsDiv.html(questions[index].queen);

        for (var i = 0; i < questions[index].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.html(questions[index].answers[i]);
            answerButton.attr("id", questions[index].answers[i]);
            answersDiv.append(answerButton);

            $(answerButton).on("click", function () {

                var userChoice = $(this).attr("id");
                console.log(userChoice);


                if (userChoice === questions[index].rightAnswer) {
                    win();
                }

                else {
                    lose();
                }
            });
        }

    };


var startButton = $("<button>");
startButton.html("<h1>Click to Start</h1>");
timerDiv.html(startButton);
startButton.on("click", function() {
    runTime();
    showTrivia();
});


});