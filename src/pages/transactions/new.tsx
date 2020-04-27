import Layout from '../../components/Layout';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import AppContext from '../../components/AppContext';
import TransactionApi from '../../utils/TransactionApi';

//Must be strings
enum TransactionType {
    Deposit = "DEPOSIT",
    Withdraw = "WITHDRAW"
};


class NewTransaction extends React.Component{

    static contextType = AppContext;

    state = {
        description: '',
        amount: 0,
        transactionType: TransactionType.Deposit
    };

    constructor(props){
        super(props);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const context = this.context;
        let {transactionType, ...data } = this.state;

        if(TransactionType.Withdraw && data.amount > context.balance){
            alert('You cant withdraw more than you currently have in your account');
            return;
        }

        data.amount = transactionType === TransactionType.Withdraw? - data.amount : data.amount;

        try{
            await TransactionApi.postTransaction({date: new Date().toISOString(), ...data});
        } catch (error){
            console.log(error);
            return;
        }

        Router.push('/');
    }
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return (
            <Layout>
                <h2>New Transaction</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formAmount">
                        <Form.Label>Transaction Amount</Form.Label>
                        <Form.Control type="number" name="amount" value={this.state.amount} onChange={this.handleChange} placeholder="Enter amount" min="0" required/>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Transaction Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter description" required/>
                    </Form.Group>
                    <Form.Group controlId="formTransactionType">
                        <Form.Label>Choose Action</Form.Label>
                        <Form.Row>
                                <Col xs="auto">
                                    <Form.Check name="transactionType" type="radio" 
                                    label="Deposit" value={TransactionType.Deposit} 
                                    onChange={this.handleChange}
                                    checked={this.state.transactionType === TransactionType.Deposit}/>
                                </Col>
                                <Col xs="auto">
                                    <Form.Check name="transactionType" type="radio" 
                                    label="Withdraw" value={TransactionType.Withdraw}
                                    onChange={this.handleChange}
                                    checked={this.state.transactionType === TransactionType.Withdraw}/>
                                </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Row>
                        <Col xs="auto">
                            <Link href="/">
                                <Button variant="secondary">
                                    Go back
                                </Button>
                            </Link>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Layout>
        );
    }
}

export default NewTransaction;
