// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import axios from 'axios';
import styles from '../../app.module.css';
import { HotelUpdateDialog } from './PopupForms/HotelUpdateDialog';
import { HotelCreateDialog } from './PopupForms/HotelCreateDialog';
import { useHotelContext } from '../../context/HotelProvider';

const initialState = {
  name: '',
  hotelId: '',
  descript: '',
  image: {},
};
interface Image {
  secureUrl: string;
  publicId: string;
}
interface Item {
  name: string;
  hotelId: string;
  descript?: string;
  image?: Image;
}

export function HotelTable() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialState);
  const [dataUpdate, setDataUpdate] = useState(initialState);
  const { hotelInfoList, reload, setReload } = useHotelContext();
  const handleDelete = async (item: any) => {
    if (!item) return;
    if (window.confirm(`Do you want to delete ${item.name} hotel?`)) {
      await axios
        .delete(`http://localhost:3000/api/${item.hotelId}/${item.name}`)
        .then((data) => {
          setReload(!reload);
        })
        .catch((err) => console.error);
    } else return;
  };
  const handleDeleteImage = async (publicId: string, item: Item) => {
    if (window.confirm('Do you want delete this image')) {
      const { image, ...dataUpdate } = item;
      try {
        const res = await axios.post(`http://localhost:3000/api/delete/image`, {
          publicId,
        });
        await axios
          .put(
            `http://localhost:3000/api/${dataUpdate.hotelId}/${dataUpdate.name}`,
            dataUpdate
          )
          .then((data) => {
            setReload(!reload);
          })
          .catch((err) => console.error);
        setReload(!reload);
      } catch (error) {
       console.error
      }
    }
  };
  if (!hotelInfoList) {
    return;
  }
  return (
    <div className={styles.container}>
      <button
        style={{
          width: '120px',
          height: '50px',
          border: 'solid 1px',
          backgroundColor: '#f2f2f2',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
        onClick={() => setOpenCreate((pre) => !pre)}
      >
        Add new hotel
      </button>
      <div>
        {openCreate && (
          <HotelCreateDialog
            formData={formData}
            setFormData={setFormData}
            reload={reload}
            setReload={setReload}
            setOpenCreate={setOpenCreate}
            
          />
        )}
      </div>

      <div>
        {openUpdate && (
          <HotelUpdateDialog
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            reload={reload}
            setReload={setReload}
            setOpenUpdate={setOpenUpdate}
          />
        )}
      </div>
      <h1 className={styles.h1}>Hotel Information</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Hotel Id</th>
            <th>Hotel Name</th>
            <th>Description</th>
            <th>Images</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        {hotelInfoList.map((item, index) => (
          <tbody key={index}>
            <tr>
              <td>{item.hotelId}</td>
              <td>{item.name}</td>
              <td>{item.descript}</td>
              <td>
                {item?.image?.secureUrl && (
                  <button
                    style={{
                      marginLeft: '240px',
                      backgroundColor: 'smoke',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDeleteImage(item.image.publicId, item)}
                  >
                    delete
                  </button>
                )}
                <img src={item?.image?.secureUrl}></img>
              </td>
              <td>
                <button
                  onClick={() => {
                    setDataUpdate(item);
                    setOpenUpdate(true);
                  }}
                >
                  update
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(item);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default HotelTable;
