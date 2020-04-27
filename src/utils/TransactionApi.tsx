import type { TransactionValues } from '../types';

const TransactionApi = {
    async getTransactions(){
        const fetchInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try{
            const res = await fetch('http://localhost:3000/api/transactions', fetchInit);
            const transactions = await res.json();

            transactions.sort((elementA, elementB) => {
                const dateA = new Date(elementA.date);
                const dateB = new Date(elementB.date);

                if(dateA.getTime() < dateB.getTime()){
                    return 1;
                }

                return -1;
            });

            const balance = transactions.reduce((acum, transaction) => {return acum + transaction.amount}, 0);

            return {balance, transactions};
        } catch (error){
            console.log(error);
            return  {balance: undefined, transactions: []};
        }
    },

    async postTransaction(transaction :TransactionValues){
        const fetchInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction),
        };

        try{
            const res = await fetch('/api/transactions', fetchInit);
            return await res.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async deleteTransaction(id){
        const fetchInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try{
            const res = await fetch(`/api/transactions/${id}`, fetchInit);
            return;
        } catch (error) {
            console.log('hit2');
            console.log(error);
            return null;
        }
    }
};

export default TransactionApi;