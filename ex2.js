function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const promise = luckyDraw("Joe");

promise
  .then((data1) => console.log(data1))
  .then(() => luckyDraw("Caroline "))
  .then((data2) => console.log(data2))
  .then(() => luckyDraw("Sabrina"))
  .then((data3) => console.log(data3))
  .catch((err) => console.log(err));
