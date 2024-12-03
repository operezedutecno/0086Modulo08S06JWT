const express = require("express");
const jwt = require("jsonwebtoken");

const port = 3000;
const app = express();
const secret = "0086";

app.use(express.json());

app.listen(port, () => console.log(`Aplicación ejecutando por el puerto ${port}`));


const usuarios = [
    { id: 1, username: "jgonzalez", password: "123456", name:"José González"},
    { id: 2, username: "mmolina", password: "654321", name:"María Molina"}
];

const utensiliosCocina = [
    { id: 1, nombre: "Cuchillo" },
    { id: 2, nombre: "Cuchara" },
    { id: 3, nombre: "Tenedor" },
    { id: 4, nombre: "Sartén" },
    { id: 5, nombre: "Olla" },
    { id: 6, nombre: "Batidora" },
    { id: 7, nombre: "Tabla de cortar" },
    { id: 8, nombre: "Colador" },
    { id: 9, nombre: "Rallador" },
    { id: 10, nombre: "Espátula" },
];


app.post("/login", (request, response) =>{
    const { username, password } = request.body;
    const user = usuarios.find(item => item.username == username && item.password == password)

    if(!user) {
        return response.status(401).json({ message: "Credenciales inválidas"});
    }

    const { password: clave, ...payload } = user

    const token = jwt.sign(payload, secret);

    response.json({ message: "Autenticación exitosa", token: token });
});


app.get("/utensilios", (request, response) => {
    const token = request.headers.authorization;

    try {
        const validacion = jwt.verify(token,secret);
        response.json({ message: "Listado de utensilios", data: utensiliosCocina })
    } catch (error) {
        response.status(401).json({ message: "No tiene acceso a este recurso" })
    }  
})