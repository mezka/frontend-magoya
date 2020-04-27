import 'isomorphic-unfetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import App, { AppProps } from 'next/app'
import AppContext from '../components/AppContext';

class MyApp extends App <AppProps>{

  state = {
    balance: null
  }

  constructor(props){
    super(props);
  }

  setBalance = (amount) => {
    this.setState({ balance: amount});
  }

  render(){
    const { Component, pageProps } = this.props
    return( 
      <AppContext.Provider value={{balance: this.state.balance, setBalance: this.setBalance}}>
        <Component {...pageProps}/>
      </AppContext.Provider>
      )
  }
}
 
export default MyApp;