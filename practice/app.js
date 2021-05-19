




// function sequencer() {
//     // const kick = new Tone.Player("./drum_machine/kick.mp3").toMaster();
//     // const clap = new Tone.Player("./drum_machine/clap").toMaster();
//     const synthA = new Tone.FMSynth().toDestination();
//     let index = 0;


//     Tone.Transport.scheduleRepeat(repeat, '8n');
//     Tone.Transport.start();

//     function repeat() {
//         let step = index % 8;
//         let kickInputs = document.querySelector(`.kick input:nth-child(${step + 1})`);
//         let clapInputs = document.querySelector(`.clap input:nth-child(${step + 1})`);
//         if (kickInputs.checked) {
//             synthA.start();
//         }
//         if (clapInputs.checked) {
//             synthA.start();
//         }
//         index++;
//     }
// }

document.getElementById("1").addEventListener('click', async () => {
    await Tone.start();


    console.log("beep 1");

    const synthA = new Tone.FMSynth().toDestination();

    
    const loopA = new Tone.Loop(time => {
        synthA.triggerAttackRelease("C1", "8n", time);
    }, "4n").start(0);

    Tone.Transport.start();
    Tone.Transport.bpm.rampTo(800, 5);

})



document.getElementById('2')?.addEventListener('click', async () => {
    await Tone.start()
    console.log('audio is ready')

    const synthB = new Tone.AMSynth().toDestination();

    const loopB = new Tone.Loop(time => {
        synthB.triggerAttackRelease("F2", "10n", time);
    }, "4n").start("8n");

    Tone.Transport.start()

    Tone.Transport.bpm.rampTo(12, 3);
})

document.getElementById('3')?.addEventListener('click', async () => {
    await Tone.start()
    console.log('audio is ready')

    const synthc = new Tone.MembraneSynth().toDestination();

    const loopc = new Tone.Loop(time => {
        function rand(max) {
            return Math.floor(Math.random() * max);
        } 
        
        synthc.triggerAttackRelease("f0", "1n", time);
        
    }, "4n").start("8n");

    Tone.Transport.start()

    Tone.Transport.bpm.rampTo(300, 10);
})

document.getElementById('4').addEventListener('click', async () => {
    await Tone.start();
    console.log("letsgo");
    const crash = new Tone.MetalSynth().toDestination();

    const loopd = new Tone.Loop(time => {
        crash.triggerAttackRelease("D2", "2n", time);

    }, "2n").start("8n");

    Tone.Transport.start();

    Tone.Transport.bpm.rampTo(150, 100);

})


// sequencer();

console.log("whip");