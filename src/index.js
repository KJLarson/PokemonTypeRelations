// import "./styles.css";
import "./custom.scss";
// import { unlink } from "fs";

const app = document.getElementById("app");
let fire = createNode("ul");
fire.className = "fire";
let fireLabel = createNode("li");
fireLabel.className = "fireLabel";
let damageLevelsUL = createNode("ul");
damageLevelsUL.className = "damageLevelsUL";
// let dblDamageTypes = createNode("li");

append(app, fire);

fetch("https://pokeapi.co/api/v2/type/fire/")
  .then(handleResponse)
  .then(function fireData(data) {
    // console.log(data);

    let damageRelations = data.damage_relations;
    // console.log(damageRelations);

    // console.log(Object.keys(damageRelations).length);
    // for (let i = 0; i < Object.keys(damageRelations).length; i++) {
    //   console.log(damageRelations[]);
    // }

    // Try using Underscore.js =================================

    for (var key in damageRelations) {
      if (damageRelations.hasOwnProperty(key)) {
        // console.log(damageRelations[key]);
        let damageTypes = damageRelations[key];
        console.log(damageTypes);
        if (damageTypes.hasOwnProperty(key)) {
          // console.log(damageTypes[key]);
        }
      }
    }

    fireLabel.textContent = data.name;
    append(fire, fireLabel);
    append(fireLabel, damageLevelsUL);

    // for (let damage in damageRelations) {

    // for (let j = 0; j < damageRelations.length; j++) {
    //   let damageLevelLI = createNode("li");
    //   damageLevelLI.className = "damageLevel-" + damageRelations[j];
    //   damageLevelLI.textContent = damageRelations[j];
    //   append(damageLevelsUL, damageLevelLI);

    //   let pokemonTypesUL = createNode("ul");
    //   append(damageLevelLI, pokemonTypesUL);

    //   for (let i = 0; i < damageRelations[j].length; i++) {
    //     let pokemonTypeLI = createNode("li");
    //     pokemonTypeLI.textContent = damageRelations[j][i];
    //     append(pokemonTypesUL, pokemonTypeLI);
    //   }

    // for (let type in damage) {
    //   let pokemonTypeLI = createNode("li");
    //   pokemonTypeLI.textContent = type;
    //   append(pokemonTypesUL, pokemonTypeLI);

    //   for (let name in type) {
    //     let pokemonTypeLI = createNode("li");
    //     pokemonTypeLI.textContent = name;
    //     append(pokemonTypesUL, pokemonTypeLI);
    // }

    // }
    // }
  })
  .catch(error => console.log(error));

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

// Helper functions ----------------------------

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
