// State management  
let stage = "initial";  
let redClickCount = 0;  

// DOM elements  
const mainImage = document.getElementById('main-image');  
const mainText = document.getElementById('main-text');  
const initialButton = document.getElementById('initial-button');  
const greenButton = document.getElementById('green-button');  
const redButton = document.getElementById('red-button');  
const finalMessage = document.getElementById('final-message');  

// Image paths  
const images = {  
  1: '1.jpg',  
  2: '2.jpg',  
  3: '3.jpg',  
  4: '4.jpg',  
  5: '5.jpg',  
  6: '6.jpg',  
  7: '7.jpg',  
  8: '8.jpg',  
  9: '9.jpg',  
  10: '10.jpg',  
  11: '11.jpg',  
  12: '12.jpg',  
  13: '13.jpg',  
  14: '14.jpg'  
};  

// Text for each red click  
const redClickTexts = {  
  1: "တစ်ကယ်ကြီးပေါ့",  
  2: "မှားနိပ်မိနေတာလား",  
  3: "နိပ်ရမဲ့ဟာကဘေးမှာလေ",  
  4: "မသနားဘူးလား",  
  5: "လွမ်းရဲ့သားနဲ့ ဟန်ဆောင်မနေပါနဲ့",  
  6: "နည်းနည်းတော့လွမ်းတယ်ထားလိုက်",  
  7: "ရုပ်လေးနဲ့မလိုက် ရက်စက်လိုက်တာ",  
  8: "နှိပ်လို့လွယ်တာလေးကိုပဲ နှိပ်လိုက်ပါ",  
  9: "ရအောင်နှိပ်စမ်းပါ",  
  10: "အခုတော့ button မကျန်တော့ဘူးနော်"  
};  

// Handle clicks  
function handleInitialClick() {  
  stage = "question";  
  updateUI();  
}  

function handleGreenClick() {  
  stage = "success";  
  updateUI();  

  // 🎉 Confetti effect (party poppers)
  confetti({
    particleCount: 500,
    spread: 75,
    origin: { y: 0.6 },
    colors: ['#ff4081', '#ffd700', '#7b5cff', '#4caf50']
  });
}  

function handleRedClick() {  
  redClickCount++;  
  if (stage === "question" && redClickCount === 1) {  
    stage = "pleading";  
  }  
  updateUI();  
}  

// Button scales  
function getRedButtonScale() {  
  const shrinkFactor = Math.max(0, 1 - redClickCount * 0.12);  
  return shrinkFactor;  
}  

function getGreenButtonScale() {  
  if (stage === "question") return 1;  
  const growFactor = 1 + redClickCount * 0.12;  
  return growFactor;  
}  

// Define custom red-click image order  
const redClickImageOrder = {  
  0: 8,   // starting image  
  1: 2,  
  2: 4,  
  3: 3,  
  4: 6,  
  5: 7,   // 5th click now fixed to show image 7
  6: 2,  
  7: 10,  
  8: 13,  
  9: 14  
};  

// Update UI  
function updateUI() {  
  // Update image  
  if (stage === "initial") {  
    mainImage.src = images[redClickImageOrder[0]];  
  } else if (stage === "question") {  
    mainImage.src = images[1];  
  } else if (stage === "success") {  
    mainImage.src = images[5];  
  } else if (stage === "pleading" && redClickCount > 0) {  
    const imageNum = redClickImageOrder[Math.min(redClickCount, 9)];  
    if (imageNum) mainImage.src = images[imageNum];  
  }  

  // Update text  
  if (stage === "initial") {  
    mainText.textContent = "စိတ်ထည်းရှိတဲ့အတိုင်းနှိပ်နော်";  
  } else if (stage === "question") {  
    mainText.textContent = "မနေ့ကတစ်နေကုန်စကား မပြောဖြစ်တာကို လွမ်းနေတာမလား";  
  } else if (stage === "success") {  
    mainText.textContent = "အခုလို လွမ်းနေတယ်ဆိုတာသိနေတယ်လေ";  
  } else if (stage === "pleading" && redClickCount > 0) {  
    mainText.textContent = redClickTexts[redClickCount] || redClickTexts[10];  
  }  

  // Update buttons visibility  
  if (stage === "initial") {  
    initialButton.style.display = "block";  
    greenButton.style.display = "none";  
    redButton.style.display = "none";  
  } else if (stage === "question" || stage === "pleading") {  
    initialButton.style.display = "none";  
    greenButton.style.display = "block";  
    greenButton.style.transform = `scale(${getGreenButtonScale()})`;  

    if (redClickCount < 10) {  
      redButton.style.display = "block";  
      redButton.style.transform = `scale(${getRedButtonScale()})`;  
    } else {  
      redButton.style.display = "none";  
    }  
  } else if (stage === "success") {  
    initialButton.style.display = "none";  
    greenButton.style.display = "none";  
    redButton.style.display = "none";  
  }  

  // Final message after 10 clicks  
  if (redClickCount >= 10) {  
    finalMessage.style.display = "block";  
  } else {  
    finalMessage.style.display = "none";  
  }  
}  

// Initialize  
updateUI();
