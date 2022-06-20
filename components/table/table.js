import { Spin } from 'antd';
import React from 'react';

// maybe bootstrap table easy to use,
// no need extra design pain
const Table = ({ data, columns }) => {

    return (
        <div className='h-full overflow-auto shadow-xl'>
            <table className='table-auto border-collapse border border-slate-500 w-full test-center tableContainer mt-5'>
                <thead>
                    <tr>
                        <th className="border border-slate-300 p-2">SN</th>
                        {
                            columns?.map((column, index) => (
                                <th key={index} className="border border-slate-300 p-2">
                                    {column.headerName}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className='text-center text-gray-600 font-normal'>
                    {

                        data?.map((d, index) => (
                            <tr key={index}>
                                <td className='border p-2'>{index + 1}</td>
                                {
                                    columns?.map((col, ind) => (
                                        <td key={ind} className='border p-2'>
                                            {
                                                typeof col?.formatter === 'function' ?
                                                    col?.formatter(d[col.dataField], d)
                                                    :
                                                    d[col.dataField]
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;