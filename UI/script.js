getLocalPrefs();

/**
 * Add an onclick listener to login button in extension popup
 */
document.getElementById("login").addEventListener("click", () => {
  const uid = document.getElementById("uid").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("lpu-prefs", JSON.stringify({ uid, password }));

  console.log(uid, password);
  onLoginPressed(uid, password);
});

/**
 * Add an onclick listener to the open site button in extension popup
 */
document.getElementById("openSite").addEventListener("click", function () {
  const url = "http://10.10.0.1/24online/webpages/client.jsp";
  return window.open(url, "_blank");
});

/**
 * Perform the login operation on the given page 
 * @param {string} uid 
 * @param {string} password 
 */
function onLoginPressed(uid, password) {
  console.log(uid, password);
  chrome.tabs
    .query({ active: true, currentWindow: true })
    .then(function (tabs) {
      var activeTab = tabs[0];
      var activeTabId = activeTab.id;

      return chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        func: (uid, password) => {
          console.log("Inside Execlute script");
          const checkbox = document.getElementById("agreepolicy");

          if (checkbox) {
            checkbox.checked = true;
          }

          const userNameFields = document.getElementsByName("username");
          console.log(userNameFields);

          if (userNameFields.length > 0) {
            userNameFields[0].value = uid;
          }

          const passwordFields = document.getElementsByName("password");
          console.log(passwordFields);

          if (passwordFields.length > 0) {
            passwordFields[0].value = password;
          }

          const loginButton = document.getElementById("loginbtn");
          if (loginButton) {
            // remove disabled attribute
            loginButton.removeAttribute("disabled");
            loginButton.click();
          }
        },
        args: [uid, password],
      });
    })
    .then(function (results) {
      console.log("Results are: ", results);
      message.innerText = "User logged in successfully!";
    })
    .catch(function (error) {
      message.innerText =
        "There was an error injecting script : \n" + error.message;
    });
}

/**
 *  Get the DOM object with the given id
 * @param {string} id
 * @returns {HTMLElement | undefined} - returns the DOM object with the given id or null if it does not exist
 */
function getDOMObject(id) {
  var element = document.getElementById(id);
  if (!element) return null;
  return element;
}

/**
 * Use Local Storage to store the user's preferences
 */
function getLocalPrefs() {
  const res = localStorage.getItem("lpu-prefs");
  if (res) {
    const prefs = JSON.parse(res);
    document.getElementById("uid").value = prefs.uid;
    document.getElementById("password").value = prefs.password;
  }
}
