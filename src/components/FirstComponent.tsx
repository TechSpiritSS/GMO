import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FirstComponent: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Define columns for the Data Grid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'body', headerName: 'Body', flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} checkboxSelection />
    </div>
  );
};

export default FirstComponent;
