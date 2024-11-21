
import express, { type Request, type Response } from "express";
import { BalanceHelper } from "./src/helpers/balancehelper";
import cors from "cors"

const app = express();
const port =  process.env.PORT;

app.use(cors())

let balanceHelper: BalanceHelper;

app.get('/balances/:address',  async(req, res) => {
    const address = req.params.address
    res.send(await balanceHelper.getBalance(address))
})

app.get('/tokens', async(req, res) => {
    const resp =  balanceHelper.tokenConfigs
    res.send(resp)
})

app.get('/', async(req, res) => {
    res.send({status:"working"})
})
app.listen(port, () => {
    balanceHelper = new BalanceHelper()
    console.log(`Listening on port ${port}...`);
});