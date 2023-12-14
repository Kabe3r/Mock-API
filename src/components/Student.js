import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDelStudentMutation, useGetStudentsListQuery } from '../services/StudentApi'
import { CSVLink } from 'react-csv';
import db from '../'

function Student() {
    const { data, isLoading, isError } = useGetStudentsListQuery();
    const [delStudent, { result }] = useDelStudentMutation();

    const headers = [
        { label: "id", key: "id" },
        { label: "Name", key: "Name" },
        { label: "Class", key: "Class" },
        { label: "Section", key: "Section" }
      ];

     const student = [
        {
          "id": 1,
          "Name": "Ahmed",
          "Class": "5",
          "Section": "B"
        },
        {
          "Name": "Farooq",
          "Class": 7,
          "Section": "B",
          "id": 2
        },
        {
          "Name": "Murad",
          "Class": "5",
          "Section": "D",
          "id": 3
        },
        {
          "Name": "HamzaDdf",
          "Class": "1",
          "Section": "BC",
          "id": 4
        }
    ]
    return (
        <>
        <div className='flex justify-around'>
            <h1>Students</h1>
            <Link to={`/add`} className='bg-[#4180FE] rounded-md px-3 py-1 text-white'>Add Students</Link>
            {data?.length > 0 && 
                <CSVLink className='bg-green-400 text-white rounded-md px-3 py-1' data={data} headers={headers}>
  Download CSV
</CSVLink>
                }
            {/* <button className='bg-green-400 text-white rounded-md px-3 py-1' onClick>Export to csv</button> */}
        </div>
    <div className='border-gray-lite border rounded-md mt-4 overflow-auto h-72 no-scrollbar text-white'>
<table className="table-auto divide-y divide-gray-lite w-full whitespace-nowrap">
  <thead className='sticky top-0 bg-[#1e1e1e]'>
    <tr className='h-12'>
      <th className=''>ID</th>
      <th className=''>Name</th>
      <th className=''>Class</th>
      <th className=''>Section</th>
      <th className=''>Action</th>
    </tr>
  </thead>
  <tbody className='text-center divide-y divide-gray-lite whitespace-nowrap text-black'>
     {data?.map((stud, idx) => {
         return (
             <tr key={idx +1} >
      <td>{stud?.id}</td>
      <td>{stud?.Name}</td>
      <td>{stud?.Class}</td>
      <td>{stud?.Section}</td>
      <td>
        <Link to={`/edit`} state={stud?.id}  className='bg-[#4180FE] rounded-md px-3 py-1'>Edit</Link>
        <button className='bg-[#CE0000] rounded-md px-3 py-1' onClick={() => delStudent(stud?.id).unwrap()}>Delete</button> 
      </td>
    </tr>
    )})} 
  </tbody>
</table>
</div>
    </>
  )
}

export default Student