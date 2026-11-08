import fs from 'node:fs/promises';
import sharp from 'sharp';
const records=JSON.parse(await fs.readFile('../research/category-drinks.json','utf8'));
await fs.mkdir('../research/category-originals',{recursive:true});
await fs.mkdir('public/images/categories',{recursive:true});
for(const item of records){
 const saved=`../research/category-originals/${item.category}.png`;
 await fs.copyFile(item.original,saved);
 const output=`public/images/categories/${item.category}`;
 await sharp(saved).resize({width:1600}).webp({quality:84}).toFile(`${output}.webp`);
 await sharp(saved).resize({width:640}).webp({quality:80}).toFile(`${output}-small.webp`);
 const meta=await sharp(saved).metadata();
 item.savedOriginal=saved;item.src=`/images/categories/${item.category}.webp`;item.width=meta.width;item.height=meta.height;item.reviewed=true;item.kind='AI-generated category illustration';
}
await fs.writeFile('../research/category-drinks.json',JSON.stringify(records,null,2));
console.log(`Exported ${records.length} distinct category photos, each at1600px and640px.`);
