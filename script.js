const body = document.getElementById("body");
const main = document.getElementById("main");
const horse = document.getElementById("horse");
const dog = document.getElementById("dog");
const duck = document.getElementById("duck");
const chick = document.getElementById("chick");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const neigh = document.getElementById("neigh");
const woof = document.getElementById("woof");
const quack = document.getElementById("quack");
const cluck = document.getElementById("cluck");
let reset = false;
const runners = {
  horse: {
    name: "Horse",
    id: horse,
    voice: new Audio("./sounds/neigh.wav"),
    img: "./Horse.gif",
    step: 70,
    position: 0,
    won: 0,
  },
  dog: {
    name: "Dog",
    id: dog,
    voice: new Audio("./sounds/woof.wav"),
    img: "./Dog.gif",
    step: 50,
    position: 0,
    won: 0,
  },

  duck: {
    name: "Duck",
    id: duck,
    voice: new Audio("./sounds/quack2.wav"),
    img: "./Duck.gif",
    step: 40,
    position: 0,
    won: 0,
  },
  chick: {
    name: "Chick",
    id: chick,
    voice: new Audio("./sounds/cluck.wav"),
    img: "./Chick.gif",
    step: 30,
    position: 0,
    won: 0,
  },
};
let animals = [];
let animals2 = [];
for (const runner in runners) {
  animals.push(runners[runner]);
}
function showWinner(animal) {
  main.style.display = "none";
  body.innerHTML += `<div id="winner-alert" class="d-flex vh-100 vw-100 justify-content-center align-items-center text-center" style="background: radial-gradient(ellipse at center, #000000 0%, #000000 0%, #7B7B7B 100%)">
    <div class="d-flex flex-column align-items-center text-bg-light border border-dark border-5" style="box-shadow: 5px 5px 15px 5px #000000;">
      <h1 class= "m-2">The ${animal.name} Won!!!!</h1>
  <img src="${animal.img}" style="height: 200px; width: 200px" alt="">
  <button type="button" class="btn btn-info mb-2 mx-5" onclick="returnToGame()">Play Again</button>
    </div>
  </div>`;
  //   body.innerHTML += `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  //   <div class="modal-dialog">
  //     <div class="modal-content">
  //       <div class="modal-header">
  //         <h5 class="modal-title" id="exampleModalLabel">THE ${animals[index].name} WON!!!!</h5>
  //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //       </div>
  //       <div class="modal-body">
  //         <img src="${animals[index].img} style= "height: 200px; width: 200px"
  //       </div>
  //       <div class="modal-footer">
  //         <button type="button" class="btn btn-primary">Reset</button>
  //       </div>
  //     </div>
  //   </div>
  // </div>`;
  //   const myModal = new bootstrap.Modal(
  //     document.getElementById("myModal"),
  //     options
  //   );
  //   myModal.show();
}
function showIfPlayerWon(picked) {
  main.style.display = "none";
  body.innerHTML += `<div id="winner-alert" class="d-flex vh-100 vw-100 justify-content-center align-items-center text-center" style="background: radial-gradient(ellipse at center, #000000 0%, #000000 0%, #7B7B7B 100%)">
    <div class="d-flex flex-column align-items-center text-bg-light border border-dark border-5" style="box-shadow: 5px 5px 15px 5px #000000;">
      <h1 class= "m-2">The ${picked.name} Won!!!!</h1>
      <h2 class="m-2"> That Means That YOU Won!! Good Job </h2>
  <img src="${picked.img}" style="height: 200px; width: 200px" alt="">
  <button type="button" class="btn btn-info mb-2 mx-5" onclick="returnToGame()">Play Again</button>
    </div>
  </div>`;
}
function returnToGame() {
  document.location.reload();
}

function randomAnimal() {
  let random = Math.floor(Math.random() * Object.keys(runners).length);

  return random;
}
function clearBorder(animal) {
  animal.id.style.border = "";
  animal.id.style.borderRadius = "";
}

