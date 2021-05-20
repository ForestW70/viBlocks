document.getElementById('synth1').addEventListener('click', async () => {
    await Tone.start()
    console.log('audio is ready')

    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C1", "8n");
})


document.getElementById('play').addEventListener('click', async () => {
    await Tone.start();
    console.log("playing...");

    
    
    const synths = [
        new Tone.Synth(),
        new Tone.Synth(),
        new Tone.Synth(),
        new Tone.Synth()
    ];
    
    synths[0].oscillator.type = 'triangle';
    synths[1].oscillator.type = 'sine';
    synths[2].oscillator.type = 'sawtooth';
    synths[3].oscillator.type = 'square';
    
    
    const notes = [
        "A2",
        "G4",
        "B4",
        "A3",
    ];
    
    const gain = new Tone.Gain(0.5);
    gain.toDestination();
    
    synths.forEach(synth => synth.connect(gain));
    
    const rows = document.querySelectorAll('.seq-row');
    let index = 0;
    
    Tone.Transport.scheduleRepeat(repeat, '8n');
    Tone.Transport.start();


    function repeat(time) {
        let step = index % 8;
        for (let i = 0; i < rows.length; i++) {
            let synth = synths[i];
            let note = notes[i];
            let row = rows[i];
            let input = row.querySelector(`input:nth-child(${step + 1})`);
            if (input.checked) {
                synth.triggerAttackRelease(note, "8n", time);
                console.log("hit");
            }
        }

        index++;
    }

})



console.log("whip");