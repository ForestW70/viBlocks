// variables for sequencer and loaded values divs
const drumBox = document.getElementById("pushDrums")
const melBox = document.getElementById("pushMelody")
const drumSeqLog = document.getElementById("drumSeqLog")
const melSeqLog = document.getElementById("melodySeqLog")
const melOn = document.getElementById("melodyIsOn")

// get value from the "log" elements (these values get loaded through handlebars)
const loadedDrumSteps = drumSeqLog.innerText;
const loadedMelSteps = melSeqLog.innerText;

// these arrays will be used to name each row accordingly.
const drumRowNameArray = ["kick", "snare", "hat", "tom1", "tom2", "tom3"];
const noteRowNameArray = ["C", "D", "D#", "F", "G", "A#", "B#"];

let exampleString = "00100010-00001000-01010101-11000000-00000000-00000010";

// create new sequencer grid
function loadDrumsFromSave(str) {
    // create new array holding each of the 8digit values
    const newArray = str.split("-");
    let index = 0;

    // for each value in this array, create a new div, set its attributes, set span innertext
    newArray.forEach(rowBlock => {
        const newRow = document.createElement("div");
        const rowLabel = document.createElement("span");
        newRow.classList.add('seq-row');
        newRow.id = drumRowNameArray[index] + "Row";
        rowLabel.innerText = drumRowNameArray[index];

        // create another new array that holds all 8 digits seperately, then use the 1's and 0's to append a checkbox into the div row
        let row = rowBlock.split("")
        row.forEach(inputs => {
            let input = document.createElement("input");
            input.type = "checkbox";

            // if 1, append a checked box, if 0 append a blank box.
            if (inputs == 1) {
                input.checked = true;
                newRow.appendChild(input);
            } else {
                newRow.appendChild(input);
            }
        })
        // after inputs have been generated for the row, add row label to the end and append the row to the sequencer.
        // index controls the naming.
        newRow.appendChild(rowLabel);
        drumBox.appendChild(newRow);
        index++;
    })
}

// same for melody
function loadMelFromSave(str) {
    const newArray = str.split("-");
    let index = 0;

    newArray.forEach(rowBlock => {
        const newRow = document.createElement("div");
        const rowLabel = document.createElement("span");
        newRow.classList.add('seq-row');
        newRow.id = noteRowNameArray[index] + "Row";
        rowLabel.innerText = noteRowNameArray[index];


        let row = rowBlock.split("")
        row.forEach(inputs => {
            let input = document.createElement("input");
            input.type = "checkbox";
            if (inputs == 1) {
                input.checked = true;
                newRow.appendChild(input);
            } else {
                newRow.appendChild(input);
            }
        })
        newRow.appendChild(rowLabel);
        melBox.appendChild(newRow);
        index++;
    })
}

loadDrumsFromSave(loadedDrumSteps);
// if melody sequencer is marked as on, generate that as well.

loadMelFromSave(loadedMelSteps);
