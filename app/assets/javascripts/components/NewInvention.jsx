class NewInvention extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      userName: '',
      email: ''
    }
    this.bindFunctions()
  }

  bindFunctions() {
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSubmit(e) {
    e.preventDefault()
    const invention = {
      title: this.state.title,
      description: this.state.description,
      user_name: this.state.userName,
      email: this.state.email
    }
    $.post('/inventions', {
      invention
    }).done(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <h2>New Invention</h2>
        <form onSubmit={this.handleSubmit} >
          <input
            name='title'
            value={this.state.title}
            placeholder='title'
            onChange={this.handleChange} />

          <input
            name='description'
            value={this.state.description}
            placeholder='description'
            onChange={this.handleChange} />

          <input
            name='userName'
            value={this.state.userName}
            placeholder='user name'
            onChange={this.handleChange} />

          <input
            name='email'
            value={this.state.email}
            placeholder='email'
            onChange={this.handleChange} />

          <input type='submit' />

          <div>Bits...</div>
          <div>Materials...</div>
        </form>
      </div>
    )
  }
}