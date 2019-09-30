// import "./styles.css";
import "./custom.scss";
// import { unlink } from "fs";

const app = document.getElementById("app");
const fireURL = "https://pokeapi.co/api/v2/type/fire/";

fetch(fireURL)
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

    const damageRelationsArr = [
      doubleDamageFrom,
      doubleDamageTo,
      halfDamageFrom,
      halfDamageTo,
      noDamageFrom,
      noDamageTo
    ];

    // console.log(damageRelations);

    let nameTitle = createNode("h2");
    nameTitle.textContent = typeName;
    append(app, nameTitle);

    // Double Damage From list for Fire Type -------------
    // let doubleDamageFromTitle = createNode("h3");
    // doubleDamageFromTitle.textContent = "Double Damage From";
    // append(app, doubleDamageFromTitle);
    // let doubleDamageFromList = createNode("ul");
    // doubleDamageFromList.className = "doubleDamageFrom";
    // append(app, doubleDamageFromList);
    // for (let i = 0; i < doubleDamageFrom.length; i++) {
    //   let relatedType = createNode("li");
    //   relatedType.textContent = doubleDamageFrom[i].name;
    //   append(doubleDamageFromList, relatedType);
    // }
    // ---------------------------------------
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
