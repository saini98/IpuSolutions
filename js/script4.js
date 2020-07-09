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
	q:'What is correct syntax for main method of a java class?',
	options:['public static int main(String[] args) ','public int main(String[] args)','public static void main(String[] args) ','None of the above. '],
	answer:2
},

{
	q:'Which interface should be implemented for sorting on basis of many criteria’s?',
	options:[' Serializable','Comparable','Comparator ',' None of the above'],
	answer:0
},



{
	q:'Can we have two public classes in one java file?',
	options:['False ','True',' ',' '],
	answer:0
},

{
	q:'Which of the following is true about protected access modifier? ',
	options:['Variables, methods and constructors which are declared protected can be accessed by any class. ','Variables, methods and constructors which are declared protected can be accessed by any class lying in same package.','Variables, methods and constructors which are declared protected in the superclass can be accessed only by its child class.','None of the Above'],
	answer:1
},


{
	q:'What is Encapsulation? ',
	options:['Encapsulation is a technique to define different methods of same type. ','Encapsulation is the ability of an object to take on many forms.','Encapsulation is the technique of making the fields in a class private and providing access to the fields via public methods. ','None of the Above '],
	answer:2
},


{
	q:'What is Set Interface? ',
	options:['Set is a collection of element which contains elements along with their key. ','Set is a collection of element which cannot contain duplicate elements.',' Set is a collection of element which contains hashcode of elements. ',' Set is a collection of element which can contain duplicate elements.'],
	answer:1
},



{
	q:'When static binding occurs?',
	options:['Static binding occurs during load time. ','Static binding occurs during Compile time.',' Static binding occurs during runtime. ','None of the above.'],
	answer:1
},




{
	q:'What is Serialization?',
	options:['Serialization is the process of writing the state of an object to another object. ','Serialization is the process of writing the state of an object to a byte stream.',' Both of the above.','None of the above'],
	answer:1
},




{
	q:'What will happen if static modifier is removed from the signature of the main method?',
	options:['Compilation Error.','RunTime Error: NoSuchMethodError','Program will compile and run without any output.','Program will compile and run to show the required output.'],
	answer:1
},




{
	q:'which operator is considered to be with highest precedence?',
	options:['() , []','= ','?: ','	% '],
	answer:0
},




{
	q:'java.util.Collections is a:',
	options:['Interface','Object','Collection','Class'],
	answer:3
},

{
	q:'Which allows the storage of a null key and null values?',
	options:['Hashtable','Object','HashMap','None of the above'],
	answer:3
},




{
	q:'Which of those does not have an index based structure? ',
	options:['Array','Map','List','Set '],
	answer:3
},

{
	q:' Methods such as reverse, shuffle are offered in:',
	options:['Object','Collection',' Collections', ' Apache Commons Collections'],
	answer:2
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
