import { useState } from 'react';
import { toast } from 'react-toastify';
import { createHotel, uploadImage } from 'hotel-api';
import { initialState } from '../../../context/HotelProvider';
import { HotelInfo } from 'models';
import styles from './hotelCreateDialog.module.scss';
import { Button, InputForm } from 'ui';

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
        <Button theme="closeDialog" onClick={() => setOpenCreate(false)}>
          x
        </Button>
        <div>
          <h2>Create Hotel Information</h2>
          <form onSubmit={handleCreate}>
            <div>
              <InputForm
                label="Name:"
                required
                placeholder="Hotel Name"
                name="name"
                value={formData.name}
                onChange={handleInputCreate}
              />
              <InputForm
                label="Hotel ID:"
                required
                placeholder="Hotel Id"
                name="hotelId"
                value={formData.hotelId}
                onChange={handleInputCreate}
              />

              <div>
                Hotel's Image:
                <img src={image && image.secureUrl} />
                <input type="file" name="image" onChange={handleChangeImg} />
              </div>
              <div>
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
            <div>
              <Button theme="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
