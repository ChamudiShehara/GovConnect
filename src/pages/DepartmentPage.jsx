import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartment } from '../api/departments';

const DepartmentPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      const data = await getDepartment(id);
      setDepartment(data);
    };

    fetchDepartment();
  }, [id]);

  if (!department) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{department.name}</h1>
      {/* ...existing code... */}
    </div>
  );
};

export default DepartmentPage;