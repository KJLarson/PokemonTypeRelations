// import "./styles.css";
import "./custom.scss";
// import { unlink } from "fs";

const app = document.getElementById("app");

const fairyURL = "https://pokeapi.co/api/v2/type/fairy/";
const fireURL = "https://pokeapi.co/api/v2/type/fire/";
const groundURL = "https://pokeapi.co/api/v2/type/ground/";
const normalURL = "https://pokeapi.co/api/v2/type/normal/";
const waterURL = "https://pokeapi.co/api/v2/type/water/";
const typeURLs = [fairyURL, fireURL, groundURL, normalURL, waterURL];

const types = ["fairy", "fire", "ground", "normal", "water"];

let button = createNode("button");
let cloneButton;

// Get data and build HTML for each Pokemon type's damage relations
for (let j = 0; j < typeURLs.length; j++) {
  fetch(typeURLs[j])
    .then(handleResponse)
    .then(function typeData(data) {
      // console.log(data);

      const typeName = data.name;
      const damageRelations = data.damage_relations;

      let div = createNode("div");
      let h3 = createNode("h3");
      let ul = createNode("ul");
      let li = createNode("li");
      let cloneDiv;
      let cloneH3;
      let cloneUL;
      let cloneLI;

      // console.log(damageRelations);

      // Create a div for each Pokemon type
      cloneDiv = div.cloneNode();
      cloneDiv.classList.add("typeDiv", typeName);
      cloneDiv.id = "div-" + typeName;
      cloneDiv.style.display = "none";
      append(app, cloneDiv);

      // Create Pokemon type title
      let nameTitle = createNode("h2");
      nameTitle.classList.add("typeName", "type-" + typeName);
      nameTitle.textContent = capitalize_Words(typeName);
      append(cloneDiv, nameTitle);

      // loop through each damage relation
      for (var key in damageRelations) {
        if (damageRelations.hasOwnProperty(key)) {
          // console.log(damageRelations[key]);
          let damageTypes = damageRelations[key];

          // create div for each damage relation
          cloneDiv = div.cloneNode();
          cloneDiv.classList.add(key);
          document.getElementById("div-" + typeName).appendChild(cloneDiv);

          // Create title for each damage relation
          // console.log(key);
          cloneH3 = h3.cloneNode();
          cloneH3.textContent = capitalize_Words(key.split("_").join(" "));
          cloneH3.className = key;
          append(cloneDiv, cloneH3);

          // Create list for each damage relation
          // console.log(damageTypes);
          cloneUL = ul.cloneNode();
          cloneUL.className = key;
          append(cloneDiv, cloneUL);

          // Create list item for each type in damage relation
          for (let i = 0; i < damageTypes.length; i++) {
            cloneLI = li.cloneNode();
            cloneLI.textContent = damageTypes[i].name;
            cloneLI.className = "type-" + damageTypes[i].name;
            append(cloneUL, cloneLI);
          }
        }
      }
    })
    .catch(error => console.log(error));
}

function handleResponse(response) {
  let contentType = response.headers.get("content-type");
  if (contentType.includes("application/json")) {
    return handleJSONResponse(response);
  } else if (contentType.includes("text/html")) {
    return handleTextResponse(response);
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`);
  }
}

function handleJSONResponse(response) {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject(
        Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        })
      );
    }
  });
}
function handleTextResponse(response) {
  return response.text().then(text => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        err: text
      });
    }
  });
}

// Button for each Pokemon type
for (let k = 0; k < types.length; k++) {
  // Create button
  cloneButton = button.cloneNode();
  cloneButton.textContent = types[k];
  cloneButton.className = "type-" + types[k];
  cloneButton.id = "btn-" + types[k];
  append(app, cloneButton);

  // Make each button toggle corresponding Pokemon type div
  document.getElementById("btn-" + types[k]).addEventListener("click", () => {
    toggle_visibility_grid("div-" + types[k]);
  });
}

// Helper functions ----------------------------

// create new element
function createNode(element) {
  return document.createElement(element);
}

// add element to HTML
function append(parent, el) {
  return parent.appendChild(el);
}

// Toggle visibility of element
function toggle_visibility_grid(id) {
  var element = document.getElementById(id);

  if (element.style.display === "grid") {
    element.style.display = "none";
  } else {
    element.style.display = "grid";
  }
}

//capitalize_Words
function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
