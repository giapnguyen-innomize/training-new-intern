// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './app.module.css';
export function App() {
  const initialState = {
    name: '',
    hotelId: '',
    descript: '',
    image: '',
  };
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialState);
  const [dataUpdate, setDataUpdate] = useState(initialState);
  const [uploadImg,setUploadImg]=useState<{}|undefined>(undefined)

  useEffect(() => {
    const fetchApi = async () => {
      await axios
        .get('http://localhost:3000/api/hotel')
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    };
    fetchApi();
  }, [reload]);

  const handleInputCreate = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputUpdate = (e: any) => {
    const { name, value } = e.target;
    setDataUpdate({ ...dataUpdate, [name]: value });
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await axios
      .post('http://localhost:3000/api/hotel', formData)
      .then((data) => {
        console.log(data), setReload(!reload);
      })
      .catch((err) => console.log(err));
    setFormData(initialState);
    setOpenCreate(false);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
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

  const handleDelete = async (item: any) => {
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
  const handleUploadImg =async (e:any)=>{
    console.log('upload')
  }
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
      {openCreate === true ? (
        <form onSubmit={handleCreate}>
          <div style={{ display: 'block', padding: '10px' }}>
            <div>
              <input
                type="text"
                placeholder="Hotel Name"
                name="name"
                value={formData.name}
                onChange={handleInputCreate}
              />
              <input
                type="text"
                placeholder="Hotel Id"
                name="hotelId"
                value={formData.hotelId}
                onChange={handleInputCreate}
              /><br/>Hotel's Image:
              <input
                type="file"
                name="image"
                onChange={handleUploadImg}
            />
            </div>
            <textarea
              name="descript"
              placeholder="Description..."
              value={formData.descript}
              onChange={handleInputCreate}
              cols={45}
            ></textarea>
            <div style={{ padding: '10px' }}>
              <button type="submit">Create</button>
            </div>
          </div>
        </form>
      ) : null}
      {openUpdate && (
        <form onSubmit={handleUpdate}>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              readOnly
              placeholder="Hotel Name"
              name="name"
              value={dataUpdate.name}
            />
            <input
              type="text"
              readOnly
              placeholder="Hotel Id"
              name="hotelId"
              value={dataUpdate.hotelId}
            />
            <textarea
              placeholder="Description..."
              name="descript"
              value={dataUpdate.descript}
              onChange={handleInputUpdate}
            />
            <button type="submit">Update</button>
          </div>
        </form>
      )}
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
              <td>{item.image}</td>
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

export default App;
