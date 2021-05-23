module.exports = {

    // will take string as argument. "00101000-00100100-10001000-01010101"
    preloadGrid: (onOff) => {

        // elements that will be used to append sequencer
        const drumPath = document.getElementById('seqGridCont');
        const seqRow = document.createElement('div');
        const seqStep = document.createElement('input');

        // creates array of 8bit values. ["00101000","00100100","10001000","01010101"]
        const structureGrid = onOff.split("-");

        // for each 8bit in the array, append a new row container with row id.
        // then create another array for the specific 8bit chunk. ["0", "0", "1", "0", "1", "0", "0", "0"]
        for(let i = 0; i < structureGrid.length; i++) {
            seqRow.id = `drum-row${i};`;
            drumPath.appendChild(seqRow);
            const gridSteps = structureGrid[i].split("");

            // using the new array, for each "1", append a checked input, and for each "0", append an unchecked input into the row container.
            gridSteps.forEach(val => {
                if (val === 1) {
                    seqRow.appendChild(seqStep); // as checked input
                } else {
                    seqRow.appendChild(seqStep); // as unchecked input
                }
            })
        }
        
        
    },
};