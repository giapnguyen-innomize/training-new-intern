// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './app.module.css';
import { HotelUpdateDialog } from './components/HotelUpdateDialog';
import { HotelCreateDialog } from './components/HotelCreateDialog';
export function App() {
  const initialState = {
    name: '',
    hotelId: '',
    descript: '',
    image: '',
  };
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialState);
  const [dataUpdate, setDataUpdate] = useState(initialState);
  const [uploadImg, setUploadImg] = useState<{} | undefined>(undefined);

  useEffect(() => {
    const fetchApi = async () => {
      await axios
        .get('http://localhost:3000/api/hotel')
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    };
    fetchApi();
  }, [reload]);
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
          ></HotelUpdateDialog>
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
