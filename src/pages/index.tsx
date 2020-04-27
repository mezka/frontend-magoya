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
import type { Transaction } from '../types';

interface Props {
    balance: Number,
    transactions: Array<Transaction>
}

class Index extends React.Component<Props> {

    constructor(props){
        super(props);
    }

    deleteTransaction(id){
        TransactionApi.deleteTransaction(id);
        Router.push('/');
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
                                ${this.props.balance}
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

    const data = await TransactionApi.getTransactions();
    return { props: { ...data } }
}

export default Index;
