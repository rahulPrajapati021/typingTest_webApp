const app = require("./app");

const PORT = process.env.port || 8000;


app.listen(PORT, () => {
    console.log("Server is running at port ", PORT)
})