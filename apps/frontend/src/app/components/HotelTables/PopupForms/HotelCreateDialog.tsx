import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { initialState } from '../../../context/HotelProvider';
import styles from './hotelCreateDialog.module.scss';
import { Button, InputForm } from 'libs/fe/ui/src/lib/ui';

interface HotelCreate {
  formData: any;
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

  const handleCreate = async (e: any) => {
    e.preventDefault();
    formData = { ...formData, image };

    await axios
      .post('http://localhost:3000/api/hotel', formData)
      .then((data) => {
        data.data.data.type === 'error'
          ? toast.error(data.data.message)
          : toast.success(data.data.message);
        setReload(!reload);
      })
      .catch((err) => console.error(err));
    setFormData(initialState);
    setOpenCreate(false);
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
        <Button theme="closeDialogCss" onClick={() => setOpenCreate(false)}>
          x
        </Button>
        <div>
          <h2>Create Hotel Information</h2>
          <form onSubmit={handleCreate}>
            <div>
              <InputForm
                required
                placeholder="Hotel Name"
                name="name"
                value={formData.name}
                onChange={handleInputCreate}
              >
                Name:
              </InputForm>

              <InputForm
                required
                placeholder="Hotel Id"
                name="hotelId"
                value={formData.hotelId}
                onChange={handleInputCreate}
              >
                Hotel ID:
              </InputForm>

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
              <Button theme="submitBtnCss">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
