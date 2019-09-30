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

    const typeName = data.name;
    const damageRelations = data.damage_relations;
    const doubleDamageFrom = data.damage_relations.double_damage_from;
    const doubleDamageTo = data.damage_relations.double_damage_to;
    const halfDamageFrom = data.damage_relations.half_damage_from;
    const halfDamageTo = data.damage_relations.half_damage_to;
    const noDamageFrom = data.damage_relations.no_damage_from;
    const noDamageTo = data.damage_relations.no_damage_to;

    // console.log(typeName);

    let nameTitle = createNode("h2");
    nameTitle.textContent = typeName;
    append(app, nameTitle);
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
