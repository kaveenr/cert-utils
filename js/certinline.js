class CertinlineApp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          out : ""
      }
      this.handleInput = this.handleInput.bind(this);
    }
    
    handleInput(e){
        let search = /\n/g;
        this.setState({
          out : e.target.value.replace(search,"\\n")
      })
    }
    
    render() {
      return (
        <div>
          <h2>
            Line breaks to '\n' literal
          </h2>
          
          <textarea name="cert" cols="40" rows="10" onChange={this.handleInput}></textarea>
          <hr/>
          <textarea disabled name="outcert" cols="40" rows="10" value={this.state.out}></textarea>
        </div>
      )
    }
  }