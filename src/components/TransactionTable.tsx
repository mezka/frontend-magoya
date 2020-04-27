import Table from 'react-bootstrap/Table';
import TransactionTableRow from './TransactionTableRow';

export default (props) => {

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

