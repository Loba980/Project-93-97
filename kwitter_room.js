var firebaseConfig = {
  apiKey: "AIzaSyA06XaBbD1qrpS9k6Cmd5RmYCTxsLYbEo0",
  authDomain: "kwitter-52903.firebaseapp.com",
  databaseURL: "https://kwitter-52903-default-rtdb.firebaseio.com",
  projectId: "kwitter-52903",
  storageBucket: "kwitter-52903.appspot.com",
  messagingSenderId: "195599280773",
  appId: "1:195599280773:web:67419fa305d49fc29097ec",
  measurementId: "G-VRSCKLCP2E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter.html";
}