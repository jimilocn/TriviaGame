// allows the html to load first before running any functions
$(document).ready(function () {
    // allows for the popover button in the top left to function. this is taken from bootstrap website
    $('[data-toggle="popover"]').popover({
        // title within the popover
        title: 'Fill in the Blank!',
    });

    // click start to start game


    // 20 second counter for each question

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unAnswers = 0;
    var index = 0;


    // array of questions\
    var questions = [
        {
            queen: "__________ Delano",
            answers: ["Adore", "Airy", "Adonis", "Althea"],
            rightAnswer: "Adore",
            animate: ""
        },
        {
            queen: "__________ Act",
            answers: ["Christy", "Clara", "Courtney", "Cassie"],
            rightAnswer: "Courtney",
            animate: ""
        },
        {
            queen: "Bianca __________ Rio",
            answers: ["Des", "Del", "De", "Dio"],
            rightAnswer: "Del",
            animate: ""
        },
        {
            queen: "Lagaja __________",
            answers: ["Eleganza", "Elite", "Estranja", "Elaeja"],
            rightAnswer: "Estranja",
            animate: ""
        },
        {
            queen: "Gia __________",
            answers: ["Gun", "Gee", "Gia", "Grande"],
            rightAnswer: "Gun",
            animate: ""
        },
        {
            queen: "Sharon __________",
            answers: ["Needles", "Yo'Mama", "Karen", "Tips"],
            rightAnswer: "Needles",
            animate: ""
        },
        {
            queen: "Bob The __________ Queen",
            answers: ["Beauty", "Dairy", "Drag", "Celestial"],
            rightAnswer: "Drag",
            animate: ""
        },
        {
            queen: "Plastique __________",
            answers: ["Recycle", "Bag", "Tiara", "Barbie"],
            rightAnswer: "Tiara",
            animate: ""
        },
        {
            queen: "Trixie __________",
            answers: ["Mattel", "Mixie", "Madeline", "Mix"],
            rightAnswer: "Mattel",
            animate: ""
        },
    ]

    function showTrivia() {
        $("#question").html(questions[index].queen);
        for (var i = 0; i < questions[index].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.html(questions[index].answers[i]);
            $("#answers").append(answerButton);
        }
    }


    showTrivia();


});