import * as myAudioRecorder from '/modules/@dannymoerkerke/audio-recorder/src/audio-recorder.js';
import { set } from "/modules/idb-keyval/dist/index.js";
      
// Save a reference to the original saveFile function
const originalSaveFile = myAudioRecorder.AudioRecorder.prototype.saveFile;


myAudioRecorder.AudioRecorder.prototype.saveFile = async function (file) {
  const formData = new FormData();
  const name = prompt('Enter a name for your mp3 recording');
  formData.append('name', name);
  if(!name) {
    alert('Please enter a name for your mp3 recording');
    return false;
  }

  formData.append('audio', file, `${name}.mp3`); 

  try {
    if("serviceWorker" in navigator && "SyncManager" in window) {
      let ts = new Date().toISOString();
      let id = ts + name.replace(/\s/g, '_');
      set(id,
        { id,
          ts,
          title: name,
          audio: file
      });
      navigator.serviceWorker.ready.then((sw) => {
        sw.sync.register("sync-records");
      });
    } else {
      alert("TODO - vaš preglednik ne podržava bckg sync...");
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }

};






    // return
    // const response = await fetch('/upload', {
    //   method: 'POST',
    //   body: formData
    // });

    // if (response.ok) {
    //   console.log('File uploaded successfully!');
    // } else {
    //   console.error('Failed to upload file.');
    // }