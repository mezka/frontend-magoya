import React from 'react';
import { NextPageContext } from 'next'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../components/Layout';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import TransactionTable from '../components/TransactionTable';
import TransactionApi from '../utils/TransactionApi';
import Router from 'next/router';
import AppContext from '../components/AppContext';
import type { Transaction } from '../types';

interface Props {
    transactions: Array<Transaction>,
}

class Index extends React.Component<Props> {
    static contextType = AppContext;

    constructor(props){
        super(props);
    }

    deleteTransaction(id){
        TransactionApi.deleteTransaction(id);
        Router.push('/');
    }
    
    componentDidMount(){
        const context = this.context;

        console.log(context);
        context.setBalance(this.props.transactions.reduce((acum, transaction) => {return acum + transaction.amount}, 0))      
    }

    componentDidUpdate(prevProps){
        if(prevProps.transactions.length !== this.props.transactions.length){
            const context = this.context;
            const balanceCandidate = this.props.transactions.reduce((acum, transaction) => {return acum + transaction.amount}, 0);

            if(context.balance !== balanceCandidate){
                context.setBalance(balanceCandidate);
            }
        }
    }


    render(){
        return (
            <Layout>
                <Jumbotron>
                    <h1 className="header text-center">Magoya Frontend Dev Test</h1>
                </Jumbotron>

                <Row className="my-2 d-flex justify-content-center">
                    <Col xs="auto" className="d-flex align-items-center">
                        <h2>Balance:</h2>
                    </Col>
                    <Col xs="auto">
                        <Card>
                                <Card.Body>
                                    <AppContext.Consumer>
                                        {context => context.balance}
                                    </AppContext.Consumer>
                                </Card.Body>
                        </Card>
                    </Col>
                </Row>
        
                <TransactionTable transactions={this.props.transactions} deleteTransaction={this.deleteTransaction}></TransactionTable>
                <Link href="/transactions/new">
                    <Button className="mb-3" variant="primary">New Transaction</Button>
                </Link>
            </Layout> 
        );
    }
}

export async function getServerSideProps({ req } : NextPageContext){

    const transactions = await TransactionApi.getTransactions();
    return { props: { transactions } }
}

export default Index;
