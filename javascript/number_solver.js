const result = document.getElementById("result");
function reset() {
    result.style.display = "none";
    document.getElementById('num1').value = null;
    document.getElementById('num2').value = null;
    document.getElementById('num3').value = null;
    document.getElementById('num4').value = null;
    document.getElementById('target').value = null;
}
function solve() {
    result.style.display = "block";
    
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);
        const num3 = parseInt(document.getElementById('num3').value);
        const num4 = parseInt(document.getElementById('num4').value);
        const target = parseInt(document.getElementById('target').value);

        if (Number.isNaN(num1)||Number.isNaN(num2)||Number.isNaN(num3)||Number.isNaN(num4)||Number.isNaN(target)) {
            document.getElementById('result').innerHTML = 'Please fill all the fields';
        } else {
        const numbers = [num1, num2, num3, num4];
        const operations = ['+', '-', '*', '/'];

        let resultFound = false;
        let resultExpression = '';


        const permutations = generatePermutations(numbers);


        for (const perm of permutations) {

            for (const op1 of operations) {
                for (const op2 of operations) {
                    for (const op3 of operations) {
                        const expression = `${perm[0]}${op1}${perm[1]}${op2}${perm[2]}${op3}${perm[3]}`;

                        try {
                            if (eval(expression) === target) {
                                resultFound = true;
                                resultExpression = expression;
                                break;
                            }
                        } catch (error) {
                        }
                    }
                    if (resultFound) break;
                }
                if (resultFound) break;
            }
            if (resultFound) break;
        }

        if (resultFound) {
            document.getElementById('result').innerHTML = `${resultExpression} = ${target}`;
        } else {
            document.getElementById('result').innerHTML = 'No solution found.';
        }
    }
}

function generatePermutations(arr) {
    const result = [];

    function permute(arr, index) {
        if (index === arr.length - 1) {
            result.push([...arr]);
            return;
        }

        for (let i = index; i < arr.length; i++) {
            [arr[index], arr[i]] = [arr[i], arr[index]];
            permute(arr, index + 1);
            [arr[index], arr[i]] = [arr[i], arr[index]];
        }
    }

    permute(arr, 0);
    return result;
}