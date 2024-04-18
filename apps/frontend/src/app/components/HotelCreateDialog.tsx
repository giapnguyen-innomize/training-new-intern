import axios from 'axios';
import { useState } from 'react';
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
  const initialState = {
    name: '',
    hotelId: '',
    descript: '',
    image: '',
  };
  const [image,setImage]=useState('')
  const handleInputCreate = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleCreate = async (e: any) => {
    e.preventDefault();
    await axios
      .post('http://localhost:3000/api/hotel',formData)
      .then((data) => {
        console.log(data), setReload(!reload);
      })
      .catch((err) => console.log(err));
    setFormData(initialState);
    setOpenCreate(false);
  };
  const handleChangeImg = async (e: any) => {
    const img= e.target.files[0];
    setImage(img)
    const imgForm = new FormData();
    imgForm.append('image',img);
    try {
        const response = await axios.post('http://localhost:3000/api/upload', imgForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Image uploaded:', response.data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }

  };
  const handleUpload = async () => {
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
          width: '80%',
          display:"ruby-text",
          maxWidth: '800px',
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
          onClick={() => setOpenCreate(false)}
        >
          &times;
        </span>
        <div>
          <h2>Create Hotel Information</h2>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'block', padding: '10px' }}>
              <div>
                <div style={{paddingBottom:"10px"}}>
                  Name:
                  <input
                    style={{ display: 'block'}}
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
                Hotel's Image: <br/>
                <input type="file" name="image" onChange={handleChangeImg} />
                <div style={{paddingTop:"10px"}}>
                Description:<br/>
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
        </div>
      </div>
    </div>
  );
};
