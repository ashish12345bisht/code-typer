import { py, type Solution } from "../types";

export const basicsPython: Record<string, Solution> = {
  "hello-world": {
    code: py`
      def main():
          print("Hello, World!")


      if __name__ == "__main__":
          main()
    `,
    checks: py`
      check(capture_output(main) == "Hello, World!\n")
    `,
  },
  "sum-of-two-numbers": {
    code: py`
      def add(a, b):
          return a + b
    `,
    checks: py`
      check(add(2, 3) == 5)
      check(add(-4, 10) == 6)
    `,
  },
  "even-or-odd": {
    code: py`
      def even_or_odd(n):
          if n % 2 == 0:
              return "Even"
          return "Odd"
    `,
    checks: py`
      check(even_or_odd(7) == "Odd")
      check(even_or_odd(10) == "Even")
      check(even_or_odd(-3) == "Odd")
    `,
  },
  "largest-of-three": {
    code: py`
      def largest_of_three(a, b, c):
          largest = a
          if b > largest:
              largest = b
          if c > largest:
              largest = c
          return largest
    `,
    checks: py`
      check(largest_of_three(4, 9, 2) == 9)
      check(largest_of_three(-1, -5, -3) == -1)
      check(largest_of_three(7, 7, 7) == 7)
    `,
  },
  fizzbuzz: {
    code: py`
      def fizz_buzz(n):
          result = []
          for i in range(1, n + 1):
              if i % 15 == 0:
                  result.append("FizzBuzz")
              elif i % 3 == 0:
                  result.append("Fizz")
              elif i % 5 == 0:
                  result.append("Buzz")
              else:
                  result.append(str(i))
          return result
    `,
    checks: py`
      check(fizz_buzz(5) == ["1", "2", "Fizz", "4", "Buzz"])
      check(fizz_buzz(15)[-1] == "FizzBuzz")
    `,
  },
  factorial: {
    code: py`
      def factorial(n):
          result = 1
          for i in range(2, n + 1):
              result *= i
          return result
    `,
    checks: py`
      check(factorial(5) == 120)
      check(factorial(0) == 1)
      check(factorial(20) == 2432902008176640000)
    `,
  },
  "sum-of-array": {
    code: py`
      def sum_of_array(nums):
          total = 0
          for n in nums:
              total += n
          return total
    `,
    checks: py`
      check(sum_of_array([1, 2, 3, 4]) == 10)
      check(sum_of_array([]) == 0)
    `,
  },
  "find-maximum": {
    code: py`
      def find_max(nums):
          best = nums[0]
          for n in nums:
              if n > best:
                  best = n
          return best
    `,
    checks: py`
      check(find_max([3, 8, 1, 8, 2]) == 8)
      check(find_max([-7, -2, -9]) == -2)
    `,
  },
  "reverse-a-string": {
    code: py`
      def reverse_string(s):
          result = ""
          for i in range(len(s) - 1, -1, -1):
              result += s[i]
          return result
    `,
    checks: py`
      check(reverse_string("hello") == "olleh")
      check(reverse_string("") == "")
    `,
  },
  "count-vowels": {
    code: py`
      def count_vowels(s):
          count = 0
          for c in s.lower():
              if c in "aeiou":
                  count += 1
          return count
    `,
    checks: py`
      check(count_vowels("Hello World") == 3)
      check(count_vowels("AEIOU xyz") == 5)
    `,
  },
  "check-prime": {
    code: py`
      def is_prime(n):
          if n < 2:
              return False
          d = 2
          while d * d <= n:
              if n % d == 0:
                  return False
              d += 1
          return True
    `,
    checks: py`
      check(is_prime(29) is True)
      check(is_prime(1) is False)
      check(is_prime(2) is True)
      check(is_prime(49) is False)
    `,
  },
  "fibonacci-number": {
    code: py`
      def fibonacci(n):
          a, b = 0, 1
          for _ in range(n):
              a, b = b, a + b
          return a
    `,
    checks: py`
      check(fibonacci(10) == 55)
      check(fibonacci(0) == 0)
      check(fibonacci(1) == 1)
      check(fibonacci(50) == 12586269025)
    `,
  },
  "multiplication-table": {
    code: py`
      def print_table(n):
          for i in range(1, 11):
              print(f"{n} x {i} = {n * i}")
    `,
    checks: py`
      out = capture_output(lambda: print_table(3))
      check(out.startswith("3 x 1 = 3\n3 x 2 = 6\n"))
      check(out.endswith("3 x 10 = 30\n"))
    `,
  },
  "celsius-to-fahrenheit": {
    code: py`
      def celsius_to_fahrenheit(celsius):
          return celsius * 9 / 5 + 32
    `,
    checks: py`
      check(near(celsius_to_fahrenheit(100), 212))
      check(near(celsius_to_fahrenheit(-40), -40))
      check(near(celsius_to_fahrenheit(37.5), 99.5))
    `,
  },
  "count-digits": {
    code: py`
      def count_digits(n):
          n = abs(n)
          if n == 0:
              return 1
          count = 0
          while n > 0:
              n //= 10
              count += 1
          return count
    `,
    checks: py`
      check(count_digits(-4096) == 4)
      check(count_digits(0) == 1)
      check(count_digits(7) == 1)
    `,
  },
  "palindrome-number": {
    code: py`
      def is_palindrome(x):
          if x < 0:
              return False
          reversed_num, n = 0, x
          while n > 0:
              reversed_num = reversed_num * 10 + n % 10
              n //= 10
          return reversed_num == x
    `,
    checks: py`
      check(is_palindrome(121) is True)
      check(is_palindrome(-121) is False)
      check(is_palindrome(10) is False)
      check(is_palindrome(0) is True)
    `,
  },
  "gcd-of-two-numbers": {
    code: py`
      def gcd(a, b):
          while b != 0:
              a, b = b, a % b
          return a
    `,
    checks: py`
      check(gcd(48, 18) == 6)
      check(gcd(17, 5) == 1)
      check(gcd(9, 9) == 9)
    `,
  },
  "character-frequency": {
    code: py`
      def char_frequency(s):
          freq = {}
          for c in s:
              freq[c] = freq.get(c, 0) + 1
          return freq
    `,
    checks: py`
      check(char_frequency("banana") == {"b": 1, "a": 3, "n": 2})
      check(char_frequency("") == {})
    `,
  },
};
