import React from 'react';

interface TransactionTableRowProps{
    id: string,
    date: string,
    description: string,
    amount: number,
    deleteTransaction: Function
}

class TransactionTableRow extends React.Component <TransactionTableRowProps>{

    constructor(props){
        super(props);
    }

    handleClick = () => {
        this.props.deleteTransaction(this.props.id);
    }

    render(){

        let colorClass = null;

        if(this.props.amount > 0){
            colorClass = 'text-success'
        } else {
            colorClass = 'text-danger'
        }

        return (
            <tr className={colorClass}>
                <th>{this.props.id}</th>
                <td>{this.props.date}</td>
                <td>{this.props.description}</td>
                <td>{this.props.amount}</td>
                <td className="d-flex justify-content-center">
                    <button onClick={this.handleClick} type="button" className="close" aria-label="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </td>
            </tr>
        );
    }
}

export default TransactionTableRow;