// import "./styles.css";
import "./custom.scss";
// import { unlink } from "fs";

const app = document.getElementById("app");
const fireURL = "https://pokeapi.co/api/v2/type/fire/";
const waterURL = "https://pokeapi.co/api/v2/type/water/";

const typeURLs = [fireURL, waterURL];

for (let j = 0; j < typeURLs.length; j++) {
  fetch(typeURLs[j])
    .then(handleResponse)
    .then(function fireData(data) {
      // console.log(data);

      const typeName = data.name;
      const damageRelations = data.damage_relations;
      // const doubleDamageFrom = data.damage_relations.double_damage_from;
      // const doubleDamageTo = data.damage_relations.double_damage_to;
      // const halfDamageFrom = data.damage_relations.half_damage_from;
      // const halfDamageTo = data.damage_relations.half_damage_to;
      // const noDamageFrom = data.damage_relations.no_damage_from;
      // const noDamageTo = data.damage_relations.no_damage_to;
      let h3 = createNode("h3");
      let ul = createNode("ul");
      let li = createNode("li");
      let cloneH3;
      let cloneUL;
      let cloneLI;

      // const damageRelationsArr = [
      //   doubleDamageFrom,
      //   doubleDamageTo,
      //   halfDamageFrom,
      //   halfDamageTo,
      //   noDamageFrom,
      //   noDamageTo
      // ];

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

      // Loop through all damage relations for Fire type
      // for (let i = 0; i < damageRelations.length; i++) {
      //   let damageRelationTitle = createNode("h3");
      //   damageRelationTitle.textContent = damageRelations[i];
      //   append(app, damageRelationTitle);
      // }

      for (var key in damageRelations) {
        if (damageRelations.hasOwnProperty(key)) {
          // console.log(damageRelations[key]);
          let damageTypes = damageRelations[key];

          // Create title for each damage relation
          console.log(key);
          cloneH3 = h3.cloneNode();
          cloneH3.textContent = key;
          append(app, cloneH3);

          // Create list for each damage relation
          console.log(damageTypes);
          cloneUL = ul.cloneNode();
          cloneUL.className = key;
          append(app, cloneUL);

          // Create list item for each type in damage relation
          for (let i = 0; i < damageTypes.length; i++) {
            cloneLI = li.cloneNode();
            cloneLI.textContent = damageTypes[i].name;
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

// Helper functions ----------------------------

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
