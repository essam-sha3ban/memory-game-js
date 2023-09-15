document.querySelector(".login-game span").onclick = function () {
  let yourName = prompt("what is your name ?");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "gust";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".login-game").remove();
};

//create main  variable
let duration = 1000;
let memoryBlock = document.querySelector(".memory-block");

let blocks = Array.from(memoryBlock.children);

let orderRange = [...Array(blocks.length).keys()];
//console.log(orderRange)
shuffle(orderRange);
//console.log(orderRange)

//add  css property order to block game
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
//add click event
  block.addEventListener('click',function(){
    //trigger flip function
    flipBlock(block)
//collect all flipped cards
let allFlippedBlock=blocks.filter(flipBlock=>flipBlock.classList.contains('is-flipped'));
//if theres tow selected
if(allFlippedBlock.length==2){

//stop clicking function
stopClicking()
//check matched block  function

checkMatchedBlock(allFlippedBlock[0],allFlippedBlock[1])

}
  })
});


//flip  function
function flipBlock(selectBlock){
  selectBlock.classList.add('is-flipped')
}

//stop click function
function stopClicking(){
  //add class stop to main container
  memoryBlock.classList.add("no-clicking")
//remove class stop after duration
  setTimeout(()=>{
    memoryBlock.classList.remove("no-clicking")
  },duration)
}
//check matched block

function checkMatchedBlock(firstBlock,secondBlock){
let triesElement=document.querySelector(".tries span")

if(firstBlock.dataset.techno===secondBlock.dataset.techno){
  firstBlock.classList.remove("is-flipped");
  secondBlock.classList.remove("is-flipped")

  firstBlock.classList.add("has-matched")
  secondBlock.classList.add("has-matched")
  document.getElementById("suc").play()
}
else{
  triesElement.innerHTML=parseInt(triesElement.innerHTML)+1;
  setTimeout(()=>{
    firstBlock.classList.remove("is-flipped")
    secondBlock.classList.remove("is-flipped") 
  },duration)
  document.getElementById("filed").play()
  
}
}
//shuffle function

function shuffle(array) {
  //setting var
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);

    //decrease length by one
    current--;

    //[1] sava current element in stash
    temp = array[current];
    //[2]current element=random element
    array[current] = array[random];
    //[3]random element =get element in stash
    array[random] = temp;

    return array;
  }
}
