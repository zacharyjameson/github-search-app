'use strict'

function getRepoList(username) {
  const searchUrl = `https://api.github.com/users/${username}/repos`;

  fetch(searchUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Whoops! ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  $('#js-error-message').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>Description: ${responseJson[i].description}</p>
      </li>`
    );
  }
  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const username = $("#js-username").val();
    getRepoList(username);
  });
}

$(watchForm);
