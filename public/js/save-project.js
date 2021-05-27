
document.getElementById('save-projectname-button').addEventListener('click', (e) => {

    
  //Capturing name of the proejct from modal menu
  const song_title = document.getElementById("project-name-input").value.trim();
  const song_description = document.getElementById("project-description-input").value.trim();
  //hide the modal after capturing name
  document.getElementById("projectNameModal").style.display = "none";

  // all values that will be tracked
  const user_id = document.getElementById("saLog").value.trim();
  const drum_kit = document.getElementById("dkvLog").value.trim();
  const reverb_val = document.getElementById("rvLog").value.trim()
  const distortion_val = document.getElementById("dvLog").value.trim();
  const delay_val = document.getElementById("ppdvLog").value.trim();
  const feedback_val = document.getElementById("ppfvLog").value.trim();
  const melody_is_on = document.getElementById("melodyIsOn").value.trim();
  const melody_reverb_val = document.getElementById("mrvLog").value.trim();
  const melody_effect_val = document.getElementById("mevLog").value.trim();
  const compressor_val = document.getElementById("cvLog").value.trim();
  const bpm_val = document.getElementById("bpmLog").value.trim();

  //declaring variable placeholder for notes
  let drum_sequencer_steps = "";
  //creating a variable that will store all 48 checkboxes
  let boxes = document.querySelector('#pushDrums > div > input');
  //looping through all of them and capuring 0 and 1
  for (let i = 0; i < boxes.length; i++) {
      boxes[i].checked ? drum_sequencer_steps += "1" : drum_sequencer_steps += "0";
      //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
      if (i % 7 && (i !== boxes.length - 1)) {
          drum_sequencer_steps += "-";
      }
  }

  //doing same thing for melodies 

  let melody_sequencer_steps = "";
  //creating a variable that will store all checkboxes
  let boxesMelody = document.querySelector('#mel-container div input');
  //looping through all of them and capuring 0 and 1
  for (let i = 0; i < boxesMelody.length; i++) {
      boxesMelody[i].checked ? melody_sequencer_steps += "1" : melody_sequencer_steps += "0";
      //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
      if (i % 7 && (i !== boxesMelody.length - 1)) {
          melody_sequencer_steps += "-";

      }
  }


  //making POST request to server with name and notes in the body
  const response = await fetch(`/api/projects/`, {
      method: 'POST',
      body: JSON.stringify({
          song_title,
          song_description,
          user_id,
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
          bpm_val
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if (response.ok) {
      let alertList = document.querySelectorAll('.alert');
      alertList.forEach(function (alert) {
          new bootstrap.Alert(alert)
      })
      toastr.success('Hi! I am success message.');
      // document.location.replace('/homepage');
      //add alert
    } else {
      alert(response.statusText);
    }
})