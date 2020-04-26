const TransactionApi = {
    async getTransactions(){
        const fetchInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              }
        };

        try{
            const res = await fetch('http://localhost:3000/api/transactions', fetchInit);
            return await res.json();
        } catch (error){
            console.log(error);
            return  [];
        }
    },
};

export default TransactionApi;