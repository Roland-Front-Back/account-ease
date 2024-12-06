const textInput = document.getElementById("text");
const submitButton = document.getElementById("submit-btn");
const historyList = document.querySelector(".history-list");
const deleteButton = document.getElementById("delete-btn");
const outputBar = document.getElementById("output-bar");
const confirmPopup = document.getElementById("confirm-popup");
const confirmYesButton = document.getElementById("confirm-yes");
const confirmNoButton = document.getElementById("confirm-no");

let transactions = [];

// Category Function
function getCategory(text) {
  text = text.toLowerCase();

  if (text.includes("money") || text.includes("coins") || text.includes("money substitutes")) {
    return "Cash";
  } else if (text.includes("petty cash fund")) {
    return "Petty Cash";
  } else if (text.includes("pay") || text.includes("sale")) {
    return "Accounts Receivable";
  } else if (text.includes("service rendered") ||  text.includes("rendered service")) {
    return "Service Income";
  } else if (text.includes("written promise") || text.includes("promissory note") || text.includes("oral promise")) {
    return "Notes Receivable";
  } else if (text.includes("interest")) {
    return "Interest Receivable";
  } else if (text.includes("advance salary") || text.includes("advance wages")) {
    return "Advances to Employees";
  } else if (text.includes("unsold") || text.includes("resale")) {
    return "Merchandise Inventory";
  } else if (text.includes("prepaid rental") || text.includes("prepaid insurance") || text.includes("prepaid interest")) {
    return "Prepaid Expenses";
  } else if (text.includes("unused") || text.includes("stationery")) {
    return "Unused Supplies";
  } else if (text.includes("building office") || text.includes("building store")) {
    return "Land";
  } else if (
    text.includes("calculator") ||
    text.includes("typewriters") ||
    text.includes("adding machine") ||
    text.includes("computers") ||
    text.includes("steel filing cabinet") ||
    text.includes("trucks") ||
    text.includes("jeeps") ||
    text.includes("vans") ||
    text.includes("automobiles") ||
    text.includes("motorcycle") ||
    text.includes("bike")
  ) {
    return "Equipment";
  } else if (text.includes("chairs") || text.includes("tables") || text.includes("counters") || text.includes("display cases")) {
    return "Office Furniture & Fixtures";
  } else if (text.includes("deduction")) {
    return "Accumulated Depreciation";
  } else if (text.includes("hammer") || text.includes("pliers") || text.includes("wrench")) {
    return "Tools";
  } else if (text.includes("oral promise") || text.includes("verbal promise") || text.includes("on account")) {
    return "Accounts Payable";
  } else if (text.includes("promissory notes")) {
    return "Notes Payable";
  } else if (text.includes("unpaid interest")) {
    return "Interest Payable";
  } else if (text.includes("pre-collected income") || text.includes("unearned income") || text.includes("advance income")) {
    return "Unearned Income";
  } else if (text.includes("payment more than a year")) {
    return "Notes Payable (long-term)";
  } else if (text.includes("fixed") || text.includes("tangible")) {
    return "Mortgage Payable";
  } else if (text.includes("investment")) {
    return "Capital";
  } else if (text.includes("accountant income") || text.includes("lawyers") || text.includes("dentist")) {
    return "Professional Fees Income";
  } else if (text.includes("rental space") || text.includes("rental buildings") || text.includes("rental")) {
    return "Rental Income";
  } else if (text.includes("income received") || text.includes("money borrowed")) {
    return "Interest Income";
  } else if (text.includes("business earnings") || text.includes("business earned")) {
    return "Miscellaneous Income";
  } else if (text.includes("apartment") || text.includes("office building")) {
    return "Rent Expenses";
  } else if (text.includes("repairing") || text.includes("servicing")) {
    return "Repairs and Maintenance";
  } else if (
    text.includes("envelopes") ||
    text.includes("clips") ||
    text.includes("paper") ||
    text.includes("pens") ||
    text.includes("pencil")
  ) {
    return "Supplies Expense";
  } else if (text.includes("employee salary") || text.includes("employee salaries")) {
    return "Salaries Expense";
  } else if (text.includes("loss") || text.includes("uncollected accounts")) {
    return "Bad Debts";
  } else if (text.includes("business permits") || text.includes("license")) {
    return "Taxes and Licenses";
  } else if (text.includes("stamps") || text.includes("telephone bills") || text.includes("telegram")) {
    return "Postage and Communication";
  } else if (text.includes("insurance")) {
    return "Insurance Expense";
  } else if (text.includes("vehicles gas") || text.includes("vehicles oil")) {
    return "Gas and Oil Expense";
  } else if (text.includes("income") || text.includes("sale")) {
    return "Revenue";
  }
  return "Uncategorized";
}

//find the amount in the text
function findAmount(text) {
  const matches = text.match(/₱?(\d{1,3}(?:,\d{3})*)/);
  if (matches) {
    const amountString = matches[0].replace(/[₱,]/g, "");
    return parseInt(amountString);
  }
  return 0;
}

function addTransaction(event) {
  event.preventDefault();

  const transactionText = textInput.value.trim();
  if (transactionText === "") {
    alert("Please enter a transaction");
    return;
  }

  const amount = findAmount(transactionText);
  const category = getCategory(transactionText);

  const transaction = {
    text: transactionText,
    category: category,
    amount: amount,
  };

  transactions.push(transaction);
  updateTransactionList();
  updateOutputBar(transaction);

  textInput.value = "";
}

