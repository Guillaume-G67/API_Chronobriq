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
    // On vérifie qu'il n'y a pas d'erreur dans le formulaire avant d'effectuer l'action
    if (
      error_email.className == "error_email active" ||
      error_password.className == "error_password active"
    ) {
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

// Vérification de l'email

const email = document.getElementById("email");
const error_email = document.querySelector(".error_email");

email.addEventListener("input", function (event) {
  // Chaque fois que l'utilisateur saisit quelque chose
  // on vérifie la validité du champ e-mail.
  if (isEmailValid(email.value)) {
    // S'il y a un message d'erreur affiché et que le champ
    // est valide, on retire l'erreur
    error_email.innerHTML = ""; // On réinitialise le contenu
    error_email.classList.remove("active"); // On réinitialise l'état visuel du message
  } else {
    // S'il est invalide, on affiche un message d'erreur personnalisé
    error_email.innerHTML = "J'attends une adresse e-mail correcte !";
    error_email.className = "error_email active";
  }
});

// Fonction pour vérifier validité de l'email

function isEmailValid(email) {
  const regex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
  let bool = String(email).toLowerCase().match(regex);
  if (bool === null) {
    return false;
  } else {
    return true;
  }
}

// Vérification du mot de passe

const password = document.getElementById("password");
const error_password = document.querySelector(".error_password");

password.addEventListener("input", function (event) {
  // Chaque fois que l'utilisateur saisit quelque chose
  // on vérifie la validité du champ e-mail.
  if (password.value.length >= 6) {
    // S'il y a un message d'erreur affiché et que le champ
    // est valide, on retire l'erreur
    error_password.innerHTML = ""; // On réinitialise le contenu
    error_password.classList.remove("active"); // On réinitialise l'état visuel du message
  } else {
    // S'il est invalide, on affiche un message d'erreur personnalisé
    error_password.innerHTML =
      "Le mot de passe doit faire au moins 6 caractères !";
    error_password.className = "error_password active";
  }
});
