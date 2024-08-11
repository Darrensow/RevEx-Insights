import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function DepartmentTableComponent({ selectedDepartment, selectedYear }) {
    const [fundData, setFundData] = useState([]);

    useEffect(() => {
        // Mock data for example purposes, which changes based on the selected department
        const fetchData = async () => {
            const data = [
                { fundDescription: `${selectedDepartment} Fund 1`, revenue: '500,000', expense: '300,000' },
                { fundDescription: `${selectedDepartment} Fund 2`, revenue: '750,000', expense: '450,000' },
                { fundDescription: `${selectedDepartment} Fund 3`, revenue: '1,200,000', expense: '800,000' },
                { fundDescription: `${selectedDepartment} Fund 4`, revenue: '1,500,000', expense: '1,000,000' },
                { fundDescription: `${selectedDepartment} Fund 5`, revenue: '2,000,000', expense: '1,500,000' },
            ];
            setFundData(data);
        };

        if (selectedDepartment) {
            fetchData();
        }
    }, [selectedDepartment]);

    const chartTitle = selectedYear ? `${selectedDepartment} Department Financial Table of ${selectedYear}` : 'Department Financial Table';

    return (
        <div className="table-container">
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <DataTable
                value={fundData}
                paginator
                rows={5}
                sortMode="multiple"
                emptyMessage="No funds found."
                className="p-datatable-sm"
            >
                <Column field="fundDescription" header="Fund Description" sortable />
                <Column field="revenue" header="Revenue (USD)" sortable />
                <Column field="expense" header="Expense (USD)" sortable />
            </DataTable>
        </div>
    );
}

export default DepartmentTableComponent;
