const APIURL = "http://localhost:3000";

function updateBeerDetails(beer) {
  document.getElementById("beer-name").innerHTML = beer.name;
  document.getElementById("beer-image").src = beer.image_url;
  document.getElementById("beer-description").innerHTML = beer.description;
  const customerReviews = beer.reviews
    .map((review) => `<li>${review}</li>`)
    .join("");
  document.getElementById("customer-reviews").innerHTML = customerReviews;
}

function getBeerDetails(beerId) {
  fetch(`${APIURL}/beers/${beerId}`)
    .then((response) => response.json())
    .then(updateBeerDetails)
    .catch((err) => console.log(err));
}

function updateBeerList(beers) {
  const beerList = beers
    .map((beer) => `<li onclick="getBeerDetails(${beer.id})">${beer.name}</li>`)
    .join("");
  document.getElementById("beer-list").innerHTML = beerList;
}

function getBeers() {
  fetch(`${APIURL}/beers`)
    .then((response) => response.json())
    .then(updateBeerList)
    .catch((err) => console.log(err));
}

function updateBeerDescription(e) {
  e.preventDefault();
  const form = e.target;
  document.getElementById("beer-description").innerHTML =
    form.description.value;
  form.reset();
}

function addReview(e) {
  e.preventDefault();
  const form = e.target;
  document.getElementById(
    "customer-reviews"
  ).innerHTML += `<li>${form.review.value}</li>`;
  form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  getBeers();
  getBeerDetails(5);

  document
    .getElementById("description-form")
    .addEventListener("submit", updateBeerDescription);
  document.getElementById("review-form").addEventListener("submit", addReview);
});