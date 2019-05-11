const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema =require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();

app.use(cors());

mongoose.connect('mongodb+srv://username:passWORD123@cluster0-jamwr.mongodb.net/test?retryWrites=true')
mongoose.connection.once('open',()=>{
    console.log('connected')
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log(`listening port 4000`);
});