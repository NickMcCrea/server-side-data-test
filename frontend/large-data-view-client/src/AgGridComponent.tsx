import React, { useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';

import 'ag-grid-enterprise';

const AgGridComponent = () => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

   

    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api);

        //log this
        console.log('Grid ready', params);

        const dataSource: IServerSideDatasource = {
            getRows: (params: IServerSideGetRowsParams) => {
                // Here you can make an HTTP request to fetch data from the server.
                // For example, using fetch or axios to 'your-server-endpoint'.
                // Use `params.startRow`, `params.endRow`, and other parameters
                // to request the appropriate data from the server.

                //console log this fetch
                console.log('Fetching data', params);

                fetch('http://localhost:5001/query', {
                    method: 'POST',
                    body: JSON.stringify({
                        startRow: params.request.startRow,
                        endRow: params.request.endRow,
                        // ... include other parameters like sortModel, filterModel, etc.
                    }),
                    headers: { "Content-Type": "application/json" },
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.rows.length > 0) {
                            const columns = Object.keys(data.rows[0]).map(key => {
                                return { field: key };
                            });
                            if (gridApi)
                                gridApi.setGridOption('columnDefs', columns);
                        }
                        params.success(data.rows);
                    })
                    .catch(err => {
                        console.error(err);
                        params.fail();
                    });
            }
        };

      

        //log this
        console.log('Setting datasource', dataSource);
        params.api.setGridOption('serverSideDatasource', dataSource);
     
    };


    return (
        <div className="ag-theme-alpine" style={{ height: '90%', width: '90%' }}>
            <AgGridReact
                rowModelType="serverSide"
                onGridReady={onGridReady}
            // other grid options
            />
        </div>
    );
};

export default AgGridComponent;
