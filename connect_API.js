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

    console.log({ responseData });
    // on va stocker
    // 1 : le token dans un cookie, avec une clé token, sa valeur, et un délai d'expiration de 2 heures
    // 2 : l'email, avec une clé email, sa valeur, et un délai d'expiration de 2 heures
    setCookies(
      responseData.token,
      responseData.email,
      responseData.username,
      2
    );

    location.assign("access_API.html"); // permet redirection vers page souhaitée une fois connexion établie
  } catch (error) {
    console.error(error);
  }
}

// adapté d'après https://www.w3schools.com/js/js_cookies.asp

// cookie stocke token (id encodé), email et username
function setCookies(token, email, username, exhours) {
  const d = new Date();
  d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `token=${token}; ${expires};SameSite=None;Secure;path=/`;
  document.cookie = `email=${email}; ${expires};SameSite=None;Secure;path=/`;
  document.cookie = `username=${username}; ${expires};SameSite=None;Secure;path=/`;
}