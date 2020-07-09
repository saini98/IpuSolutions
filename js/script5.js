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
	q:'Assembly language',
	options:['uses alphabetic codes in place of binary numbers used in machine language','is the easiest language to write programs','need not be translated into machine language ','None of the above. '],
	answer:0
},

{
	q:'In computers, subtraction is generally carried out by',
	options:[' 9’s complement','2’s complement','1’s complement ','10’s complement'],
	answer:1
},

{
	q:'The circuit used to store one bit of data is known as',
	options:['Register','Encoder','Flip Flop',' Decoder'],
	answer:2
},

{
	q:'(2FAOC) 16 is equivalent to',
	options:['(195 084)','(001011111010 0000 1100)',' Both (A) and (B)','None of the Above '],
	answer:1
},

{
	q:'In Reverse Polish notation, expression A*B+C*D iswritten as'
	options:['A*BCD*+','AB*CD*+','AB*CD+*',' A*B*CD+'],
	answer:1
},


{
	q:'17. If memory access takes 20 ns with cache and 110 nswith out it, then the ratio (cache uses a 10 ns memory) is',
	options:['93% ',' 87%',' 88%',' 90% '],
	answer:3
},


{
	q:'Cache memory acts between',
	options:['CPU and RAM  ',' CPU and Hard Disk',' CPU and SSD',' RAM and ROM '],
	answer:0
},



{
	q:'When CPU is executing a Program that is part of the Operating System, it is said to be in',
	options:['Interrupt mode ',' Simplex mode',' Half mode ','System mode '],
	answer:3
},




{
	q:'A three input NOR gate gives logic high output only when',
	options:['one input is high ','one input is low','two input are low ','all input are high'],
	answer:3
},




{
	q:'n bits in operation code imply that there are___________ possible distinct operators ',
	options:['n2','n2','2n ','2n.'],
	answer:1
},




{
	q:'A microprogram sequencer',
	options:['generates the address of next micro instruction to be executed.',' generates the control signals to execute a microinstruction.','sequentially averages all microinstructions in the control memory','	enables the efficient handling of a micro program subroutine. '],
	answer:0
},




{
	q:'Status bit is also called',
	options:['Unsigned bit','Binary bit','Flag bit','Signed bit'],
	answer:1
},

{
	q:'The 2s compliment form (Use 6 bit word) of the number 1010 is',
	options:['111100','1011','110110','110111'],
	answer:2
},




{
	q:'In Assembly language programming, minimum number of operands required for an instruction is/are ',
	options:[' Zero.','One','Two','Both (B) & (C)  '],
	answer:0
},
{
	q:'In a program using subroutine call instruction, it is necessary______.',
	options:[' initialize program counter.','Reset the microprocessor','Clear the instruction register','Clear the accumulator '],
	answer:2
},

{
	q:'Which memory unit has lowest access time? ',
	options:[' Cache.','Registers','Main Memory','Magnetic Disk  '],
	answer:1
}

{
	q:' A k-bit field can specify any one of_____.',
	options:['3k registers','k2 registers',' k3 registers', ' 2k registers'],
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
