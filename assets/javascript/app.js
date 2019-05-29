// allows the html to load first before running any functions
$(document).ready(function () {
    // allows for the popover button in the top left to function. this is taken from bootstrap website
    $('[data-toggle="popover"]').popover({
        // title within the popover
        title: 'Fill in the Blank!',
    });

    // Global variables
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


    // array of questions, answers, and pictures for each portion of the game
    var questions = [{
            queen: "__________ Delano",
            answers: ["Adore", "Airy", "Adonis", "Althea"],
            rightAnswer: "Adore",
            queenName: "Adore Delano",
            animate: "<img src='assets/images/adore.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/delano.gif'>"
        },
        {
            queen: "__________ Act",
            answers: ["Christy", "Clara", "Courtney", "Cassie"],
            rightAnswer: "Courtney",
            queenName: "Courtney Act",
            animate: "<img src='assets/images/courtney.gif'>",
            lose: "<img src='assets/images/bye.gif'>",
            name: "<img src='assets/images/act.gif'>"
        },
        {
            queen: "Bianca __________ Rio",
            answers: ["Des", "Del", "De", "Dio"],
            rightAnswer: "Del",
            queenName: "Bianca Del Rio",
            animate: "<img src='assets/images/bianca.gif'>",
            lose: "<img src='assets/images/sashay.gif'>",
            name: "<img src='assets/images/rio.gif'>"
        },
        {
            queen: "Lagaja __________",
            answers: ["Eleganza", "Elite", "Estranja", "Elaeja"],
            rightAnswer: "Estranja",
            queenName: "Laganja Estranja",
            animate: "<img src='assets/images/laganja.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/estranja.gif'>"
        },
        {
            queen: "Gia __________",
            answers: ["Gunn", "Gee", "Gia", "Grande"],
            rightAnswer: "Gunn",
            queenName: "Gia Gunn",
            animate: "<img src='assets/images/gia.gif'>",
            lose: "<img src='assets/images/bye.gif'>",
            name: "<img src='assets/images/gunn.gif'>"
        },
        {
            queen: "Sharon __________",
            answers: ["Needles", "Yo'Mama", "Karen", "Tips"],
            rightAnswer: "Needles",
            queenName: "Sharon Needles",
            animate: "<img src='assets/images/Sharon.gif'>",
            lose: "<img src='assets/images/sashay.gif'>",
            name: "<img src='assets/images/needles.gif'>"
        },
        {
            queen: "Bob The __________ Queen",
            answers: ["Beauty", "Dairy", "Drag", "Celestial"],
            rightAnswer: "Drag",
            queenName: "Bob The Drag Queen",
            animate: "<img src='assets/images/bob.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/queen.gif'>"
        },
        {
            queen: "Plastique __________",
            answers: ["Recycle", "Bag", "Tiara", "Barbie"],
            rightAnswer: "Tiara",
            queenName: "Plastique Tiara",
            animate: "<img src='assets/images/plastique.gif'>",
            lose: "<img src='assets/images/bye.gif'>",
            name: "<img src='assets/images/tiara.gif'>"
        },
        {
            queen: "Trixie __________",
            answers: ["Mattel", "Mixie", "Madeline", "Mix"],
            rightAnswer: "Mattel",
            queenName: "Trixie Mattel",
            animate: "<img src='assets/images/trixie.gif'>",
            lose: "<img src='assets/images/sashay.gif'>",
            name: "<img src='assets/images/mattel.gif'>"
        },
        {
            queen: "Alyssa __________",
            answers: ["Matthews", "Edwards", "Smith", "Jones"],
            rightAnswer: "Edwards",
            queenName: "Alyssa Edwards",
            animate: "<img src='assets/images/alyssa.gif'>",
            lose: "<img src='assets/images/away.gif'>",
            name: "<img src='assets/images/edwards.gif'>"
        },
    ];


    // function for what happens when you win
    function win() {
        correctAnswers++;
        questionNumber++;
        var audioWinElement = document.createElement("audio");
        audioWinElement.setAttribute("src", "assets/sound/you better work.mp3");
        audioWinElement.play();
        var queenGif = $(questions[index].animate);
        questionsDiv.html(queenGif);
        dqNameDiv.html(questions[index].name);
        answersDiv.empty();
        answersDiv.html("<h2> CORRECT! </h2>");
        timerDiv.empty();
        clearInterval(clock);
        setTimeout(nextQuestion, 4000);
    };

    // function for everything that happens when you lose
    function lose() {
        incorrectAnswers++;
        questionNumber++;
        var audioLoseElement = document.createElement("audio");
        audioLoseElement.setAttribute("src", "assets/sound/sashay away.mp3");
        audioLoseElement.play();
        var loseGif = $(questions[index].lose);
        questionsDiv.html(loseGif);
        dqNameDiv.html(mamaRu);
        answersDiv.empty();
        answersDiv.html("<h4> Gurl... She is " + questions[index].queenName + "</h4>");
        timerDiv.empty();
        clearInterval(clock);
        setTimeout(nextQuestion, 4000);
    };

    // function for what happens when you do not answer a question
    function unanswered() {
        notAnswered++;
        questionNumber++;
        var audioLoseElement = document.createElement("audio");
        audioLoseElement.setAttribute("src", "assets/sound/sashay away.mp3");
        audioLoseElement.play();
        var loseGif = $(questions[index].lose);
        questionsDiv.html(loseGif);
        dqNameDiv.html(mamaRu);
        answersDiv.empty();
        answersDiv.html("<h4> Gurl... She is " + questions[index].queenName + "</h4>");
        timerDiv.empty();
        clearInterval(clock);
        setTimeout(nextQuestion, 4000);
    };

    // function that allows the timer to start at the bottom of the screen
    function runTime() {
        timerDiv.empty();
        timerDiv.html("<h2>You have " + time + " left</h2>");
        clock = setInterval(countDown, 1000);

        function countDown() {
            time--;

            timerDiv.html("<h2>You have " + time + " left</h2>");

            if (time === 0) {
                clearInterval(clock);
                unanswered();
            };
        };
    };

    // function that triggers the next question to pull up
    function nextQuestion() {
        if (questionNumber < questions.length) {
            time = 15;
            runTime();
            index++;
            questionsDiv.empty();
            answersDiv.empty();
            dqNameDiv.empty();
            showTrivia();
        } else {
            results();
        }
    };

    // function that pulls up the page with all the results from the game
    function results() {
        dqNameDiv.empty();
        questionsDiv.empty();
        answersDiv.empty();
        timerDiv.empty();
        var audioResultElement = document.createElement("audio");
        audioResultElement.setAttribute("src", "assets/sound/RPDR Theme Song.mp3");
        audioResultElement.play();
        $("body").attr("id", "newBackground");
        answersDiv.attr("class", "newBack text-center");
        $("#header").hide();
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

    // will reset the whole game so the user can play the game another round
    function resetAll() {
        $("body").removeAttr("id", "newBackground");
        dqNameDiv.empty();
        questionsDiv.empty();
        answersDiv.removeAttr("class", "newBack text-center");
        answersDiv.empty();
        timerDiv.empty();
        $("#header").show();
        correctAnswers = 0;
        incorrectAnswers = 0;
        notAnswered = 0;
        questionNumber = 0;
        time = 15;
        index = 0;
        showTrivia();
        runTime();
    }


    // function that has all the functions within the game
    function showTrivia() {
        // display the question (fill in the blank) with the drag queen names
        questionsDiv.html(questions[index].queen);

        // for loop that creates a button for each other the answer within the object from the array
        for (var i = 0; i < questions[index].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.html(questions[index].answers[i]);
            // important to create an id that can be cross referenced with the correct answer in the array
            answerButton.attr("id", questions[index].answers[i]);
            answersDiv.append(answerButton);

            // on click function for each button within the array
            $(answerButton).on("click", function () {
                // this means that each time the user clicks, the data that is pulled is the text within the "id", which is cross checked with the right answer within the array to determine a win or a lose
                var userChoice = $(this).attr("id");
                console.log(userChoice);


                if (userChoice === questions[index].rightAnswer) {
                    win();
                } else {
                    lose();
                }
            });
        };

    };

    // function for the start button at the beginning of the screen
    var startButton = $("<button>");
    startButton.html("<h1>Click to Start</h1>");
    timerDiv.html(startButton);
    startButton.on("click", function () {
        runTime();
        showTrivia();
    });


});