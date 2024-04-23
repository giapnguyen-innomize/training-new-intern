import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface Image {
  secureUrl: string;
  publicId: string;
}
interface HotelInfo {
  name: string;
  hotelId: string;
  descript: string;
  image: Image;
}
interface HotelContextType {
  hotelInfoList: HotelInfo[];
  setHotelInfoList: (info: HotelInfo[]) => void;
  reload: boolean;
  setReload: (el: boolean) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);
export const initialState = {
  name: '',
  hotelId: '',
  descript: '',
  image: {},
};

export const HotelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reload, setReload] = useState(false);
  const [hotelInfoList, setHotelInfoList] = useState<HotelInfo[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      await axios
        .get('http://localhost:3000/api/hotel')
        .then(({ data }: { data: HotelInfo[] }) => {
          setHotelInfoList(data);
        })
        .catch((error) => console.error);
    };
    fetchApi();
  }, [reload]);
  return (
    <HotelContext.Provider
      value={{ hotelInfoList, setHotelInfoList, reload, setReload }}
    >
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
