const express = require("express");
const path = require("path");
const { portIsOccupied, writeFile } = require("./utils.js");
const { trim } = require("lodash");

let app = express();

portIsOccupied(8080).then(port => {
  app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "./index.html"));
  });
  app.get("/create-sql", function(req, res) {
    let { table_names, contents } = req.query;
    if (!table_names || !contents) {
      res.send("请填写正确的信息");
    } else {
      const len = table_names.length;
      for (let i = 0; i < len; i ++) {
        let table_name = table_names[i];
        let content = contents[i];
        let rows = content.split("\r");
        let columns = "";
        rows.forEach(row => {
          let info = trim(row, "\n").split(" ");
          info.length -= 1;
          columns += info.join(" ") + ",";
        });
        columns = columns.slice(0, columns.length - 1);
        let sql = `DROP table if exists ${table_name};
                  CREATE TABLE ${table_name} (${columns});`;
        writeFile(path.resolve(__dirname, `./${ table_name }.sql`), sql).then(() => {
          res.send(`创建/sqls/${ table_name }.sql文件成功`);
        }, (err) => {
          res.send("创建失败：" + err);
        });
      }
    }
  });
  app.listen(port, () => {
    console.log(`please open your browser and then visit url http://localhost:${port}`);
  });
});