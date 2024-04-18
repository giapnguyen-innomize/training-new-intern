import axios from 'axios';
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
  const initialState = {
    name: '',
    hotelId: '',
    descript: '',
    image: '',
  };
  console.log({ dataUpdate });
  const handleInputUpdate = (e: any) => {
    const { name, value } = e.target;
    setDataUpdate({ ...dataUpdate, [name]: value });
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

  return (
    <div
      style={{
        display: 'block',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          backgroundColor: '#fefefe',
          margin: '15% auto',
          padding: '50px',
          border: '1px solid #888',
          width: '95%',
          display:"ruby-text",
          maxWidth: '500px',
        }}
      >
        <span
          style={{
            color: '#aaa',
            float: 'right',
            fontSize: '25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            paddingLeft: '5px',
          }}
          onClick={() => setOpenUpdate(false)}
        >
          &times;
        </span>
        <h2>Update Hotel Information</h2>
        <form onSubmit={handleUpdate}>
          <div style={{ display: 'block'}}>
            <div style={{paddingBottom:"10px"}}>
              Hotel Name:
              <input
                type="text"
                readOnly
                placeholder="Hotel Name"
                name="name"
                value={dataUpdate.name}
                style={{ display: 'block'}}
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
            <br/>
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
            {' '}
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
      </div>
    </div>
  );
};
