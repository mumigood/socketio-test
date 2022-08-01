const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");


const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
var values = [];


const pool = new Pool({
    user: "dsp",
    host: "localhost",
    database: "agatha",
    password: "",
    port: 5432,
  });


const io = new Server(httpServer, {   
    cors: {
        origin: "http://localhost:8000"
  }});

io.on("connection", (socket) => {
    pool.query('SELECT * FROM agatha_dataset',values,(err,res) => {
        if(err) throw err
        console.log(res.rows)
        socket.emit("allData", res.rows);
    })
    console.log("mimim")
});


io.listen(4000, () => {
    console.log('listening on *:4000');
  });

