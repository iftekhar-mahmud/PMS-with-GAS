// Global variables
var productSheetName = "Product";
var idsSheetName = "IDs";

function doGet(e) {
  // Serve HTML page for login/signup
  return HtmlService.createHtmlOutputFromFile("index");
}

function signUp(id, password) {
  var form = document.getElementById("signupForm");
    google.script.run.withSuccessHandler(function() {
      alert("Sign up successful!");
    }).signUp(form.id.value, form.password.value);
    form.reset();
}

function login(id, password) {
   var idsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(idsSheetName);
  var data = idsSheet.getDataRange().getValues();
  
  // Check for admin login
  if (id === "admin" && password === "admin") {
    console.log("Admin login successful.");
    return "admin";
  }
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id && data[i][1] == password) {
      console.log("Customer login successful.");
      return "customer";
    }
  }
  console.log("Login failed.");
  return "invalid";
}

function getNavigationBar(userType) {
  var navigationBar = {
    customer: [
      { title: "PMS" },
      { menu: "Product Buy", action: "buyProduct" },
      { menu: "See Buy History", action: "buyHistory" },
      { menu: "Logout", action: "logout" }
    ],
    admin: [
      { title: "PMS" },
      { menu: "Product Restock", action: "restockProduct" },
      { menu: "Price Edit", action: "editPrice" },
      { menu: "User Control", action: "userControl" },
      { menu: "Logout", action: "logout" }
    ]
  };
  
  return JSON.stringify(navigationBar[userType]);
}
function redirect(userType) {
  return userType;
}
// Other functions for product and user management can be added here
