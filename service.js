/** 
 * 业务模块
*/
// const data = require('./data.json');
const fs = require('fs');
const path = require('path');
const db = require('./db.js');

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
  let sql = 'select * from book';
  db.base(sql, null, (result) => {
    res.render('index', {list: result});
  });
}

// 跳转到添加图书的页面
exports.toAddBook = (req, res) => {
  res.render('addBook', {});
}

// 添加图书，提交表单
exports.addBook = (req, res) => {
  // 获取表单数据
  let sql = 'insert into book set ?';
  let info = req.body;
  let book = {};
  for (let key in info) {
    book[key] = info[key];
  }
  db.base(sql, info, (result) => {
    if(result.affectedRows == 1) {
      res.redirect('/');
    }
  });
}

// 编辑图书页面
exports.toEditBook = (req, res) => {
  let id = req.query.id;
  // let book = null;
  // data.forEach((item) => {
  //   if (id == item.id) {
  //     book = item;
  //     return;
  //   }
  // });
  let sql = 'select * from book where id=?';
  let arr = [id];
  db.base(sql, arr, (result) => {
    res.render('editBook', result[0]);
  })
  
}

// 提交编辑图书信息
exports.editBook = (req, res) => {
  let book = req.body;
  let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
  let arr = [book.name, book.author, book.category, book.description, book.id];
  db.base(sql, arr, (result) => {
    if(result.affectedRows == 1) {
      res.redirect('/');
    }
  })
  
}

// 删除图书
exports.deleteBook = (req, res) => {
  let id = req.query.id;
  let sql = 'delete from book where id=?';
  let arr = [id];
  db.base(sql, arr, (result) => {
    if(result.affectedRows == 1) {
      res.redirect('/');
    }
  })
}

