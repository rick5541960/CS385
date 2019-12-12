import React, { Component } from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';
import { FirebaseContext } from '../../contexts/FirebaseContext'

class TodoList extends Component {
    static contextType = FirebaseContext;
    state = {
        user: null,
        todos: [],
        finishedTodos: [],
        error: null,
        counter: 0,
        isFinishedOrPlaned: false,
    }

    componentDidMount() {
        this.context.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
                let todos = [];
                let todosRef = this.context.db.collection('todos');
                todosRef.where('userId', '==', user.uid)
                    //.where('isFinished', '==', false)
                    //.orderBy('timestamp')
                    .get().then(snapshot => {
                        if (snapshot.empty) {
                            console.log('No matching documents.');
                            return;
                        } else {
                            snapshot.forEach(doc => {
                                todos.push({ ...doc.data(), todoId: doc.id })
                                this.setState({ todos })
                            });
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });

                // let finishedTodos = [];
                // todosRef.where('userId', '==', user.uid).where('isFinished', '==', true)
                //     .get().then(snapshot => {
                //         if (snapshot.empty) {
                //             console.log('No matching documents.');
                //             return;
                //         } else {
                //             snapshot.forEach(doc => {
                //                 finishedTodos.push({ ...doc.data(), todoId: doc.id })
                //                 this.setState({ finishedTodos })
                //             });
                //         }
                //     })
                //     .catch(err => {
                //         console.log('Error getting documents', err);
                //     });
            } else {
                this.props.history.push('/');
            }
        })
    }

    handleAddTodo = (content, dueDate, dueTime, location) => {
        console.log(content, dueDate, dueTime, location)
        const timestamp = new Date().toLocaleString();
        this.context.db.collection('todos').add({
            timestamp, userId: this.state.user.uid, content, isFinished: false,
            dueDate, dueTime, location,
        })
            .then(() => {
                let todos = [];
                this.context.db.collection('todos')
                    .where('userId', '==', this.state.user.uid).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            todos.push({ ...doc.data(), todoId: doc.id })
                            this.setState({ todos })
                        });
                    })
            })
            .catch(error => {
                this.setState({ error });//弹窗提示
            });
    }

    handleChangeTodoState = (todoId, isFinished) => {
        this.context.db.collection('todos').doc(todoId)
            .update({
                isFinished: !isFinished
            }).then(() => {
                let todoObject = this.state.todos.filter(x => x.todoId === todoId);
                console.log(todoObject)
                todoObject[0].isFinished = !isFinished;
                console.log(todoObject)
                this.setState((prevState => {
                    return {
                        todos: prevState.todos.map(object => {
                            if (object.todoId == todoId) {
                                object.isFinished = !isFinished
                            }
                            return object
                        })
                    }
                }))
                //this.setState({ todos: this.state.todos.concat(todoObject) })
                // if (isFinished) {
                //     this.setState({ todos: this.state.todos.concat(todoObject) })
                //     this.setState({ finishedTodos: this.state.finishedTodos.filter(x => x.todoId !== todoId) })
                // } else { 
                //     this.setState({ finishedTodos: this.state.finishedTodos.concat(todoObject) })
                //     this.setState({ todos: this.state.todos.filter(x => x.todoId !== todoId) })
                // }      
            }
            ).catch(error => {
                this.setState({ error })
            })
    }

    handleDeleteTodo = (todoId) => {
        this.context.db.collection('todos').doc(todoId).delete()
            .then(() => {
                let todos = this.state.todos.filter(x => x.todoId !== todoId)
                this.setState({ todos })
            }
            ).catch(error => {
                this.setState({ error })
            })
    }

    handleChange = e => {
        this.setState({
            content: e.target.value
        });
    }
    render() {
        let todos = this.state.todos.filter(x => !x.isFinished);
        let finishedTodos = this.state.todos.filter(x => x.isFinished);
        
        return (
            <div className="col-lg-8 col-sm-12 mb-lg-0 h-100 overflow-auto border-left border-muted">
                <div className="container">
                    {/* <div className="navbar-header">
                        <h2 className="text-left mt-3 mb=2 w-20">Todos</h2>
                    </div> */}
                    {/* <div className="navbar-collapse mt-3">
                        <ul className="nav nav-pills w-30">
                            <li className="nav-item">
                                <Link to="/dashboard/planed" className="nav-link active">Planed</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard/finished" className="nav-link">Finished</Link>
                            </li>
                        </ul>
                    </div> */}
                    <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="planed-tab" data-toggle="tab" href="#planed" role="tab" aria-controls="planed" aria-selected="true">Planed</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="finished-tab" data-toggle="tab" href="#finished" role="tab" aria-controls="finished" aria-selected="false">Finished</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="planed" role="tabpanel" aria-labelledby="planed-tab">
                            <Todos todos={todos} changeTodoState={this.handleChangeTodoState} deleteTodo={this.handleDeleteTodo} />
                            <AddTodo addTodo={this.handleAddTodo} /></div>
                        <div className="tab-pane fade" id="finished" role="tabpanel" aria-labelledby="finished-tab">
                            <Todos todos={finishedTodos} changeTodoState={this.handleChangeTodoState} deleteTodo={this.handleDeleteTodo} />
                        </div>
                    </div>
                </div>
                {/* <hr className="mb-2 bg-light" />
                <Router>
                    <Switch>
                        <Route exact path='/dashboard'
                            render={(props) => (
                                <>
                                    <Todos todos={this.state.todos} finishedTodo={this.handleFinishTodo} deleteTodo={this.handleDeleteTodo} />
                                    <AddTodo addTodo={this.handleAddTodo} />
                                </>)}
                        />
                        <Route path='/dashboard/planed'
                            render={(props) => (
                                <>
                                    <Todos todos={this.state.todos} finishedTodo={this.handleFinishTodo} deleteTodo={this.handleDeleteTodo} isFinished={false} />
                                    <AddTodo addTodo={this.handleAddTodo} />
                                </>)}
                        />
                        <Route path='/dashboard/finished'
                            render={(props) => (
                                <Todos todos={this.state.finishedTodos} finishedTodo={this.handleFinishTodo} deleteTodo={this.handleDeleteTodo} isFinished={true} />
                            )}
                        />
                    </Switch>
                </Router> */}
            </div>
        );
    }
}

// function Planed(props) {
//     console.log(props)
//     return (
//         <>
//             <Todos todos={props.todos} finishedTodo={props.handleFinishTodo} deleteTodo={props.handleDeleteTodo} />
//             <AddTodo addTodo={props.handleAddTodo} />
//         </>
//     )
// }

export default TodoList;