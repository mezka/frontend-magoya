import React from 'react';
import { NextPageContext } from 'next'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import TransactionTable from '../components/TransactionTable';
import TransactionApi from '../utils/TransactionApi';

interface Transaction {
    date: string,
    description: string,
    amount: number,
    id: string
};

interface Props {
    transactions: Array<Transaction>,
}

class Index extends React.Component<Props> {
    
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return (<div className="container">
                    <Navbar bg="dark">
                        <Navbar.Brand href="#home">
                        <img
                            src="/logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Magoya Logo"
                        />
                        </Navbar.Brand>
                    </Navbar>
                    <Jumbotron>
                        <h1 className="header text-center">Magoya Frontend Dev Test</h1>
                    </Jumbotron>

                    <TransactionTable transactions={this.props.transactions}></TransactionTable>
                    <Link href="/transactions/new">
                        <Button variant="secondary">New Transaction</Button>
                    </Link>
                </div>);
    }
}

export async function getServerSideProps({ req } : NextPageContext){

    const transactions = await TransactionApi.getTransactions();
    return { props: { transactions } }
}

export default Index;
