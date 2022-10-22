const doGet = (e) => {
  const LOGIN_REQUIRED = true;
  let page = 'index';

  if (LOGIN_REQUIRED) {
    const username = e.parameter.username;
    const password = e.parameter.password;

    const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
    const users = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();

    page = 'rejected';

    // Check if username and password match entry in sheet
    for (let i = 0; i < users.length; i++) {
      if (users[i][0] == username && users[i][1] === password) {
        page = 'index';
        break;
      }
    }
  }

  return HtmlService.createTemplateFromFile(page).evaluate();
};

const include = (fileName) => {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
};

const getItems = () => {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Items');
  const data = ws.getRange(2, 1, ws.getLastRow() - 1, 4).getValues();

  const items = [];

  for (let i = 0; i < data.length; i++) {
    items.push({
      sku: data[i][0],
      description: data[i][1],
      price: data[i][2],
      imageURL: data[i][3]
    });
  }

  return JSON.stringify(items);
};

const getSalespeople = () => {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Salespeople');
  const data = ws.getRange(2, 1, ws.getLastRow() - 1, 3).getValues();

  const salespeople = [];

  for (let i = 0; i < data.length; i++) {
    salespeople.push({
      name: data[i][0],
      id: data[i][1],
      invoiceNumber: data[i][2]
    });
  }

  return JSON.stringify(salespeople);
};

const setInvoice = (data) => {
  const invoice = JSON.parse(data);
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sales');
  const range = ws.getRange(ws.getLastRow() + 1, 1, invoice.length, 9);
  range.setValues(invoice);
};

const updateSalespersonInvoiceNumber = (id, newInvoiceNumber) => {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Salespeople');
  const salespeopleId = ws.getRange(2, 2, ws.getLastRow() - 1).getValues();

  for (let i = 0; i < salespeopleId.length; i++) {
    if (salespeopleId[i][0] === id) {
      const range = ws.getRange(i + 2, 3);
      range.setValue(newInvoiceNumber);
      break;
    }
  }
};
