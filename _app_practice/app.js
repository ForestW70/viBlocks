
// drum kit objects that hold links to reference to mp3 files
const allTheKits = {
    breakbeat8Drums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/kick.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/snare.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/hihat.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/breakbeat8/tom3.mp3" }
    ],
    breakbeat9Drums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/kick.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/snare.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/hihat.mp3" },
        { name: "tom1", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/tom1.mp3" },
        { name: "tom2", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/tom2.mp3" },
        { name: "tom3", src: "https://tonejs.github.io/audio/drum-samples/breakbeat9/tom3.mp3" }
    ],
    breakbeat13Drums: [
        { name: "kick", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/kick.mp3" },
        { name: "snare", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/snare.mp3" },
        { name: "hat", src: "https://tonejs.github.io/audio/drum-samples/breakbeat13/hihat.mp3" },
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


// target divs in html that our data will inititially be loaded into
const titleLog = document.getElementById("stLog");
const artistLog = document.getElementById("saLog");
const descriptionLog = document.getElementById("sdLog");
const drumKitLog = document.getElementById("dkvLog");
const reverbLog = document.getElementById("rvLog");
const distLog = document.getElementById("dvLog");
const delayLog = document.getElementById("ppdvLog");
const melRevLog = document.getElementById("mrvLog");
const melEffLog = document.getElementById("mevLog");
const drumVolLog = document.getElementById("drumVolLog");
const melVolLog = document.getElementById("melVolLog");
const bpmLog = document.getElementById("bpmLog");

const bpmInput = document.getElementById("bpm");
const drumRevInput = document.getElementById("reverb");
const distInput = document.getElementById("distortion");
const delayInput = document.getElementById("pingDelay");
const melRevInput = document.getElementById("melReverb");
const melEffInput = document.getElementById("melEffect")

// global variables to load in
let songTitle;
let songArtist;
let songDescription;
let loadedKit;
let reverbLevel = 0;
let distortionLevel = 0;
let delayLevel = 0;
let melRevebLevel = 0;
let melPhsrLevel = 0;
let bpmValue = 0;

// global variables pre-set
let drumVolLevel = -3;
let melVolLevel = -3;

// isLoadedFromSave variable
let isLoadedFromSave = false;

// new effect instances
let reverb = new Tone.Reverb(1);
let dist = new Tone.Distortion(2);
let delay = new Tone.PingPongDelay(.1, .5);
let melReverb = new Tone.Reverb(1);
let melPhsr = new Tone.Phaser({
    frequency : 0.5 ,
    octaves : 5 ,
    stages : 20 ,
    Q : 3 ,
    baseFrequency : 350
});

// instance's levels set
reverb.wet.value = 0;
dist.wet.value = 0;
delay.wet.value = 0;
melReverb.wet.value = 0;
melPhsr.wet.value = 0;




// on load event that will decide to load from save or to load from default
// for finished product, it take the place of declaring default values from above.

document.addEventListener("DOMContentLoaded", () => {

    if (isLoadedFromSave) {
        songTitle = titleLog.innerText || "New loopz"
        songArtist = artistLog.innerText || "Barney";
        songDescription = descriptionLog.innerText || "Just a lil something..";
        loadedKit = drumKitLog.innerText || "technoDrums";
        reverbLevel = reverbLog.innerText || 0;
        distortionLevel = distLog.innerText || 0;
        delayLevel = delayLog.innerText || 0;
        melRevebLevel = melRevLog.innerText || 0;
        melPhsrLevel = melEffLog.innerText || 0
        bpmValue = bpmLog.innerText || 150;
        
        updateLogs();

    } else {
        songTitle = titleLog.innerText || "New loopz"
        songArtist = artistLog.innerText || "Barney";
        songDescription = descriptionLog.innerText || "Just a lil something..";
        loadedKit = "technoDrums";
        reverbLevel = 0;
        distortionLevel = 0;
        delayLevel = 0;
        melRevebLevel = 0;
        melPhsrLevel = 0;
        bpmValue = 133;
        
        updateLogs();
    }
});

function updateLogs() {
    titleLog.innerText = songTitle;
    artistLog.innerText = songArtist;
    descriptionLog.innerText = songDescription;
    drumKitLog.innerText = loadedKit;
    drumVolLog.innerText = drumVolLevel;
    melVolLog.innerText = melVolLevel;
    reverbLog.innerText = reverbLevel;
    distLog.innerText = distortionLevel;
    delayLog.innerText = delayLevel;
    melRevLog.innerText = melRevebLevel
    melEffLog.innerText = melPhsrLevel;
    bpmLog.innerText = bpmValue;
    drumRevInput.placeholder = reverbLog.innerText
    distInput.placeholder = distLog.innerText;
    delayInput.placeholder = delayLog.innerText;
    melRevInput.placeholder = melRevLog.innerText;
    melEffInput.placeholder = melEffLog.innerText;
    bpmInput.placeholder = bpmLog.innerText;
    reverb.wet.value = reverbLevel;
    dist.wet.value = distortionLevel;
    delay.wet.value = delayLevel;
    melReverb.wet.value = melRevebLevel;
    melPhsr.wet.value = melPhsrLevel;
}




// sequencer variables
let playButtonInit = false;
let melSeqInit = false;
let isPlaying = false;
let melIsOn = true;


// function that handles both sequencers with some logic
const linkSequencer = () => {
    document.getElementById("play").addEventListener("click", async () => {
        await Tone.start();

        // if melody sequencer has not been turned on, only play drum sequencer
        if (!melIsOn) {
            // if this is the first time user presses play, run the drum sequencer function.
            if (!playButtonInit) {
                drumSeqOn();
            }

            // if play has already been pressed, use the "isPlaying" variable to control paused and unpaused.
            if (isPlaying) {
                Tone.Transport.stop();
                isPlaying = false;
            } else {
                Tone.Transport.start();
                isPlaying = true;
            }
            // if melody sequencer is turned on, play both sequencers together. 
        } else {
            if (!playButtonInit) {
                drumSeqOn();
                melSeqOn();
            }

            if (isPlaying) {
                Tone.Transport.stop();
                isPlaying = false;
            } else {
                Tone.Transport.start();
                isPlaying = true;
            }

        }
    });
}
linkSequencer();


// turn on melody sequencer
// document.getElementById("melOnOff").addEventListener("click", () => {
//     document.getElementById("pushMelody").classList.remove("hide");
//     document.getElementById("melOnOff").classList.add("hide");
//     melIsOn = "true";
// })





// functions that handle the drum and the melody sequencer asigning rows and playing sounds.
function drumSeqOn() {
    console.log("playing sequencer...");
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat, '8n');
    
    function repeat() {
        Tone.Transport.bpm.value = bpmValue;
        let step = index % 8;
        allTheKits[loadedKit].forEach(drum => {
            const drumPlayer = new Tone.Player(drum.src)
                // .connect(drumVol)
                .chain(reverb, dist, delay, Tone.Destination);
            drumPlayer.volume.value = drumVolLevel;
            const row = document.getElementById(`${drum.name}Row`);
            let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
            if (iCheck.checked) {
                drumPlayer.autostart = true;
            }
        });
        index++;
    }
    playButtonInit = true;
}


const cMinScale = ["A#", "B#", "C", "D", "D#", "F", "G"];


const memSyn = new Tone.PolySynth({
    polyphony : 4 ,
    volume : .5 ,
    detune : .2 ,
    voice : Tone.Synth
}).chain(melReverb, melPhsr, Tone.Destination);


function melSeqOn() {
    console.log("melody sequencer playing...");
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat, "8n")
    function repeat() {
        Tone.Transport.bpm.value = bpmValue;
        memSyn.volume.value = melVolLevel;
        let step = index % 8;
        cMinScale.forEach(note => {
            const row = document.getElementById(`${note}Row`);
            let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
            if (iCheck.checked) {
                memSyn.triggerAttackRelease(`${note}5`, "8n");
            }
        })
        index++;
    }
}





// switchers - these functions are assigned in the html as "onchange" attributes in their respective selector.
// based on user selections from the drop down menus, re-assign the global active variables to match the user input.
function drumGen(drumKit) {
    drumKitLog.innerText = drumKit;
    loadedKit = drumKit;
    console.log(`selected drums: ${drumKit}`)

}

const setDrumVol = (lvl) => {
    drumVolLevel = lvl;
    console.log(`drum volume set to: ${lvl}dB`)
    drumVolLog.innerText = lvl;
}

const setMelVol = (lvl) => {
    melVolLevel = lvl;
    console.log(`Melody volume set to: ${lvl}dB`)
    melVolLog.innerText = lvl;
}

const setBpm = (lvl) => {
    bpmValue = lvl;
    console.log(`beats per minute set to: ${lvl}bpm`);
    bpmLog.innerText = lvl;
}

const setReverb = (lvl) => {
    if (lvl == 0) {
        reverb.wet.value = 0;
        console.log(`set reverb to: off`);
        reverbLog.innerText = "off"
    } else {
        reverb.wet.value = lvl;
        console.log(`set reverb to: ${lvl}`);
        reverbLog.innerText = lvl;
    }
};

const setDistortion = (lvl) => {
    if (lvl == 0) {
        
        dist.wet.value = 0;
        console.log(`set distortion to: off`);
        distLog.innerText = "off";
    } else {
        
        dist.wet.value = lvl;
        console.log(`set distortion to: ${lvl}`);
        distLog.innerText = lvl;
    }
};

const setDelay = (lvl) => {
    if (lvl == 0) {
        delay.wet.value = 0;
        console.log(`set Delay to: off`);
        delayLog.innerText = "off";
    } else {
        delay.wet.value = lvl;
        console.log(`set Delay to: ${lvl}`);
        delayLog.innerText = lvl;
    }
}

const setMelReverb = (lvl) => {
    if (lvl == 0) {
        melReverb.wet.value = 0;
        console.log(`set melody reverb to: off`);
        melRevLog.innerText = "off";
    } else {
        melReverb.wet.value = lvl;
        console.log(`set melody reverb to: ${lvl}`);
        melRevLog.innerText = lvl;
    }
};

const setMelEffect = (lvl) => {
    if (lvl == 0) {
        melPhsr.wet.value = 0;
        console.log(`set melody phaser to: off`);
        melEffLog.innerText = "off";
    } else {
        melPhsr.wet.value = lvl;
        console.log(`set melody phaser to: ${lvl}`);
        melEffLog.innerText = lvl;
    }
};

document.getElementById("goBack").addEventListener("click", () => {
    location.href = "https://viblocks.herokuapp.com/user-dash/"
})


console.log("load sucessful");