import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());

const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

app.get("/", (req, res) => {
    res.send("Bienvenido a mi primera API!!!!  ESTE ES UN MENSAJE DE PRUEBA");
});


app.get("/todos", (req,res) => {
    const data = readData();
    res.json(data.todos);
});

app.get("/todos/:no", (req,res) => {
    const data = readData();
    const no = parseInt(req.params.no);
    const todos = data.todos.find((todos) => todos.no === no); 
    res.json(todos);
});

app.post("/todos", (req,res) => {
    const data = readData();
    const body = req.body;
    const newTarea = {
        no: data.todos.length + 1,
        ...body,
    };
    data.todos.push(newTarea);
    writeData(data);
    res.json(newTarea);

});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});