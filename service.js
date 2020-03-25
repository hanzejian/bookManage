/** 
 * 业务模块
*/
const data = require('./data.json');
const fs = require('fs');
const path = require('path');

// 自动生成图书编号（自增）
let maxBookCode = () => {
  if (data.length <= 0) {
    return 0;
  }
  let arr = [];
  data.forEach((item) => {
    arr.push(item.id);
  });
  return Math.max.apply(null, arr);
}

// 渲染主页面
exports.showIndex = (req, res) => {
  res.render('index', {list: data});
}

// 跳转到添加图书的页面
exports.toAddBook = (req, res) => {
  res.render('addBook', {});
}

// 添加图书，提交表单
exports.addBook = (req, res) => {
  // 获取表单数据
  let info = req.body;
  let book = {};
  for (let key in info) {
    book[key] = info[key];
  }
  book.id = maxBookCode() + 1;
  console.log(book);
  data.push(book);
  // 把内存中的数据写入文件中
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
    if(err) {
      res.send('server error');
    }
    // 文件写入后重新跳转到主页面
    res.redirect('/');
  })
}

// 编辑图书页面
exports.toEditBook = (req, res) => {
  let id = req.query.id;
  let book = null;
  data.forEach((item) => {
    if (id == item.id) {
      book = item;
      return;
    }
  });
  res.render('editBook', book);
}

// 提交编辑图书信息
exports.editBook = (req, res) => {
  let info = req.body;
  data.forEach((item) => {
    if (info.id == item.id) {
      for (let key in info) {
        item[key] = info[key];
      }
      return;
    }
  });
  // 把内存中的数据写入文件
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
    if (err) {
      res.send('server error');
    } else {
      // 文件写入成功之后重新跳转回主页面
      res.redirect('/');
    }
  })
}

// 删除图书
exports.deleteBook = (req, res) => {
  let id = req.query.id;
  data.forEach((item, index) => {
    if(id == item.id) {
      data.splice(index, 1);
    }
  });
  // 将内存中的数据写入文件
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
    if(err) {
      res.send('server error');
    } else {
      res.redirect('/');
    }
  })
}

