// Listeners

// bouton
const button = document.getElementById("backToConnect");
button.addEventListener("click", () => location.assign("index.html"));

// On récupère le formulaire et on lui attache un écouteur
const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);

// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  var formatedFormData = {
    user: plainFormData,
  };
  const formDataJsonString = JSON.stringify(formatedFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    // On vérifie que les champs sont correctement remplis
    if (formContainsError()) {
      throw new Error("Erreur dans un champ du formulaire.");
    }

    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

    console.log({ responseData });

    location.assign("index.html"); // permet redirection vers page de connexion une fois utilisateur créé avec succès
  } catch (error) {
    console.error(error);
  }
}

function formContainsError() {
  if (
    email.value.indexOf("@", 0) < 0 ||
    email.value.indexOf(".", email.value.indexOf("@") + 1) < 0
  ) {
    alert("Mettez une adresse email valide.");
    email.focus();
    return true;
  } else if (password.value.length < 6) {
    alert("Le mot de passe est trop court.");
    password.focus();
    return true;
  }
}

// let newUser = {
//   user: {
//     email: document.querySelector("#email"),
//     username: document.querySelector("#username"),
//     password: document.querySelector("#password"),
//   },
// };

// document.querySelector("#form").addEventListener("submit", function (e) {
//   newUser.email = document.querySelector("#email");
//   console.log(newUser);
// });

// window.addEventListener("load", function () {
//   function signUp() {
//     // Bind the FormData object and the form element
//     const FD = new FormData(form);

//     fetch(`https://chronobriq-api.canaille.netlib.re/api/v1/users/`, {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(FD),
//     })
//       .then((data) => data.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error("Error: " + error));
//   }

//   const form = document.getElementById("form");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     signUp();
//   });
// });

// const signUp = () => {
//   fetch(`https://chronobriq-api.canaille.netlib.re/api/v1/users/`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify(newUser),
//   })
//     .then((data) => data.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Error: " + error));
// };

// const showUser = (userIndex) => {
//     fetch(`https://chronobriq-api.canaille.netlib.re/api/v1/users/${userIndex}`, {
//       method: "get",
//       headers: {
//         authorization:
//           "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiZXhwIjoxNjQzNzkwNjA0fQ.SGFbUPUpZOK-Aa5eqJ6DdqrUpuKepJ7rRdGEAInQ94w",
//       },
//     })
//       .then((data) => data.json()) // data correspond aux données renvoyées par fetch
//       .then((data) => console.log(data.data.attributes.email))
//       .catch((error) => console.error("Error: " + error));
//   };

//   const usersIndex = () => {
//     fetch(`https://chronobriq-api.canaille.netlib.re/api/v1/users/`, {
//       method: "get",
//       headers: {
//         authorization:
//           "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiZXhwIjoxNjQzNzkwNjA0fQ.SGFbUPUpZOK-Aa5eqJ6DdqrUpuKepJ7rRdGEAInQ94w",
//       },
//     })
//       .then((data) => data.json())
//       .then((data) => console.log(data.data))
//       .catch((error) => console.error("Error: " + error));
//   };

//   let newUser = {
//     user: {
//       email: "doe3@email.com",
//       username: "3Doe",
//       password: "azerty",
//     },
//   };

// // There are many ways to pick a DOM node; here we get the form itself and the email
// // input box, as well as the span element into which we will place the error message.
// const form = document.getElementsByTagName("form")[0];

// const email = document.getElementById("email");
// const emailError = document.querySelector("#email + span.error");

// email.addEventListener("input", function (event) {
//   // Each time the user types something, we check if the
//   // form fields are valid.

//   if (email.validity.valid) {
//     // In case there is an error message visible, if the field
//     // is valid, we remove the error message.
//     emailError.textContent = ""; // Reset the content of the message
//     emailError.className = "error"; // Reset the visual state of the message
//   } else {
//     // If there is still an error, show the correct error
//     showError();
//   }
// });

// form.addEventListener("submit", function (event) {
//   // if the email field is valid, we let the form submit

//   if (!email.validity.valid) {
//     // If it isn't, we display an appropriate error message
//     showError();
//     // Then we prevent the form from being sent by canceling the event
//     event.preventDefault();
//   }
// });

// function showError() {
//   if (email.validity.valueMissing) {
//     // If the field is empty,
//     // display the following error message.
//     emailError.textContent = "You need to enter an e-mail address.";
//   } else if (email.validity.typeMismatch) {
//     // If the field doesn't contain an email address,
//     // display the following error message.
//     emailError.textContent = "Entered value needs to be an e-mail address.";
//   } else if (email.validity.tooShort) {
//     // If the data is too short,
//     // display the following error message.
//     emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
//   }

//   // Set the styling appropriately
//   emailError.className = "error active";
// }
