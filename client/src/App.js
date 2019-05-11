import React from 'react';
import BookList from './components/bookList';
import AddBook from './components/AddBook';
import ApolloCLient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';



const client =new ApolloCLient({
    uri:'http://localhost:4000/graphql'
})

class App extends React.Component{
    render(){
      return (
          <ApolloProvider client={client}>
            <div id='main'>
                <h1>Test graphql and apollo</h1>
                <BookList/>
                <AddBook/>
            </div>
          </ApolloProvider>
      );
    }
}

export default App;
