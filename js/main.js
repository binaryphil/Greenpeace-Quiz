// Quiz result options in a separate object for flexibility
var resultOptions = [
    {   title: 'You Are Rock!',
        desc: '<img src="img/rock.jpg"/>You are the type of person that Rocks.'},
    {   title: 'You Are Pop!',
        desc: '<img src="img/pop.jpg"/>You are the Pop type of person.'},
    {   title: 'You Are Heavy Metal!',
        desc: '<img src="img/heavymetal.jpg"/>You are a Heavy Metal person.'},
    {   title: 'You Are Country!',
        desc: '<img src="img/country.jpg"/>You are more of a Country person.'}
];

// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

var maxQuestions = 4;

var myAnswerArray = [];

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = parseInt(wasActive.attr('data-quizIndex')),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
               // totalScore -= oldScoreValue;
               //  totalScore += answerScore;
                addAnswer(oldScoreValue);
            } else {
                // handle visual active state
                $this.addClass('active');

                addAnswer(answerScore);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if(currentStep.hasClass('current')){
       currentStep.removeClass('current');
       currentStep.next().addClass('current');
    }
}

// display scoring results
function addAnswer(totalScore) {

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    myAnswerArray.push(totalScore);
    console.log("ADD : " + totalScore);

    if(myAnswerArray.length >= 5) {

        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');

        var maxTimesNumber = findMaxTimes(myAnswerArray, "max");
        var findIndex      = findMaxTimes(myAnswerArray, "index");

        var mCountArray = count(myAnswerArray);
        var size =  Object.keys(mCountArray).length;
        var mFinalArray = [];

        console.log("findIndex : " + findIndex);
        console.log("maxTimesNumber : " + maxTimesNumber);
        console.log("mCountArray.length : " + size);

        for(value in mCountArray){
            console.log(mCountArray[value]);
            if(mCountArray[value] == maxTimesNumber)
                mFinalArray.push(value);
        }

        console.log(mFinalArray);

        if(mFinalArray.length == 0){
            resultsTitle.replaceWith("<h1>" + resultOptions[findIndex].title + "</h1>");
            resultsDesc.replaceWith("<p class='desc'>" + resultOptions[findIndex].desc + "</p>");
        }
        else{

            findIndex = generateRandomNumber(maxQuestions, mFinalArray);

            resultsTitle.replaceWith("<h1>" + resultOptions[findIndex-1].title + "</h1>");
            resultsDesc.replaceWith("<p class='desc'>" + resultOptions[findIndex-1].desc + "</p>");
        }
    }

}

function findMaxTimes(mArray, type){

    var obj = {};

    /* first convert the array in to object with unique elements and number of times each element is repeated */
    for(var i = 0; i < mArray.length; i++)
    {
        var x = mArray[i];
        if(!obj[x])
            obj[x] = 1;
        else
            obj[x]++;
    }

    /* now traverse the object to get the element */
    var index = 0;
    var max = 0;
    var mCopyOfArray = [];

    for(var obIndex in obj)
    {
        if(obj[obIndex] > max)
        {
            mCopyOfArray.push(obIndex);
            max = obj[obIndex];
            index = obIndex;
        }
    }

    console.log(index+" got maximum time repeated, with "+ max +" times" );

    if(type == "max")
        return max;
    else
        return index;
}

function generateRandomNumber(maxQuestions, mFinalArray) {

    var mNumber = Math.floor(Math.random() * maxQuestions) + 1;

    var doesGeneratedNumberExists = false;

    while(!doesGeneratedNumberExists){

        for(var i = 0; i < mFinalArray.length;i++){
            if(mNumber == mFinalArray[i]) {
                console.log("number exists : " + mNumber);
                return mNumber;
            }
            else{
                mNumber = Math.floor(Math.random() * maxQuestions) + 1;
            }
        }

    }

}

function count(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}
