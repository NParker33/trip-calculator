"use strict";
const inputDropdown = document.querySelector("#carSelection");
const inputTripMileage = document.querySelector("#tripMileage");
const inputAvgGas = document.querySelector("#avgGasPrice");
const inputNumPeople = document.querySelector("#numPeople");

const [totalEl, totalPerPersonEl] = document.querySelectorAll(".pricing");

const btnCalculate = document.querySelector(".btn--calculate");

// Functions
const calcAvg = (x, y) => (x + y) / 2;

const checkInput = (val, field) => {
  if (val === 0) {
    field.parentElement.classList.add("error");
    setTimeout(() => field.parentElement.classList.remove("error"), 3000);
  }
  return val !== 0;
};

const updateResults = function (total, split) {
  totalEl.textContent = `$${total.toFixed(2)}`;
  totalPerPersonEl.textContent = `$${split.toFixed(2)}`;
};

// Car constructor
function Car(make, model, year, cityMPG, highwayMPG) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.cityMPG = cityMPG;
  this.highwayMPG = highwayMPG;
  this.mpg = calcAvg(this.cityMPG, this.highwayMPG);
}

// Cars
const acura = new Car("Acura", "TSX", 2007, 22, 31);
const honda = new Car("Honda", "Accord", 2012, 23, 34);
const nissan = new Car("Nissan", "Murano", 2012, 18, 24);
const mercedes = new Car("Mercedes-Benz", "E350", 2015, 28, 42);

const cars = [acura, honda, nissan, mercedes];

// Populate car dropdown
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

  // Check that fields are valid
  const isValidMileage = checkInput(tripMileage, inputTripMileage);
  const isValidGas = checkInput(avgGas, inputAvgGas);
  const isValidPeople = checkInput(numPeople, inputNumPeople);

  // Calculate trip price
  if (isValidMileage && isValidGas && isValidPeople) {
    // Get gas price
    const gallonsRequired = +(tripMileage / selectedCar.mpg);
    const totalGasPrice = +(gallonsRequired * avgGas);

    // Split price among people
    const splitPrice = totalGasPrice / numPeople;

    // Update results
    updateResults(totalGasPrice, splitPrice);
  }
});
