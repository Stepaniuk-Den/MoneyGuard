import { fetchAllTransactions } from './api/api';
import { getMonoCurrency } from './api/apiCurrency';

export const optionsMonth = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

export const colors = [
    'rgba(254, 208, 87, 1)',
    'rgba(255, 216, 208, 1)',
    'rgba(253, 148, 152, 1)',
    'rgba(197, 186, 255, 1)',
    'rgba(110, 120, 232, 1)',
    'rgba(74, 86, 226, 1)',
    'rgba(129, 225, 255, 1)',
    'rgba(36, 204, 167, 1)',
    'rgba(0, 173, 132, 1)',
    'rgba(197, 186, 255, 1)',
    'rgba(200, 191, 255, 1)',
];

function getYear(date) {
    return date.slice(0, 4);
}

export async function getAllYears() {
    const resp = await fetchAllTransactions();

    let years = [];
    for (const { transactionDate } of resp) {
        if (!years.includes(getYear(transactionDate))) {
            years.push(getYear(transactionDate));
        }
    }
    return years.sort();
}

function parseMono(arr) {
    const rez = [
        {
            currency: 'USD',
        },
        {
            currency: 'EUR',
        },
    ];

    arr.forEach((el, idx) => {
        rez[idx].buy = el.rateBuy.toFixed(2);
        rez[idx].sell = el.rateSell.toFixed(2);
    });

    return rez;
}
// function parsePrivat(arr) {
//     const rez = [
//         {
//             currency: 'USD',
//         },
//         {
//             currency: 'EUR',
//         },
//     ];

//     let i = 1;
//     arr.forEach(el => {
//         rez[i].buy = el.buy.slice(0, 5);
//         rez[i].sell = el.sale.slice(0, 5);
//         i--;
//     });

//     return rez;
// }

export async function getCurrency() {
    // try {
    const data = await getMonoCurrency();
    return parseMono(data.slice(0, 2));
    // } catch (error) {
    //     try {
    //         return parsePrivat(await getPrivatCurrency());
    //     } catch (error) {
    //         return [
    //             {
    //                 currency: 'USD',
    //                 buy: 0,
    //                 sell: 0,
    //             },
    //             {
    //                 currency: 'EUR',
    //                 buy: 0,
    //                 sell: 0,
    //             },
    //         ];
    //     }
    // }
}
