let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let cashInput;
let changeDueDiv

window.onload = () => {
  cashInput = document.getElementById("cash");
  changeDueDiv = document.getElementById('change-due');

};

function purchaseClick() {
  const cashInCents = Math.round(Number(cashInput.value) * 100);
  const priceInCents = Math.round(price * 100);
  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money to purchase the item.");
  } else if (cashInCents === priceInCents) {
    changeDueDiv.innerHTML = "No change due - customer paid with exact cash.";
  } else {
    let changeDue = cashInCents - priceInCents;
    const reversedCid = [...cid]
        .reverse()
        .map(([denominationName, amount]) => [
          denominationName,
          Math.round(amount * 100)
        ]);
    const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
    const result = { status: 'OPEN', change: [] };
    const totalCID = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);
    console.log(cashInCents, priceInCents, totalCID, changeDue);
    if (changeDue > totalCID) {
      changeDueDiv.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    } else {
      let isClosed = changeDue === totalCID;
      if (isClosed) {
        changeDueDiv.innerHTML = "Status: CLOSED";
      } else {
        changeDueDiv.innerHTML = "Status: OPEN";
      }

      for (let i=0; i <= reversedCid.length; i++) {
        if (changeDue >= denominations[i] && changeDue > 0) {
          const [denominationName, total] = reversedCid[i];
          const possibleChange = Math.min(total, changeDue);
          const count = Math.floor(possibleChange / denominations[i]);
          const amountInChange = count * denominations[i];
          changeDue -= amountInChange;

          if (count > 0) {
            result.change.push([denominationName, amountInChange / 100]);
          }
        }
      }
      if (isClosed) {
        changeDueDiv.innerHTML = "Status: CLOSED " +
          result.change.map(x => `${x[0]}: $${x[1]}`).join(" ");
      } else {
        changeDueDiv.innerHTML = "Status: OPEN " +
          result.change.map(x => `${x[0]}: $${x[1]}`).join(" ");
      }

      if (changeDue > 0) {
        changeDueDiv.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        return;
      }
    }
    
  } 
}