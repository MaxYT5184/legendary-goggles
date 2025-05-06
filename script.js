let display = document.getElementById("display");
let aiOutput = document.getElementById("aiOutput");
let inputs = [];

function append(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
    inputs.push(Number(result));
    updateAI();
  } catch (e) {
    display.value = "Error";
  }
}

function updateAI() {
  if (inputs.length === 0) {
    aiOutput.textContent = "-";
    return;
  }
  const avg = inputs.reduce((a, b) => a + b, 0) / inputs.length;
  aiOutput.textContent = avg.toFixed(2);
}

function plotGraph() {
  const expr = document.getElementById("graphInput").value;
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw axes
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  ctx.strokeStyle = "#00ff00";
  ctx.beginPath();

  for (let px = 0; px <= canvas.width; px++) {
    let x = (px - canvas.width / 2) / 20;
    let y;

    try {
      const mathExpr = expr
        .replace(/(\d+)x/g, '$1*x')
        .replace(/x/g, `(${x})`)
        .replace(/\^/g, "**");
      y = eval(mathExpr);
    } catch {
      y = NaN;
    }

    if (!isNaN(y)) {
      let py = canvas.height / 2 - y * 20;
      if (px === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
  }

  ctx.stroke();
}
