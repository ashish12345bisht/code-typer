import { js, type Solution } from "../types";

export const basicsJavascript: Record<string, Solution> = {
  "hello-world": {
    code: js`
      function main() {
        console.log("Hello, World!");
      }

      main();
    `,
    checks: js`
      check(captureOutput(main) === "Hello, World!\n");
    `,
  },
  "sum-of-two-numbers": {
    code: js`
      function add(a, b) {
        return a + b;
      }
    `,
    checks: js`
      check(add(2, 3) === 5);
      check(add(-4, 10) === 6);
    `,
  },
  "even-or-odd": {
    code: js`
      function evenOrOdd(n) {
        if (n % 2 === 0) return "Even";
        return "Odd";
      }
    `,
    checks: js`
      check(evenOrOdd(7) === "Odd");
      check(evenOrOdd(10) === "Even");
      check(evenOrOdd(-3) === "Odd");
    `,
  },
  "largest-of-three": {
    code: js`
      function largestOfThree(a, b, c) {
        let largest = a;
        if (b > largest) largest = b;
        if (c > largest) largest = c;
        return largest;
      }
    `,
    checks: js`
      check(largestOfThree(4, 9, 2) === 9);
      check(largestOfThree(-1, -5, -3) === -1);
      check(largestOfThree(7, 7, 7) === 7);
    `,
  },
  fizzbuzz: {
    code: js`
      function fizzBuzz(n) {
        const result = [];
        for (let i = 1; i <= n; i++) {
          if (i % 15 === 0) result.push("FizzBuzz");
          else if (i % 3 === 0) result.push("Fizz");
          else if (i % 5 === 0) result.push("Buzz");
          else result.push(String(i));
        }
        return result;
      }
    `,
    checks: js`
      check(eq(fizzBuzz(5), ["1", "2", "Fizz", "4", "Buzz"]));
      check(fizzBuzz(15)[14] === "FizzBuzz");
    `,
  },
  factorial: {
    code: js`
      function factorial(n) {
        let result = 1n;
        for (let i = 2n; i <= BigInt(n); i++) result *= i;
        return result;
      }
    `,
    checks: js`
      check(factorial(5) === 120n);
      check(factorial(0) === 1n);
      check(factorial(20) === 2432902008176640000n);
    `,
  },
  "sum-of-array": {
    code: js`
      function sumOfArray(nums) {
        let total = 0;
        for (const n of nums) total += n;
        return total;
      }
    `,
    checks: js`
      check(sumOfArray([1, 2, 3, 4]) === 10);
      check(sumOfArray([]) === 0);
    `,
  },
  "find-maximum": {
    code: js`
      function findMax(nums) {
        let best = nums[0];
        for (const n of nums) {
          if (n > best) best = n;
        }
        return best;
      }
    `,
    checks: js`
      check(findMax([3, 8, 1, 8, 2]) === 8);
      check(findMax([-7, -2, -9]) === -2);
    `,
  },
  "reverse-a-string": {
    code: js`
      function reverseString(s) {
        let result = "";
        for (let i = s.length - 1; i >= 0; i--) result += s[i];
        return result;
      }
    `,
    checks: js`
      check(reverseString("hello") === "olleh");
      check(reverseString("") === "");
    `,
  },
  "count-vowels": {
    code: js`
      function countVowels(s) {
        let count = 0;
        for (const c of s.toLowerCase()) {
          if ("aeiou".includes(c)) count++;
        }
        return count;
      }
    `,
    checks: js`
      check(countVowels("Hello World") === 3);
      check(countVowels("AEIOU xyz") === 5);
    `,
  },
  "check-prime": {
    code: js`
      function isPrime(n) {
        if (n < 2) return false;
        for (let d = 2; d * d <= n; d++) {
          if (n % d === 0) return false;
        }
        return true;
      }
    `,
    checks: js`
      check(isPrime(29) === true);
      check(isPrime(1) === false);
      check(isPrime(2) === true);
      check(isPrime(49) === false);
    `,
  },
  "fibonacci-number": {
    code: js`
      function fibonacci(n) {
        let a = 0;
        let b = 1;
        for (let i = 0; i < n; i++) [a, b] = [b, a + b];
        return a;
      }
    `,
    checks: js`
      check(fibonacci(10) === 55);
      check(fibonacci(0) === 0);
      check(fibonacci(1) === 1);
      check(fibonacci(50) === 12586269025);
    `,
  },
  "multiplication-table": {
    code: js`
      function printTable(n) {
        for (let i = 1; i <= 10; i++) {
          console.log(n + " x " + i + " = " + n * i);
        }
      }
    `,
    checks: js`
      const out = captureOutput(() => printTable(3));
      check(out.startsWith("3 x 1 = 3\n3 x 2 = 6\n"));
      check(out.endsWith("3 x 10 = 30\n"));
    `,
  },
  "celsius-to-fahrenheit": {
    code: js`
      function celsiusToFahrenheit(celsius) {
        return (celsius * 9) / 5 + 32;
      }
    `,
    checks: js`
      check(near(celsiusToFahrenheit(100), 212));
      check(near(celsiusToFahrenheit(-40), -40));
      check(near(celsiusToFahrenheit(37.5), 99.5));
    `,
  },
  "count-digits": {
    code: js`
      function countDigits(n) {
        n = Math.abs(n);
        if (n === 0) return 1;
        let count = 0;
        while (n > 0) {
          n = Math.floor(n / 10);
          count++;
        }
        return count;
      }
    `,
    checks: js`
      check(countDigits(-4096) === 4);
      check(countDigits(0) === 1);
      check(countDigits(7) === 1);
    `,
  },
  "palindrome-number": {
    code: js`
      function isPalindrome(x) {
        if (x < 0) return false;
        let reversed = 0;
        for (let n = x; n > 0; n = Math.floor(n / 10)) {
          reversed = reversed * 10 + (n % 10);
        }
        return reversed === x;
      }
    `,
    checks: js`
      check(isPalindrome(121) === true);
      check(isPalindrome(-121) === false);
      check(isPalindrome(10) === false);
      check(isPalindrome(0) === true);
    `,
  },
  "gcd-of-two-numbers": {
    code: js`
      function gcd(a, b) {
        while (b !== 0) {
          const remainder = a % b;
          a = b;
          b = remainder;
        }
        return a;
      }
    `,
    checks: js`
      check(gcd(48, 18) === 6);
      check(gcd(17, 5) === 1);
      check(gcd(9, 9) === 9);
    `,
  },
  "character-frequency": {
    code: js`
      function charFrequency(s) {
        const freq = new Map();
        for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);
        return freq;
      }
    `,
    checks: js`
      check(eq(charFrequency("banana"), new Map([["b", 1], ["a", 3], ["n", 2]])));
      check(charFrequency("").size === 0);
    `,
  },
};
