import { writeFile } from "node:fs";

const data = "My file content!";

writeFile("file-01.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
