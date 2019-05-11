import React from 'react';
import {graphql,compose} from 'react-apollo';
import {getBooksQuery, getAuthorsQuery, addBookMutation} from '../queries/queries';

class AddBook extends React.Component {
    state = {
            name: '',
            genre: '',
            authorId: ''
        }

    displayAuthors(){
        console.log(this.props)
        const data=this.props.getAuthorsQuery;
        if(data.loading){
            return(<option>Loading Authors...</option>)
        }else{
            return data.authors.map(author=>{
                return(<option key={author.id} value={author.id}>{author.name}</option>);
            })
        }
    }
    submitForm=(e)=>{
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        });
    }
    render(){
    return (
        <form id="add-book" onSubmit={this.submitForm}>
            <div className='field'>
                <label>Book name:</label>
                <input style={{border:"1px solid white"}} type='text' onChange={e=>this.setState({name:e.target.value})}/>
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input  style={{border:"1px solid white"}} type='text' onChange={e=>this.setState({genre:e.target.value})}/>
            </div>
            <div className='field'>
                <label>Author:</label>
                <select  style={{border:"1px solid white"}} onChange={e=>this.setState({authorId:e.target.value})}>
                    <option>Select author</option>
                    {this.displayAuthors()}
                </select>
            </div>
            <button style={{border:"1px solid white"}}>+</button>
        </form>
        );
    }
}
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);