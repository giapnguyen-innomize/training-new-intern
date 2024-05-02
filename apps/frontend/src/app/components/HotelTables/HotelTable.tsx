// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import { HotelUpdateDialog } from './PopupForms/HotelUpdateDialog';
import { HotelCreateDialog } from './PopupForms/HotelCreateDialog';
import { useHotelContext } from '../../context/HotelProvider';
import styles from './hotel.module.scss';
import { Button } from 'ui';
import { HotelInfo } from 'models';
import { deleteHotel, deleteImage } from 'hotel-api';
import styles from '../../app.module.css';
import { toast } from 'react-toastify';
const initialState: HotelInfo = {
  name: '',
  hotelId: '',
  descript: '',
  image: { secureUrl: '', publicId: '' },
};

export function HotelTable() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState<HotelInfo>(initialState);
  const [dataUpdate, setDataUpdate] = useState<HotelInfo>(initialState);
  const { hotelInfoList, reload, setReload } = useHotelContext();

  const handleDelete = async (item: HotelInfo) => {
    if (!item) return;
    if (window.confirm(`Do you want to delete ${item.name} hotel?`)) {
      deleteHotel(item.name, item.hotelId)
        .then((data) => {
          toast.success(data.message);
          setReload(!reload);
        })
        .catch((err) => console.error(err));
    }
  };
  const handleDeleteImage = (publicId: string, item: HotelInfo) => {
    if (window.confirm('Do you want delete this image')) {
      const { image, ...dataUpdate } = item;
      deleteImage(publicId, dataUpdate).catch((err) =>
        console.error('Delete image error:', err)
      );
      setReload(!reload);
    }
  };

  if (!hotelInfoList) {
    return;
  }

  return (
    <div className={styles.container}>
      <Button onClick={() => setOpenCreate((pre) => !pre)} theme="create">
        Add new hotel
      </Button>
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
      <table className={styles.container__table}>
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
                    className={styles.container__deleteBtn}
                    style={{ marginLeft: '275px' }}
                    onClick={() =>
                      item.image &&
                      handleDeleteImage(item.image?.publicId, item)
                    }
                  >
                    x
                  </button>
                )}
                <img src={item?.image?.secureUrl} alt=""></img>
              </td>
              <td>
                <Button
                  onClick={() => {
                    setDataUpdate(item);
                    setOpenUpdate(true);
                  }}
                  theme="update"
                >
                  Update
                </Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(item)} theme="delete">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default HotelTable;
