const socket = io(); // Se conecta al socket del server

// Swal.fire({
//   title: "Welcome to the chat!",
//   text: "Mensaje inicial",
//   icon: "Success",
// });

let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Enter your name",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return !value && "You need to write something!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});
