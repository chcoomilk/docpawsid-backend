import * as util from "util";
import * as fs from "fs";
import stream = require("stream");
import { root } from "../app";

export const parse_to_extension = (mime_type: string) => {
  return mime_type.split("/")[1];
};

export const save_file = async (file: any, file_name: string) => {
  const pipeline = util.promisify(stream.pipeline);
  const write_stream = fs.createWriteStream("assets/users/" + file_name);
  try {
    await pipeline(file, write_stream);
    return null;
  } catch (error) {
    return error;
  }
};

export const delete_file = async (file_name: string) => {
  fs.unlink(root + "/assets/" + file_name, (error) => {
    if (error) console.log(error);
  });
};
