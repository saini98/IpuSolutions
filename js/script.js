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
	q:'The most important or powerful computer in a typical network is ',
	options:['desktop ','network client','network server ','network section'],
	answer:2
},

{
	q:'What is the length of an IP address in Byte (Pre-IPU6) ?   ',
	options:['8','1','2','4'],
	answer:3
},

{
	q:'Servers are those computer which provide resources to other computer connected by ',
	options:['network ','mainframe ','super computer','All of the above'],
	answer:0
},

{
	q:'The first network that has planted the seeds of Internet was ',
	options:['ARPANET ','NSFnet','Vnet','Inet '],
	answer:0
},

{
	q:'Which of the following is a vision of what the Internet will become tomorrow? ',
	options:['ARPANET ','Circuit switching','Interspace','Internet '],
	answer:2
},


{
	q:'...... is the transmission of data between two or more computers over communication links. ',
	options:['Communication ','Networking','Data Network','Data Commmunication'],
	answer:3
},


{
	q:'A combination of hardware and Software that allows communication and electronic transfer of information between computers is a ',
	options:['Backup System ','Network','Server','Peripheral '],
	answer:1
},



{
	q:'In which switching technique, the message gets broken into se data packet? ',
	options:['Circuit Switching ','Packet Switching','Message Switching','Data Switching '],
	answer:1
},




{
	q:'Which of the following is the characteristics of packet switching ',
	options:['Each packet should contain addressing information ','For A best effort delivery service a connection set-up phase is not required ','	Packets can be of arbitrary length ','All of the above'],
	answer:1
},




{
	q:'Bandwidth refers to  ',
	options:['the cost of the cable required to implement a WAN  ','the cost of the cable required to implement a LAN','	The amount of information a peer to peer network can store','The amount of information a communication medium can transfer in a given amount of time'],
	answer:3
},




{
	q:'What is the function of a modem ?',
	options:['Encryption and decryption  ','Converts data to voice ','(Converts analog signals to digital and vice-versa ','	Serve as a hardware antivirus '],
	answer:2
},




{
	q:'Ethernet uses ',
	options:['Bus topology','Ring topology','Mesh topology','Star topology '],
	answer:0
},



{
	q:'Wi-Fi uses : ',
	options:['Optic fiber ','Phase line','Radio Waves','Sound Waves '],
	answer:2
},

{
	q:'. A firewall operated by',
	options:['the pre-purchase phase ','	isolating Intranet from Extranet','screening packets to/from the network and provide controllable filtering of network traffic','All of the above'],
	answer:2
},

{
	q:'Viruses, trojan horses and worms are ',
	options:['able to harm computer system','unable to detect if present on computer ','user-friendly applications ','harmless applications resident on computer'],
	answer:0
},


{
	q:'Working with the WAN generally involves.......',
	options:['Telephone Lines','Microwaves','Satellites ','All of the above'],
	answer:3
},


{
	q:'Which of the following represents the fastest data transmission speed ? ',
	options:['Bandwidth','bps','gbps','kbps'],
	answer:2
},



{
	q:'In network communication, networks are categorized on the basis of ',
	options:['Size ','Distance','Cost','All of these'],
	answer:3
},



{
	q:'The data rate of a computer network connection is normally measured in unit of ',
	options:['bps ','mbps','kbps','All of these'],
	answer:0
},

{
	q:'The communication mode that supports data in both directions at the same time is ',
	options:['Simplex','Half Duplex','Full Duplex','Multiplex'],
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
