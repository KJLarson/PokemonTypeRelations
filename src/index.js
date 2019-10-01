// import "./styles.css";
import "./custom.scss";
// import { unlink } from "fs";

const app = document.getElementById("app");
const fireURL = "https://pokeapi.co/api/v2/type/fire/";
const waterURL = "https://pokeapi.co/api/v2/type/water/";
const groundURL = "https://pokeapi.co/api/v2/type/ground/";

const typeURLs = [fireURL, waterURL, groundURL];
const types = ["fire", "water", "ground"];

let button = createNode("button");
let cloneButton;

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

      cloneDiv = div.cloneNode();
      cloneDiv.className = typeName;
      append(app, cloneDiv);

      // Create Pokemon type title
      let nameTitle = createNode("h2");
      nameTitle.className = "type-" + typeName;
      nameTitle.textContent = typeName;
      append(cloneDiv, nameTitle);

      for (var key in damageRelations) {
        if (damageRelations.hasOwnProperty(key)) {
          // console.log(damageRelations[key]);
          let damageTypes = damageRelations[key];

          // Create title for each damage relation
          console.log(key);
          cloneH3 = h3.cloneNode();
          cloneH3.textContent = key;
          append(cloneDiv, cloneH3);

          // Create list for each damage relation
          console.log(damageTypes);
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

for (let k = 0; k < types.length; k++) {
  cloneButton = button.cloneNode();
  cloneButton.textContent = types[k];
  cloneButton.className = "type-" + types[k];
  append(app, cloneButton);
}

// Helper functions ----------------------------

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
