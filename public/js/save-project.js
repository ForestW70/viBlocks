<<<<<<< HEAD
document.getElementById('save-projectname-button').addEventListener('click', async (e) => {
  e.preventDefault();
  const id = document.getElementById('play').getAttribute('data-project');
  //Capturing name of the proejct from modal menu
  const song_title = document.getElementById('project-name-input').value.trim();
  //hide the modal after capturing name
  document.getElementById('projectNameModal').style.display = 'none';

  const song_card_color = '';
  const drum_kit = document.getElementById('kits').value.trim();
  const effects_is_on = '';
  const reverb_val = document.getElementById('reverb').value.trim();
  const distortion_val = document.getElementById('distortion').value.trim();
  const delay_val = document.getElementById('pingDelay').value.trim();
  const feedback_val = document.getElementById('pingFeedback').value.trim();
  const melody_is_on = '';
  const melody_reverb_val = '';
  const melody_effect_val = '';
  const volume_val = '';
  const compressor_val = '';
  const bpm_val = '';

  //declaring variable placeholder for notes
  let drum_sequencer_steps = '';
  //creating a variable that will store all 48 checkboxes
  let boxes = document.querySelector('#pushDrums > div > input');
  //looping through all of them and capuring 0 and 1
  for(let i = 0; i < boxes.length; i++){
    boxes[i].checked? drum_sequencer_steps += '1' : drum_sequencer_steps += '0';
    //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
    if(i%7 && (i !== boxes.length - 1)){
      drum_sequencer_steps += '-';
    }
  }

  //doing same thing for melodies
  let melody_sequencer_steps = '';
  //creating a variable that will store all checkboxes
  let boxesMelody = document.querySelector('#mel-container div input');
  //looping through all of them and capuring 0 and 1
  for(let i = 0; i < boxesMelody.length; i++){
    boxesMelody[i].checked? melody_sequencer_steps += '1' : melody_sequencer_steps += '0';
    //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
    if(i%7 && (i !== boxesMelody.length - 1)){
      melody_sequencer_steps += '-';
    }
  }


  //making POST request to server with name and notes in the body
  try{
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        song_card_color,
        drum_kit,
        drum_sequencer_steps,
        effects_is_on,
        reverb_val,
        distortion_val,
        delay_val,
        feedback_val,
        melody_is_on,
        melody_sequencer_steps,
        melody_reverb_val,
        melody_effect_val,
        volume_val,
        compressor_val,
        bpm_val,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }catch(err){
    //TODO: add success message
    alert(err);
  }

});

//adding eventListener for create project button.
//will create a project name and description
const createProjectButton = document.getElementById('create-project-button');
createProjectButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const title = document.getElementById('project-name');
  const desc = document.getElementById('discription-text');

  try{
    const response = await fetch('/api/projects/', {
      method: 'POST',
      body: JSON.stringify({
        song_title : title,
        song_description : desc,
        song_card_color: '',
        drum_kit: '',
        drum_sequencer_steps: '',
        effects_is_on: '',
        reverb_val: '',
        distortion_val: '',
        delay_val: '',
        feedback_val: '',
        melody_is_on: '',
        melody_sequencer_steps: '',
        melody_reverb_val: '',
        melody_effect_val: '',
        volume_val: '',
        compressor_val: '',
        bpm_val: '',
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }catch(err){
    alert(err);
  }
});
=======

//adding eventListener for create project button.
//will create a project name and description
document.addEventListener('DOMContentLoaded', function () {
  const createProjectButton = document.getElementById('create-project-button');
  createProjectButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const title = document.getElementById('project-name').value.trim();
    const desc = document.getElementById('discription-text').value.trim();
    const user_id = document.getElementById('greetings').getAttribute('data-user-id');
    const username = document.getElementById('greetings').getAttribute('data-username');


    try{
      const response = await fetch('/api/projects/', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user_id,
          username: username,
          song_title : title,
          song_description : desc,
          // song_card_color: '',
          // drum_kit: '',
          // drum_sequencer_steps: '',
          // reverb_val: '',
          // distortion_val: '',
          // delay_val: '',
          // feedback_val: '',
          // melody_is_on: '',
          // melody_sequencer_steps: '',
        //   melody_reverb_val: '',
          // melody_effect_val: '',
          // compressor_val: '',
          // bpm_val: '',
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // document.querySelector('.modal').display = 'none';
        document.location.reload();
      }else{
        alert('something went wrong');
      }
    }catch(err){
      alert(err);
    }
  });
});
>>>>>>> forest2
