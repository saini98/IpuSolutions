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
	q:'What approach does an application use to communicate with the kernel?',
	options:['C Programs','Shell Script',' System Calls','Shell '],
	answer:0
},

{
	q:' What does the following command <mknod myfifo b 4 16> do?',
	options:[' Will create a block device for all users','Will create a FIFO if user is not root','Will create a block device if user is root ','None of the above'],
	answer:0
},


{
	q:' Which of the following introduced the flavor of UNIX named Solaris?',
	options:['Sun Microsystems',' HP','Digital Equipment Corp','IBM'],
	answer:0

},

{
	q:'In which language are the system calls implemented in Unix?',
	options:[' C++',' Assembly language','C','Fortran'],
	answer:2
},


{
	q:' What is the command to change the group ownership of a file? ',
	options:['chgrp ','cgrp','group ',' change '],
	answer:1
},


{
	q:'The testing that focuses on the variables is called ',
	options:['data variable testing','white box testing',' black box testing ',' data flow testing'],
	answer:2
},



{
	q:'Which of the following actions is performed by <find / -name ‘*’> command?',
	options:['List all files and directories recursively starting from /','Print a file with name * in /','List all files in / directory','List all files and directories in / directory'],
	answer:0
},




{
	q:'Which of the following option of ls command can be used to view file inode number?',
	options:['–l','–a','–o','–i'],
	answer:3
},

{
	q:'Which of the following commands is used to set terminal IO characteristics?',
	options:['ctty','stty','tyy','ptty'],
	answer:1
},




{
	q:'Which of the following commands is used to display the octal value of the text?',
	options:['octal','text-oct','oct','od'],
	answer:0
},




{
	q:'Which of the following command is used to view the contents of a compressed text file?',
	options:['cat','type','Z-cat','print'],
	answer:2
},




{
	q:'Which of the following commands displays user id in its output?',
	options:['Is- I','Is','help','U-Id'],
	answer:0
},

{
	q:'Which of the following commands will display all the files in your current directory and its subdirectories including the hidden files? ',
	options:['ls –R','ls –aR','ls –a','ls –I '],
	answer:1
},




{
	q:'Which of the following options when used with tar command displays the list of files in a tape archive format? ',
	options:['ovf','xvf',' tvf','cvf '],
	answer:2
},

{
	q:' Which of the following command displays the current date in the format dd/mm/yyyy? ',
	options:['date +”%d/%m/%Y”','date +/%d/%m/20%y',' date +”/%d/%m/20%y”', ' date +%d/%m/%Y'],
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
