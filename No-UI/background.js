/**
 * Function responsible to fill the form and submit it
 * Passed as a string to `executeScript` method
 */
function fillFormAndSubmit() {
  const url = "http://10.10.0.1/24online/webpages/client.jsp";

  const fieldsExist = (document) => {
    const checkbox = document.getElementById("agreepolicy");
    const userNameFields = document.getElementsByName("username");
    const passwordFields = document.getElementsByName("password");
    const loginButton = document.getElementById("loginbtn");

    console.log(checkbox, userNameFields, passwordFields, loginButton);
    return (
      checkbox &&
      userNameFields.length > 0 &&
      passwordFields.length > 0 &&
      loginButton
    );
  };

  if (!fieldsExist(document)) {
    console.log("fields not found");
    return window.open(url, "_blank");
  }

  const checkbox = document.getElementById("agreepolicy");
  if (checkbox) {
    checkbox.checked = true;
  } else {
    console.log("checkbox not found");
  }

  const userNameFields = document.getElementsByName("username");
  if (userNameFields.length > 0) {
    // TODO: 1 Enter your registration number
    userNameFields[0].value = "your_reg_no";
  }

  const passwordFields = document.getElementsByName("password");
  if (passwordFields.length > 0) {
    // TODO: 2 Enter your Internet password
    passwordFields[0].value = "your_password";
  }

  const loginButton = document.getElementById("loginbtn");
  if (loginButton) {
    loginButton.removeAttribute("disabled");
    loginButton.click();
  }
}

/**
 * Add an event listener to listen to the click event on the extension icon
 */
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("clicked", tab);
  chrome.tabs.executeScript(tab.id, {
    code: "(" + fillFormAndSubmit + ")();",
  });
});
