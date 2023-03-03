"use strict";

const selectBtn = document.querySelector("#selection");
const average = document.querySelector(".average-value");
const minValue = document.querySelector(".min-value");
const maxValue = document.querySelector(".max-value");
const saveBtn = document.querySelector(".save-data");
const loadBtn = document.querySelector(".load-data");

// get a reference to the input element
let input = document.querySelector("#file-input");

// add an event listener to the input element
input.addEventListener("change", dataOutput);

loadBtn.addEventListener("click", loadDataFromLocalStorage);

//Function for reading data from the local storage
function loadDataFromLocalStorage() {
  let myData = JSON.parse(localStorage.getItem("data"));
  if (myData) {
    selectBtn.addEventListener("click", function (event) {
      let currentTarget = event.target.value;
      if (currentTarget === "Temperature") {
        average.textContent = averageValue(myData.temp);
        minValue.textContent = minimumValue(myData.temp);
        maxValue.textContent = maximumValue(myData.temp);
        plotGraph(myData.temp, currentTarget);
      } else if (currentTarget === "Wind") {
        average.textContent = averageValue(myData.wind);
        minValue.textContent = minimumValue(myData.wind);
        maxValue.textContent = maximumValue(myData.wind);
        plotGraph(myData.wind, currentTarget);
      } else if (currentTarget === "Precipitation") {
        average.textContent = averageValue(myData.precip);
        minValue.textContent = minimumValue(myData.precip);
        maxValue.textContent = maximumValue(myData.precip);
        plotGraph(myData.precip, currentTarget);
      } else if (currentTarget === "Stock-market") {
        average.textContent = averageValue(myData.stock);
        minValue.textContent = minimumValue(myData.stock);
        maxValue.textContent = maximumValue(myData.stock);
        plotGraph(myData.stock, currentTarget);
      } else {
        average.textContent = "";
        minValue.textContent = "";
        maxValue.textContent = "";
      }
    });
  } else console.log("No data found in local storage");
}

// Function to output data either using local storage or input
function dataOutput() {
  // create a new FileReader object
  let reader = new FileReader();

  // when the file has loaded
  reader.onload = function () {
    // get the text content of the file
    let data = reader.result;

    // split the data into an array of rows
    let rows = data.trim().split("\\n");
    //console.log(data.split('\\n'))

    let precipArray = [];
    let tempArray = [];
    let windArray = [];
    let stockArray = [];
    // loop through the rows
    for (let i = 0; i < rows.length; i++) {
      // split each row into an array of columns
      let columns = rows[i].split("\\t");

      // loop through the columns
      //For gettimg the values of precipitation
      for (let item = 0; item < columns.length; item += 4) {
        let precip = columns[item + 2];
        if (precip) {
          precipArray.push(+precip);
        }

        //For getting the single values of wind
        for (let item = 0; item < columns.length; item += 4) {
          let wind = columns[item + 1];
          if (wind) {
            windArray.push(+wind);
          }
        }

        //For getting the value of temperature
        // getIndividualData(tempArray, columns);
        for (let item = 0; item < columns.length; item += 4) {
          let temp = columns[item];
          if (temp) {
            tempArray.push(+temp);
          }
        }

        //For getting the value of stock market
        for (let item = 0; item < columns.length; item += 4) {
          let stock = columns[item + 3];
          if (stock) {
            stockArray.push(+stock);
          }
        }
      }
    }

    saveBtn.addEventListener("click", () => {
      const dataObject = {
        precip: precipArray,
        temp: tempArray,
        wind: windArray,
        stock: stockArray,
      };
      localStorage.setItem("data", JSON.stringify(dataObject));
    });

    //Listeing for the change in selection
    selectBtn.addEventListener("click", (event) => {
      const currentTarget = event.target.value;
      if (currentTarget === "Temperature") {
        average.textContent = averageValue(tempArray);
        minValue.textContent = minimumValue(tempArray);
        maxValue.textContent = maximumValue(tempArray);
        plotGraph(tempArray, currentTarget);
      } else if (currentTarget === "Wind") {
        average.textContent = averageValue(windArray);
        minValue.textContent = minimumValue(windArray);
        maxValue.textContent = maximumValue(windArray);
        plotGraph(windArray, currentTarget);
      } else if (currentTarget === "Precipitation") {
        average.textContent = averageValue(precipArray);
        minValue.textContent = minimumValue(precipArray);
        maxValue.textContent = maximumValue(precipArray);
        plotGraph(precipArray, currentTarget);
      } else if (currentTarget === "Stock-market") {
        average.textContent = averageValue(stockArray);
        minValue.textContent = minimumValue(stockArray);
        maxValue.textContent = maximumValue(stockArray);
        plotGraph(stockArray, currentTarget);
      } else {
        average.textContent = "";
        minValue.textContent = "";
        maxValue.textContent = "";
      }
    });
  };
  // read the selected file as text
  reader.readAsText(input.files[0]);
}

//Function to find the average
function averageValue(data) {
  const sum = data.reduce((total, num) => total + num);
  const wholeAverage = sum / data.length;
  return Math.trunc(wholeAverage);
}

//Function to find the maximum value
function minimumValue(data) {
  const minivalue = Math.min(...data);
  return minivalue;
}

//function to find the maximum value
function maximumValue(data) {
  const maxiValue = Math.max(...data);
  return maxiValue;
}

//Function to plotting the graph
function plotGraph(data, event) {
  let yArray = data;
  let xArray = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  //Define Data
  let dataInput = [
    {
      x: xArray,
      y: yArray,
      mode: "Lines",
      type: "scatter",
    },
  ];

  //Define Layout
  let layout = {
    xaxis: { range: [0, daysSinceJan1()], title: "Days since Jan 2023" },
    yaxis: { range: [minimumValue(data), maximumValue(data)], title: event },
    title: event + " vs Days since Jan 2023",
  };

  //Display the Graph
  Plotly.newPlot("myPlot", dataInput, layout);
}

//Funtion to find the number of days since jan 2023
function daysSinceJan1() {
  let today = new Date();
  let startDate = new Date(2023, 0, 1);
  let timeDiff = today.getTime() - startDate.getTime();

  return Math.floor(timeDiff / (1000 * 3600 * 24));
}
