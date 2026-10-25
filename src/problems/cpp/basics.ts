import { cpp, type Solution } from "../types";

export const basicsCpp: Record<string, Solution> = {
  "hello-world": {
    code: cpp`
      #include <iostream>
      using namespace std;

      int main() {
          cout << "Hello, World!" << endl;
          return 0;
      }
    `,
    checks: cpp`
      CHECK(captureOutput([] { main(); }) == "Hello, World!\n");
    `,
  },
  "sum-of-two-numbers": {
    code: cpp`
      int add(int a, int b) {
          return a + b;
      }
    `,
    checks: cpp`
      CHECK(add(2, 3) == 5);
      CHECK(add(-4, 10) == 6);
    `,
  },
  "even-or-odd": {
    code: cpp`
      string evenOrOdd(int n) {
          if (n % 2 == 0) return "Even";
          return "Odd";
      }
    `,
    checks: cpp`
      CHECK(evenOrOdd(7) == "Odd");
      CHECK(evenOrOdd(10) == "Even");
      CHECK(evenOrOdd(-3) == "Odd");
    `,
  },
  "largest-of-three": {
    code: cpp`
      int largestOfThree(int a, int b, int c) {
          int largest = a;
          if (b > largest) largest = b;
          if (c > largest) largest = c;
          return largest;
      }
    `,
    checks: cpp`
      CHECK(largestOfThree(4, 9, 2) == 9);
      CHECK(largestOfThree(-1, -5, -3) == -1);
      CHECK(largestOfThree(7, 7, 7) == 7);
    `,
  },
  fizzbuzz: {
    code: cpp`
      vector<string> fizzBuzz(int n) {
          vector<string> result;
          for (int i = 1; i <= n; i++) {
              if (i % 15 == 0) result.push_back("FizzBuzz");
              else if (i % 3 == 0) result.push_back("Fizz");
              else if (i % 5 == 0) result.push_back("Buzz");
              else result.push_back(to_string(i));
          }
          return result;
      }
    `,
    checks: cpp`
      CHECK(fizzBuzz(5) == VS{"1", "2", "Fizz", "4", "Buzz"});
      CHECK(fizzBuzz(15).back() == "FizzBuzz");
    `,
  },
  factorial: {
    code: cpp`
      long long factorial(int n) {
          long long result = 1;
          for (int i = 2; i <= n; i++) result *= i;
          return result;
      }
    `,
    checks: cpp`
      CHECK(factorial(5) == 120);
      CHECK(factorial(0) == 1);
      CHECK(factorial(20) == 2432902008176640000LL);
    `,
  },
  "sum-of-array": {
    code: cpp`
      int sumOfArray(const vector<int>& nums) {
          int total = 0;
          for (int n : nums) total += n;
          return total;
      }
    `,
    checks: cpp`
      CHECK(sumOfArray({1, 2, 3, 4}) == 10);
      CHECK(sumOfArray({}) == 0);
    `,
  },
  "find-maximum": {
    code: cpp`
      int findMax(const vector<int>& nums) {
          int best = nums[0];
          for (int n : nums) {
              if (n > best) best = n;
          }
          return best;
      }
    `,
    checks: cpp`
      CHECK(findMax({3, 8, 1, 8, 2}) == 8);
      CHECK(findMax({-7, -2, -9}) == -2);
    `,
  },
  "reverse-a-string": {
    code: cpp`
      string reverseString(const string& s) {
          string result;
          for (int i = s.size() - 1; i >= 0; i--) result += s[i];
          return result;
      }
    `,
    checks: cpp`
      CHECK(reverseString("hello") == "olleh");
      CHECK(reverseString("") == "");
    `,
  },
  "count-vowels": {
    code: cpp`
      int countVowels(const string& s) {
          string vowels = "aeiou";
          int count = 0;
          for (char c : s) {
              if (vowels.find(tolower(c)) != string::npos) count++;
          }
          return count;
      }
    `,
    checks: cpp`
      CHECK(countVowels("Hello World") == 3);
      CHECK(countVowels("AEIOU xyz") == 5);
    `,
  },
  "check-prime": {
    code: cpp`
      bool isPrime(int n) {
          if (n < 2) return false;
          for (int d = 2; d * d <= n; d++) {
              if (n % d == 0) return false;
          }
          return true;
      }
    `,
    checks: cpp`
      CHECK(isPrime(29) == true);
      CHECK(isPrime(1) == false);
      CHECK(isPrime(2) == true);
      CHECK(isPrime(49) == false);
    `,
  },
  "fibonacci-number": {
    code: cpp`
      long long fibonacci(int n) {
          long long a = 0, b = 1;
          for (int i = 0; i < n; i++) {
              long long next = a + b;
              a = b;
              b = next;
          }
          return a;
      }
    `,
    checks: cpp`
      CHECK(fibonacci(10) == 55);
      CHECK(fibonacci(0) == 0);
      CHECK(fibonacci(1) == 1);
      CHECK(fibonacci(50) == 12586269025LL);
    `,
  },
  "multiplication-table": {
    code: cpp`
      void printTable(int n) {
          for (int i = 1; i <= 10; i++) {
              cout << n << " x " << i << " = " << n * i << endl;
          }
      }
    `,
    checks: cpp`
      string out = captureOutput([] { printTable(3); });
      CHECK(out.rfind("3 x 1 = 3\n3 x 2 = 6\n", 0) == 0);
      CHECK(out.size() >= 12 && out.substr(out.size() - 12) == "3 x 10 = 30\n");
    `,
  },
  "celsius-to-fahrenheit": {
    code: cpp`
      double celsiusToFahrenheit(double celsius) {
          return celsius * 9 / 5 + 32;
      }
    `,
    checks: cpp`
      CHECK(near(celsiusToFahrenheit(100), 212));
      CHECK(near(celsiusToFahrenheit(-40), -40));
      CHECK(near(celsiusToFahrenheit(37.5), 99.5));
    `,
  },
  "count-digits": {
    code: cpp`
      int countDigits(int n) {
          if (n == 0) return 1;
          int count = 0;
          while (n != 0) {
              n /= 10;
              count++;
          }
          return count;
      }
    `,
    checks: cpp`
      CHECK(countDigits(-4096) == 4);
      CHECK(countDigits(0) == 1);
      CHECK(countDigits(7) == 1);
    `,
  },
  "palindrome-number": {
    code: cpp`
      bool isPalindrome(int x) {
          if (x < 0) return false;
          long long reversed = 0;
          for (int n = x; n > 0; n /= 10) reversed = reversed * 10 + n % 10;
          return reversed == x;
      }
    `,
    checks: cpp`
      CHECK(isPalindrome(121) == true);
      CHECK(isPalindrome(-121) == false);
      CHECK(isPalindrome(10) == false);
      CHECK(isPalindrome(0) == true);
    `,
  },
  "gcd-of-two-numbers": {
    code: cpp`
      int gcd(int a, int b) {
          while (b != 0) {
              int remainder = a % b;
              a = b;
              b = remainder;
          }
          return a;
      }
    `,
    checks: cpp`
      CHECK(gcd(48, 18) == 6);
      CHECK(gcd(17, 5) == 1);
      CHECK(gcd(9, 9) == 9);
    `,
  },
  "character-frequency": {
    code: cpp`
      unordered_map<char, int> charFrequency(const string& s) {
          unordered_map<char, int> freq;
          for (char c : s) freq[c]++;
          return freq;
      }
    `,
    checks: cpp`
      CHECK(charFrequency("banana") == unordered_map<char, int>{{'b', 1}, {'a', 3}, {'n', 2}});
      CHECK(charFrequency("").empty());
    `,
  },
};
