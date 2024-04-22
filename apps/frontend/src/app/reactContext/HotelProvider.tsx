
import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
interface HotelInfo {
  name: string;
  hotelId: string;
  descript: string;
  image: {secureUrl:string,publicId:string}; 
}

interface HotelContextType {
  hotelInfoList: HotelInfo[];
  setHotelInfoList: (info: HotelInfo[]) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reload, setReload] = useState(false);
  const [hotelInfoList, setHotelInfoList] = useState<HotelInfo[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      await axios
        .get('http://localhost:3000/api/hotel')
        .then(({data}: {data: HotelInfo[] }) => {
          
          setHotelInfoList(data)
        })
        .catch((err) => console.log(err));
    };
    fetchApi();
  }, [reload]);
  return (
    <HotelContext.Provider value={{ hotelInfoList,  setHotelInfoList}}>
      {children}
    </HotelContext.Provider>
  );
};
export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotelContext must be used within a HotelProvider');
  }
  return context;
};