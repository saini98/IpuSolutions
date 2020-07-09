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
	q:' Which of the following points is/are true about Linked List data structure when it is compared with array',
	options:['Arrays have better cache locality that can make them better in terms of performance ','It is easy to insert and delete elements in Linked List','The size of array has to be pre-decided, linked lists can change their size any time.','All of the Above '],
	answer:3
},

{
	q:'Conceptual data modeling uses a high level data modeling concept of E-R Models  ',
	options:['True ','False',' ',' '],
	answer:0
},

{
	q:'Assume that reference of head of following doubly linked list is passed to above function 1 <--> 2 <--> 3 <--> 4 <--> 5 <-->6. What should be the modified linked list after the function call? ',
	options:['2 <--> 1 <--> 4 <--> 3 <--> 6 <-->5 ','5 <--> 4 <--> 3 <--> 2 <--> 1 <-->6. ','6 <--> 5 <--> 4 <--> 3 <--> 1 <--> 2','6 <--> 5 <--> 4 <--> 3 <--> 2 <--> 1.'],
	answer:2
},

{
	q:'Which of the following sorting algorithms can be used to sort a random linked list with minimum time complexity? ',
	options:['Insertion Sort ','Merge Sort','Heap Sort ','Quick Sort '],
	answer:1
},

{
	q:'Which data types are used only for positive values in data structure? ',
	options:['Signed ','Unsigned      ','Arrays','Boolean'],
	answer:1
},


{
	q:' Select part of a linked list',
	options:['Head ','Domain','Link','List'],
	answer:0
},


{
	q:'What is the minimum number of nodes that a binary tree can have? ',
	options:['Zero ','one',' Two','Three '],
	answer:0
},



{
	q:'What is the minimum number of queues needed when implementing a priority queue?',
	options:['1 ','2','3 ','4 '],
	answer:1
},




{
	q:'Stack is - ',
	options:['FIFO ','FCFO','LCFO','LIFO'],
	answer:3
},




{
	q:'An array can be accessed by referring to the indexed element within the array.',
	options:['NO ','YES',' ',' '],
	answer:1
},




{
	q:'What is a de-queue?',
	options:['Domain Expert Queue','Dynamic Ended Queue ','Double Expert Queue ','	Double Ended Queue'],
	answer:3
},




{
	q:'Which data structure is a non-linear data structure? ',
	options:['Arrays','Linked lists','Queues','Trees '],
	answer:3
},



{
	q:'Which data structure is a linear data structure? ',
	options:['Graphs ','Trees','Arrays','Linked lists '],
	answer:0
},

{
	q:' A bubble sort',
	options:['Arranges smaller values at top while larger values at bottom               ','Arranges larger values at top while smaller values at bottom','Arranges smaller values at top while negative values at bottom ', 'Arranges smaller values at top while zero values at bottom '],
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
