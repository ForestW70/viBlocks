
document.getElementById('save-projectname-button').addEventListener('click', (e) => {
    //Capturing name of the proejct from modal menu
    const name = document.getElementById("project-name-input").value.trim();
    //hide the modal after capturing name
    document.getElementById("projectNameModal").style.display = "none";

    const kits = document.getElementById("kits").value.trim();
    const reverb = document.getElementById("reverb").value.trim()
    const distortion = document.getElementById("distortion").value.trim();
    const pingDelay = document.getElementById("pingDelay").value.trim();
    const pingFeedback = document.getElementById("pingFeedback").value.trim();

    //declaring variable placeholder for notes
    let notes = "";
    //creating a variable that will store all 48 checkboxes
    let boxes = document.querySelector('#pushDrums > div > input');
    //looping through all of them and capuring 0 and 1
    for(let i = 0; i < boxes.length; i++){
        boxes[i].checked? notes += "1" : notes += "0";
        //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
        if(i%7 && (i !== boxes.length - 1)){
            notes += "-";
        }
    }

    //doing same thing for melodies 
    let melody = "";
    //creating a variable that will store all checkboxes
    let boxesMelody = document.querySelector('#mel-container div input');
    //looping through all of them and capuring 0 and 1
    for(let i = 0; i < boxesMelody.length; i++){
        boxesMelody[i].checked? melody += "1" : melody += "0";
        //if it's 8th checkbox, we add separator '-' and if it's last checbox - don't add it to the end
        if(i%7 && (i !== boxesMelody.length - 1)){
            melody += "-";
        }
    }


    //making POST request to server with name and notes in the body
    const response = await fetch(`/api/projects/`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          notes,
          melody,
          kits,
          reverb,
          distortion,
          pingDelay,
          pingFeedback
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