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
	q:'The tools that support different stages of software development life cycle are called:',
	options:['CASE Tools','CARE tools','CAME tools','CAQE tools '],
	answer:0
},

{
	q:'ER model shows the',
	options:['Static view','Dynamic view.','Functional view. ','All the above'],
	answer:0
},


{
	q:'The model that assumes that effort and development time are functions of product size alone is',
	options:[' Intermediate COCOMO model',' Basic COCOMO model','Detailed COCOMO model ','All the three COCOMO models'],
	answer:1

},

{
	q:'Structured charts are a product of',
	options:[' requirements analysis','  requirements gathering','coding','design'],
	answer:3
},


{
	q:'The main purpose of integration testing is to find ',
	options:['analysis errors ',' interface errors','design errors ',' procedure errors '],
	answer:1
},


{
	q:'The testing that focuses on the variables is called ',
	options:['data variable testing','white box testing',' black box testing ',' data flow testing'],
	answer:2
},



{
	q:'Which phase is not available in software life cycle?',
	options:['Coding','Maintenance','Testing','Abstraction'],
	answer:3
},




{
	q:'Which is not a step of requirement engineering?',
	options:[' Requirements documentation','Requirements design','Requirements elicitation','Requirements analysis'],
	answer:1
},

{
	q:'FAST stands for ',
	options:['Functional Application Specification Technique','Fast Application Specification Technique','Facilitated Application Specification Technique','None of the above'],
	answer:2
},




{
	q:'Pseudocode can replace',
	options:['flowcharts','cause-effect graphs','decision tables','structure charts'],
	answer:0
},




{
	q:'The level at which the software uses scarce resources is',
	options:['reliability','portability','scalability','efficiency'],
	answer:3
},




{
	q:'Coupling and cohesion can be represented using a',
	options:['dependence matrix','cause-effect graph','SRS','Structure chart'],
	answer:0
},

{
	q:'The symbol represents ',
	options:['mandatory many cardinality','optional zero-many cardinality','optional 0 or 1 cardinality','mandatory 1 cardinality '],
	answer:1
},




{
	q:'SRD stands for ',
	options:['Software requirements diagram','Software requirements definition',' Structured requirements definition','Structured requirements diagram '],
	answer:2
},

{
	q:' All the modules of the system are integrated and tested as complete system in the case of ',
	options:['Top-down testing','Sandwich testing',' Bottom up testing', ' Big-Bang testing'],
	answer:3
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
