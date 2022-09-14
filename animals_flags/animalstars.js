"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

const settings = {
  filter: "all",
  sortBy: "name",
  sortDir: "asc",
};

// The prototype for all animals:
const Animal = {
  star: false,
  winner: false,
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  registerButtons();
  loadJSON();
}

function registerButtons() {
  document.querySelectorAll("[data-action='filter']").forEach((button) => button.addEventListener("click", selectFilter));
  document.querySelectorAll("[data-action='sort']").forEach((button) => button.addEventListener("click", selectSort));
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);
  displayList(allAnimals);
  //buildList();
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function selectFilter(event) {
  const filter = event.target.dataset.filter;
  console.log(filter);
  setFilter(filter);
}

function setFilter(filter) {
  settings.filterBy = filter;
  buildList();
}

function filterList(filteredList) {
  if (settings.filterBy === "cat") {
    filteredList = allAnimals.filter(isCat);
  } else if (settings.filterBy === "dog") {
    filteredList = allAnimals.filter(isDog);
  }
  return filteredList;
}

function isCat(animal) {
  return animal.type === "cat";
}

function isDog(animal) {
  return animal.type === "dog";
}

function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  const sortDir = event.target.dataset.sortDirection;
  const oldElement = document.querySelector(`[data-sort='${settings.sortBy}']`);
  oldElement.classList.remove("sortby");

  event.target.classList.add("sortby");

  if (sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc";
  }
  console.log(`user selected${sortBy}-${sortDir}`);
  setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir) {
  settings.sortBy = sortBy;
  settings.sortDir = sortDir;
  buildList();
}

function sortList(sortedList) {
  let direction = 1;
  if (settings.sortDir === "desc") {
    direction = -1;
  } else {
    direction = 1;
  }
  sortedList = sortedList.sort(sortByProperty);
  function sortByProperty(animalA, animalB) {
    if (animalA[settings.sortBy] < animalB[settings.sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
  return sortedList;
  //displayList(sortedList);
}

function buildList() {
  const currentList = filterList(allAnimals); // FUTURE: Filter and sort currentList before displaying
  const sortedList = sortList(currentList);
  displayList(sortedList);
  //return sortedList;
}

function displayList(animals) {
  // clear the display
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data

  // TODO: Show star ⭐ or ☆

  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  if (animal.star === true) {
    clone.querySelector("[data-field=star]").textContent = "⭐ ";
  } else {
    clone.querySelector("[data-field=star]").textContent = "☆ ";
  }
  clone.querySelector("[data-field=star]").addEventListener("click", (event) => {
    animal.star = !animal.star;
    buildList();
    console.log("clicked");
  });

  // winner

  clone.querySelector("[data-field=winner]").dataset.winner = animal.winner;
  clone.querySelector("[data-field=winner]").addEventListener("click", clickWinner);
  function clickWinner() {
    if (animal.winner === true) {
      animal.winner = false;
    } else {
      tryToMakeAWinner(animal);
    }
    buildList();
  }
  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

function tryToMakeAWinner(selectedAnimal) {
  const winners = allAnimals.filter((animal) => animal.winner);

  const numberOfWinners = winners.length;
  const other = winners.filter((animal) => animal.type === selectedAnimal.type).shift();

  //if there is another of the same type
  if (other !== undefined) {
    console.log(`There can be only one winner of each type ${other.name} the ${other.type}`);
    removeOther(other);
  } else if (numberOfWinners >= 2) {
    console.log("there can only be two winners");
    removeAorB(winners[0], winners[1]);
  } else {
    makeWinner(selectedAnimal);
  }

  function removeOther(other) {
    //ask user to ignore or remove the other
    document.querySelector("#onlyonekind").classList.add("show");
    document.querySelector("#onlyonekind .closebutton").addEventListener("click", closeDialog);
    document.querySelector("#onlyonekind .remove1").addEventListener("click", clickRemoveOther);
    document.querySelector("#onlyonekind .animal1").innerHTML = `${other.name} the ${other.type}`;

    //if ignore- do nothing
    function closeDialog() {
      document.querySelector("#onlyonekind").classList.remove("show");
      document.querySelector("#onlyonekind .remove1").removeEventListener("click", clickRemoveOther);
      document.querySelector("#onlyonekind .closebutton").removeEventListener("click", closeDialog);
    }

    // if remove other:

    function clickRemoveOther() {
      removeWinner(other);
      makeWinner(selectedAnimal);
      buildList();
      closeDialog();
    }
  }

  function removeAorB(winnerA, winnerB) {
    //ask the user to ignore or remover a or b
    document.querySelector("#onlytwowinners").classList.add("show");
    document.querySelector("#onlytwowinners .closebutton").addEventListener("click", closeDialog);
    document.querySelector("#onlytwowinners [data-action=remove1]").addEventListener("click", clickRemoveA);
    document.querySelector("#onlytwowinners [data-action=remove2]").addEventListener("click", clickRemoveB);
    document.querySelector("#onlytwowinners .animal1").innerHTML = `${winnerA.name} the ${winnerA.type}`;
    document.querySelector("#onlytwowinners .animal2").innerHTML = `${winnerB.name} the ${winnerB.type}`;

    //if ignore- do nothing
    function closeDialog() {
      document.querySelector("#onlytwowinners").classList.remove("show");
      document.querySelector("#onlytwowinners .closebutton").removeEventListener("click", closeDialog);
      document.querySelector("#onlytwowinners [data-action=remove1]").removeEventListener("click", clickRemoveA);
      document.querySelector("#onlytwowinners [data-action=remove2]").removeEventListener("click", clickRemoveB);
    }

    //if removeA
    //removeWinner(winnerA);
    function clickRemoveA() {
      removeWinner(winnerA);
      makeWinner(selectedAnimal);
      buildList();
      closeDialog();
    }
    //makeWinner(selectedAnimal);

    //else if removeB
    function clickRemoveB() {
      removeWinner(winnerB);
      makeWinner(selectedAnimal);
      buildList();
      closeDialog();
    }
  }

  function removeWinner(winnerAnimal) {
    winnerAnimal.winner = false;
  }

  function makeWinner(animal) {
    animal.winner = true;
  }
}
