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
  read(v[0], v[1], v[2], v[3]);
  
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

const find = `
Program test;
vars
  v[5], i, n: int;

int function find(n: int) {
  i = 0;

  while (i < 5) {
    if (v[i] == n) {
      return (1);
    }
    i = i + 1;
  }

  return (0);
}

main(){
  println("Ingresa valores");

  i = 0;
  while (i < 5) {
    println("Ingresa valor #", i + 1);
    read(v[i]);
    i = i + 1;
  }
  
  println("Ingresa valor a buscar");
  read(n);

  if (find(n)) {
    println("Valor encontrado");
  } else {
    println("Valor no encontrado");
  }
}
`;

const matrix_mult = `
Program test;
vars
  a[2][2], b[2][2], c[2][2], i, j, k: int;

main () {
  a[0][0] = 1;
  a[0][1] = 2;
  a[1][0] = 3;
  a[1][1] = 4;

  b[0][0] = 4;
  b[0][1] = 3;
  b[1][0] = 2;
  b[1][1] = 1;

  c[0][0] = 0;
  c[0][1] = 0;
  c[1][0] = 0;
  c[1][1] = 0;

  for (i = 0) until (2 - 1) {
    for (j = 0) until (2 - 1) {
      for (k = 0) until (2 - 1) {
        c[i][j] = c[i][j] + (a[i][k] * b[k][j]);
        k = k + 1;
      }
      j = j + 1;
    }
    i = i + 1;
  }

  for (i = 0) until (2 - 1) {
    for (j = 0) until (2 - 1) {
      print(c[i][j], " ");
      j = j + 1;
    }
    println("");
    i = i + 1;
  }
}
`;

export const TEST_SCRIPTS = {
  fib_recursive,
  fib_iterative,
  fact_recursive,
  fact_iterative,
  greet_user,
  bubble_sort,
  find,
  matrix_mult,
};
