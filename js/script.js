const bill = document.querySelector("input[id=bill]");
const tips = document.querySelectorAll("input[data-tip]");
const tipCustom = document.querySelector("input[data-tip-custom]");
const numberOfPeople = document.querySelector("input[id=num-of-ppl]");
const errorMsgBill = document.querySelector(".error-bill");
const errorMsgNum = document.querySelector(".error-num");
const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");
const resetBtn = document.querySelector(".reset-btn");
let billValue = 0.0; //default
let tipValue = 0.05;
let numValue = 1;

//bill
const billCal = () => {
  //validate bill input
  const regEpxBill = /^[0-9]*\.?\d*$/;
  if (bill.value.match(regEpxBill)) {
    errorMsgBill.classList.add("hidden");
  } else {
    errorMsgBill.classList.remove("hidden");
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);
  tipAmountCal();
};

// Tips
const tipsCal = (e) => {
  //clear custom tip
  tipCustom.value = "";

  tipValue = parseFloat(e.target.dataset.tip / 100);
  tipAmountCal();
};

// Tip custom
const tipCustomCal = () => {
  // clear selected tip
  tips.forEach((tip) => {
    if (tip.checked) {
      tip.checked = false;
    }
  });

  const regEpxTipCustom = /^[1-9]\d*$/;
  if (tipCustom.value.match(regEpxTipCustom)) {
    tipCustom.style.outlineColor = "";
  } else {
    tipCustom.style.outlineColor = "red";
  }

  tipValue = parseFloat(tipCustom.value / 100);
  tipAmountCal();
};

// Number of people
const numberOfPeopleCal = () => {
  const regEpxNum = /\d+$/;

  if (numberOfPeople.value <= 0 || !numberOfPeople.value.match(regEpxNum)) {
    errorMsgNum.classList.remove("hidden");
    numberOfPeople.value = numberOfPeople.value.substring(
      0,
      numberOfPeople.value.length - 1
    );
  } else {
    errorMsgNum.classList.add("hidden");
  }

  numValue = parseInt(numberOfPeople.value);
  tipAmountCal();
};

//Tip amount and total
const tipAmountCal = () => {
  if (numValue >= 1) {
    //calculate tip amount
    const tipAmountValue = billValue * tipValue;
    tipAmount.innerHTML = "$ " + tipAmountValue.toFixed(2);

    //calculate total
    const totalValue = billValue + tipAmountValue * numValue;
    total.innerHTML = "$ " + totalValue.toFixed(2);
  }
};

//Reset
const reset = () => {
  bill.value = "";

  tipValue = 0.05;
  tips[0].checked = true;
  tipCustom.value = "";

  numberOfPeople.value = "";

  tipAmount.innerHTML = "0.00";
  total.innerHTML = "0.00";
};

bill.addEventListener("input", billCal);
numberOfPeople.addEventListener("keyup", numberOfPeopleCal);
tips.forEach((tip) => {
  tip.addEventListener("click", tipsCal);
});
tipCustom.addEventListener("input", tipCustomCal);
resetBtn.addEventListener("click", reset);