function highlightAnimal(index) {
  animals[index].id.style.border = "8px inset #FF0054";
  animals[index].id.style.borderRadius = "40px";
  // clearBackgroundColor(index);
  return animals[index];
}
function setButtons() {
  if (reset) {
    startBtn.style.display = "none";
    resetBtn.style.display = "";
  }
  if (!reset) {
    resetBtn.style.display = "none";
    startBtn.style.display = "";
  }
}
setButtons();

function run(index) {
  animals[index].position += animals[index].step;
  animals[index].id.style.left = animals[index].position + "px";
}
function cry(index) {
  let voice = animals[index].voice;
  voice.play();
}
function renderPage() {
  for (const animal of animals) {
    animal.id.style.left = animal.position;
  }
  // if (localStorage.getItem("animals")) {
  //   animals = JSON.parse(localStorage.getItem("animals"));
  //   console.log(animals);
  // }
}
function resetAnimals() {
  for (const animal of animals) {
    animal.position = 0;
    clearBorder(animal);
  }
  clearInterval(myInterval);
  clearTimeout(MySetTimeout);
  clearTimeout(MySetTimeout2);
  clearTimeout(MySetTimeout3);
  clearTimeout(MySetTimeout4);

  renderPage();
}
function updateWinnings() {
  for (const animal of animals) {
    if (animal.position >= innerWidth - 200) {
      animal.won++;
    }
  }
}
function checkWinner(picked) {
  updateWinnings();
  // saveWinner();

  if (picked.position >= window.innerWidth - 200) {
    showIfPlayerWon(picked);
    return;
  }
  for (const animal of animals) {
    if (animal.position >= window.innerWidth - 200) {
      showWinner(animal);
    }
  }
}
let myInterval;
let MySetTimeout;
let MySetTimeout2;
let MySetTimeout3;
let MySetTimeout4;
startBtn.addEventListener("click", function () {
  let picked = highlightAnimal(randomAnimal());
  reset = true;
  setButtons();

  myInterval = setInterval(function () {
    switch (randomAnimal()) {
      case 0:
        let percentage = Math.random();
        if (percentage < 0.416) {
          MySetTimeout = setTimeout(() => {
            run(0);
          }, 3000);
          setTimeout(() => {
            cry(0);
          }, 3000);
        }
        break;

      case 1:
        let percentage2 = Math.random();
        if (percentage2 < 0.58) {
          MySetTimeout2 = setTimeout(() => {
            run(1);
          }, 2000);
          setTimeout(() => {
            cry(1);
          }, 2000);
        }
        break;
      case 2:
        let percentage3 = Math.random();
        if (percentage3 < 0.75) {
          MySetTimeout3 = setTimeout(() => {
            run(2);
          }, 1000);
          setTimeout(() => {
            cry(2);
          }, 1000);
        }
        break;
      case 3:
        MySetTimeout4 = setTimeout(() => {
          run(3);
        }, 0);
        setTimeout(() => {
          cry(3);
        }, 0);
        break;
    }
    for (const animal of animals) {
      if (animal.position >= innerWidth - 200) {
        //   animals[0].position >= window.innerWidth - 200 ||
        //   animals[1].position >= window.innerWidth - 200 ||
        //   animals[2].position >= window.innerWidth - 200 ||
        //   animals[3].position >= window.innerWidth - 200 ||
        //   reset
        checkWinner(picked);
        resetAnimals();
      }
    }
  }, 1000); //don't forget to change
});

// startBtn.addEventListener("click", function (e) {
//   const running = setInterval(function () {
//     run(randomAnimal());

//     if (step > 500) {
//       clearInterval(running);
//       step = 30;
//     }
//   }, 100);
// });
resetBtn.addEventListener("click", function () {
  resetAnimals();
  reset = false;

  setButtons();
});

// function saveWinner() {
//   localStorage.setItem("animals", JSON.stringify(animals));
//   console.log(animals);
// }

// function displayAllTheWinners() {}
//how to use local storage?
// resetAnimals();
// function test() {
//   localStorage.setItem("animals", JSON.stringify(animals));
//   animals2 = JSON.parse(localStorage.getItem("animals"));
//   console.log(animals2);
// }
// test();
