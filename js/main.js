// ? ===========================> Color Mode
var mode = document.body.getAttribute("data-bs-theme");
var trigger = document.querySelectorAll("i");
var modeTrigger;
var textColor;
var backgroundColor;

function checkMode() {
  if (localStorage.key("modeTheme") != null) {
    mode = JSON.parse(localStorage.getItem("modeTheme"));
    document.body.setAttribute("data-bs-theme", mode);
  }
}

function checkIcon(mode) {
  if (mode == "dark") {
    trigger[1].classList.add("d-none");
    trigger[0].classList.remove("d-none");
    textColor = "#fff";
    backgroundColor = "#000";
  } else {
    textColor = "#000";
    backgroundColor = "#fff";
  }
}

function pushLocal(key, mode) {
  modeTrigger = mode;
  localStorage.setItem(key, JSON.stringify(modeTrigger));
}

checkMode();
checkIcon(mode);

for (var i = 0; i < trigger.length; i++) {
  trigger[i].addEventListener("click", function (e) {
    if (mode == "light") {
      e.target.classList.add("d-none");
      trigger[0].classList.remove("d-none");
      mode = "dark";
      textColor = "#fff";
      backgroundColor = "#000";
    } else {
      e.target.classList.add("d-none");
      trigger[1].classList.remove("d-none");
      mode = "light";
      textColor = "#000";
      backgroundColor = "#fff";
    }
    document.body.setAttribute("data-bs-theme", mode);
    pushLocal("modeTheme", mode);
  });
}

// ! ===========================> CRUDS Script
var inputName = document.querySelector("#productName");
var inputPrice = document.querySelector("#productPrice");
var inputCategory = document.querySelector("#productCategory");
var inputDescription = document.querySelector("#productDescription");
var tableData = document.querySelector("#showData");
var addProductButton = document.querySelector(".add-product");
var clearFormButton = document.querySelector(".clear-form");
var updateProductButton = document.querySelector(".update-product");
var cancelUpdateButton = document.querySelector(".cancel-update");
var searchProduct = document.querySelector("#searchProduct");
var feedback = document.querySelectorAll(".feed-back");
var products = [];
var productIndex;
checkLocalProducts();

addProductButton.addEventListener("click", addNewProduct);
updateProductButton.addEventListener("click", function () {
  updateProductStage2(productIndex);
});
cancelUpdateButton.addEventListener("click", function () {
  clearForm();
  displayAddButtons();
});
searchProduct.addEventListener("keyup", function () {
  searchfunction(this.value);
});

function displayAddButtons() {
  addProductButton.classList.remove("d-none");
  clearFormButton.classList.remove("d-none");
  updateProductButton.classList.add("d-none");
  cancelUpdateButton.classList.add("d-none");
}

function displayEditButtons() {
  addProductButton.classList.add("d-none");
  clearFormButton.classList.add("d-none");
  updateProductButton.classList.remove("d-none");
  cancelUpdateButton.classList.remove("d-none");
}

function checkLocalProducts() {
  if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts(products);
  }
}

// * ==============> clear form function
clearFormButton.addEventListener("click", clearForm);

function addNewProduct() {
  if (checkName() && checkPrice()) {
    var product = {
      name: inputName.value,
      price: inputPrice.value,
      category: inputCategory.value,
      desc: inputDescription.value,
    };
    products.unshift(product);
    displayProducts(products);
    pushLocal("products", products);
    clearForm();
    removeValid();
    Swal.fire({
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      text: "Product Added Successfully",
      showClass: {
        popup: "swal2-show",
      },
      hideClass: {
        popup: "swal2-hide",
      },
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      color: textColor,
      background: backgroundColor,
    });
  } else {
    Swal.fire({
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      text: "Please Enter Valid Product Name & Price",
      showClass: {
        popup: "swal2-show",
      },
      hideClass: {
        popup: "swal2-hide",
      },
      icon: "error",
      color: textColor,
      background: backgroundColor,
    });
  }
}

function clearForm() {
  inputName.value = "";
  inputPrice.value = "";
  inputDescription.value = "";
  removeValid();
}

function displayProducts(arr, searchString) {
  if (searchString != undefined) {
    searchString.toLowerCase();
  } else {
    searchString = "";
  }
  var table = "";
  for (var i = 0; i < arr.length; i++) {
    table += `<tr>
<td>${arr[i].name
      .toLowerCase()
      .replace(
        searchString.toLowerCase(),
        `<span class="bg-success-subtle text-info-emphasis">${searchString}</span>`
      )}</td>
<td>${arr[i].price}</td>
<td>${arr[i].category
      .toLowerCase()
      .replace(
        searchString.toLowerCase(),
        `<span class="bg-success-subtle text-info-emphasis">${searchString}</span>`
      )}</td>
<td class="text-description-overflow">${arr[i].desc}</td>
<td>
  <button onClick="updateProductStage1(${i})" class="btn btn-outline-info">Update</button>
</td>
<td>
  <button onClick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
</td>
</tr>`;
  }
  tableData.innerHTML = table;
}

