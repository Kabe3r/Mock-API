import React, { useState } from 'react'
import { useAddStudentMutation, useUpdateStudentMutation } from '../services/StudentApi'
import { useNavigate, useLocation } from 'react-router-dom';


function EditStudent() {
    const [addStudent, { results }] = useAddStudentMutation();
    const [updateStudent, { result }] = useUpdateStudentMutation();
    const [formState, setFormState] = useState({
        Name: '',
        Class: 0,
        Section: ''
    });
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
          });
    }

    const postForm = async (e) => {
        e.preventDefault();

        try {
            if (location.pathname === '/add') {
                await addStudent(formState).unwrap();
            } else {
                await updateStudent({id: location?.state, formState}).unwrap();
            }
            setTimeout(() => {
                navigate('/')
            }, 2200);
        } catch (err) {
            console.log(err)
        }
    }

console.log(formState)
  return (
    <div className="bg-[#1E1E1E] rounded-lg mt-10 sm:px-8 px-2 py-5 text-white h-[46rem] overflow-auto no-scrollbar">
         <form className="" onSubmit={postForm}>
         <div className="mt-10">
          <label className="block">Name</label>
            <input
            type='text'
            name="Name"
            className="max-md:w-full border border-gray-400 bg-transparent p-2 mt-2 rounded-md"
            size={45}
            value={formState.Name}
            onChange={handleChange}
          />
          </div>
         <div className="mt-10">
          <label className="block">Class</label>
            <input
            type='number'
            name="Class"
            className="max-md:w-full border border-gray-400 bg-transparent p-2 mt-2 rounded-md"
            size={45}
            value={formState.Class}
            onChange={handleChange}
          />
          </div>
         <div className="mt-10">
          <label className="block">Section</label>
            <input
            type='text'
            name="Section"
            className="max-md:w-full border border-gray-400 bg-transparent p-2 mt-2 rounded-md"
            size={45}
            value={formState.Section}
            onChange={handleChange}
          />
          </div>
            <button className='mt-10 bg-green-500 py-2 px-4 rounded-xl'>Post Form</button>
            </form>
        </div>
  )
}

export default EditStudent