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
	q:'How can you open a link in a new browser window?',
	options:[' a href = "url" target = "new"','a href = "url".new','a href = "url" target= "_blank"','a href = "url" target ="open"'],
	answer:2
},

{
	q:'Correct HTML to left align the content inside a table cell is',
	options:['td eft','td raligh = "left"','td leftalign ','td align = "left"'],
	answer:3
},


{
	q:'A much better approach to establish the base URL is to use',
	options:[' HEAD element',' BASE element','Both A & B ','None of these'],
	answer:1

},

{
	q:'Can the element <First> be replaced with <first>',
	options:[' First is correct only','  Second is correct only','No, they represent different elements altogether','Both are same'],
	answer:3
},


{
	q:'The text inside the <TEXT AREA> tag works like ',
	options:['P formatted text ','T formatted text','H formatted text','PRE formatted text '],
	answer:3
},


{
	q:'The tag used to create a hypertext relationship between current document and another URL is ',
	options:['A','LINK',' HREF ',' None of these'],
	answer:1
},



{
	q:'The map definition file is generally stored in',
	options:['BIN','RECYCLE-BIN','CGI-BIN','All of these'],
	answer:2
},




{
	q:'Which tag creates a number/order list?',
	options:[' OL','UL','OT','None of these'],
	answer:0
},

{
	q:'How can you make an e-mail link? ',
	options:['mail href ="xxx@y.com"','a href = "xxx@y.com"','a href ="mail to: xxx@y.com"','Both A & C'],
	answer:2
},




{
	q:'Main container for TR, TD and TH is',
	options:['TABLE','GROUP','DATA','All of the above'],
	answer:0
},




{
	q:'The body tag usually used after',
	options:['Title tag','Head tag','Style tag','Paragraph tag'],
	answer:1
},

{
	q:'What i s the correct HTML for adding a background color?',
	options:['background=yellowBackground','body color = "yellow"','body bg ="yellow"','body bg color = "yellow"'],
	answer:3
},

{
	q:'Symbol used at the beginning of the HREF text is ',
	options:['#','$','/','& '],
	answer:0
},


{
	q:'Which of the following is a Valid Name?',
	options:['123 person','_person',' Both A & B','None of these'],
	answer:1
},

{
	q:'The web standard allows programmers on many different computer platforms to dispersed format and display the information server. These programs are called ',
	options:['Web Browsers','Internet Explorer',' HTML', 'Nonrof these'],
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
