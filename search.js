$( document ).ready(function() {
  const searchForm = document.querySelector("#search-form");
  const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
  const info = document.querySelector(".info");

  // The speech recognition interface lives on the browser’s window object
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

  if(SpeechRecognition) {
    console.log("Your Browser supports speech Recognition");
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    // recognition.lang = "en-US";

    searchForm.insertAdjacentHTML("beforeend", '<button type="button">Voice<i class="fas fa-microphone" aria-hidden="true"></i></button>');
    searchFormInput.style.paddingRight = "50px";

    const micBtn = searchForm.querySelector("button");
    const micIcon = micBtn.firstElementChild;

    micBtn.addEventListener("click", micBtnClick);
    function micBtnClick() {
      if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
        recognition.start(); // First time you have to allow access to mic!
      }
      else {
        recognition.stop();
      }
    }

    recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
    function startSpeechRecognition() {
      micIcon.classList.remove("fa-microphone");
      micIcon.classList.add("fa-microphone-slash");
      searchFormInput.focus();
      console.log("Voice activated, SPEAK");
    }

    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
    function endSpeechRecognition() {
      micIcon.classList.remove("fa-microphone-slash");
      micIcon.classList.add("fa-microphone");
      searchFormInput.focus();
      console.log("Speech recognition service disconnected");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
    function resultOfSpeechRecognition(event) {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      
      if(transcript.toLowerCase().trim()==="stop recording") {
        recognition.stop();
      }
      else if(!searchFormInput.value) {
        searchFormInput.value = transcript;
      }
      else {
        if(transcript.toLowerCase().trim()==="go") {
          searchForm.submit();
        }
        else if(transcript.toLowerCase().trim()==="reset input") {
          searchFormInput.value = "";
        }
        else {
          searchFormInput.value = transcript;
        }
      }
    }
    
    info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';
    
  }
  else {
    console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
  }

});

function get_images(event){
  // event.preventDefault();
  console.log(event)
  const searchFormInput = document.querySelector("#search-form input"); // <=> document.querySelector("#search-form input");
  var params = {
    q: searchFormInput.value
  };


  sdk.searchGet(params,{},{}).then(function(result){
    const album = document.querySelector("#album");
    // console.log(result);
    var links = result['data']['result'];

    let i = 0;
    for (urls of links) {
      if (i === 5) { break; }
      let ins = "<b>" + urls['labels'].join(',') + "<b>";
      ins += '<div class="column"><img src="' + urls['url'] + '"></div>'
      album.insertAdjacentHTML("beforeend", ins);
      i++;
    }


  });
}