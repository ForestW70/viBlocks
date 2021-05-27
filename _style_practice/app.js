//\\ DOCS -- add anything here you may think is useful
// components - https://tonejs.github.io/docs/14.7.77/index.html
// about - https://tonejs.github.io/
// demos - https://tonejs.github.io/demos




// drum kit objects that hold links to reference to mp3 files
const bongoDrums = {
    bon1: "https://tonejs.github.io/audio/drum-samples/Bongos/hihat.mp3",
    bon2: "https://tonejs.github.io/audio/drum-samples/Bongos/kick.mp3",
    bon3: "https://tonejs.github.io/audio/drum-samples/Bongos/snare.mp3",
    bon4: "https://tonejs.github.io/audio/drum-samples/Bongos/tom1.mp3",
    bon5: "https://tonejs.github.io/audio/drum-samples/Bongos/tom2.mp3",
    bon6: "https://tonejs.github.io/audio/drum-samples/Bongos/tom3.mp3"
}

const technoDrums = {
    hat: "https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3",
    kick: "https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3",
    snare: "https://tonejs.github.io/audio/drum-samples/Techno/snare.mp3",
    tom1: "https://tonejs.github.io/audio/drum-samples/Techno/tom1.mp3",
    tom2: "https://tonejs.github.io/audio/drum-samples/Techno/tom2.mp3",
    tom3: "https://tonejs.github.io/audio/drum-samples/Techno/tom3.mp3"
}










// CHANNEL BUTTONS - linked to "Button Land"

// for the browser to make any sound with Tone, it must be activated first through a click event.
// the second argument to the event listener is an async/await function that returns Tone.start as a promise
// you can treat lines 27-28 like boilerplate code (copy and paste)
document.getElementById('channel1').addEventListener('click', async () => {
    await Tone.start();
    console.log("button pressed - empty channel");
})

// this channel plays a single drum hit.
document.getElementById('channel2').addEventListener('click', async () => {
    await Tone.start();
    console.log("kick hit");

    // when we are playing an mp3 file (which all of our drums will be), we must a new instance of Player.
    // we use our drum kit object from above to pass a specific drum into Player().
    // after the Player method, we must attach the toDestination() method on the end,
    // this effectively is telling Tone to send the audio to our speakers.
    // Line 43 is how our sound is triggered. Think of it like calling a function that you previously created.
    const player = new Tone.Player(technoDrums.kick).toDestination();
    player.autostart = true;
})

// this channel plays a single short note of the default synth.
document.getElementById('channel3').addEventListener('click', async () => {
    await Tone.start();
    console.log("short boop");

    // Like the drums above, we must create a new instrument instance, but instead of Player, we'll use Synth.
    // When triggering our synth sound, we must follow the syntax on line 56, as opposed to setting start to "true".
    // triggerAttackRelease takes multiple arguments, but here there will only be two. the first argument controls the pitch, the second controls the duration.
    // "C3" says play a C note in the 3rd octave. "8n" says play for a 1/8th note.
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");

})

// this channel plays a new type of synth.
document.getElementById('channel4').addEventListener('click', async () => {
    await Tone.start();
    console.log("long boop");

    // we can manually change what our Synth sounds like by changing its oscillator type like on line 69.
    // we set osc.type = SAWTOOTH, which changes the shape of the frequency, and in turn changes how it sounds. (you can also try "triangle", and "sine".)
    // try playing around with the parameters here. .trigger arguments can be "[a-g][0-6]" for pitch and "[1-32]n" for duration 
    const synth = new Tone.Synth().toDestination();
    synth.oscillator.type = 'sawtooth';
    synth.triggerAttackRelease("g1", "10n");
})

// this channel plays a single short note of a precontructed Synth
document.getElementById('channel5').addEventListener('click', async () => {
    await Tone.start();
    console.log("pew");

    // there are also pre-made synth objects with their own sound qualities.
    // We chaned "Synth" to "MembraneSynth", but you can also try "PluckSynth", and "DuoSynth" to name a few.
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C#4", "8n");

})

// Try creating your own sound! Do note that you can have more than one sound play at a time. (but it might be loud so beware.)
document.getElementById('channel6').addEventListener('click', async () => {
    await Tone.start();
    console.log("empty channel");


})









// DRUM SEQUENCER - linked to step sequencer

// these variables are used to control the pause/play button. they are used to control the logic within the click function.
let drumSeqInit = false;
let playing = false;


