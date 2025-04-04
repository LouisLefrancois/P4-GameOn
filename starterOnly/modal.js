function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const form = document.getElementById("form");

// ouvre le modal au clic sur le bouton "Je m'inscris"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// fonction qui affiche le form
function launchModal() {
  modalbg.style.display = "flex";
}

// ferme le modal au clic sur la croix
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// fonction qui cache le form
function closeModal() {
  modalbg.style.display = "none";
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // empêche le refresh de la page au submit

  if (validate()) {
    // afficher le message de confirmation
    const confirmationMessage = document.getElementById("confirmation-message");
    const success = document.getElementById("success");

    confirmationMessage.style.display = "flex";

    // masquer tous les contenus du formulaire
    const modalBody = document.querySelector(".modal-body");
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.innerHTML = success.outerHTML; // remplace tout par le message

    // reset les champs du formulaire après validation
    form.reset();
  }
});

// fonction pour valider le formulaire
function validate() {
  // récupérer tous les champs du formulaire
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const location = document.querySelectorAll('input[name="location"]');
  const checkbox1 = document.getElementById("checkbox1");

  let isValid = true;

  // vérification du prénom
  if (first.value.trim() === "" || first.value.length < 2) {
    setError(
      first,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    isValid = false;
  } else {
    clearError(first);
  }

  // vérification du nom
  if (last.value.trim() === "" || last.value.length < 2) {
    setError(
      last,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    isValid = false;
  } else {
    clearError(last);
  }

  // vérification de l'email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    setError(email, "Vous devez entrer votre adresse email.");
    isValid = false;
  } else {
    clearError(email);
  }

  // vérification de la date de naissance
  if (birthdate.value === "") {
    setError(birthdate, "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else {
    clearError(birthdate);
  }

  // vérification de la quantité de tournois
  const quantityValue = parseInt(quantity.value, 10);

  if (
    quantity.value.trim() === "" ||
    isNaN(quantityValue) ||
    quantityValue < 0
  ) {
    setError(quantity, "Vous devez saisir une valeur numérique.");
    isValid = false;
  } else {
    clearError(quantity);
  }

  // vérification de la localisation
  const locationSelected = Array.from(location).some((radio) => radio.checked);
  if (!locationSelected) {
    setError(location[0], "Vous devez choisir une option.");
    isValid = false;
  } else {
    clearError(location[0]);
  }

  // vérification des cases à cocher
  if (!checkbox1.checked) {
    setError(
      checkbox1,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    isValid = false;
  } else {
    clearError(checkbox1);
  }

  return isValid;
}

// fonction pour afficher un message d'erreur
function setError(element, message) {
  const formData = element.closest(".formData");
  formData.setAttribute("data-error-visible", "true");
  formData.setAttribute("data-error", message);
}

// fonction pour supprimer le message d'erreur
function clearError(element) {
  const formData = element.closest(".formData");
  formData.removeAttribute("data-error-visible");
  formData.removeAttribute("data-error");
}
