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

    // utilisation de sessionStorage pour stocker informations utilisateur
    sessionStorage.setItem("token", responseData.token);
    sessionStorage.setItem("email", responseData.email);
    sessionStorage.setItem("username", responseData.username);

    location.assign("access_API.html"); // permet redirection vers page souhaitée une fois connexion établie
  } catch (error) {
    console.error(error);
  }
}
