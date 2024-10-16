import React, { useState, useEffect } from 'react';
import UserTable from "./UserTable";
import axios from 'axios';
import Moment from 'moment';

export default function ManageUsers(){
  const [data, setData] = useState([]);
  const columns = [{
    Header: 'Avatar',
    accessor: 'useravatar_url',
    Cell: ({ cell: { value } }) => <img height={30} src={value}/>
  }
  ,{ //displays as an image instead of string
    Header: 'E-Mail',  
    accessor: 'useremail_reg'
   }
   ,{  
    Header: 'Username',  
    accessor: 'username_reg'
    } 
   ,{
    Header: 'Gender',  
    accessor: 'usergender_reg'
   },
   {
    Header: 'Year Level',  
    accessor: 'useryear_reg'
   },
   {
    Header: 'CCIS Program',  
    accessor: 'userprogram_reg'
   },
   {  
    Header: 'Confirm Status',  
    accessor: 'confirmed'
    }
    ,{  
      Header: 'Code',  
      accessor: 'code'
  },
  {
    Header: 'Created on',  
    accessor: 'user_created',
    Cell: ({ cell: { value } }) => Moment(value).format('MM-DD-YY')
   }]
  //Gather UserData
  useEffect(() => {
    (async () => {
      const result = await axios(`${process.env.REACT_APP_API_URL}/api/get`);
      setData(result.data);
    })();
  }, []);
  if(localStorage.getItem("adminusername")){
    return (
      <div className="DashboardPage">
        <div className="BackendPage">
          <h1 className="siteTitle">User Management</h1>
          <UserTable columns={columns} data={data}/>
        </div>
      </div>)
  }
  else window.location.href = "/admin";
}
