import { useState } from 'react';
import { initialState } from '../../../context/HotelProvider';
import styles from './hotelUpdateDialog.module.scss';
import { Button, InputForm } from 'ui';
import { updateHotel, uploadImage } from 'hotel-api';
import { HotelInfo } from 'models';
import { toast } from 'react-toastify';
interface HotelUpdate {
  dataUpdate: HotelInfo;
  setDataUpdate: any;
  reload: boolean;
  setReload: any;
  setOpenUpdate: any;
}

export const HotelUpdateDialog = ({
  dataUpdate,
  setDataUpdate,
  reload,
  setReload,
  setOpenUpdate,
}: HotelUpdate) => {
  const [image, setImage] = useState(Object);
  const handleInputUpdate = (e: any) => {
    const { name, value } = e.target;
    setDataUpdate({ ...dataUpdate, [name]: value });
  };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (image.length > 0) {
      dataUpdate.image = image;
    }
    updateHotel(dataUpdate.hotelId, dataUpdate.name, dataUpdate)
      .then((data) => {
        toast.success(data.message);
        setReload(!reload);
      })
      .catch((err) => console.error(err));
    setDataUpdate(initialState);
    setOpenUpdate(false);
  };
  const handleChangeImg = async (e: any) => {
    const img = e.target.files[0];
    setImage(img);
    const imgForm = new FormData();
    imgForm.append('image', img);
    uploadImage(imgForm)
      .then((data) => setImage(data.imageUrl))
      .catch((err) => console.error(err));
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__modal}>
        <h2>Update Hotel Information</h2>
        <Button theme="closeDialog" onClick={() => setOpenUpdate(false)}>
          x
        </Button>
        <form onSubmit={handleUpdate}>
          <div className={styles.container__formGroup}>
            <InputForm
              label="Hotel Name: "
              value={dataUpdate.name}
              name="name"
              readOnly
            />
            <InputForm
              label="Hotel Id: "
              value={dataUpdate.hotelId}
              name="hotelId"
              readOnly
            />
            <div>
              Hotel Image:
              <div>
                <img
                  src={
                    image.secureUrl
                      ? image.secureUrl
                      : dataUpdate.image && dataUpdate.image?.secureUrl
                  }
                  alt=""
                ></img>
              </div>
            </div>
            <input
              style={{ display: 'block' }}
              type="file"
              placeholder="Hotel Id"
              name="hotelId"
              onChange={() => handleChangeImg}
            />
            <br />
            <div className={styles.container__formGroup}>
              Description: <br />
              <textarea
                placeholder="Description..."
                name="descript"
                value={dataUpdate.descript}
                onChange={() => handleInputUpdate}
                cols={40}
                rows={3}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button theme="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
