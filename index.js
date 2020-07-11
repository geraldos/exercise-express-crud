const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = process.env.PORT || 4000;

const users = require("./data/data");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.set("view engine", "ejs");

//GET
app.get("/", (req, res) => {
    res.render("pages/home.ejs");
});

app.get("/getUser", (req, res) => {
    res.send(users);
});

app.post("/users/filterByAddress/:address", (req, res) => {
    const { address } = req.params;

    const filterByAddress = users.filter(
        (user) =>
            user.address.toLocaleLowerCase() === address.toLocaleLowerCase()
    );

    res.send({
        message: `All data users by address: ${address}`,
        data: filterByAddress,
    });
});

//POST
app.post("/users", (req, res) => {
    const { name, address, hobbies } = req.body;
    const id = users[users.length - 1].id + 1;

    users.push({ id, name, address, hobbies });

    res.send({
        message: "Data berhasil diinput, terimakasih",
        data: users,
    });
});

//PUT
app.put("/users/:id", (req, res) => {
    const { id } = req.params;

    const { name, address, hobbies } = req.body;

    const userID = users.findIndex((user) => user.id === parseInt(id));

    const newData = {
        id: parseInt(id),
        name,
        address,
        hobbies: hobbies.split(","),
    };

    users.splice(userID, 1, newData);

    res.send({
        message: "Data kamu berhasil diperbarui",
        data: users,
    });
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    const usersID = users.findIndex((user) => user.id === parseInt(id));

    users.splice(usersID, 1);

    res.send({
        message: "Your data is successfully Updated",
        data: users,
    });
});

app.listen(PORT, () => {
    console.log(`Servers runs on port ${PORT}`);
});
