import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function DataTableComponent({ viewMode, selectedYear }) {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let data = [];
            if (viewMode === 'yearly') {
                data = [
                    { department: 'A', revenue: '10,000,000', expense: '5,000,000', ratio: '50%' },
                    { department: 'B', revenue: '20,000,000', expense: '10,000,000', ratio: '50%' },
                    { department: 'C', revenue: '30,000,000', expense: '15,000,000', ratio: '50%' },
                    // Add more yearly data as needed
                ];
            } else if (viewMode === 'quarterly') {
                data = [
                    { department: 'A', revenue: '2,500,000', expense: '1,250,000', ratio: '50%' },
                    { department: 'B', revenue: '5,000,000', expense: '2,500,000', ratio: '50%' },
                    { department: 'C', revenue: '7,500,000', expense: '3,750,000', ratio: '50%' },
                    // Add more quarterly data as needed
                ];
            } else if (viewMode === 'monthly') {
                data = [
                    { department: 'A', revenue: '833,333', expense: '416,666', ratio: '50%' },
                    { department: 'B', revenue: '1,666,666', expense: '833,333', ratio: '50%' },
                    { department: 'C', revenue: '2,500,000', expense: '1,250,000', ratio: '50%' },
                    // Add more monthly data as needed
                ];
            }
            setProducts(data);
        };
        fetchData();
    }, [viewMode]);

    const chartTitle = selectedYear ? `Department Financial Table of ${selectedYear}` : 'Department Financial Table';

    return (

        <div className="table-container">
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <DataTable
                value={products}
                paginator
                rows={5}
                globalFilter={globalFilter}
                sortMode="multiple"
                emptyMessage="No products found."
                className="p-datatable-sm"
            >
                <Column field="department" header="Department" sortable />
                <Column field="revenue" header="Revenue (USD)" sortable />
                <Column field="expense" header="Expense (USD)" sortable />
                <Column field="ratio" header="Ratio (%)" sortable />
            </DataTable>
        </div>
    );
}

export default DataTableComponent;