// Update the output bar with the transaction details
function updateOutputBar(transaction) {
  outputBar.innerHTML = "";

  const outputDiv = document.createElement("div");

  // Check if transaction includes
  if (transaction.text.toLowerCase().includes("bought") && transaction.text.toLowerCase().includes("car")) {
    outputDiv.innerHTML = `
      <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Equipment:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("truck") && transaction.text.toLowerCase().includes("cash")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Equipment:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("typewriter") && transaction.text.toLowerCase().includes("on account")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Equipment:</strong> ₱${transaction.amount}</p>
      <p><strong>Accounts Payable:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("paid") && transaction.text.toLowerCase().includes("account")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Accounts Payable:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("office table") && transaction.text.toLowerCase().includes("promissory note")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Office Furniture & Fixtures Accounts Payable:</strong> ₱${transaction.amount}</p>
      <p><strong>Notes Payable:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("cash") && transaction.text.toLowerCase().includes("service rendered")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Service Income:</strong> ₱${transaction.amount}</p>
    `;
    // Check 1
  } else if (transaction.text.toLowerCase().includes("rendered service") && transaction.text.toLowerCase().includes("pay")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Accounts Receivable:</strong> ₱${transaction.amount}</p>
      <p><strong>Service Income:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("collected") && transaction.text.toLowerCase().includes("customer's account")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Accounts Receivable:</strong> ₱${transaction.amount}</p>
    `;
    // Check 2
  } else if (transaction.text.toLowerCase().includes("service rendered") && transaction.text.toLowerCase().includes("written promise")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Notes Receivable:</strong> ₱${transaction.amount}</p>
      <p><strong>Service Income:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("paid") && transaction.text.toLowerCase().includes("salaries")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Salaries:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("invest") && transaction.text.toLowerCase().includes("proprietor")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Proprietor:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("proprietor withdraws") && transaction.text.toLowerCase().includes("cash")) {
    outputDiv.innerHTML = `
       <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Proprietor:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else {
    outputDiv.innerHTML = `
      <p><strong>Transaction:</strong> ${transaction.text}</p>
      <p><strong>Category:</strong> ${transaction.category}</p>
      <p><strong>Amount:</strong> ₱${transaction.amount}</p>
    `;
  }

  outputBar.appendChild(outputDiv);
}

// Update the history list
function updateTransactionList() {
  historyList.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");

    if (transaction.text.toLowerCase().includes("car") && transaction.text.toLowerCase().includes("cash")) {
      listItem.innerHTML = `
        <p><strong>Transaction ${index + 1}:</strong> ${transaction.text}</p>
        <p><strong>Equipment:</strong> ₱${transaction.amount}</p>
        <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      `;
    } else if (transaction.text.toLowerCase().includes("truck") && transaction.text.toLowerCase().includes("cash")) {
      listItem.innerHTML = `
         <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
        <p><strong>Cash:</strong> ₱${transaction.amount}</p>
        <p><strong>Equipment:</strong> ₱${transaction.amount}</p>
      `;
    } else if (transaction.text.toLowerCase().includes("typewriter") && transaction.text.toLowerCase().includes("on account")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Equipment:</strong> ₱${transaction.amount}</p>
      <p><strong>Accounts Payable:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("paid") && transaction.text.toLowerCase().includes("account")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Accounts Payable:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("office table") && transaction.text.toLowerCase().includes("promissory note")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Office Furniture & Fixtures Accounts Payable:</strong> ₱${transaction.amount}</p>
      <p><strong>Notes Payable:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("cash") && transaction.text.toLowerCase().includes("services rendered")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Service Income:</strong> ₱${transaction.amount}</p>
    `;
    // Check 1
  } else if (transaction.text.toLowerCase().includes("rendered service") && transaction.text.toLowerCase().includes("pay")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Accounts Receivable:</strong> ₱${transaction.amount}</p>
      <p><strong>Service Income:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("collected") && transaction.text.toLowerCase().includes("customer's account")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Accounts Receivable:</strong> ₱${transaction.amount}</p>
    `;
    // Check 2
  } else if (transaction.text.toLowerCase().includes("service rendered") && transaction.text.toLowerCase().includes("written promise")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Notes Receivable:</strong> ₱${transaction.amount}</p>
      <p><strong>Service Income:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("paid") && transaction.text.toLowerCase().includes("salaries")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Salaries:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("invest") && transaction.text.toLowerCase().includes("proprietor")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
      <p><strong>Proprietor:</strong> ₱${transaction.amount}</p>
    `;
  } else if (transaction.text.toLowerCase().includes("proprietor withdraws") && transaction.text.toLowerCase().includes("cash")) {
    listItem.innerHTML = `
       <p><strong>Transaction ${index + 1} :</strong> ${transaction.text}</p>
      <p><strong>Proprietor:</strong> ₱${transaction.amount}</p>
      <p><strong>Cash:</strong> ₱${transaction.amount}</p>
    `;
  } else {
      listItem.innerHTML = `
        <p><strong>Transaction ${index + 1}:</strong> ${transaction.text}</p>
        <p><strong>Category:</strong> ${transaction.category}</p>
        <p><strong>Amount:</strong> ₱${transaction.amount}</p>
      `;
    }

    historyList.appendChild(listItem);
  });
}

submitButton.addEventListener("click", addTransaction);
textInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTransaction(event);
  }
});
confirmPopup.style.display = "none";  // Hide popup by default

deleteButton.addEventListener("click", function () {

  confirmPopup.style.display = "flex";
});

confirmYesButton.addEventListener("click", function () {
  transactions = []; // Clear the transactions array
  updateTransactionList(); // Update the transaction list
  outputBar.innerHTML = ""; // Clear the output bar (if applicable)
  
  confirmPopup.style.display = "none";
});

confirmNoButton.addEventListener("click", function () {
  confirmPopup.style.display = "none"; // Just hide the popup
});

