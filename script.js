let display = document.getElementById("display");
let opsCount = 0;
let totalResult = 0;
let results = [];

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;

    // Store and update AI sidebar
    results.push(result);
    opsCount++;
    totalResult += result;

    updateAI();
  } catch {
    display.value = "Error";
  }
}

function updateAI() {
  const avg = (totalResult / opsCount).toFixed(2);
  const max = Math.max(...results);
  const min = Math.min(...results);
  const last = results[results.length - 1];

  document.getElementById("opsCount").textContent = opsCount;
  document.getElementById("avgResult").textContent = avg;
  document.getElementById("maxResult").textContent = max;
  document.getElementById("minResult").textContent = min;
  document.getElementById("lastResult").textContent = last;

  const history = document.getElementById("history");
  history.innerHTML = results.slice(-5).reverse().map(r => `<li>${r}</li>`).join('');
}

// Enable keyboard input
document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key) || "+-*/().".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    clearDisplay();
  }
});
