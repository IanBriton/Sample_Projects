"use strict";

//Managing the chaniging of the theme
const selectFontfamily = document.querySelector(".selection");
const selectBody = document.querySelector("body");
const btnTheme = document.querySelector(".btn-theme");
const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const mainBody = document.querySelector(".main");
// const soundBtn = document.querySelector(".sound-btn");
// const audio = document.querySelector('.my-audio')

selectFontfamily.addEventListener("click", function (event) {
  const currentTarget = event.target.value;
  if (currentTarget === "serif") {
    selectBody.style.fontFamily = "serif";
  } else if (currentTarget === "sans-serif") {
    selectBody.style.fontFamily = "sans-serif";
  } else {
    selectBody.style.fontFamily = "monospace";
  }
});
btnTheme.addEventListener("click", function () {
  selectBody.style.background = "black";
  selectBody.style.color = "white";
});

const renderWord = (word) => {
  const html = ` 
  <section>
      <div class="word-sound">
        <div class="word-pronunciation">
          <p class="word">${word[0].word}</p>
          <p class="pronunciation">${word[0].phonetic}</p>
        </div>
        <button class="sound-btn"><i class="fa-solid fa-play"></i></button>
        <audio class="my-audio">
          <source src=${word[0].phonetics[2].audio}>
        </audio>
      </div>
      ${word[0].meanings
        .slice(1)
        .map((meaning) => {
          // console.log(meaning);
          return `
        <div>
          <div><h3 class="type-of-speech">${meaning.partOfSpeech}</h3></div>
          <p class="word-meaning">Meaning</p>
          <ul class="meaning">
            ${meaning.definitions
              .map((def) => {
                return `<li class="single-def">${def.definition}</li>`;
              })
              .join("")}
          </ul>
          <p class="word-meaning synonym">
            synonyms: <span class="span">${
              meaning.synonyms ? meaning.synonyms : "No synonym"
            }</span>
          </p>
        </div>`;
        })
        .join("")}
        <div>
          <div><h3 class="type-of-speech">${
            word[0].meanings[0].partOfSpeech
          }</h3></div>
          <p class="word-meaning">Meaning</p>
          <ul class="meaning">
            ${word[0].meanings[0].definitions
              .map((def) => {
                return `<li class="single-def">${def.definition}</li>`;
              })
              .join("")}
          </ul>
          <p class="word-meaning synonym">
            synonyms: <span class="span">${
              word[0].meanings[0].synonyms
                ? word[0].meanings[0].synonyms
                : "No synonym"
            }</span>
          </p>
        </div>
        <div class="word-source">
          <h4>Source:</h4>
          <p><a class="source-link" href=${word[0].sourceUrls[0]}>${
    word[0].sourceUrls[0]
  }</a></p>
        </div>
      </section>`;
  mainBody.insertAdjacentHTML("beforeend", html);

  window.addEventListener("DOMContentLoaded", () => {
    const soundButton = document.querySelector(".sound-btn");
    soundButton.addEventListener("click", () => {
      console.log("Button clicked");
      const audio = document.querySelector(".my-audio");
      audio.play();
    });
  });
};

const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`${errorMsg}(${res.status})`);
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      renderWord(data);
    });
};
searchBtn.addEventListener("click", function (event) {
  getJSON(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchBar.value}`);
  searchBar.textContent = "";
});
// soundBtn.addEventListener("click", function () {
//   console.log("Button clicked");
// });
