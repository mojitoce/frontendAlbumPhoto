$( document ).ready(function() {
  
  console.log( "ready!" );

  function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  document.getElementById('sub').onclick = function () {
    
    var files = document.getElementById("inp").files;
    var reader = new FileReader();

    if (files && files[0]) {
      reader.onloadend = function () {
        // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        var b64 = reader.result.replace(/^data:.+;base64,/, '');
        var content_type = reader.result.replace(/^data:/,'').replace(/;base64,.+/,'');
        var label = document.getElementById("label").value;
        document.getElementById("img").src = reader.result;
        var filename = create_UUID();
        // console.log({"Content-Type": content_type, "x-amz-meta-customLabels":label});
        sdk.uploadPut({"Content-Type": "application/json", "x-amz-meta-customLabels":label, "filename":filename}, b64, {});
      };
    }

    reader.readAsDataURL(files[0]);


  }


});