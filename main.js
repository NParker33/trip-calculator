"use strict";
const inputDropdown = document.querySelector("#carSelection");
const inputTripMileage = document.querySelector("#tripMileage");
const inputAvgGas = document.querySelector("#avgGasPrice");
const inputNumPeople = document.querySelector("#numPeople");

const btnCalculate = document.querySelector(".btnCalculate");
// car objects
// each car should contain information regarding: make, model, year, MPG, fuel tank size

const acura = {
  make: "Acura",
  model: "TSX",
  year: 2007,
  mpg: 31,
  tankSize: 17.1,
};
const honda = {
  make: "Honda",
  model: "Accord",
  year: 2012,
  mpg: 34,
  tankSize: 18.5,
};
const nissan = {
  make: "Nissan",
  model: "Murano",
  year: 2012,
  mpg: 24,
  tankSize: 21.7,
};

const mercedes = {
  make: "Mercedes-Benz",
  model: "E350",
  year: 2015,
  mpg: 42,
  tankSize: 17.4,
};

const cars = [acura, honda, nissan, mercedes];

cars.forEach(car => {
  const carInfo = `${car.year} ${car.make} ${car.model}`;
  inputDropdown.innerHTML += `<option value="${car.make}">${carInfo}</option>`;
});

btnCalculate.addEventListener("click", function (e) {
  e.preventDefault();
  const selectedCar = cars.find(car => car.make === inputDropdown.value);
  const tripMileage = +inputTripMileage.value;
  const avgGas = +inputAvgGas.value;
  const numPeople = +inputNumPeople.value;

  const isValidMileage = checkInput(tripMileage, inputTripMileage);
  const isValidGas = checkInput(avgGas, inputAvgGas);
  const isValidPeople = checkInput(numPeople, inputNumPeople);

  //   console.log(!isValidMileage && !isValidGas && !isValidPeople && "All fields valid");

  //   if (numPeople === 0) {
  //     inputNumPeople.parentElement.classList.add("error");
  //     setTimeout(function () {
  //       inputNumPeople.parentElement.classList.remove("error");
  //     }, 3000);
  //   }
});

const checkInput = (val, field) => {
  if (val === 0) {
    field.parentElement.classList.add("error");
    setTimeout(() => field.parentElement.classList.remove("error"), 3000);
  }
  return val === 0;
};
