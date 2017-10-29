/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
	return function findPrimes() {
		let argumentsF = Array.prototype.slice.call(arguments);
		let primeArray = [];

		if(argumentsF.length < 2) {
			throw 'Error';
		}

		if(argumentsF.some(item => { return Number.isNaN(Number(item))})) {
			throw 'Error';
		}

		argumentsF = argumentsF.map((e) => { return Number(e);});

		let test_prime = function(n) {
		  if (n ===1 || n === 0) {
		    return false;
		  } else if(n === 2) {
		    return true;
		  } else {
		    for(var x = 2; x < n; x++) {
		      if(n % x === 0) {
		        return false;
		      }
		    }
		    return true;  
		  }
		}

		for(let i = argumentsF[0]; i <= argumentsF[1]; i++){
			if(test_prime(i)) {
				primeArray.push(i);
			}
		}

		return primeArray;
	}
}

module.exports = solve;