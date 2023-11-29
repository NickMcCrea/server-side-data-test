import  { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {  GridReadyEvent, IServerSideDatasource } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const AgGridComponent = () => {

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const createServerSideDatasource: () => IServerSideDatasource = (
       
      ) => {
        return {
          getRows: (params) => {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            const promise = fetch('http://localhost:5001/glbal', {
                method: 'POST',
                body: JSON.stringify({
                    startRow: params.request.startRow,
                    endRow: params.request.endRow,
                    // ... include other parameters like sortModel, filterModel, etc.
                }),
                headers: { "Content-Type": "application/json" },
            })

            promise.then(response => response.json())
            .then(data => {
               console.log('data: ', data);
               console.log('params: ', params);
               return data;
            })
            .then(data => {
                console.log('setting row data: ', data);
                params.success({rowData: data });

                //check the grid data
                params.api!.forEachNode((node) => console.log(node.data));
                
            })
           
          },
        };
      };

      const getColumnDefs = (params: GridReadyEvent) => {

        const promise = fetch('http://localhost:5001/glbal', {
                method: 'POST',
                body: JSON.stringify({
                    startRow: 1,
                    endRow: 0,
                }),
                headers: { "Content-Type": "application/json" },
            })

            promise.then(response => response.json())
            .then(data => {
                const columns = Object.keys(data[0]).map(key => {
                    return { field: key };
                });
                return columns;
            })
            .then(columns => { 
                console.log('setting column defs: ', columns);
                return columns;
            })
            .then(cdefs => {
                params.api!.setGridOption('columnDefs', cdefs);
                return;
            })
        
           

      }

      

    const onGridReady = (params: GridReadyEvent) => {

        getColumnDefs(params);
        console.log('[GridReady] - agGrid is ready: ', params);
        params.api!.setGridOption('serverSideDatasource', createServerSideDatasource());

    };


    return (
        <div 
            className="ag-theme-alpine" 
            style={{ height: 900, width: '80%', alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}
        >
            
                <AgGridReact
                    rowModelType={'serverSide'}
                    onGridReady={onGridReady}
                />

        </div>

        
    );
};

export default AgGridComponent;
