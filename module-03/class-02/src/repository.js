import { writeFile, readFile } from "fs/promises";

// Não tem __filename, __dirname

export const save = async (data) => {
  const { pathname: databaseFile } = new URL(
    "./../database.json",
    import.meta.url
  );

  const currentData = JSON.parse(await readFile(databaseFile));

  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};
