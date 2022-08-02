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

async function getResults() {
  try {
    const data1 = await luckyDraw("Tina");
    console.log(data1);

    const data2 = await luckyDraw("Jorge");
    console.log(data2);

    const data3 = await luckyDraw("Julien");
    console.log(data3);
  } catch (err) {
    console.log(err);
  }
}

getResults();
