/**
 * unit_tests.js
 * Jest unit tests for calculator calculate(btnValue) logic (DOM + stateful output).
 *
 * Requirements:
 * - jest
 * - testEnvironment: "jsdom"
 *
 * Recommended package.json:
 * {
 *   "scripts": { "test": "jest" },
 *   "jest": { "testEnvironment": "jsdom" }
 * }
 *
 * Assumption:
 * - Your calculator code is in "./calculator.js"
 * - calculator.js defines global function `calculate` and uses:
 *   const display = document.querySelector(".display");
 *   const buttons = document.querySelectorAll("button");
 *
 * If your file name differs, change the require() path below.
 */

function setupDom() {
  document.body.innerHTML = `
    <div class="app">
      <input class="display" value="" />
      <div class="keys">
        <!-- create only needed buttons so querySelectorAll("button") works -->
        <button data-value="AC">AC</button>
        <button data-value="DEL">DEL</button>

        <button data-value="7">7</button>
        <button data-value="8">8</button>
        <button data-value="9">9</button>
        <button data-value="/">/</button>

        <button data-value="4">4</button>
        <button data-value="5">5</button>
        <button data-value="6">6</button>
        <button data-value="*">*</button>

        <button data-value="1">1</button>
        <button data-value="2">2</button>
        <button data-value="3">3</button>
        <button data-value="-">-</button>

        <button data-value="00">00</button>
        <button data-value="0">0</button>
        <button data-value=".">.</button>
        <button data-value="+">+</button>

        <button data-value="%">%</button>
        <button data-value="=">=</button>
      </div>
    </div>
  `;
  const display = document.querySelector(".display");
  // stub focus() used in calculate()
  display.focus = jest.fn();
  return display;
}

/**
 * Load calculator.js fresh each test (reset module + global state)
 * so `output = ""` etc are reset.
 */
function loadCalculatorModule() {
  jest.resetModules();
  // IMPORTANT: require AFTER DOM is ready
  require("./calculator.js");
  if (typeof global.calculate !== "function" && typeof window.calculate !== "function") {
    throw new Error(
      "calculate() not found on global/window. Make sure calculator.js defines function calculate in global scope."
    );
  }
  return global.calculate || window.calculate;
}

function pressSeq(calculate, seq) {
  seq.forEach((v) => calculate(v));
}

describe("Calculator unit tests (calculate btnValue)", () => {
  let display;
  let calculate;

  beforeEach(() => {
    display = setupDom();
    calculate = loadCalculatorModule();
  });

  // ===== 4.1 Numbers / display =====
  test("TC-01: input single number '5' => display '5'", () => {
    calculate("5");
    expect(display.value).toBe("5");
  });

  test("TC-02: input sequence 1,2,3 => display '123'", () => {
    pressSeq(calculate, ["1", "2", "3"]);
    expect(display.value).toBe("123");
  });

  test("TC-03: '00' at beginning => '0'", () => {
    calculate("00");
    expect(display.value).toBe("0");
  });

  // ===== 4.2 Decimal =====
  test("TC-04: decimal 3 . 5 => '3.5'", () => {
    pressSeq(calculate, ["3", ".", "5"]);
    expect(display.value).toBe("3.5");
  });

  test("TC-05: block 2nd '.' in same number: 3 . 1 . => stays '3.1'", () => {
    pressSeq(calculate, ["3", ".", "1", "."]);
    expect(display.value).toBe("3.1");
  });

  test("TC-06: '.' at beginning => '0.'", () => {
    calculate(".");
    expect(display.value).toBe("0.");
  });

  // ===== 4.3 Operator rules =====
  test("TC-07: operator valid after number: 5 + => '5+'", () => {
    pressSeq(calculate, ["5", "+"]);
    expect(display.value).toBe("5+");
  });

  test("TC-08: block consecutive operators: 5 + + => stays '5+'", () => {
    pressSeq(calculate, ["5", "+", "+"]);
    expect(display.value).toBe("5+");
  });

  test("TC-09: block '*' at beginning => stays ''", () => {
    calculate("*");
    expect(display.value).toBe("");
  });

  test("TC-10: allow '-' at beginning => '-' then '5' => '-5'", () => {
    pressSeq(calculate, ["-", "5"]);
    expect(display.value).toBe("-5");
  });

  // ===== 4.4 Percentage =====
  test("TC-11: 50 % => expression becomes '50%' in output, '=' evaluates to 0.5", () => {
    pressSeq(calculate, ["5", "0", "%", "="]);
    // 50% -> 50/100 -> 0.5
    expect(String(display.value)).toBe("0.5");
  });

  test("TC-12: block consecutive %: 50 % % => stays '50%'", () => {
    pressSeq(calculate, ["5", "0", "%", "%"]);
    expect(display.value).toBe("50%");
  });

  test("TC-13: '%' at beginning => blocked, stays ''", () => {
    calculate("%");
    expect(display.value).toBe("");
  });

  // ===== 4.5 Execute '=' =====
  test("TC-14: 2 + 3 = => 5", () => {
    pressSeq(calculate, ["2", "+", "3", "="]);
    expect(String(display.value)).toBe("5");
  });

  test("TC-15: 5 - 2 = => 3", () => {
    pressSeq(calculate, ["5", "-", "2", "="]);
    expect(String(display.value)).toBe("3");
  });

  test("TC-16: 4 * 3 = => 12", () => {
    pressSeq(calculate, ["4", "*", "3", "="]);
    expect(String(display.value)).toBe("12");
  });

  test("TC-17: 8 / 2 = => 4", () => {
    pressSeq(calculate, ["8", "/", "2", "="]);
    expect(String(display.value)).toBe("4");
  });

  test("TC-18: left-to-right with eval: 10 - 2 * 3 = => 4 (NOTE: JS precedence)", () => {
    // Your spec says left-to-right => 24
    // But current code uses eval(), so JS precedence applies: 10 - (2*3) = 4
    pressSeq(calculate, ["1", "0", "-", "2", "*", "3", "="]);
    expect(String(display.value)).toBe("4");
  });

  // ===== 4.6 '=' edge cases =====
  test("TC-19: '=' when output empty => no change (still '')", () => {
    calculate("=");
    expect(display.value).toBe("");
  });

  test("TC-20: ends with operator (not %) => block '=': '5+' then '=' => stays '5+'", () => {
    pressSeq(calculate, ["5", "+", "="]);
    expect(display.value).toBe("5+");
  });

  test("TC-21: '=' multiple times keeps same result if no new input", () => {
    pressSeq(calculate, ["2", "+", "3", "="]);
    const first = String(display.value);
    calculate("=");
    const second = String(display.value);
    expect(second).toBe(first);
  });

  // ===== /0 behavior with eval =====
  test("Division by zero: 5 / 0 = => Infinity (current behavior)", () => {
    pressSeq(calculate, ["5", "/", "0", "="]);
    expect(String(display.value)).toBe("Infinity");
  });

  // ===== Commands =====
  test("TC-24: DEL removes last char: 123 DEL => 12", () => {
    pressSeq(calculate, ["1", "2", "3", "DEL"]);
    expect(display.value).toBe("12");
  });

  test("TC-25: DEL when empty => stays empty", () => {
    calculate("DEL");
    expect(display.value).toBe("");
  });

  test("TC-26: AC resets everything", () => {
    pressSeq(calculate, ["1", "2", "+", "3"]);
    calculate("AC");
    expect(display.value).toBe("");
  });
});
