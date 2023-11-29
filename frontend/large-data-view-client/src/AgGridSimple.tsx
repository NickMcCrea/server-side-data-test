import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


// Assuming each object in your data array has this structure
interface DataObject {
    [key: string]: any; // Replace 'any' with more specific types if possible
}

interface ColumnDef {
    field: string;
    sortable: boolean;
    filter: boolean;
}

interface MyAgGridComponentProps {
    data: DataObject[];
}

const MyAgGridComponent: React.FC<MyAgGridComponentProps> = ({ data }) => {
    const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);

    const generateColumnDefsFromData = (data: DataObject[]): ColumnDef[] => {
        if (data && data.length > 0) {
            return Object.keys(data[0]).map(key => ({
                field: key,
                sortable: true,
                filter: true
            }));
        }
        return [];
    };

    useEffect(() => {
        setColumnDefs(generateColumnDefsFromData(data));
    }, [data]);

    return (
        <div 
            className="ag-theme-alpine" 
            style={{ height: 600, width: '100%' }}
        >
            <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
            />
        </div>
    );
};

export default MyAgGridComponent;
