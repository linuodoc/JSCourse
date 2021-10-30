const example1 = () =>
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('foo1');
    }, 500);
  });

const example2 = () =>
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('foo2');
    }, 500);
  });

const doStuff = async () => {
  const listExample = ['a', 'b', 'c'];
  for (let i = 0; i < listExample.length; i++) {
    console.log(listExample[i]);
    await example1();
    const s = listExample[i];
    console.log('Fisrt');
    await example2();
    console.log('Second');
  }
  console.log('The End');
};
// doStuff();
