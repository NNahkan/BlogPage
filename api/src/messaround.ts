import dotenv from "dotenv"
dotenv.config()


dotenv.config({ path: "../.env" }); // Adjust the path as needed
console.log(process.env.DATABASE_URL); 