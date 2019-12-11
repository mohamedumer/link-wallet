function save() {
  var ar = document.getElementById("tags").value;
  var array = ar.split(" ");
  document.getElementById("tags").value = "";

  console.log(array);
  var data = {
    link: document.getElementById("link").value,
    tag: array
  };
  document.getElementById("link").value = "";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert("Success");
    }
  };
  xhttp.open("POST", "http://localhost:3000/postdata", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(data));
}

function search() {
  document.getElementById("demo").innerHTML = "";

  var stag = document
    .getElementById("stag")
    .value.trim()
    .split(" ");

  console.log("dfdf", stag);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var a = JSON.parse(this.responseText);
      console.log(a.word);
      if (a.word.length == 0) {
        document.getElementById("demo").innerHTML = " Nothing found..!!";
      } else {
        for (i = 0; i < a.word.length; i++) {
          document.getElementById("demo").innerHTML +=
            "<div class='bg-warning border ' > <a href='" +
            a.word[i].link +
            "' target='_blank'><h4>" +
            a.word[i].link +
            "</h4></a></div><br>";
        }
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/getdata/" + stag, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send();
}

function showall() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var a = JSON.parse(this.responseText);
      console.log(a.word);
      if (a.word.length == 0) {
        document.getElementById("all").innerHTML = " Nothing found..!!";
      } else {
        for (i = 0; i < a.word.length; i++) {
          document.getElementById("all").innerHTML +=
            "<div class='bg-warning border ' > <a href='" +
            a.word[i].link +
            "' target='_blank'><h5>" +
            a.word[i].link +
            "</h5></a>Tags : <p>" +
            a.word[i].tag +
            "</p></div><br>";
        }
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/getdata", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send();
}
