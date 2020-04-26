import Table from 'react-bootstrap/Table';

export default (props) => {

    const transactions = props.transactions.map((transaction) => {

        let textColor = '';

        if(transaction.amount > 0){
            textColor = 'text-success';
        } else {
            textColor = 'text-danger'
        }

        return (
        <tr className={textColor} key={transaction.id}>
            <th>{transaction.id}</th>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
        </tr>
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
                </tr>         
            </thead>
            <tbody>
                {transactions}
            </tbody>
        </Table>
    );
};

