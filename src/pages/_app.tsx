import 'isomorphic-unfetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'next/app'
import AppContext from '../components/AppContext';
 
interface MyAppProps{
  Component: React.Component,
  pageProps: any
}

class MyApp extends App {

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
        <Component {...pageProps}/>);
      </AppContext.Provider>
      )
  }
}
 
export default MyApp;