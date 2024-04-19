// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './app.module.css';
export function App() {
  type DataUpdate = {
    name: string;
    hotelId: string;
    descript: string;
    image?: { secureUrl: string; publicId: string };
  };
  const initialState: DataUpdate = {
    name: '',
    hotelId: '',
    descript: '',
    image: undefined,
  };
  const [image, setImage] = useState(Object);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  let [formData, setFormData] = useState(initialState);
  const [dataUpdate, setDataUpdate] = useState(initialState);

  useEffect(() => {
    const fetchApi = async () => {
      await axios
        .get('http://localhost:3000/api/hotel')
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    };
    fetchApi();
  }, [reload]);
  const handleDeleteHotel = async (item: any) => {
    if (!item) return;
    if (window.confirm(`Do you want to delete ${item.name} hotel?`)) {
      await axios
        .delete(`http://localhost:3000/api/${item.hotelId}/${item.name}`)
        .then((data) => {
          console.log(data), setReload(!reload);
        })
        .catch((err) => console.log(err));
    } else return;
  };
  const handleDeleteImage = async (publicId: string, item: any) => {
    const { image, ...dataUpdate } = item;
    if (window.confirm(`Do you want to delete this image?`)) {
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/delete/hotel',
        publicId
      );
      await axios
        .put(
          `http://localhost:3000/api/${dataUpdate.hotelId}/${dataUpdate.name}`,
          dataUpdate
        )
        .then((data) => {
          console.log(data), setReload(!reload);
        })
        .catch((err) => console.log(err));
      setReload(!reload);
      return response.data.message;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
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
        console.log(data), setReload(!reload);
      })
      .catch((err) => console.log(err));
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
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    dataUpdate.image = imageUpdate;
    await axios
      .put(
        `http://localhost:3000/api/${dataUpdate.hotelId}/${dataUpdate.name}`,
        dataUpdate
      )
      .then((data) => {
        console.log(data), setReload(!reload);
      })
      .catch((err) => console.log(err));
    setDataUpdate(initialState);
    setOpenUpdate(false);
  };

  interface ImageUpdateState {
    secureUrl: string;
    publicId: string;
  }
  const [imageUpdate, setImageUpdate] = useState<ImageUpdateState>({
    secureUrl: '',
    publicId: '',
  });
  const handleInputUpdate = (e: any) => {
    const { name, value } = e.target;
    setDataUpdate({ ...dataUpdate, [name]: value });
  };
  if (!data) {
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
          <form onSubmit={handleCreate}>
            <div style={{ display: 'block', padding: '10px' }}>
              <div>
                <div style={{ paddingBottom: '10px' }}>
                  Name:
                  <input
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
            <div
              style={{
                display: 'block',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                paddingTop: '20px',
              }}
            >
              <button
                type="submit"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  marginLeft: '10px',
                }}
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>

      <div>
        {openUpdate && (
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'block' }}>
              <div style={{ paddingBottom: '10px' }}>
                Hotel Name:
                <input
                  type="text"
                  readOnly
                  placeholder="Hotel Name"
                  name="name"
                  value={dataUpdate.name}
                  style={{ display: 'block' }}
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
                  style={{ display: 'block' }}
                />
              </div>
              <div style={{ display: 'block' }}>
                Hotel Image:
                <div>
                  <img
                    src={
                      imageUpdate.secureUrl === ''
                        ? dataUpdate.image?.secureUrl
                        : imageUpdate.secureUrl
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
              <div>
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
            <div
              style={{
                display: 'block',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                paddingTop: '20px',
              }}
            >
              <button
                type="submit"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  marginLeft: '10px',
                }}
              >
                Update
              </button>
            </div>
          </form>
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
        {data.map((item, index) => (
          <tbody key={index}>
            <tr>
              <td>{item.hotelId}</td>
              <td>{item.name}</td>
              <td>{item.descript}</td>
              <td>
                {item.image && (
                  <td>
                    <span
                      style={{
                        color: '#aaa',
                        float: 'right',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        paddingLeft: '5px',
                      }}
                      onClick={() => {
                        handleDeleteImage(item.image?.publicId, item);
                      }}
                    >
                      &times;
                    </span>
                    <img src={item.image.secureUrl} alt="" />
                  </td>
                )}
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
                    handleDeleteHotel(item);
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

export default App;
