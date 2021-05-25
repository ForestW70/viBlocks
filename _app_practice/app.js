//\\ DOCS -- add anything here you may think is useful
// components - https://tonejs.github.io/docs/14.7.77/index.html
// about - https://tonejs.github.io/
// demos - https://tonejs.github.io/demos




// drum kit objects that hold links to reference to mp3 files

const allTheKits = {
    bongoDrums: [
        { name: "bon1", src: "https://tonejs.github.io/audio/drum-samples/Bongos/hihat.mp3" },
        { name: "bon2", src: "https://tonejs.github.io/audio/drum-samples/Bongos/kick.mp3" },
        { name: "bon3", src: "https://tonejs.github.io/audio/drum-samples/Bongos/snare.mp3" },
        { name: "bon4", src: "https://tonejs.github.io/audio/drum-samples/Bongos/tom1.mp3" },
        { name: "bon5", src: "https://tonejs.github.io/audio/drum-samples/Bongos/tom2.mp3" },
        { name: "bon6", src: "https://tonejs.github.io/audio/drum-samples/Bongos/tom3.mp3" }
    ],
    opfmDrums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/4OP-FM/kick.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/4OP-FM/snare.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/4OP-FM/hihat.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/4OP-FM/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/4OP-FM/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/4OP-FM/tom3.mp3" }
    ],
    acousticDrums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/kick.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/snare.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/hihat.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/tom3.mp3" }
    ],
    technoDrums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/Techno/snare.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/Techno/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/Techno/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/Techno/tom3.mp3" }
    ]
}




// DRUM SEQUENCER - linked to step sequencer

let loadedKit = "technoDrums";

let drumSeqInit = false;
let playing = false;

