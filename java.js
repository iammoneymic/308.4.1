//Part 1: Refactor
const csvString = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

function parseCSV(csvString) {
    let currentCell = "";
    let currentRow = [];
    const parsedData = [];

    for (let i = 0; i < csvString.length; i++) {
        const char = csvString[i];

        if (char === "," || char === "\r\n") {
            currentRow.push(currentCell);
            currentCell = "";

            if (currentRow.length === 4) {
                parsedData.push(currentRow);
                currentRow = [];
            }
        } else {
            currentCell += char;
        }
    }

    return parsedData;
}

function displayData(data) {
    for (const row of data) {
        console.log(...row);
    }
}

const parsedData = parseCSV(csvString);
displayData(parsedData);


// Part 2: Expanding Functionality
function calculateColumns(row) {
    return row.length;
}

function convertToTwoDimensionalArray(csvString) {
    const parsedData = parseCSV(csvString);
    const numColumns = calculateColumns(parsedData[0]);
    const twoDimensionalArray = [parsedData[0]];

    for (let i = 1; i < parsedData.length; i++) {
        const row = parsedData[i];
        const newRow = [];

        for (let j = 0; j < numColumns; j++) {
            newRow.push(row[j]);
        }

        twoDimensionalArray.push(newRow);
    }

    return twoDimensionalArray;
}

const expandedData = convertToTwoDimensionalArray(csvString);
console.log(expandedData);


// Part 3: Transforming Data
function transformToObjects(twoDimensionalArray) {
    const headings = twoDimensionalArray[0];
    const objectsArray = [];

    for (let i = 1; i < twoDimensionalArray.length; i++) {
        const row = twoDimensionalArray[i];
        const object = {};

        for (let j = 0; j < headings.length; j++) {
            object[headings[j].toLowerCase()] = row[j];
        }

        objectsArray.push(object);
    }

    return objectsArray;
}

const objectsArray = transformToObjects(expandedData);
console.log(objectsArray);


// Part 4: Sorting and Manipulating Data
function manipulateData(objectsArray) {

    objectsArray.pop();

    objectsArray.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" });

    objectsArray.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });

    let totalAge = 0;
    for (const obj of objectsArray) {
        totalAge += parseInt(obj.age);
    }
    const averageAge = totalAge / objectsArray.length;
    console.log("Average Age:", averageAge);

    return objectsArray;
}

const manipulatedData = manipulateData(objectsArray);
console.log(manipulatedData);


// Part 5: Full Circle
function convertToCSV(objectsArray) {
    const headings = Object.keys(objectsArray[0]).map(key => key.charAt(0).toUpperCase() + key.slice(1));
    const csvArray = [headings.join(',')];

    for (const obj of objectsArray) {
        const rowValues = Object.values(obj);
        csvArray.push(rowValues.join(','));
    }

    return csvArray.join('\n');
}

const csvFormat = convertToCSV(manipulatedData);
console.log(csvFormat);