// * ==============> delete product function
function deleteProduct(i) {
  products.splice(i, 1);
  displayProducts(products);
  pushLocal("products", products);
}

// * ==============> update product function
function updateProductStage1(i) {
  inputName.value = products[i].name;
  inputPrice.value = products[i].price;
  inputCategory.value = products[i].category;
  inputDescription.value = products[i].desc;
  productIndex = i;
  displayEditButtons();
}

function updateProductStage2(productIndex) {
  if (checkName() && checkPrice()) {
    var product = {
      name: inputName.value,
      price: inputPrice.value,
      category: inputCategory.value,
      desc: inputDescription.value,
    };
    products.splice(productIndex, 1, product);
    displayProducts(products);
    pushLocal("products", products);
    displayAddButtons();
    clearForm();
    removeValid();
    Swal.fire({
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      text: "Product Updated Successfully",
      showClass: {
        popup: "swal2-show",
      },
      hideClass: {
        popup: "swal2-hide",
      },
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      color: textColor,
      background: backgroundColor,
    });
  } else {
    Swal.fire({
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      text: "To Update Product Enter Valid Name & Price",
      showClass: {
        popup: "swal2-show",
      },
      hideClass: {
        popup: "swal2-hide",
      },
      icon: "warning",
      color: textColor,
      background: backgroundColor,
    });
  }
}

function searchfunction(x) {
  var matchedProducts = [];
  var searchString;
  for (var i = 0; i < products.length; i++) {
    if (
      products[i].name.toLowerCase().includes(x.toLowerCase()) ||
      products[i].category.toLowerCase().includes(x.toLowerCase())
    ) {
      matchedProducts.push(products[i]);
    }
  }
  searchString = searchProduct.value;
  displayProducts(matchedProducts, searchString);
}

// ! ===========================> Regex Functions
function checkName() {
  var regexName = /^[a-zA-Z][a-zA-Z0-9 \-_&]{1,20}$/;
  return regexName.test(inputName.value);
}

function checkPrice() {
  var regexPrice = /^[1-9][0-9]{1,5}$/;
  return regexPrice.test(inputPrice.value);
}

function removeValid() {
  clearValid(0);
  clearValid(1);
  inputName.classList.remove("is-valid");
  inputPrice.classList.remove("is-valid");
  inputName.classList.remove("is-invalid");
  inputPrice.classList.remove("is-invalid");
}

function clearValid(i) {
  feedback[i].classList.remove("d-block");
  feedback[i].classList.add("d-none");
}

function isValid(i) {
  feedback[i].classList.add("d-block");
  feedback[i].classList.remove("d-none");
  feedback[i].classList.add("valid-feedback");
  feedback[i].classList.remove("invalid-feedback");
  feedback[i].innerHTML = "Looks Good!";
}

function isInValid(i, message) {
  feedback[i].classList.add("d-block");
  feedback[i].classList.remove("d-none");
  feedback[i].classList.add("invalid-feedback");
  feedback[i].classList.remove("valid-feedback");
  feedback[i].innerHTML = message;
}

inputName.addEventListener("keyup", function () {
  if (checkName()) {
    isValid(0);
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
  } else {
    isInValid(
      0,
      `Please Follow The Following Rules<br>1) Don't Start With Special Characters or Number<br>2) Minimum Characters = 2<br>3) Maximum Characters = 20<br>4) Only ('-''_''&') Special Characters are allowed`
    );
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
  }
});

inputName.addEventListener("blur", function () {
  if (inputName.value == "") {
    clearValid(0);
    inputName.classList.remove("is-invalid");
  }
});

inputPrice.addEventListener("keyup", function () {
  if (checkPrice()) {
    isValid(1);
    inputPrice.classList.add("is-valid");
    inputPrice.classList.remove("is-invalid");
  } else {
    isInValid(1, `Range from 10$ to 999,999$`);
    inputPrice.classList.add("is-invalid");
    inputPrice.classList.remove("is-valid");
  }
});

inputPrice.addEventListener("blur", function () {
  if (inputPrice.value == "") {
    clearValid(1);
    inputPrice.classList.remove("is-invalid");
  }
});
