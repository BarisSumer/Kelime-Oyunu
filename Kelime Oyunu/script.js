const question = document.getElementById("question")
const input = document.getElementById("inputText")
const answer = document.getElementById("answer");
const questionPuanDiv = document.getElementById("questionPuan")
const totalPuanDiv = document.getElementById("totalPuan")
const display = document.getElementById("time")
const gonder = document.getElementById("gonder")
const harfAl = document.getElementById("harfAl")
const inputText = document.getElementById("inputText")
let gameOver = false
let interval
let intervalId



answer.style.display = 'flex'

const questionsAndAnswer1 = [
    ["Alt açıları eşit olan üçgenlerin kenarlarını niteleyen sıfat","ikiz"],
    ["İkizkenar bir üçgende eşit kenarların keşişme noktası","tepe"],
    ["Çiçekli bitkilerin döllenme aracı olan toz","polen"],
    ["Birine veya bir şeye yüksek değer vermekten doğan duygu","saygı"],
    ["Otomobil alınıp satılan yer","galeri"],
    ["Saz şairi düellosu","atışma"],
    ["Yüksek bir ülkü uğrunda ölme anlamındaki sözcük","şehadet"],
    ["Çalgılı meyhane anlamındaki italyanca kökenli bir sözcük","taverna"],
    ["Topu potaya çarptırmadan yapılan atış","deliksiz"],
    ["Yemeğe yapılan, çiğ olarak tüketilen, pirpirim de denen bir sebze","semizotu"],
    ["Kepek ve taneciklerin bütünüyle öğütülmesiyle elde edilen un","tambuğday"],
    ["Hangi tarihte sona ereceği bilinen zaman","sayılıgün"],
    ["Sesi duymadan, ağız hareketlerinin anlattığını anlama","dudakokuma"],
    ["Özellikleri veya yaptıklarıyla üstün sayılan biri veya bir şeyden daha üstün olduğunu kanıtlama","taşçıkarma"], 
    ["",""]  
]

const questionsAndAnswer2 = [
  ["Akla ve gerçeğe aykırı ya da yersiz, gereksiz, boş anlamlarındaki söz","abes"],
  ["Anne yamağı","abla"],
  ["Çiçekli bitkilerin döllenme aracı olan toz","polen"],
  ["Birine veya bir şeye yüksek değer vermekten doğan duygu","saygı"],
  ["Otomobil alınıp satılan yer","galeri"],
  ["Saz şairi düellosu","atışma"],
  ["Yüksek bir ülkü uğrunda ölme anlamındaki sözcük","şehadet"],
  ["Çalgılı meyhane anlamındaki italyanca kökenli bir sözcük","taverna"],
  ["Topu potaya çarptırmadan yapılan atış","deliksiz"],
  ["Yemeğe yapılan, çiğ olarak tüketilen, pirpirim de denen bir sebze","semizotu"],
  ["Kepek ve taneciklerin bütünüyle öğütülmesiyle elde edilen un","tambuğday"],
  ["Hangi tarihte sona ereceği bilinen zaman","sayılıgün"],
  ["Sesi duymadan, ağız hareketlerinin anlattığını anlama","dudakokuma"],
  ["Özellikleri veya yaptıklarıyla üstün sayılan biri veya bir şeyden daha üstün olduğunu kanıtlama","taşçıkarma"], 
  ["",""]  
]


const questionsAndAnswerAll = [questionsAndAnswer1,questionsAndAnswer2]
let randomQuestion = getRandomIntInclusive(0,questionsAndAnswerAll.length-1)
let questionsAndAnswer = questionsAndAnswerAll[randomQuestion]

let level = 0
let totalPuan = 0
let questionPuan = 0
let fiveMinutes = 60 * 4

let shuffledArray = shuffleArray(questionsAndAnswer[level][1].split(''))


function gameStart(){
    
    question.textContent = questionsAndAnswer[level][0]
    questionPuan = (questionsAndAnswer[level][1].length) * 100
    questionPuanDiv.textContent = questionPuan
    createAnswerDivs()
    startTimer(fiveMinutes,display)    
        
}

function gameOverFunction(){
    if(level == 14){
        gameOver = true    
    }
}

gameStart()

function showAnswer(){
    for(let i = 0; i < questionsAndAnswer[level][1].length; i++){
        const div = document.getElementById(`div-${i}`)
        div.textContent = questionsAndAnswer[level][1].charAt(i)
    }      
}



function checkWord() {

        showAnswer()
        
          interval = setInterval(function () {
          const inputWord = input.value;
          const currentQuestion = questionsAndAnswer[level][1];
        
          if (inputWord === currentQuestion) {
            totalPuan += questionPuan;
            level++;
          } else {
            totalPuan -= questionPuan;
            level++;
          }
        
          totalPuanDiv.textContent = totalPuan;
          questionPuan = (questionsAndAnswer[level][1].length) * 100;
          questionPuanDiv.textContent = questionPuan;
          question.textContent = questionsAndAnswer[level][0];
          removeAnswerDivs();
          createAnswerDivs();
          shuffledArray = shuffleArray(questionsAndAnswer[level][1].split(''));
          
          inputText.value = ""
          
          gameOverFunction()
          console.log(level)
  
        }, 2000);
        
       
          if(gameOver == true){
            gonder.disabled = true
            harfAl.disabled = true       
        }
        

        console.log(level)
       
       
  }

function checkTimer(){
    setTimeout(() => {
      clearInterval(interval)
      
    }, 2000);
   
}
  


function createAnswerDivs() {
  
    const answerLength = questionsAndAnswer[level][1].length;
  
    
    const fragment = document.createDocumentFragment();
  
    
    for (let i = 0; i < answerLength; i++) {

      const div = document.createElement('div');
      div.id = "div-" + i
      div.style.border = "2px solid red"
      div.style.display = "flex"
      div.style.justifyContent ="center"
      div.style.alignItems ="center"
      div.style.fontSize = "30px"
      
    
      
      fragment.appendChild(div);

      
    }
   
    answer.appendChild(fragment);
  }



  
  function removeAnswerDivs() {
    const answerDivs = document.querySelectorAll('#answer div');
    answerDivs.forEach(div => div.remove());
  }
  



  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
 
  

function getRandomLetter(){
  questionPuan -= 100
  
  questionPuanDiv.textContent = questionPuan
  
  const correctAnswer = questionsAndAnswer[level][1]

  const randomLetter = shuffledArray[0]
  
  let indices = []
  
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] === randomLetter && !document.getElementById(`div-${i}`).textContent) {
      
      indices.push(i)
    }
  }
  
  if (indices.length > 0) {
    const randomIndex = Math.floor(Math.random() * indices.length)
    const div = document.getElementById(`div-${indices[randomIndex]}`)
    div.textContent = randomLetter
  }
  
  shuffledArray.shift()
  
}

 
  
  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
        intervalId= setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (--timer < 0) {
            timer = duration;
            display.textContent ="süre bitti"
            gonder.disabled = true
            harfAl.disabled = true
            clearInterval(intervalId)
        }
        

        if(gameOver == true){
            clearInterval(intervalId)
            display.textContent = "Oyun Bitti"
        }
    }, 1000);
  }


  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max ve min dahil olmak üzere rastgele tam sayı
  }


 
  
  


 


  
  
  




  
  



 
 


  
  
  



 


  

  





  






  
  
  
  
  
















