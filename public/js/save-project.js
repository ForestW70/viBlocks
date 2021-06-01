
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
