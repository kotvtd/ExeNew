import fs from 'fs';
import path from 'path';
//import { json } from 'stream/consumers';

const jsonpath = path.join(__dirname,"../../src/data");
export const loadJSON = (filename: string) =>{
    const filePath =path.join(jsonpath, filename);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}


export const saveJSON = (filename: string, data: any) =>{
    const filePath = path.join(jsonpath, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}