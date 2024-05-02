import { useState } from 'react';
import { toast } from 'react-toastify';
import { createHotel, uploadImage } from 'hotel-api';
import { initialState } from '../../../context/HotelProvider';
import { HotelInfo } from 'models';
import styles from './hotelCreateDialog.module.scss';

interface HotelCreate {
  formData: HotelInfo;
  setFormData: any;
  reload: boolean;
  setReload: any;
  setOpenCreate: any;
}

export const HotelCreateDialog = ({
  formData,
  setFormData,
  reload,
  setReload,
  setOpenCreate,
}: HotelCreate) => {
  const [image, setImage] = useState(Object);
  const handleInputCreate = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCreate = (e: any) => {
    e.preventDefault();
    formData = { ...formData, image };
    createHotel(formData)
      .then((data) => {
        setReload(!reload);
        data.data.type === 'error'
          ? toast.error(data.data.message)
          : toast.success(data.data.message);
      })
      .catch((err) => console.error(err));
    setFormData(initialState);
    setOpenCreate(false);
  };

  const handleChangeImg = (e: any) => {
    const img = e.target.files[0];
    setImage(img);
    const imgForm = new FormData();
    imgForm.append('image', img);
    uploadImage(imgForm)
      .then((data) => setImage(data.imageUrl))
      .catch((error) => console.error('Error uploading image:', error));
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__modal}>
        <span
          className={styles.container__closeBtn}
          onClick={() => setOpenCreate(false)}
        >
          &times;
        </span>
        <div>
          <h2>Create Hotel Information</h2>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'block', padding: '10px' }}>
              <div>
                <div style={{ paddingBottom: '10px' }}>
                  Name:
                  <input
                    required
                    style={{ display: 'block' }}
                    type="text"
                    placeholder="Hotel Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputCreate}
                  />
                </div>
                <div>
                  Hotel ID:
                  <input
                    required
                    style={{ display: 'block' }}
                    type="text"
                    placeholder="Hotel Id"
                    name="hotelId"
                    value={formData.hotelId}
                    onChange={handleInputCreate}
                  />
                </div>
                <br />
                Hotel's Image: <br />
                <img src={image && image.secureUrl} />
                <input type="file" name="image" onChange={handleChangeImg} />
                <div style={{ paddingTop: '10px' }}>
                  Description:
                  <br />
                  <textarea
                    name="descript"
                    placeholder="Description..."
                    value={formData.descript}
                    onChange={handleInputCreate}
                    cols={45}
                  ></textarea>
                </div>
              </div>
            </div>
            <div style={{ alignItems: 'center', textAlign: 'center' }}>
              <button type="submit" className={styles.container__createBtn}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
