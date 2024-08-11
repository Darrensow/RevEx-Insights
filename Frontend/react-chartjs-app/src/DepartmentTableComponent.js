import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

function DepartmentTableComponent({ selectedDepartment, selectedYear }) {
    const [fundData, setFundData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {};
                if (selectedDepartment) params.departmentNameKey = selectedDepartment;
                if (selectedYear) params.year = selectedYear;

                const response = await axios.get('http://localhost:8080/analytics/get-financial-table-data', { params });
                const data = response.data;

                const formattedData = data.map(item => ({
                    description: item.description,
                    revenue: item.revenue,
                    expense: item.expenses,
                }));

                setFundData(formattedData);
            } catch (error) {
                console.error('Error fetching department financial data:', error);
            }
        };

        if (selectedDepartment) {
            fetchData();
        }
    }, [selectedDepartment, selectedYear]);

    const chartTitle = selectedYear ? `${selectedDepartment} Department Financial Table of ${selectedYear}` : 'Department Financial Table';

    // Function to format the currency without decimals
    const formatCurrency = (value) => {
        const roundedValue = Math.round(value); // Round to the nearest whole number
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Custom template for the revenue column
    const revenueBodyTemplate = (rowData) => {
        return formatCurrency(rowData.revenue);
    };

    // Custom template for the expense column
    const expenseBodyTemplate = (rowData) => {
        return formatCurrency(rowData.expense);
    };

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
                <Column field="description" header="Fund Description" sortable />
                <Column field="revenue" header="Revenue" body={revenueBodyTemplate} sortable />
                <Column field="expense" header="Expense" body={expenseBodyTemplate} sortable />
            </DataTable>
        </div>
    );
}

export default DepartmentTableComponent;
