import express,{json} from "express";
import { appRoute } from "./Routes/courseRoute.js";

const app = express();
app.use(json());
app.use(appRoute);
const port = 8000;

app.listen(port,function(){
    console.log(`Server running on ${port}`);
    
})
