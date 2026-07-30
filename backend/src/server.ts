//it is the place where we just start or run  our express application server
//that means our backend app or server  is ready now we can wait for incomming requests.

import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
console.log(`server start running or waiting for incomming requests on PORT ${PORT}`);
})

