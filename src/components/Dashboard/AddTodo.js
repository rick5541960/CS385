import React, { Component } from 'react'
import PropTypes from 'prop-types';

class AddTodo extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }

  state = {
    content: '',
    dueDate: '',
    dueTime: '',
    location: '',
  }

  // handleSubmit = e => {
  //   e.preventDefault()
  //   const { content, userId } = this.state
  //   const amount = Number(this.state.amount)
  //   const timestamp = new Date().toLocaleString()
  //   this.context.db.collection('todos').add({
  //     content, timestamp, userId,content,isFinished:false,
  //     dueDateTime:null,location:null
  //   })
  //     .then(() => {
  //       //this.setState()
  //     })
  //     .catch(error => {
  //       this.setState({ error })//弹窗提示
  //     });
  // }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddTodo = e => {
    e.preventDefault();
    // call function to add a todo
    this.props.addTodo(this.state.content, this.state.dueDate, this.state.dueTime, this.state.location);
  }
  render() {
    return (
      <div className="col-lg-8" style={{ position: 'fixed', bottom: 0, 'paddingLeft': 0 }} >
        {/* style = {{position:'absolute', bottom:0}} */}
        {/* <div style={{position:'absolute',bottom:'5px',right:'0px',margin:'0'}}>
       <div className="col-lg-8 col-sm-12 mr-0 fixed-bottom"> */}
        <form onSubmit={this.handleAddTodo}>
          <div className="btn-toolbar justify-content-start" role="toolbar" aria-label="Toolbar with button groups">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-light">Due date</div>
              </div>
              <input type="date" className="form-control" placeholder="Due date" id="dueDate" onChange={this.handleChange} value={this.state.dueDate} />
            </div><div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-light" >Due time</div>
              </div>
              <input type="time" className="form-control" placeholder="Due time" id="dueTime" onChange={this.handleChange} value={this.state.dueTime} />
            </div>
            <div className="input-group ">
              <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-light">Location</div>
              </div>
              <input type="text" className="form-control" placeholder="Add a location" id="location" onChange={this.handleChange} value={this.state.location} />
              {/* <input type="text" className="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={this.handleChange} value={this.state.location}></input> */}
            </div>
          </div>
          {/* <label>Add a new task:</label> 
           <input type="text" onChange={this.handleChange} value={this.state.content} /> */}
          <div className="input-group mb-3">
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Add a new task" id="content" onChange={this.handleChange} value={this.state.content} />
            <div className="input-group-append">
              <button className="input-group-text bg-primary text-white border-primary" type="submit">Push</button>
              {/* <span className="input-group-text bg-primary text-white border-primary" id="inputGroup-sizing-default" type="submit">Push</span> */}
            </div>
            {/* Bug:the div is too long */}
          </div>
        </form>
      </div>
    )
  }
}

export default AddTodo