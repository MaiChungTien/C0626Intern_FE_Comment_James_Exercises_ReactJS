//Sử dụng ES6 ( arrow function, fitter)
//1. Viết hàm kiểm tra 1 số có phải là số nguyên tố
const isPrime = (number) => {
  if (!Number.isInteger(number) || number < 2) return false;
  if (number === 2 || number === 3) return true;
  if (number % 2 === 0 || number % 3 === 0) return false;

  const N = Math.sqrt(number);

  for (let i = 5; i <= N; i += 6)
    if (number % i === 0 || number % (i + 2) === 0) return false;

  return true;
};

//2. Cho 1 mảng số nguyên. Sử dụng filter để lọc ra các số là số nguyên tố
const numbers = [1, 2, 3, 4, 5, 8, 9, 11, 15, 17, 20, 23];

const primeNumbers = numbers.filter((number) => isPrime(number));

console.log(primeNumbers);
