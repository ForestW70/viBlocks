
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



// global active variables
let songTitle = "practical loop";
let songArtist = `"3"`;
let songDescription = `''`;
let loadedKit = "technoDrums";
let volumeLevel = 0;
let volume = new Tone.Volume(volumeLevel);

let reverbLevel = 1;
let reverb = new Tone.Reverb(reverbLevel);
reverb.wet.value = 0;

let distortionLevel = .1;
let dist = new Tone.Distortion(distortionLevel);
dist.wet.value = 0;


let delayLevel = .01;
let feedbackLevel = .01;
let delay = new Tone.PingPongDelay(delayLevel, feedbackLevel).toDestination();
delay.wet.value = 0;

// melody variables
let melIsOn = 'false';
const cMinScale = ["C", "D", "D#", "F", "G", "A#", "B#"];
const memSyn = new Tone.MembraneSynth().toDestination();


// currently not linked
let compressorThresh = -20;
let compressorRatio = 6;



// target divs in html that our data will inititially be loaded into
const titleLog = document.getElementById("stLog");
const artistLog = document.getElementById("saLog");
const descriptionLog = document.getElementById("sdLog");
const drumKitLog = document.getElementById("dkvLog");
const reverbLog = document.getElementById("rvLog");
const distLog = document.getElementById("dvLog");
const delayLog = document.getElementById("ppdvLog");
const feedbackLog = document.getElementById("ppfvLog");




// on load event that will decide to load from save or to load from default
// for finished product, it take the place of declaring default values from above.
document.addEventListener("DOMContentLoaded", () => {

    if (volumeLevel == 0) {
        titleLog.innerText = songTitle;
        artistLog.innerText = songArtist;
        descriptionLog.innerText = songDescription;
        drumKitLog.innerText = loadedKit;
        reverbLog.innerText = reverbLevel;
        distLog.innerText = distortionLevel;
        delayLog.innerText = delayLevel;
        feedbackLog.innerText = feedbackLevel;

    } else {
        titleLog.innerText = songTitle;
        artistLog.innerText = songArtist;
        descriptionLog.innerText = songDescription;
        drumKitLog.innerText = loadedKit;
        reverbLog.innerText = reverbLevel;
        distLog.innerText = distortionLevel;
        delayLog.innerText = delayLevel;
        feedbackLog.innerText = feedbackLevel;
    }

});


// sequencer variables
let playButtonInit = false;
let melSeqInit = false;
let isPlaying = false;


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
document.getElementById("melOnOff").addEventListener("click", () => {
    document.getElementById("pushMelody").classList.remove("hide");
    document.getElementById("melOnOff").classList.add("hide");
    melIsOn = "true";
})





// functions that handle the drum and the melody sequencer asigning rows and playing sounds.
function drumSeqOn() {
    console.log("playing sequencer...");
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat, '8n');
    Tone.Transport.bpm.value = 133;

    function repeat() {
        let step = index % 8;
        allTheKits[loadedKit].forEach(drum => {
            const drumPlayer = new Tone.Player(drum.src)
                .connect(volume)
                .chain(reverb, dist, delay);
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

function melSeqOn() {
    console.log("melody sequencer playing...");
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat, "8n")
    Tone.Transport.bpm.value = 133;
    function repeat() {
        let step = index % 8;
        cMinScale.forEach(note => {
            const row = document.getElementById(`${note}Row`);
            let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
            if (iCheck.checked) {
                memSyn.triggerAttackRelease(`${note}4`, "16n");
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

const setReverb = (lvl) => {
    if (lvl == 0) {
        reverbLevel = 1;
        reverb = new Tone.Reverb(1);
        reverb.wet.value = 0;
        console.log(`set reverb to: off`);
        reverbLog.innerText = "off"
    } else {
        reverbLevel = lvl;
        reverb = new Tone.Reverb(lvl);
        reverb.wet.value = 1;
        console.log(`set reverb to: ${lvl}`);
        reverbLog.innerText = lvl;
    }
};

const setDistortion = (lvl) => {
    if (lvl == 0) {
        distortionLevel = .1;
        dist = new Tone.Distortion(.1).toDestination();
        dist.wet.value = 0;
        console.log(`set distortion to: off`);
        distLog.innerText = "off";
    } else {
        distortionLevel = lvl;
        dist = new Tone.Distortion(lvl).toDestination();
        dist.wet.value = 1;
        console.log(`set distortion to: ${lvl}`);
        distLog.innerText = lvl;
    }
};


const setDelay = (lvl) => { //currently not linked
    if (lvl == 0) {
        delayLevel = .01;
        delay = new Tone.PingPongDelay(delayLevel, feedbackLevel);
        delay.wet.value = 0;
        console.log(`set Delay to: off`);
        delayLog.innerText = "off";
    } else if (lvl > 0 && lvl < .25) {
        delayLevel = lvl;
        delay = new Tone.PingPongDelay(delayLevel, feedbackLevel);
        delay.wet.value = 1;
        console.log(`set Delay to: ${lvl}`);
        delayLog.innerText = lvl;
    } else if (lvl == .25) {
        feedbackLevel = .25;
        delay = new Tone.PingPongDelay(delayLevel, feedbackLevel);
        console.log(`set Feedback to: off`);
        feedbackLog.innerText = "off";
    } else {
        feedbackLevel = lvl;
        delay = new Tone.PingPongDelay(delayLevel, feedbackLevel);
        console.log(`set Feedback to: ${lvl}`);
        feedbackLog.innerText = lvl;
    }
};


console.log("load sucessful");