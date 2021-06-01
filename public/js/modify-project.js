document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', async (e) => {
    e.preventDefault();
    //capturing song_id from 'play' element
    const id = document.getElementById('play').getAttribute('data-id');
    const song_title = document.getElementById('song-title-data').getAttribute('data-title');
    const song_description = document.getElementById('song-desc-data').getAttribute('data-desc');
    const username = document.getElementById('song-username-data').getAttribute('data-username');
    const user_id = document.getElementById('song-userid-data').getAttribute('data-userid');


    const song_card_color = '';
    const drum_kit_el = document.getElementById('kits');
    const drum_kit = document.getElementById('dkvLog').innerText;

    const reverb_val_el = document.getElementById('reverb');
    const reverb_val = 0.5;

    const distortion_val_el = document.getElementById('distortion');
    const distortion_val = document.getElementById('dvLog').innerText;

    const delay_val_el = document.getElementById('pingDelay');
    const delay_val = document.getElementById('ppdvLog').innerText;

    const feedback_val_el = document.getElementById('pingFeedback');
    const feedback_val = 1;

    const melody_is_on = true;
    const melody_reverb_val = 0.5; 
    const melody_effect_val = document.getElementById('mevLog').innerText;
    const compressor_val = 1;
    const bpm_val = document.getElementById('bpmLog').innerText;

    //declaring variable placeholder for notes
    let drum_sequencer_steps = '';
    //creating a variable that will store all 48 checkboxes
    let boxes = document.querySelectorAll('#pushDrums > div > input');
    //looping through all of them and capuring 0 and 1
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].checked ? drum_sequencer_steps += '1' : drum_sequencer_steps += '0';
      //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
      if ((i + 1) % 8 === 0 && (i !== boxes.length - 1) && (i !== 0)) {
        drum_sequencer_steps += '-';
      }
    }

    //doing same thing for melodies
    let melody_sequencer_steps = '';
    //creating a variable that will store all checkboxes
    let boxesMelody = document.querySelectorAll('#pushMelody div input');
    //looping through all of them and capuring 0 and 1
    for (let i = 0; i < boxesMelody.length; i++) {
      boxesMelody[i].checked ? melody_sequencer_steps += '1' : melody_sequencer_steps += '0';
      //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
      if ((i + 1) % 8 === 0 && (i !== boxesMelody.length - 1) && (i !== 0)) {
        melody_sequencer_steps += '-';
      }
    }


    //making PUT request to server with name and notes in the body
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          //   song_id: id,
          username,
          user_id,
          song_title,
          song_description,
          song_card_color,
          drum_kit,
          drum_sequencer_steps,
          reverb_val,
          distortion_val,
          delay_val,
          feedback_val,
          melody_is_on,
          melody_sequencer_steps,
          melody_reverb_val,
          melody_effect_val,
          compressor_val,
          bpm_val,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('Saved!');
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      //TODO: add success message
      alert(err);
    }
  });
});