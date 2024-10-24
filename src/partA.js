import fs from "fs";
import path from "path";

const directoryPath = path.join(process.cwd(), "json_files");

export const processFiles = async () => {
  const files = fs.readdirSync(directoryPath);

  const moduleFormat = {
    auth_module: {},
    content_module: {},
  };

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const { provider } = data;

    if (!provider) {
      console.warn(`Archivo ${file} no contiene el objeto 'provider'`);
      return;
    }

    const authModule = provider.auth_module;
    if (authModule) {
      if (!moduleFormat.auth_module[authModule]) {
        moduleFormat.auth_module[authModule] = [];
      }
      moduleFormat.auth_module[authModule].push(`./${file}`);
    }

    const contentModule = provider.content_module;
    if (contentModule) {
      if (!moduleFormat.content_module[contentModule]) {
        moduleFormat.content_module[contentModule] = [];
      }
      moduleFormat.content_module[contentModule].push(`./${file}`);
    }
  });

  return moduleFormat;
};
