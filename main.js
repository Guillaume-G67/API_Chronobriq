import "./test_API.css";

// On récupère le formulaire et on lui attache un écouteur

const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);

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
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

    // utilisation des cookies
    // 1 : le token dans un cookie, avec une clé token, sa valeur, et un délai d'expiration de 2 heures
    // 2 : l'email, avec une clé email, sa valeur, et un délai d'expiration de 2 heures
    // 3 : le username, avec une clé username, sa valeur, et un délai d'expiration de 2 heures
    // setCookies(
    //   responseData.token,
    //   responseData.email,
    //   responseData.username,
    //   2
    // );

    // utilisation de sessionStorage pour stocker informations utilisateur
    sessionStorage.setItem("token", responseData.token);
    sessionStorage.setItem("email", responseData.email);
    sessionStorage.setItem("username", responseData.username);

    location.assign("access_API.html"); // permet redirection vers page souhaitée une fois connexion établie
  } catch (error) {
    console.error(error);
  }
}

// adapté d'après https://www.w3schools.com/js/js_cookies.asp

// cookie stocke token (id encodé), email et username
// function setCookies(token, email, username, exhours) {
//   const d = new Date();
//   d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = `token=${token}; ${expires};SameSite=None;Secure;path=/`;
//   document.cookie = `email=${email}; ${expires};SameSite=None;Secure;path=/`;
//   document.cookie = `username=${username}; ${expires};SameSite=None;Secure;path=/`;
// }


// document.querySelector("#app").innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

// Notes sur jwt-decode

// import jwt_decode from "jwt-decode";
 
// var token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiZXhwIjoxNjQ1MDA5MTA4fQ.MC3pAbA6xKUuIcKxO3VbR4MsdHkGKex89zt5loiqLgU/// jwt token";
// var decoded = jwt_decode(token);
 
// console.log(decoded);
 
// /* prints:
//  * { foo: "bar",
//  *   exp: 1393286893,
//  *   iat: 1393268893  }
//  */
 
// // decode header by passing in options (useful for when you need `kid` to verify a JWT):
// var decodedHeader = jwt_decode(token, { header: true });
// console.log(decodedHeader);
 
// /* prints:
//  * { typ: "JWT",
//  *   alg: "HS256" }
//  */
