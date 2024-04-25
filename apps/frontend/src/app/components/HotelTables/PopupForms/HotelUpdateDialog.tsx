import axios from 'axios';
import { useState } from 'react';
import { initialState } from '../../../context/HotelProvider';
import styles from './hotelUpdateDialog.module.scss';

interface HotelUpdate {
  dataUpdate: any;
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
    dataUpdate.image = image;
    await axios
      .put(
        `http://localhost:3000/api/${dataUpdate.hotelId}/${dataUpdate.name}`,
        dataUpdate
      )
      .then((data) => {
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
    try {
      const response = await axios.post(
        'http://localhost:3000/api/upload',
        imgForm,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__modal}>
        <h2>Update Hotel Information</h2>
        <span
          className={styles.container__close_Btn}
          onClick={() => setOpenUpdate(false)}
        >
          &times;
        </span>

        <form onSubmit={handleUpdate}>
          <div className={styles.container__formGroup}>
            <div>
              Hotel Name:
              <input
                type="text"
                readOnly
                placeholder="Hotel Name"
                name="name"
                value={dataUpdate.name}
              />
            </div>
            <div>
              Hotel ID:
              <input
                type="text"
                readOnly
                placeholder="Hotel Id"
                name="hotelId"
                value={dataUpdate.hotelId}
              />
            </div>
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
              onChange={handleChangeImg}
            />
            <br />
            <div className={styles.container__formGroup}>
              Description: <br />
              <textarea
                placeholder="Description..."
                name="descript"
                value={dataUpdate.descript}
                onChange={handleInputUpdate}
                cols={40}
                rows={3}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className={styles.container__submitButton}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
