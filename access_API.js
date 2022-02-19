// Imports

import "./test_API.css";
import jwt_decode from "jwt-decode";

// Recupère user_id dans le token
const token = sessionStorage.getItem("token");
const formatedToken = token.concat("/// jwt token");
const decodedToken = jwt_decode(formatedToken);
const id = decodedToken.user_id;

// Fonction auto-exécutante pour créer un paragraphe d'accueil avec email de l'utilisateur

(() => {
  const div = document.getElementById("div");
  const text = document.createElement("p");
  div.appendChild(text);
  var newContent = document.createTextNode(
    `Vous êtes maintenant connecté.e en tant que ${sessionStorage.getItem(
      "username"
    )} (${sessionStorage.getItem("email")}) et pouvez accéder à différentes
    choses.`
  );
  text.appendChild(newContent);
})();

// On récupère le formulaire et on lui attache un écouteur

const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);

const user_update = document.getElementById("user_update");
user_update.addEventListener("submit", handleUserUpdateSubmit);

// Fonction pour effectuer la requête fetch

async function postFormDataAsJson({ url, formData, fetchMethod }) {
  let plainFormData = Object.fromEntries(formData.entries());

  // si demande informations sur un utilisateur en particulier
  const requestedUserID = parseInt(plainFormData.requestedUserID, 10);
  if (requestedUserID > 0) {
    url = url.concat(requestedUserID);
  }

  const fetchOptions = {
    method: fetchMethod,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  };

  // lignes suivantes pour passer un body à fetch avec contenu du formulaire user_update
  if (fetchMethod === "PATCH") {
    // si les deux champs sont vides, on ne fait pas la requête
    if (plainFormData.email === "" && plainFormData.username === "") {
      return "Les champs email et username sont vides, la requête fetch n'est pas exécutée.";
    }
    // on doit d'abord traiter plainFormData pour retirer les champs vides
    else if (plainFormData.email === "") {
      plainFormData = {
        username: plainFormData.username,
      };
    } else if (plainFormData.username === "") {
      plainFormData = {
        email: plainFormData.email,
      };
    }
    // ensuite on formate plainFormData selon format demandé par l'API
    var formatedFormData = {
      user: plainFormData,
    };
    // on convertit en JSON
    const formDataJsonString = JSON.stringify(formatedFormData);
    // et on passe le body dans les fetchOptions
    fetchOptions.body = formDataJsonString;
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
// Fonction à déclencher lors de la soumission du formulaire "user_update"

async function handleUserUpdateSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);

    const responseData = await postFormDataAsJson({
      url: url.concat(id), // renvoie undefined si on .concat(id) en amont, donc on le fait ici
      formData,
      fetchMethod: "PATCH",
    });

    console.log("responseData : " + responseData);
  } catch (error) {
    console.error(error);
  }
}

// Fonction à déclencher lors de la soumission du formulaire "form"

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({
      url,
      formData,
      fetchMethod: "GET",
    });

    createList(responseData);
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour créer la liste des utilisateurs

function createList(responseData) {
  // crée une liste avec les utilisateurs et leurs informations
  // si elle existe déjà on la supprime pour pouvoir la recréer
  if (document.getElementById("ul") != null) {
    const element = document.getElementById("ul");
    element.parentNode.removeChild(element);
  }

  let ul = document.createElement("ul");
  ul.id = "ul";
  list = document.getElementById("list");
  list.appendChild(ul);

  if (responseData.data.length == undefined) {
    let id = responseData.data.id;
    let email = responseData.data.attributes.email;
    let username = responseData.data.attributes.username;
    createListItem(id, email, username);
  } else {
    for (let i = 0; i < responseData.data.length; i++) {
      let id = responseData.data[i].id;
      let email = responseData.data[i].attributes.email;
      let username = responseData.data[i].attributes.username;
      createListItem(id, email, username);
    }
  }
}

// Fonction pour créer un élément de liste

function createListItem(id, email, username) {
  const li = document.createElement("li");
  ul.appendChild(li);

  let newContent = document.createTextNode(
    `id : ${id} , email : ${email} , username : ${username}`
  );
  li.appendChild(newContent);
}

// d'après https://www.w3schools.com/js/js_cookies.asp

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie); // utile si contient des caractères spéciaux encodés
  let ca = decodedCookie.split(";"); // permet de récupérer un array avec les "paires clé-valeur"
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1); // car les "paires clé-valeur" commencent par un espace (sauf la première)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length); // si c vaut "email=guillaume@test.org" alors renvoie "guillaume@test.org"
    }
  }
  return "";
}

// Propose aussi fonction pour vérifier cookie

// function checkCookie() {
//   let user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }
