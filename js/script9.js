const answerTrackerContainer = document.querySelector(".answers-tracker");
const options=document.querySelector(".options").children;
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage= document.querySelector(".percentage");
const question= document.querySelector(".question");

const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex=1;
let index=0;
let myArray=[];
let myArr=[];
let score=0;
//questions and options and answers

const questions=[
{
	q:'What is the highest type number which can be applied to the following grammar ? S —> Aa, A —> Ba, B —> abc',
	options:['Type 0 ','Type 1 ','Type 2','Type 3'],
	answer:2
},

{
	q:'The intersection of CFL and regular language ',
	options:['is always regular ','is always context free',' both (a) and (b)',' need not be regular'],
	answer:1
},

{
	q:'The grammars G = ( { s }, { 0, 1 }, p , s) where p = (s —> 0S1, S —> OS, S —> S1, S —>0} is a',
	options:['regular language ','recursively enumerable language ','context-free language','context-sensetive language'],
	answer:0
},

{
	q:'Given a grammar G a production of G with a dot at some position of the right side is called ',
	options:['LR (0) item of G  ','LR (1) item of G','both (a) and (b) ','None of these '],
	answer:1
},

{
	q:'For which of the following application, regular expressions can not be used ? ',
	options:['Designing computers ','Developing computers','Both A & D','Designing compilers  '],
	answer:2
},


{
	q:'What can be said about a regular language L over {a} whose minimal finite state automation has two states? ',
	options:[' L must be {a^n | > 0} ','L must be { a^n | n is odd}',' L must be { a^n | n is even}',' Either L must be {a^n | n is odd}, or L must be {a^n | n is even}'],
	answer:2
},


{
	q:' If L1 and L2 are context free language and R a regular set, then which one of the languages below is not necessarily a context free language? ',
	options:['L1  ∩ L2 ','L1 L2',' L1 ∩ R','L1 ∪ L2 '],
	answer:0
},



{
	q:'Set of regular languages over a given alphabet set is  closed under',
	options:['intersection ','union','complementation ','All of these '],
	answer:3
},



{
	q:'FSM can recognize ',
	options:['	any grammar ','Only CG','only regular grammar','Both (a) and ( b )'],
	answer:3
},




{
	q:'If Σ = (0, 1), L = Σ* and R = (0n 1nsuch that  n >  0 )then languages L ∪ R and R respectively are',
	options:['Not regular, Not regular','Regular, Regular','Regular, Not regular','None of these'],
	answer:2
},




{
	q:'L = (an bn an | n = 1,2,3)  is an example of a language that is',
	options:['	context free','not context free ','not context free but whose complement is CF ','	Both B & C '],
	answer:3
},




{
	q:" The language of all words with at least 2 a's can be described by the regular expression ",
	options:['(ab)*a and a (ba)*','(a + b)* ab* a (a + b)*','b* ab* a (a + b)*','All of these '],
	answer:3
},



{
	q:'The CFG s---> as | bs |  a |  b is equivalent to regular expression  ',
	options:['	(a + b) ','(a + b) (a + b)*','(a + b) (a + b)','None of these '],
	answer:1
},

{
	q:' Pumping lemma is generally used for proving that',
	options:['given grammar is not regular','given grammar is regular','whether two given regular expressions are equivalent or not	', 'None of these  '],
	answer:0
}
]

//set Questions an opotions and question number


totalQuestionSpan.innerHTML=questions.length;
function load(){
	questionNumberSpan.innerHTML=index+1;
	question.innerHTML=questions[questionIndex].q;
	op1.innerHTML=questions[questionIndex].options[0];
	op2.innerHTML=questions[questionIndex].options[1];
	op3.innerHTML=questions[questionIndex].options[2];
	op4.innerHTML=questions[questionIndex].options[3];
	index++;

}

function check(element){

	//now let us check option is correct or not
	//console.log(element.id);
	if(element.id==questions[questionIndex].answer)
	{
		element.classList.add("correct");
		//console.log("correct")
		updateAnswerTracker("correct")
		score++;
	}
	else{
		element.classList.add("wrong");
		//console.log("wrong")
		//if user selected one option then disabled all options
		updateAnswerTracker("wrong")
	}
	disabledOptions()
}

function disabledOptions(){
	for(let i=0;i<options.length;i++){
		options[i].classList.add("disabled");
		
		if (options[i].id==questions[questionIndex].answer) {
			options[i].classList.add("correct");
		}
	}
}


function enabledOptions(){
	//here we did disabled all options for next question we have to enable again options
	for(let i=0;i<options.length;i++)
	{
		options[i].classList.remove("disabled","correct","wrong");
	}
}

function validate(){
	if(!options[0].classList.contains("disabled")){
		alert("Please Select One Option Please");
	}
	else{
		enabledOptions();
		randomQuestion();
	}
}


function next(){
	//before going to next questions let us check that did user select any option or not if user did not select any option then alert("Please select one option") else next question .
	validate();

}

//now let us check questions duplicy

//But we need random questions for that 
function randomQuestion(){
	let randomNumber = Math.floor(Math.random()*questions.length);
	let hitDuplicate=0;
	if(index==questions.length){
		quizOver();

	}
	else{
		if(myArray.length>0){
			for(let i=0;i<myArray.length;i++){
				if(myArray[i]==randomNumber){
					hitDuplicate=1;
					break;
					//if myArray[item] equal to randomNumberthen hitDuplicate found then hitDuplicate=1 and break
				}

			}
			// if hitduplicate found then call again to randomquestion()
			if (hitDuplicate==1) {
				randomQuestion();
			}
			else{
				questionIndex=randomNumber;
				load();
				myArr.push(questionIndex);
			}

		}
		if(myArray.length==0)
		{
			questionIndex=randomNumber;
			load();
			myArr.push(questionIndex);
		}
	
	
	myArray.push(randomNumber);
	
	}
}


function answerTracker(){
	for(let i=3;i<questions.length;i++){
		const div = document.createElement("div")
		answerTrackerContainer.appendChild(div);
	}
}
function updateAnswerTracker(className){
	answerTrackerContainer.children[index-1].classList.add(className);
}

function quizOver(){
	document.querySelector(".quiz-over").classList.add("show");
	correctAnswerSpan.innerHTML=score;
	totalQuestionSpan2.innerHTML=questions.length;
	percentage.innerHTML=(score/questions.length)*100 + "%";
}
function tryAgain() {
	window.location.reload();
}
window.onload=function(){
	randomQuestion();
	answerTracker();
}
