import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { HotelInfo } from 'models';
import { getAllHotels } from 'hotel-api';

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
    const fetchApi = () => {
      getAllHotels()
        .then((data: HotelInfo[]) => {
          setHotelInfoList(data);
        })
        .catch((error) => console.error(error));
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
