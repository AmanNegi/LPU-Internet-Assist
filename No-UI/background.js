const url = "https://internet.lpu.in/24online/webpages/client.jsp";

function fillFormAndSubmit() {
  const checkbox = document.getElementById("agreepolicy");
  if (checkbox) {
    checkbox.checked = true;
  } else {
    console.log("checkbox not found");

    // Open a new tab with correct URL
    if (!window.location.href.startsWith("https://internet.lpu")) {
      return window.open(url, "_blank");
    }
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

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("Inside Execlute script");
  if (!tab.url.startsWith("https://internet.lpu")) {
    return window.open(url, "_blank");
  }
  chrome.tabs.executeScript(tab.id, {
    code: "(" + fillFormAndSubmit + ")();",
  });
});
