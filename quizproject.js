let currentQuestion = 0;
let score = 0;
let score1 = 0;
let timeleft = -1;
let timer; //this will be the timer function
let numHintsLeft = 2; 
let streak = 0; //off
let questions = [
   {
	"question": "Which country invented ice-cream?",
	"a": "Amercia",
	"b": "China",
	"c": "New Zealand",
	"d": "Switzerland",
	"image":"quizimages/q1.jpg",
	"answer": "b",
	"hint": "King Tang of Shang had 94 men to create the first ice cream..."
   },
   {
	"question": "Which type of tea is naturally caffeine-free?",
	"a": "White tea",
	"b": "Red tea",
	"c": "Black tea",
	"d": "Green tea",
	"image":"quizimages/q2.jpg",
	"answer": "b",
	"hint": "Rooibos tea has no caffeine because it is a herbal tea..."
   },
      {
	"question": "A squid has ______ an octopus.",
	"a": "Less arms than",
	"b": "The same amount of arms as",
	"c": "More arms than",
	"d": "More hearts than",
	"image":"quizimages/q3.jpg",
	"answer": "c",
	"hint": "Squids use their tentacles to hunt while octopuses use their arms to move..."
   },
   {
	"question": "How many days are there in a fortnight?",
	"a": "2 days",
	"b": "4 days",
	"c": "12 days",
	"d": "14 days",
	"image":"quizimages/q4.jpg",
	"answer": "d",
	"hint": "Fortnight is the space of fourteen nights and days..."
   },
      {
	"question": "Which of the following Which of the following mattress sizes is the smallest?",
	"a": "Twin",
	"b": "Queen",
	"c": "Full",
	"d": "King",
	"image":"quizimages/q5.jpg",
	"answer": "a",
	"hint": "The Full is wider than the Twin..."
   },
   {
	"question": "What is the rarest M&M colour?",
	"a": "Orange",
	"b": "Yellow",
	"c": "Red",
	"d": "Brown",
	"image":"quizimages/q6.jpg",
	"answer": "d",
	"hint": "The low saturation colour between red and yellow seems to have the rarest M&M colour..."
   },
      {
	"question": "What is the most consumed manufactured drink in the world?",
	"a": "Coca Cola",
	"b": "Orange juice",
	"c": "Apple Juice",
	"d": "Tea",
	"image":"quizimages/q7.jpg",
	"answer": "d",
	"hint": "More than half of the American population drinks tea on a daily basis..."
   },
   {
	"question": "Which of the following food is safe to feed a dog?",
	"a": "Tomatoes",
	"b": "Onions",
	"c": "Cucumbers",
	"d": "Grapes",
	"image":"quizimages/q8.jpg",
	"answer": "c",
	"hint": "It is long, it is crunchy and juicy, and it is a tasty snack for dogs..."
   },
      {
	"question": "Pixar has made movies about all of the following objects except?",
	"a": "Plants",
	"b": "Toys",
	"c": "Robots",
	"d": "Cars",
	"image":"quizimages/q9.jpg",
	"answer": "a",
	"hint": "Toy Story, Wall-E, Cars..."
   },
   {
	"question": "Which of the following mammal that really can’t jump?",
	"a": "Sloth",
	"b": "Rhino",
	"c": "Hippo",
	"d": "Elephant",
	"image":"quizimages/q10.jpg",
	"answer": "d",
	"hint": "It would be hard to jump when you are so big and heavy..."
   }
 ];
 
 function reStart() {
	location.href = 'index.html';
 }
 
 function endScreen (){
	 let score1 = localStorage.getItem("myValue");
	    document.getElementById("endscore").innerHTML = "Your final score is " + score1 + " / " + questions.length + "!!!";
		
		if (score1 >= questions.length){
			document.getElementById("endreply").innerHTML = "Unbelievable!! Your random knowledge is over-the-top! Give yourself a pad on the back for your awesome score-";
		}
		
		else if (score1 >= 5){
			document.getElementById("endreply").innerHTML = "Woo! Your random knowledge is on point! Who knows what you will do with those knowledge, but it sure is good to have them.";
		}
		
		else if (score1 <= 0){
			document.getElementById("endreply").innerHTML = "Oh... Do not be sad. Next time, try answering questions within time, and use the hints at your adventage.";
		}
		
		else if (score1 <=5) {
			document.getElementById("endreply").innerHTML = "Not bad. After all, it is not necessary to know those. You will for sure get a better score next time~";
		}
		
 }
 
 function loadQuestion() {
     document.getElementById("score").innerHTML = score + " / " + questions.length;
	 //if timer is running from previous question, stop it
	 if (timeleft >= 0 ){
		 clearInterval(timer);
	 }
	 
	 
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
     
	
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
	
	//display the current question number
       document.getElementById("currentqst").innerHTML = "You are currently at question " + [currentQuestion+1] + ".";
	
       document.getElementById("hintsleft").innerHTML = "You have " + [numHintsLeft] + " hint left.";

 } // loadQuestion
 
 
 function markIt(ans) {
     
    let message = "";
	if ( (streak == 1) && (ans == questions[currentQuestion].answer) ){
		score++;
		score++;
		document.getElementById("score").innerHTML = score + " / " + questions.length;
		message="Correct!! You are on a streak! An extra point is gained. Your score is " + score + " / " + questions.length;
	}
	
    else if (ans == questions[currentQuestion].answer) {
        streak = 1;
       // add 1 to score
       score++;
       
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "Correct!! Your score is " + score + " / " + questions.length;
    } 
	
	else if ((ans!== questions[currentQuestion].answer) && (score >= 1) ){
		score--;
		message= "Incorrect. Minus one score. Your score is "+ score + " / " + questions.length;
		streak = 0;
	}
	
	
	
	else {

       message = "Incorrect. Your score doesn't change. " + score + " / " + questions.length; 
	   streak = 0;
    } // else
        
   
    
    // move to the next question
    currentQuestion++;
	timeleft = 10;
    if (currentQuestion >= questions.length) {
       // create a special message
	   localStorage.setItem("myValue", score);
       message = "End of quiz. Loading to ending screen in 3 seconds ...";
	   setTimeout(function() { location.href = 'end.html'; }, 3000);
		
    } else {
		timeleft = 0;
       loadQuestion();
    }
    
    // show the lightbox
	if (currentQuestion<questions.length){
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
	}
	
	else{
		document.getElementById("lightbox2").style.display = "block";
	    document.getElementById("message2").innerHTML = message;
	}
  
 }  // markIt
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
	
	//if a new question is loaded, start the timer when lightbox closes
	if ((currentQuestion<=questions.length - 1) && (timeleft<=0) ) {
		startTimer();
	}
	

	
 } // closeLightbox
 
 //start the timer for th ecurrent question
 function startTimer(){
	 timeleft= 10;
	 timer = setInterval ( function(){
		 document.getElementById("countdown").innerHTML = timeleft;
		 timeleft--;
		 
		 if (timeleft < 0){
			 clearInterval(timer);
			 
			 //unhide the light box with hint
			 let message= "Time over. Minus one score, try answering within time!"
			 document.getElementById("lightbox").style.display = "block";
			 document.getElementById("message").innerHTML = message;  			 
			 currentQuestion++;
			 score--;
			 
			 if (currentQuestion< questions.length){
			 loadQuestion();
			} 
			
			else {
			message = "End of quiz. Loading to ending screen in 3 seconds ...";
					document.getElementById("lightbox2").style.display = "block";
	        document.getElementById("message2").innerHTML = message;
	        setTimeout(function() { location.href = 'end.html'; }, 3000);	
			}
			
		 }
		 


		 
		 
	 }, 1000 );
	 
 } //startTimer
 
 
 
 
  function showHint(){
	  
	  //get hint from currentQuestion
	  let message = questions[currentQuestion].hint;
	  
	  if (numHintsLeft > 0){
		  message = questions[currentQuestion].hint;
		  numHintsLeft--;
		  document.getElementById("hintsleft").innerHTML = "You have " + [numHintsLeft] + " hint left.";
	  } else{
		  message = "Sorry, there are no hints left.";
	  }
	  
	  
	  //unhide the light box with hint
	  document.getElementById("lightbox").style.display = "block";
	  document.getElementById("message").innerHTML = message;
	  
	
  }  //showHint