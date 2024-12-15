const express=require('express')
const cors=require('cors')
const {db}=require('./db/db')
const {readdirSync} = require('fs')
const http=require('http')
const {Server}=require('socket.io')
const { getAllAuctions, addChat, addAuction } = require('./controller/AuctionController')
const { addUser } = require('./controller/UserController')
const { addBid } = require('./controller/BidController')



const app=express()


app.use(express.json())

require('dotenv').config()

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials like cookies
}));


readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server=http.createServer(app);

const io=new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });


const startServer=()=>
{
    db()
    server.listen(process.env.PORT,()=>
        {
            console.log('server started');
            
        })
}



io.on('connection',(socket)=>
{

    socket.on('addAuction',async({title,description,category,itemQuantity,startingPrice,createdBy,contactInfo,image,endTime})=>
    {
        await addAuction({title,description,category,itemQuantity,startingPrice,createdBy,contactInfo,image,endTime})
        
        const auctions=await getAllAuctions()
        io.emit('auctionList',auctions)



    })
    
    socket.on('getAuctions',async()=>
    {
        
        const auctions=await getAllAuctions();
    
        socket.emit('auctionList',auctions);
    })

    socket.on('placeBid',async({ auctionId, bidAmount,expiredAt,userId})=>
    {

        const obj={
            auctionId,
            bidAmount,
            expiredAt,
            userId
        }
       
        
        await addBid(obj);
        const auctions=await getAllAuctions();

        io.emit('bidUpdate',auctions)
    })
    socket.on('addChat',async({auctionId,name,message})=>
    {
        
        await addChat({auctionId,name,message})
        
        const auctions=await getAllAuctions()
        io.emit('chatAdded',auctions)
    })


})

startServer();