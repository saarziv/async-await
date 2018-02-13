//Real world example with async-await.
//notice that i can even use await on the axios.get() function because it returns a promise
//and we can use await on promises if we are inside of an async function.
//there is no need for some kind of special support for async / await by the library.

//summary : EVERY LIBRARY THAT RETURNS PROMISES COULD BE USED WITH ASYNC / AWAIT.
const axios = require('axios');

const getCurrencyRate = async(currency) => {
    try {
        const response  = await axios.get(`https://api.fixer.io/latest?base=${currency}`);
        return response.data.rates;
    } catch (e) {
        throw new Error(`unable to find ${currency}`)
    }


};

// getCurrencyRate('USD').then((rates) => console.log(rates));

const getCountries = async(currency) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return response.data.map(c => c.name);

    } catch (e) {
        throw new Error(`unable to find countries that use this ${currency} currency.`)
    }
};


const getStatus = async(from ,to, amount ) => {
    const rates = await getCurrencyRate(from);
    const countries = await getCountries(to);
    return `${rates[to]} ${to} is 1 ${from} .\n${amount} ${from} is ${amount*(rates[to])}.\nThe countries that use ${to} are: ${countries.join(', ')}`
    
};

getStatus('USD','ILS',5).then((string) => console.log(string)).catch(e => console.log(e));