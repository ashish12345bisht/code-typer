import { java, type Solution } from "../types";

export const basicsJava: Record<string, Solution> = {
  "hello-world": {
    code: java`
      public class HelloWorld {
          public static void main(String[] args) {
              System.out.println("Hello, World!");
          }
      }
    `,
    checks: java`
      check(captureOutput(() -> HelloWorld.main(new String[0])).equals("Hello, World!\n"));
    `,
  },
  "sum-of-two-numbers": {
    code: java`
      class Solution {
          static int add(int a, int b) {
              return a + b;
          }
      }
    `,
    checks: java`
      check(Solution.add(2, 3) == 5);
      check(Solution.add(-4, 10) == 6);
    `,
  },
  "even-or-odd": {
    code: java`
      class Solution {
          static String evenOrOdd(int n) {
              if (n % 2 == 0) return "Even";
              return "Odd";
          }
      }
    `,
    checks: java`
      check(Solution.evenOrOdd(7).equals("Odd"));
      check(Solution.evenOrOdd(10).equals("Even"));
      check(Solution.evenOrOdd(-3).equals("Odd"));
    `,
  },
  "largest-of-three": {
    code: java`
      class Solution {
          static int largestOfThree(int a, int b, int c) {
              int largest = a;
              if (b > largest) largest = b;
              if (c > largest) largest = c;
              return largest;
          }
      }
    `,
    checks: java`
      check(Solution.largestOfThree(4, 9, 2) == 9);
      check(Solution.largestOfThree(-1, -5, -3) == -1);
      check(Solution.largestOfThree(7, 7, 7) == 7);
    `,
  },
  fizzbuzz: {
    code: java`
      class Solution {
          static List<String> fizzBuzz(int n) {
              List<String> result = new ArrayList<>();
              for (int i = 1; i <= n; i++) {
                  if (i % 15 == 0) result.add("FizzBuzz");
                  else if (i % 3 == 0) result.add("Fizz");
                  else if (i % 5 == 0) result.add("Buzz");
                  else result.add(String.valueOf(i));
              }
              return result;
          }
      }
    `,
    checks: java`
      check(Solution.fizzBuzz(5).equals(slist("1", "2", "Fizz", "4", "Buzz")));
      check(Solution.fizzBuzz(15).get(14).equals("FizzBuzz"));
    `,
  },
  factorial: {
    code: java`
      class Solution {
          static long factorial(int n) {
              long result = 1;
              for (int i = 2; i <= n; i++) result *= i;
              return result;
          }
      }
    `,
    checks: java`
      check(Solution.factorial(5) == 120);
      check(Solution.factorial(0) == 1);
      check(Solution.factorial(20) == 2432902008176640000L);
    `,
  },
  "sum-of-array": {
    code: java`
      class Solution {
          static int sumOfArray(int[] nums) {
              int total = 0;
              for (int n : nums) total += n;
              return total;
          }
      }
    `,
    checks: java`
      check(Solution.sumOfArray(arr(1, 2, 3, 4)) == 10);
      check(Solution.sumOfArray(arr()) == 0);
    `,
  },
  "find-maximum": {
    code: java`
      class Solution {
          static int findMax(int[] nums) {
              int best = nums[0];
              for (int n : nums) {
                  if (n > best) best = n;
              }
              return best;
          }
      }
    `,
    checks: java`
      check(Solution.findMax(arr(3, 8, 1, 8, 2)) == 8);
      check(Solution.findMax(arr(-7, -2, -9)) == -2);
    `,
  },
  "reverse-a-string": {
    code: java`
      class Solution {
          static String reverseString(String s) {
              StringBuilder result = new StringBuilder();
              for (int i = s.length() - 1; i >= 0; i--) result.append(s.charAt(i));
              return result.toString();
          }
      }
    `,
    checks: java`
      check(Solution.reverseString("hello").equals("olleh"));
      check(Solution.reverseString("").equals(""));
    `,
  },
  "count-vowels": {
    code: java`
      class Solution {
          static int countVowels(String s) {
              int count = 0;
              for (char c : s.toLowerCase().toCharArray()) {
                  if ("aeiou".indexOf(c) >= 0) count++;
              }
              return count;
          }
      }
    `,
    checks: java`
      check(Solution.countVowels("Hello World") == 3);
      check(Solution.countVowels("AEIOU xyz") == 5);
    `,
  },
  "check-prime": {
    code: java`
      class Solution {
          static boolean isPrime(int n) {
              if (n < 2) return false;
              for (int d = 2; d * d <= n; d++) {
                  if (n % d == 0) return false;
              }
              return true;
          }
      }
    `,
    checks: java`
      check(Solution.isPrime(29));
      check(!Solution.isPrime(1));
      check(Solution.isPrime(2));
      check(!Solution.isPrime(49));
    `,
  },
  "fibonacci-number": {
    code: java`
      class Solution {
          static long fibonacci(int n) {
              long a = 0, b = 1;
              for (int i = 0; i < n; i++) {
                  long next = a + b;
                  a = b;
                  b = next;
              }
              return a;
          }
      }
    `,
    checks: java`
      check(Solution.fibonacci(10) == 55);
      check(Solution.fibonacci(0) == 0);
      check(Solution.fibonacci(1) == 1);
      check(Solution.fibonacci(50) == 12586269025L);
    `,
  },
  "multiplication-table": {
    code: java`
      class Solution {
          static void printTable(int n) {
              for (int i = 1; i <= 10; i++) {
                  System.out.println(n + " x " + i + " = " + n * i);
              }
          }
      }
    `,
    checks: java`
      String out = captureOutput(() -> Solution.printTable(3));
      check(out.startsWith("3 x 1 = 3\n3 x 2 = 6\n"));
      check(out.endsWith("3 x 10 = 30\n"));
    `,
  },
  "celsius-to-fahrenheit": {
    code: java`
      class Solution {
          static double celsiusToFahrenheit(double celsius) {
              return celsius * 9 / 5 + 32;
          }
      }
    `,
    checks: java`
      check(near(Solution.celsiusToFahrenheit(100), 212));
      check(near(Solution.celsiusToFahrenheit(-40), -40));
      check(near(Solution.celsiusToFahrenheit(37.5), 99.5));
    `,
  },
  "count-digits": {
    code: java`
      class Solution {
          static int countDigits(int n) {
              if (n == 0) return 1;
              int count = 0;
              while (n != 0) {
                  n /= 10;
                  count++;
              }
              return count;
          }
      }
    `,
    checks: java`
      check(Solution.countDigits(-4096) == 4);
      check(Solution.countDigits(0) == 1);
      check(Solution.countDigits(7) == 1);
    `,
  },
  "palindrome-number": {
    code: java`
      class Solution {
          static boolean isPalindrome(int x) {
              if (x < 0) return false;
              long reversed = 0;
              for (int n = x; n > 0; n /= 10) reversed = reversed * 10 + n % 10;
              return reversed == x;
          }
      }
    `,
    checks: java`
      check(Solution.isPalindrome(121));
      check(!Solution.isPalindrome(-121));
      check(!Solution.isPalindrome(10));
      check(Solution.isPalindrome(0));
    `,
  },
  "gcd-of-two-numbers": {
    code: java`
      class Solution {
          static int gcd(int a, int b) {
              while (b != 0) {
                  int remainder = a % b;
                  a = b;
                  b = remainder;
              }
              return a;
          }
      }
    `,
    checks: java`
      check(Solution.gcd(48, 18) == 6);
      check(Solution.gcd(17, 5) == 1);
      check(Solution.gcd(9, 9) == 9);
    `,
  },
  "character-frequency": {
    code: java`
      class Solution {
          static Map<Character, Integer> charFrequency(String s) {
              Map<Character, Integer> freq = new HashMap<>();
              for (char c : s.toCharArray()) freq.put(c, freq.getOrDefault(c, 0) + 1);
              return freq;
          }
      }
    `,
    checks: java`
      check(Solution.charFrequency("banana").equals(Map.of('b', 1, 'a', 3, 'n', 2)));
      check(Solution.charFrequency("").isEmpty());
    `,
  },
};
