import React from 'react'
import * as requests from './requests'

class EditKaijuForm extends React.Component {

  state = {
    name: this.props.name,
    power: this.props.power,
    image: this.props.image
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handlePowerChange = (e) => {
    this.setState({
      power: e.target.value
    })
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/kaijus/${this.props.id}`,{method: 'PATCH', 
      headers: {'content-type':'application/json'},
      body: JSON.stringify({ 
        name: this.state.name,
        power: this.state.power,
        image: this.state.image
       })
      })
      .then(r => r.json())
      .then(kaiju => {
        this.props.editKaiju(kaiju)
        this.props.toggleEdit()
      })
  }

  render() {
    console.log(this.state);
    return (
      <>
        <form className='kaiju-card-edit-form' onSubmit={this.handleSubmit}>

          <label name="name">Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name} placeholder='Monster Name'/>
          <br/>

          <label name='power'>Power: </label>
          <input type='text' onChange={this.handlePowerChange} value={this.state.power} placeholder='Monster Power'/>
          <br/>

          <label name='image'>Image URL: </label>
          <input type='text' onChange={this.handleImageChange} value={this.state.image} placeholder='Monster ImageUrl'/>
          <br/>

          <input type="submit" value="Save Changes" />

        </form>
      </>
    )
  }
}

export default EditKaijuForm
