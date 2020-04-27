import Table from 'react-bootstrap/Table';
import TransactionTableRow from './TransactionTableRow';
import { Transaction } from '../types';

interface TransactionTableProps{
    transactions: Array<Transaction>,
    deleteTransaction: Function
}


export default (props: TransactionTableProps) => {

    const transactions = props.transactions.map((transaction) => {

        return (
            <TransactionTableRow key={transaction.id} {...transaction} deleteTransaction={props.deleteTransaction}></TransactionTableRow>
        );
    });

    return (
        <Table striped bordered hover>
            <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Delete?</th>
                </tr>         
            </thead>
            <tbody>
                {transactions}
            </tbody>
        </Table>
    );
};

