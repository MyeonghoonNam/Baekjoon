// 페르마의 소정리
// a^p mod p = a mod p (a는 정수, p는 소수일 때)
// a^p-1 mod p = 1 mod p

// 나눗셈에서는 모듈러 연산이 적용 안되므로 곱셈 변환
// nCr = n! / r!(n-r)! => n!(r!(n-r)!)^(-1)
// 여기서 (r!(n-r)!)^(-1) == (r!(n-r)!)^(p-2) 가능(p가 소수)

print(
  (factorial(N) *
    mod_inverse((factorial(N - K) * factorial(K)) % div, div - 2)) %
    div
);
