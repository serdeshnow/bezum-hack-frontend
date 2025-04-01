import axios from 'axios';
import { useState } from 'react';

export interface Tech {
  id: number;
  name: string;
  img: string;
}

export const useTechnologies = () => {
  const [techs, setTechs] = useState<Tech[]>();

  const fetchTechnologies = async () => {
    const response = await axios.get('http://212.193.26.64/api/items', {
      withCredentials: true,
    });
    console.log('response');
    // const response = await axios.get('http://localhost:8080/items');
    const data = await response.data;
    console.table('response data:', data);
    setTechs(data);
  };

  return {
    techs,
    fetchTechnologies,
  };
};
