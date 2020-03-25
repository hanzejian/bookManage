// 把 data.json 文件中的数据拼接成 insert 语句
const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname,'../', 'data.json'), 'utf8', (err, content) => {
  let data = JSON.parse(content);
  let arr = [];
  data.forEach(item => {
    let sql = `insert into book (name, author, category, description) values
     ('${item.name}', '${item.author}', '${item.category}', '${item.desc}');`;
     arr.push(sql);
  })
  fs.writeFile(path.join(__dirname,'data.sql'), arr.join(''), (err) => {
    if (err) return;
    console.log('init data finished!');
  })
})