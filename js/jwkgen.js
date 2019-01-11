class JwksGenApp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        alg : "RS256",
        use : "sig",
        jwk : "No Private Key Entered"
      }
      this.handleInput = this.handleInput.bind(this);
    }
    
    handleInput(e){
        let value = e.target.value;
      this.setState({
          jwk : this.getJWK(value)
      })
    }
    
    createKid(){
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
      });
      return uuid;
  }
    
    getJWK(cert){
        let key = null;
        try {
        key = KEYUTIL.getKey(cert);
      }catch(err){
        return err;
      }
      let jwk = KEYUTIL.getJWKFromKey(key);
      jwk.alg = this.state.alg;
      jwk.use= this.state.use;
      jwk.kid = this.createKid();
      
      return JSON.stringify(jwk, null, 2);
    }
    
    render() {
      return (
        <div>
          <h2>
            Private Key JWK Generator
          </h2>
          <textarea name="cert" cols="40" rows="10" onChange={this.handleInput}></textarea>
          <hr/>
          <textarea disabled name="cert" cols="40" rows="20" value={this.state.jwk}></textarea>
        </div>
      )
    }
  }
  
  ReactDOM.render(<JwksGenApp />, document.querySelector("#jwks"))