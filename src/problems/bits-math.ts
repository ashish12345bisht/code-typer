import { topic } from "./types";

export const bitsMath = topic("Bit Manipulation & Math", [
  {
    id: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    statement:
      "Every element of `nums` appears twice except one. Find that one in O(n) time and O(1) space.\n\nExample: nums = [4,1,2,1,2] → 4",
    approach: "XOR all the numbers: pairs cancel out (x ^ x = 0) and the single number remains.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    statement: "Return how many 1 bits the binary form of `n` has.\n\nExample: n = 11 (1011) → 3",
    approach: "`n & (n - 1)` clears the lowest set bit. Count how many times you can do that before n becomes 0.",
    time: "O(number of set bits)",
    space: "O(1)",
  },
  {
    id: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    statement: "For every i from 0 to `n`, return the number of 1 bits in i.\n\nExample: n = 5 → [0,1,1,2,1,2]",
    approach: "i has the same bits as i >> 1, plus its lowest bit: bits[i] = bits[i >> 1] + (i & 1).",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    statement:
      "Reverse the 32 bits of an unsigned integer `n` and return the result as unsigned.\n\nExample: 43261596 → 964176192",
    approach:
      "Shift the result left and add n's lowest bit, 32 times, shifting n right each time. Using `uint32_t` keeps it unsigned.",
    time: "O(32)",
    space: "O(1)",
  },
  {
    id: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    statement:
      "`nums` holds n distinct numbers from 0 to n. Return the one that's missing.\n\nExample: nums = [3,0,1] → 2",
    approach: "The sum 0 + 1 + … + n is n(n + 1) / 2. Subtract the actual sum to get the missing number.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    statement: "Return a + b without using the + or - operators.\n\nExample: a = -2, b = 3 → 1",
    approach:
      "XOR adds the bits without carrying, and (a & b) << 1 is the carry. Repeat until there's no carry left; 32-bit wraparound handles negatives.",
    time: "O(32)",
    space: "O(1)",
  },
  {
    id: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    statement:
      "Reverse the digits of a signed 32-bit integer `x`. Return 0 if the result overflows 32 bits.\n\nExample: x = -123 → -321",
    approach: "Pop digits off the end with % 10 and push them onto the result, then check the result against the 32-bit limit.",
    time: "O(log x)",
    space: "O(1)",
  },
  {
    id: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    statement:
      "Repeatedly replace `n` with the sum of the squares of its digits. It's happy if this reaches 1; return whether it does.\n\nExample: n = 19 → true (1 + 81 = 82 → 68 → 100 → 1)",
    approach: "Unhappy numbers loop forever, so remember every number seen. Stop when you reach 1 or see a repeat.",
    time: "O(log n) per step",
    space: "O(log n)",
  },
  {
    id: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    statement:
      "A large integer is given as an array of its digits. Add one and return the resulting digits.\n\nExample: [1,2,9] → [1,3,0]",
    approach:
      "Walk from the last digit: a digit below 9 just increments and you're done; a 9 becomes 0 and carries left. If every digit was 9, prepend a 1.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "count-primes",
    title: "Count Primes",
    difficulty: "Medium",
    statement: "Return how many prime numbers are strictly less than `n`.\n\nExample: n = 10 → 4 (2, 3, 5, 7)",
    approach:
      "Sieve of Eratosthenes: for each prime p, mark multiples starting at p² as composite. Count the numbers left unmarked.",
    time: "O(n log log n)",
    space: "O(n)",
  },
]);
