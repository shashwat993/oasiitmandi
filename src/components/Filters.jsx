import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { MultiSelect } from './multiselect';
import { Button } from './button';
import { useStudentContext } from "@/context/studentContext";


const Filters = ({ hideSidebar }) => {

    const { filterStudents } = useStudentContext();

   
    const states = [
        'Bihar',
        'Uttar Pradesh', 
        'Rajasthan', 
        'Madhya Pradesh',
        'Andaman and Nicobar Islands', 
        'Andhra Pradesh',
        'Arunachal Pradesh', 
        'Assam', 
        'Chandigarh',
        'Chhattisgarh', 
        'Dadra and Nagar Haveli', 
        'Daman and Diu', 
        'Delhi', 
        'Goa', 
        'Gujarat', 
        'Haryana', 
        'Himachal Pradesh', 
        'Jammu and Kashmir', 
        'Jharkhand', 
        'Karnataka', 
        'Kerala', 
        'Lakshadweep', 
        'Maharashtra', 
        'Manipur', 
        'Meghalaya', 
        'Mizoram', 
        'Nagaland', 
        'Odisha',
        'Puducherry',
        'Punjab',
        'Sikkim', 
        'Tamil Nadu', 
        'Telangana', 
        'Tripura', 
        'Uttarakhand', 
        'West Bengal'
    ];
    
    const categories = ['OBC(NCL)', 'GEN', 'GEN-EWS', 'SC', 'ST']; 
    const bloodGroups = ['A+','A-','AB+','AB-','O+','O-','B+','B-']; 
    const degrees = ['B.Tech', 'M.Tech', 'M.A.', 'Ph.D', 'M.Tech by Research']; 



    const defaultValues = {
        state: null,
        category: null,
        bloodGroups: null,
        degrees: null
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        const filterToApply = {
            cat: data.category,
            stat: data.state,
            bg: data.bloodGroups,
            deg: data.degrees
        }
        filterStudents(filterToApply);
        hideSidebar();
        
    };

  


  return (
    <div className="card flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column align-items-center gap-3 w-full px-1 md:px-2">
              
                <Controller
                    name="state"
                    control={control}
                    render={({ field }) => <MultiSelect id={field.name} name="state" value={field.value} options={states} onChange={(e) => field.onChange(e.value)}  placeholder="Select State"  className="w-full" display="chip"  />}
                />
               

                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect id={field.name} name="category" value={field.value} options={categories} onChange={(e) => field.onChange(e.value)} placeholder="Select Category" className="w-full" display="chip" />
                    )}
                />

                <Controller
                    name="bloodGroups"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect id={field.name} name="bloodGroups" value={field.value} options={bloodGroups} onChange={(e) => field.onChange(e.value)} placeholder="Select blood group" className="w-full" display="chip" />
                    )}
                />

                <Controller
                    name="degrees"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect id={field.name} name="degrees" value={field.value} options={degrees} onChange={(e) => field.onChange(e.value)} placeholder="Select degrees" className="w-full" display="chip" />
                    )}
                />

                <Button type="submit" label="Apply Filter" className="mt-2 w-full" />
            </form>
        </div>
  )
}

export default Filters