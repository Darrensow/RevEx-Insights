import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import './App.css'; // Import the custom CSS

function DataTableComponent({ viewMode, selectedYear }) {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {};

                if (selectedYear) params.year = selectedYear;

                const response = await axios.get('http://localhost:8080/analytics/get-financial-table-data', { params });
                const data = response.data;

                const formattedData = data.map(item => {
                    const revenue = item.revenue || 0;
                    const expense = item.expenses || 0;
                    const ratio = expense > 0 ? Math.floor((revenue / expense) * 100) : '0';
                    return {
                        department: item.description,
                        revenue,
                        expense,
                        ratio: `${ratio}%`
                    };
                });

                setProducts(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [viewMode, selectedYear]);

    const chartTitle = selectedYear ? `Department Financial Table of ${selectedYear}` : 'Department Financial Table';

    // Function to format the currency without decimals
    const formatCurrency = (value) => {
        const roundedValue = Math.round(value); // Round to the nearest whole number
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Custom template for the revenue column
    const revenueBodyTemplate = (product) => {
        return formatCurrency(product.revenue);
    };

    // Custom template for the expense column
    const expenseBodyTemplate = (product) => {
        return formatCurrency(product.expense);
    };

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
                className="p-datatable-sm custom-datatable" // Apply the custom class
            >
                <Column field="department" header="Department" sortable />
                <Column field="revenue" header="Revenue" body={revenueBodyTemplate} sortable />
                <Column field="expense" header="Expense" body={expenseBodyTemplate} sortable />
                <Column field="ratio" header="Ratio (%)" sortable />
            </DataTable>
        </div>
    );
}

export default DataTableComponent;
