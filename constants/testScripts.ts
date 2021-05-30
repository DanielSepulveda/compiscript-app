const fib_recursive = `
Program test;

int function fib(n: int){
  if(n < 2) {
    return(n);
  } else {
    return (fib(n - 1) + fib(n - 2));
  }
}

main() {
  println(fib(12));
}
`;

const fib_iterative = `
Program test;
vars
  num1, num2, nextNum, i: int;

main() {
  num1 = 0;
  num2 = 1;
  nextNum = 0;
  for (i = 0) until (12) {
    nextNum = num1 + num2;
    num1 = num2;
    num2 = nextNum;
    i = i + 1;
  }
  println(nextNum);
}
`;

const fact_recursive = `
Program test;

int function fact(m: int)
{
  if (m > 1) {
    return (m * fact(m - 1));
  } else {
    return(1);
  }
}

main() {
  println(fact(4));
}
`;

const fact_iterative = `
Program test;
vars
  i, ans: int;

main() {
  ans = 1;
  for (i = 1) until (7) {
    ans = ans * i;
    i = i + 1;
  }
  print(ans);
}
`;

const greet_user = `
Program patito;
vars
  message: string;

main ()
{
  read(message);
  println("hello ", message);
}
`;

const bubble_sort = `
Program bubbleSort;
vars
  v[4], i, j, tmp: int;

main() {
  v[0] = 4;
  v[1] = 3;
  v[2] = 2;
  v[3] = 1;
  
  i = 0;
  j = 0;

  while(i != 4) {
    j = 0;
    while(j != 3) {
      if(v[j] > v[j+1]) {
        tmp = v[j];
        v[j] = v[j+1];
        v[j + 1] = tmp;
      }
      j = j + 1;
    }
    i = i + 1;
  }

  println(v[0], v[1], v[2], v[3]);
}
`;

export const TEST_SCRIPTS = {
  fib_recursive,
  fib_iterative,
  fact_recursive,
  fact_iterative,
  greet_user,
  bubble_sort,
};