// this function begins with the same async/await boilerplate code linked to the "play" button.
document.getElementById('play').addEventListener('click', async () => {
    await Tone.start();


    // if sequencer has not been initialized yet
    if (!drumSeqInit) {
        console.log("playing sequencer...")

        let index = 0;
        // Tone.transport is the magic component that allows us to "schedule" each drum to be played if it is checked in the grid.
        // it takes two arguments, the first is our repeat function below, and the second is the duration of time spend at each checkbox. (1/8th note)
        // bpm.value is a number we can set that disctates just how long 1/8th note is. Dont worry about this number, just know the higher, the faster it will play.
        Tone.Transport.scheduleRepeat(repeat, '8n');
        Tone.Transport.bpm.value = 133;

        // in our repeat function, each action will be done 6 times, because we want 6 seperate drums to play using our 6 created rows.
        function repeat() {

            // this line is just to show that their are 8 inputs in each row, and after the 8th input, return to the first input.
            // if our rows has 16 squares instead of 8, we would do "% 16".
            let step = index % 8;

            // assigning our drums using our drumkit object
            const drum1 = new Tone.Player(technoDrums.hat).toDestination();
            const drum2 = new Tone.Player(technoDrums.kick).toDestination();
            const drum3 = new Tone.Player(technoDrums.snare).toDestination();
            const drum4 = new Tone.Player(technoDrums.tom1).toDestination();
            const drum5 = new Tone.Player(technoDrums.tom2).toDestination();
            const drum6 = new Tone.Player(technoDrums.tom3).toDestination();

            // targeting each row-container in the step sequencer
            const row1 = document.getElementById("seq-row1");
            const row2 = document.getElementById("seq-row2");
            const row3 = document.getElementById("seq-row3");
            const row4 = document.getElementById("seq-row4");
            const row5 = document.getElementById("seq-row5");
            const row6 = document.getElementById("seq-row6");


            // these targets are how Tone.transport knows which square in the row that the sequencer is at. 
            // step = current square. +1 since step starts at 0 instead of 1, and +1 since the first child in our seq-row is <h3> instead of input, so step + 2 skips these first two positions.
            let iCheck1 = row1.querySelector(`input:nth-child(${step + 2})`);
            let iCheck2 = row2.querySelector(`input:nth-child(${step + 2})`);
            let iCheck3 = row3.querySelector(`input:nth-child(${step + 2})`);
            let iCheck4 = row4.querySelector(`input:nth-child(${step + 2})`);
            let iCheck5 = row5.querySelector(`input:nth-child(${step + 2})`);
            let iCheck6 = row6.querySelector(`input:nth-child(${step + 2})`);

            // if the box is checked when the our tracker (icheck) arrives at the next box, play drum sound.
            if (iCheck1.checked) {
                drum1.autostart = true;
            }
            if (iCheck2.checked) drum2.autostart = true;
            if (iCheck3.checked) drum3.autostart = true;
            if (iCheck4.checked) drum4.autostart = true;
            if (iCheck5.checked) drum5.autostart = true;
            if (iCheck6.checked) drum6.autostart = true;

            // itterate through our row.
            index++;

        }
        // mark sequencer as initialized
        drumSeqInit = true;
    }

    // if sequencer is currently active, stop sequencer and change play to false
    // if sequecer is paused (play = false), unpause the sequencer and set play to true.
    if (playing) {
        Tone.Transport.stop();
        playing = false;
    } else {
        Tone.Transport.start();
        playing = true;
    }

})
 


// MELODY SEQUENCER

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const cMajScale = ["A", "B", "C", "D", "E", "F", "G"];

const cMinScale = ["A#", "B#", "C", "D", "E#", "F", "G"];

let melSeqInit = false;
// let playing = false;


cMajScale.forEach(note => {
    const pitchRow = document.createElement('div');
    pitchRow.id = `${note}Row`;
    const melContainer = document.getElementById("mel-container");
    
    melContainer.appendChild(pitchRow);


    for (let i = 1; i < 9; i++) {
        const stepInput = document.createElement('input');
        stepInput.type = "checkbox";
        stepInput.id = note + "-" + i;
        pitchRow.appendChild(stepInput);
    }
    const rowHead = document.createElement("span");
    rowHead.innerText = note;
    pitchRow.appendChild(rowHead);
})

document.getElementById("playMel").addEventListener("click", async () => {
    await Tone.start();


    if (!melSeqInit) {
        console.log("melody sequencer playing...");

        let index = 0;
        Tone.Transport.scheduleRepeat(repeat, "8n")
        Tone.Transport.bpm.value = 133;

        function repeat() {
            let step = index % 8;

            cMajScale.forEach(note => {
                const synth = new Tone.Synth().toDestination();
                synth.oscillator.type = "triangle";

                const reverb = new Tone.Reverb(1).toDestination();
                const osc = new Tone.Oscillator(440, "sawtooth").chain(reverb);
                osc.frequency.value = `${note}3`;

                


                
                

                const row = document.getElementById(`${note}Row`);
                let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
                if (iCheck.checked) {
                    // synth.triggerAttackRelease(`${note}4, 16n`);
                    osc.start().stop("+0.1");
                }
            })
            index++;
        }




        melSeqInit = true;
    }

    if (playing) {
        Tone.Transport.stop();
        playing = false;
    } else {
        Tone.Transport.start();
        playing = true;
    }


})

