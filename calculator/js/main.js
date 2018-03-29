/*eslint-env jquery*/
/*eslint-disable no-console */

$(document).ready(function () {

    var currentEntry = '0';
    var history = '';
    var result = 0;
    var lastEntry;
    var decimalSet = false;
    var displayMaxLength = 14;
    var operators = ['/', '*', '+', '-'];
    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    $('button').on('click', function () {
        var input = $(this).val();

        if (input === 'ce') {
            cancelEntry();
        } else if (input === 'ac') {
            allClear();
        } else if (input === 'result') {
            calcResult();
        } else if (currentEntry.length < displayMaxLength) {
            if (numbers.indexOf(input) > -1) {
                if (currentEntry === '0' && history === '') {
                    currentEntry = input;
                } else {
                    currentEntry += input;
                }
            } else if (input === 'decimal' && !decimalSet) {
                currentEntry += '.';
                decimalSet = true;
            } else if (operators.indexOf(input) > -1) {
                // Initialize current entry with existing result
                // if (currentEntry === '' && result !== 0) {
                //     currentEntry = result.toString();
                // }

                // if last entry was an operator replace it
                if (lastEntryIsOperator()) {
                    currentEntry = currentEntry.slice(0,-1) + input;
                } else {
                    currentEntry += input;
                }

                // Reset decimalSet flag
                decimalSet = false;
            }
            else {
                alert("Ooops, shouldn't get here...");
            }

            lastEntry = input;
        }
       
        updateDisplay();
    });

    function lastEntryIsOperator() {
        if (operators.indexOf(lastEntry) > -1) {
            return true;
        } else {
            return false;
        }
    }

    function updateDisplay() {
        $('.entry').html(currentEntry);
        $('.history').html(history);
    }

    function calcResult() {
        // if last entry is an operator, strip it 
        if (lastEntryIsOperator()) {
            currentEntry = currentEntry.slice(0,-1);
        }
        result = eval(currentEntry);
        // currentEntry = result;
        history = currentEntry + '=' + result.toString();
        cancelEntry();
    }

    function cancelEntry() {
        currentEntry = result.toString();
        lastEntry = undefined;
        decimalSet = false;
    }
    function allClear() {
        history = '';
        result = 0;
        cancelEntry();
    }
});