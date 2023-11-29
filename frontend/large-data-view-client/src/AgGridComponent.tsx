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
                    sortModel: params.request.sortModel,
                    filterModel: params.request.filterModel,
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

              
            })
           
          },
        };
      };

      const getColumnDefs = (params: GridReadyEvent) => {
        fetch('http://localhost:5001/glbal/meta', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const fields = data.fields;
    
            const columns = fields.map((field: any) => {
                return {
                    headerName: field.fieldDescription,
                    field: field.fieldName,
                    filter: field.fieldType === 'STRING' ? 'agTextColumnFilter' : 'agNumberColumnFilter',
                    sortable: true,
                };
            });
    
            console.log('Setting column defs:', columns);
            return columns;
        })
        .then(columns => { 
            params.api.setGridOption('columnDefs', columns);
        })
        .catch(error => {
            console.error('Error fetching column definitions:', error);
        });
    };
    

      

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