document.getElementById('play').addEventListener('click', async () => {
    await Tone.start();

    if (!drumSeqInit) {
        console.log("playing sequencer...")

        let index = 0;
        // Tone.transport is the magic component that allows us to "schedule" each drum to be played if it is checked in the grid.
        // it takes two arguments, the first is our repeat function below, and the second is the duration of time spend at each checkbox. (1/8th note)
        // bpm.value is a number we can set that disctates just how long 1/8th note is. Dont worry about this number, just know the higher, the faster it will play.
        Tone.Transport.scheduleRepeat(repeat, '8n');
        Tone.Transport.bpm.value = 133;

        function repeat() {

            let step = index % 8;
            const reverb = new Tone.Reverb(reverbLevel)
            const dist = new Tone.Distortion(distortionLevel);
            const pingPong = new Tone.PingPongDelay(pingDelay, pingFeedback).toDestination();

            allTheKits[loadedKit].forEach(drum => {
                const drumPlayer = new Tone.Player(drum.src).chain(reverb, dist, pingPong);
                const row = document.getElementById(`${drum.name}Row`);
                let iCheck = row.querySelector(`input:nth-child(${step + 2})`);
                if (iCheck.checked) {
                    drumPlayer.autostart = true;
                }
            })

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

// arrays that represent a scale of notes.
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const cMajScale = ["A", "B", "C", "D", "E", "F", "G"];
const cMinScale = ["A#", "B#", "C", "D", "E#", "F", "G"];

// pause/play control
let melSeqInit = false;



// for each note in the scale, construct a row for the step inputs and append.
// id is used to mark each box, but may not be needed.
cMajScale.forEach(note => {
    const melContainer = document.getElementById("mel-container");
    const pitchRow = document.createElement('div');
    pitchRow.id = `${note}Row`;
    melContainer.appendChild(pitchRow);

    // for loop that creates the 8 steps in the sequencer row.
    for (let i = 1; i < 9; i++) {
        const stepInput = document.createElement('input');
        stepInput.type = "checkbox";
        stepInput.id = note + "-" + i;
        pitchRow.appendChild(stepInput);
    }

    // create note label for each row.
    const rowHead = document.createElement("span");
    rowHead.innerText = note;
    pitchRow.appendChild(rowHead);
})

// setting up sequencer functionality for every input.
document.getElementById("playMel").addEventListener("click", async () => {
    await Tone.start();

    if (!melSeqInit) {
        console.log("melody sequencer playing...");

        let index = 0;
        Tone.Transport.scheduleRepeat(repeat, "8n")
        Tone.Transport.bpm.value = 133;

        function repeat() {
            // Tone.context = new AudioContext();
            let step = index % 8;

            // for each note in scale array, create a new instrument and tune it according to the note from the array.
            // the .chain() method allows us to attach effects to sounds.
            cMajScale.forEach(note => {
                const reverb = new Tone.Reverb(1).toDestination();
                const osc = new Tone.Oscillator(440, "sawtooth").chain(reverb);
                osc.frequency.value = `${note}3`;

                // target noteRow for each note and select all input children to create a checker for sound.
                const row = document.getElementById(`${note}Row`);
                let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
                if (iCheck.checked) {
                    osc.start().stop("+0.1");
                }
            })
            index++;
            // Tone.context.close();
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


// SAVE/LOAD FUNCTIONS

// select all inputs in a row, then create an empty array to store our data.
document.getElementById('save').addEventListener('click', (e) => {
    const row1 = document.getElementById('seq-row1');
    const row1Inputs = row1.querySelectorAll('input');
    let onOffval = [];

    // for each input, see if it is checked or unchecked. checked will return "1", unchecked will return "0".
    // what will push to our array is an 8 digit number that will look like "["1","0","0",...]". this represents whats checked and whats not.
    row1Inputs.forEach(input => {
        if (input.checked) {
            onOffval.push(1);
        } else {
            onOffval.push(0);
        }
    })

    // these lines turn our array into plain text for storage. "10001000"
    let onOffString = onOffval.join("");
    onOffString.replace(",", "")
    console.log(onOffString);
})

document.getElementById('load').addEventListener('click', () => {
    const string = "00101000-00100100-10001000-01010101";
    const array = string.split("-");
    console.log(array);


})



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
    // Line 58 is how our sound is triggered. Think of it like calling a function that you previously created.
    const player = new Tone.Player(technoDrums.kick).toDestination();
    player.autostart = true;
})

// this channel plays a single short note of the default synth.
document.getElementById('channel3').addEventListener('click', async () => {
    await Tone.start();
    console.log("short boop");

    // Like the drums above, we must create a new instrument instance, but instead of Player, we'll use Synth.
    // When triggering our synth sound, we must follow the syntax on line 71, as opposed to setting start to "true".
    // triggerAttackRelease takes multiple arguments, but here there will only be two. the first argument controls the pitch, the second controls the duration.
    // "C3" says play a C note in the 3rd octave. "8n" says play for a 1/8th note.
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C3", "8n");

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
    console.log(reverbLevel);
    console.log(distortionLevel);
    console.log(pingDelay);
    console.log(pingFeedback);

    // there are also pre-made synth objects with their own sound qualities.
    // We chaned "Synth" to "MembraneSynth", but you can also try "PluckSynth", and "DuoSynth" to name a few.
    const reverb = new Tone.Reverb(reverbLevel)
    const dist = new Tone.Distortion(distortionLevel);
    const pingPong = new Tone.PingPongDelay(pingDelay, pingFeedback).toDestination();
    const synth = new Tone.MembraneSynth().chain(reverb, dist, pingPong);
    synth.triggerAttackRelease("C#4", "8n");

})

// This channel plays the oscillator instrument
document.getElementById('channel6').addEventListener('click', async () => {
    await Tone.start();
    console.log("osc");

    // osc is similar to Synth, but with osc you start with a pure tone(like a sine wave)
    // we can also add effects by creating new instances of the effect, and using .chain() to attach them to the instrument.
    // this sound is triggered by the use of .start/.stop. the argument .stop takes is the duration of the note to be played. (like 8n)
    const reverb = new Tone.Reverb(reverbLevel)
    const dist = new Tone.Distortion(distortionLevel).toDestination();
    const osc = new Tone.Oscillator(440, "sawtooth").chain(reverb, dist);
    osc.frequency.value = "c3";
    osc.start().stop("+0.1");


})

// Try creating your own sound! Do note that you can have more than one sound play at a time. (but it might be loud so beware.)
document.getElementById('channel7').addEventListener('click', async () => {
    await Tone.start();
    console.log("empty channel");


})

let reverbLevel = 0.1;
let distortionLevel = 0.1;
let pingDelay = 0.01;
let pingFeedback = 0.01;
let compressorThresh = -20;
let compressorRatio = 6;

function setReverb(lvl) {
    reverbLevel = lvl;
}

function setDistortion(lvl) {
    distortionLevel = lvl;
}

function setPingDelay(lvl) {
    pingDelay = lvl;
}

function setPingFeedback(lvl) {
    pingFeedback = lvl;
    console.log(pingFeedback)
}



// drum inputs based on a kit selector, effect selector.

// function takes in the selected drumkit option from the HTML page, and finds it in the "allTheKits" object to use.
function drumGen(drumKit) {
    const pushBox = document.getElementById("pushDrums");
    pushBox.innerHTML = "";
    loadedKit = drumKit;


    // this 
    allTheKits[drumKit].forEach(drum => {
        const drumRow = document.createElement("div");
        // drumRow.id = drum.name + "Row";
        const rowHead = document.createElement("span");
        rowHead.innerText = drum.name;

        for (let i = 0; i < 8; i++) {
            const stepInput = document.createElement('input');
            stepInput.type = "checkbox";
            drumRow.appendChild(stepInput);
        }

        drumRow.appendChild(rowHead);
        pushBox.appendChild(drumRow);
    })

    createSequence(drumKit);
}




function createSequence(drumKit) {
    document.getElementById("drumStepPlay").addEventListener("click", async () => {
        await Tone.start();

        if (!drumSeqInit) {
            console.log("drum sequencer playing...");

            let index = 0;
            Tone.Transport.scheduleRepeat(repeat, "8n")
            Tone.Transport.bpm.value = 133;

            function repeat() {
                let step = index % 8;

                const reverb = new Tone.Reverb(reverbLevel) || 0;
                const dist = new Tone.Distortion(vibratoLevel) || 0;
                const volume =

                    allTheKits[drumKit].forEach(drum => {
                        const drumPlayer = new Tone.Player(drum.src);
                        drumPlayer.chain(reverb, dist).toDestination();
                        const row = document.getElementById(`${drum.name}Row`);
                        let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
                        if (iCheck.checked) {
                            drumPlayer.autostart = true;
                        }

                    })
                index++;
            }
            drumSeqInit = true;
        }

        if (playing) {
            Tone.Transport.stop();
            playing = false;
        } else {
            Tone.Transport.start();
            playing = true;
        }
    })
}


