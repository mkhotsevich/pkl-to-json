import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";

function isValidExtname(filePath: string, ext: string) {
  const fileExt = path.extname(filePath);
  return fileExt === ext;
}

async function isFileExists(filePath: string) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function convertToJson(pklPath: string, jsonPath: string) {
  return new Promise<string>((resolve, reject) => {
    const python = spawn("/usr/bin/env", [
      "python3",
      path.resolve(__dirname, "./convert.py"),
      pklPath,
      jsonPath,
    ]);

    python.stderr.on("data", () =>
      reject("Error in python script while converting")
    );

    python.on("close", () => resolve(jsonPath));
  });
}

function convertToPkl(jsonPath: string, pklPath: string) {
  return new Promise<string>((resolve, reject) => {
    const python = spawn("/usr/bin/env", [
      "python3",
      path.resolve(__dirname, "./reconvert.py"),
      jsonPath,
      pklPath,
    ]);

    python.stderr.on("data", () =>
      reject("Error in python script while converting")
    );

    python.on("close", () => resolve(pklPath));
  });
}

export const pklToJson = {
  async convert(pklPath: string, jsonPath: string) {
    if (!isValidExtname(pklPath, ".pkl")) {
      throw new Error(`${pklPath} is not .pkl file`);
    }

    if (!isValidExtname(jsonPath, ".json")) {
      throw new Error(`${jsonPath} is not .json file`);
    }

    const isPklFileExists = await isFileExists(pklPath);
    if (!isPklFileExists) {
      throw new Error(`Can not find ${pklPath}`);
    }

    return await convertToJson(pklPath, jsonPath);
  },

  async reconvert(jsonPath: string, pklPath: string) {
    if (!isValidExtname(pklPath, ".pkl")) {
      throw new Error(`${pklPath} is not .pkl file`);
    }

    if (!isValidExtname(jsonPath, ".json")) {
      throw new Error(`${jsonPath} is not .json file`);
    }

    const isJsonFileExists = await isFileExists(jsonPath);
    if (!isJsonFileExists) {
      throw new Error(`Can not find ${jsonPath}`);
    }

    return await convertToPkl(jsonPath, pklPath);
  },
};
