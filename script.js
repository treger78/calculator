const numberButtons = document.querySelectorAll('.number');
const actionButtons = document.querySelectorAll('.action');
const dotButton = document.getElementById('addDot');
const clearButtons = document.querySelectorAll('.clear-btn')
const resultButton = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numberButtons.length; i++) {
	var numberBtn = numberButtons[i];
	numberBtn.addEventListener('click', function(e) {
		pressNumber(e.target.textContent);
	});
};

for (var i = 0; i < actionButtons.length; i++) {
	var actionBtn = actionButtons[i];
	actionBtn.addEventListener('click', function(e) {
		action(e.target.textContent);
	});
};

for (var i = 0; i < clearButtons.length; i++) {
	var clearBtn = clearButtons[i];
	clearBtn.addEventListener('click', function(e) {
		clear(e.target.textContent);
	});
};

dotButton.addEventListener('click', addDot);

function pressNumber(number) {
	if (MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	} else {
		if (display.value === '0') {
			display.value = number;
		} else {
			display.value += number;		
		};
	};
};

function toFixed(value) {
  var power = Math.pow(10, 14);
  return String(Math.round(value * power) / power);
};

function changeSign() {
	display.value = parseFloat(display.value) * -1;
};

function sqt() {
	if (display.value.indexOf('-') > -1) {
		alert('ERROR! Number under sqrt cannot be < 0!');
	} else {
		//display.value = parseFloat(Math.sqrt(display.value));
		display.value = parseFloat(Math.pow(display.value, 0.5));
	};
};

function action(thisAction) {
	let localActionMemory = display.value;

	if (MemoryNewNumber && MemoryPendingOperation !== '=') {
		display.value = MemoryCurrentNumber;
	} else {
		MemoryNewNumber = true;
		if (MemoryPendingOperation === '+') {
			MemoryCurrentNumber += parseFloat(localActionMemory);
		} else if (MemoryPendingOperation === '-') {
			MemoryCurrentNumber -= parseFloat(localActionMemory);
		} else if (MemoryPendingOperation === '*') {
			MemoryCurrentNumber *= parseFloat(localActionMemory);
		} else if (MemoryPendingOperation === '/') {
			MemoryCurrentNumber /= parseFloat(localActionMemory);
		} else if (MemoryPendingOperation === '^') {
			MemoryCurrentNumber **= parseFloat(localActionMemory);
		} else {
			MemoryCurrentNumber = parseFloat(localActionMemory);
		}

		if (!((MemoryCurrentNumber ^ 0) === MemoryCurrentNumber)) {			//если число не целое
			display.value = parseFloat(toFixed(MemoryCurrentNumber));
		} else {
			display.value = MemoryCurrentNumber;
		}
		MemoryPendingOperation = thisAction;
	};
};

function addDot(argument) {
	let localDotMemory = display.value;

	if (MemoryNewNumber) {
		localDotMemory = '0.';
		MemoryNewNumber = false;
	} else {
		if (localDotMemory.indexOf('.') === -1) {
			localDotMemory += '.';
		};
	};

	display.value = localDotMemory;
};

function clear(id) {
	if (id === 'ce') {
		display.value = '0';
		MemoryNewNumber = true;
	} else if (id === 'c') {
		display.value = '0';
		MemoryNewNumber = true;
		MemoryCurrentNumber = 0;
		MemoryPendingOperation = '';
	};
};
