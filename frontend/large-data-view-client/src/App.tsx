import React from 'react';
import logo from './logo.svg';
import './App.css';
import BasicTable from './BasicTable';
import AgGridComponent from './AgGridComponent';
import MyAgGridComponent from './AgGridSimple';

//some fake table data for the table. First row should be a header
const data = [

  {
      "account": 143240746,
      "balance": 772.07,
      "company_code": "0665",
      "cost_code": 5823,
      "counterparty_id": 348366643,
      "pnl_date": "2023-06-30 00:00:00",
      "product_id": 428016929
  },
  {
      "account": 698933265,
      "balance": 452.82,
      "company_code": "0302",
      "cost_code": 2234,
      "counterparty_id": 588597840,
      "pnl_date": "2023-05-31 00:00:00",
      "product_id": 739407747
  },
  {
      "account": 177499021,
      "balance": 606.31,
      "company_code": "0665",
      "cost_code": 5823,
      "counterparty_id": 834200200,
      "pnl_date": "2023-03-31 00:00:00",
      "product_id": 512870535
  },
  {
      "account": 970563209,
      "balance": 245.13,
      "company_code": "0302",
      "cost_code": 1234,
      "counterparty_id": 588597840,
      "pnl_date": "2023-04-30 00:00:00",
      "product_id": 238365306
  },
  {
      "account": 895511247,
      "balance": 812.23,
      "company_code": "0201",
      "cost_code": 7424,
      "counterparty_id": 529024972,
      "pnl_date": "2023-03-31 00:00:00",
      "product_id": 282155178
  },
  {
      "account": 546163238,
      "balance": 234.14,
      "company_code": "0665",
      "cost_code": 2356,
      "counterparty_id": 412546039,
      "pnl_date": "2023-01-31 00:00:00",
      "product_id": 238365306
  },
  {
      "account": 208918405,
      "balance": 539.69,
      "company_code": "0571",
      "cost_code": 9012,
      "counterparty_id": 827796040,
      "pnl_date": "2023-01-31 00:00:00",
      "product_id": 493017644
  },
  {
      "account": 163678420,
      "balance": 137.57,
      "company_code": "5621",
      "cost_code": 2356,
      "counterparty_id": 610714216,
      "pnl_date": "2023-06-30 00:00:00",
      "product_id": 359510045
  },
  {
      "account": 891920885,
      "balance": 489.36,
      "company_code": "0665",
      "cost_code": 5678,
      "counterparty_id": 834200200,
      "pnl_date": "2023-04-30 00:00:00",
      "product_id": 205687000
  },
  {
      "account": 913005072,
      "balance": 503.78,
      "company_code": "0302",
      "cost_code": 9012,
      "counterparty_id": 953925779,
      "pnl_date": "2023-01-31 00:00:00",
      "product_id": 124943561
  },
  {
      "account": 580417197,
      "balance": 82.88,
      "company_code": "0665",
      "cost_code": 7424,
      "counterparty_id": 843652402,
      "pnl_date": "2023-05-31 00:00:00",
      "product_id": 415417202
  },
  {
      "account": 895511247,
      "balance": 231.43,
      "company_code": "0302",
      "cost_code": 2234,
      "counterparty_id": 773696291,
      "pnl_date": "2023-05-31 00:00:00",
      "product_id": 301815562
  },
  {
      "account": 806056648,
      "balance": 913.8,
      "company_code": "0571",
      "cost_code": 3456,
      "counterparty_id": 818940325,
      "pnl_date": "2023-02-28 00:00:00",
      "product_id": 506290741
  },
  {
      "account": 653590665,
      "balance": 663.97,
      "company_code": "0201",
      "cost_code": 9012,
      "counterparty_id": 492158011,
      "pnl_date": "2023-03-31 00:00:00",
      "product_id": 235694417
  },
  {
      "account": 983412199,
      "balance": 127.77,
      "company_code": "0201",
      "cost_code": 7424,
      "counterparty_id": 949916792,
      "pnl_date": "2023-02-28 00:00:00",
      "product_id": 474576982
  },
  {
      "account": 208918405,
      "balance": 879.56,
      "company_code": "0201",
      "cost_code": 7424,
      "counterparty_id": 583745254,
      "pnl_date": "2023-05-31 00:00:00",
      "product_id": 423529782
  },
  {
      "account": 369406806,
      "balance": 568.85,
      "company_code": "0302",
      "cost_code": 9012,
      "counterparty_id": 877896928,
      "pnl_date": "2023-03-31 00:00:00",
      "product_id": 408359201
  },
  {
      "account": 843622408,
      "balance": 64.54,
      "company_code": "0665",
      "cost_code": 2234,
      "counterparty_id": 100589409,
      "pnl_date": "2023-03-31 00:00:00",
      "product_id": 575841422
  },
  {
      "account": 227766580,
      "balance": 590.07,
      "company_code": "0665",
      "cost_code": 2356,
      "counterparty_id": 651403726,
      "pnl_date": "2023-03-31 00:00:00",
      "product_id": 410028605
  },
  {
      "account": 321613857,
      "balance": 133.9,
      "company_code": "0201",
      "cost_code": 7424,
      "counterparty_id": 790201742,
      "pnl_date": "2023-06-30 00:00:00",
      "product_id": 499966358
  },
  {
      "account": 555623020,
      "balance": 922.18,
      "company_code": "0665",
      "cost_code": 3456,
      "counterparty_id": 757844153,
      "pnl_date": "2023-06-30 00:00:00",
      "product_id": 205687000
  },
  {
      "account": 179633451,
      "balance": 265.92,
      "company_code": "0302",
      "cost_code": 5678,
      "counterparty_id": 570991243,
      "pnl_date": "2023-04-30 00:00:00",
      "product_id": 644980446
  }
];



function App() {
  return (
    <div className="App">
        {/* <MyAgGridComponent data={data}/> */}
        <AgGridComponent />
    </div>
  );
}

export default App;
