const  net = require("net");
const fs = require("fs");
function portIsOccupied(port) {
  return new Promise((resolve, reject) => {
    let server = net.createServer().listen(port);
    server.on("listening", function() {
      server.close();
      resolve(port);
    });
    server.on("error", function(err) {
      if (err.code === "EADDRINUSE") {
        resolve(portIsOccupied(port + 1));
      } else {
        reject();
      }
    }); 
  });
}

function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, function(err) {
      if (err) {
        console.log("写文件出现错误", err);
        reject(err);
      } else {
        console.log(`创建${path}文件成功`);
        resolve();
      }
    });
  });
}

module.exports = {
  portIsOccupied,
  writeFile
}