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
      jwk.kid = KJUR.jws.JWS.getJWKthumbprint(jwk);
      
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
