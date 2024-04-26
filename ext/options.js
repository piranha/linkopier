const form = document.querySelector('form');

function saveOptions(e) {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(form));
  browser.storage.sync.set(data);
}

function restoreOptions() {
  function setCurrentChoice(result) {
    for (var key of result) {
      document.querySelector(`[name=${key}]`).value = result[key];
    }
  }

  function onError(error) {
    console.log(`Error restoring options: ${error}`);
  }

  let getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
form.addEventListener("submit", saveOptions);
