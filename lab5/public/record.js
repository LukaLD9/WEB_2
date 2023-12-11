import * as myAudioRecorder from '/modules/@dannymoerkerke/audio-recorder/src/audio-recorder.js';
      
// Save a reference to the original saveFile function
const originalSaveFile = myAudioRecorder.AudioRecorder.prototype.saveFile;


myAudioRecorder.AudioRecorder.prototype.saveFile = async function (file) {
  const formData = new FormData();
  const name = prompt('Enter a name for your mp3 recording');
  formData.append('name', name);
  if(!name) {
    alert('Please enter a name for your mp3 recording');
    return;
  }

  formData.append('audio', file, `${name}.mp3`); 

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('File uploaded successfully!');
    } else {
      console.error('Failed to upload file.');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};