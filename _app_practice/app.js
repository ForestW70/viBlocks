

// drum kit objects that hold links to reference to mp3 files
const allTheKits = {
    breakbeat8Drums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/hihat.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/kick.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/snare.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/tom3.mp3" }
    ],
    breakbeat9Drums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/hihat.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/kick.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/snare.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/tom3.mp3" }
    ],
    breakbeat13Drums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/hihat.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/kick.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/snare.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/tom3.mp3" }
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


// global Variables

// effects variables - these values will be stored
let loadedKit = "technoDrums";
let reverbLevel = 1;
let distortionLevel = .01;
let pingDelayLevel = .01;
let pingFeedbackLevel = .01;

window.onload = drumGen("technoDrums");

// other stored values
let songTitle = "My new Song";
let userName = "username";
let loadUrl = ""; //could be unique project ID

// let reverb;
// let dist;
// let pingPong;


const syn = new Tone.Synth();
syn.triggerAttackRelease("c4", "8n");


// DRUM SEQUENCER - create sequencer
function drumGen(drumKit) {
    document.getElementById("nowPlaying").innerText = `now playing ${drumKit}`;
    const pushBox = document.getElementById("pushDrums");
    pushBox.innerHTML = "";
    loadedKit = drumKit;
    console.log(`selected drums: ${drumKit}`)

    allTheKits[drumKit].forEach(drum => {
        const drumRow = document.createElement("div");
        drumRow.id = drum.name + "Row";
        const rowHead = document.createElement("span");
        rowHead.innerText = drum.name;

        for (let i = 0; i < 8; i++) {
            const stepInputs = document.createElement('input');
            stepInputs.type = "checkbox";
            drumRow.appendChild(stepInputs);
        }

        drumRow.appendChild(rowHead);
        pushBox.appendChild(drumRow);
    })

    createSequence(drumKit);
}



// create sound for the sequencer
let drumSeqInit = false;
let playing = false;

function createSequence(drumKit) {
    document.getElementById('play').addEventListener('click', async () => {
        await Tone.start();
        const vol = new Tone.Volume(0).toDestination();

        if (!drumSeqInit) {
            console.log("playing sequencer...")

            let index = 0;

            Tone.Transport.scheduleRepeat(repeat, '8n');
            Tone.Transport.bpm.value = 133;

            function repeat() {
                const reverb = new Tone.Reverb(reverbLevel)
                const dist = new Tone.Distortion(distortionLevel);
                const pingPong = new Tone.PingPongDelay(pingDelayLevel, pingFeedbackLevel).toDestination();

                let step = index % 8;

                allTheKits[drumKit].forEach(drum => {

                    const drumPlayer = new Tone.Player(drum.src).connect(vol).chain(reverb, dist, pingPong);
                    const row = document.getElementById(`${drum.name}Row`);
                    let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
                    if (iCheck.checked) {
                        drumPlayer.autostart = true;
                    }
                    // dispose(drumPlayer);
                })
                index++;

                // dispose(reverb);
                let dispose = (instance) => {
                    instance._wasDisposed = true;
                    console.log(`${instance} disposed`)
                    return instance;
                }
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

// const drumGen = (drumKit) => {
//     loadedKit = drumKit;
//     console.log(`selected drums: ${drumKit}`)
// }
const setReverb = (lvl) => {
    reverbLevel = lvl;
    reverb = new Tone.Reverb(lvl);
    console.log(`set reverb to: ${lvl}`);
};
const setDistortion = (lvl) => {
    distortionLevel = lvl;
    // dist = new Tone.Distortion(lvl)
    console.log(`set distortion to: ${lvl}`);
};
const setPingDelay = (lvl) => {
    pingDelayLevel = lvl;
    console.log(`set pingDelay to: ${lvl}`);
};
const setPingFeedback = (lvl) => {
    pingFeedbackLevel = lvl;
    // pingPong = new Tone.PingPongDelay(.05, lvl)
    console.log(`set pingFeedback to: ${lvl}`);
};


let compressorThresh = -20;
let compressorRatio = 6;



// SAVE FUNCTION

// select all inputs in a row, then create an empty array to store our data.
document.getElementById('save').addEventListener('click', (e) => {
    const row1 = document.getElementById('kickRow');
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






