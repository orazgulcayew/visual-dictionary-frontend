import { useEffect } from 'react';
import { useState } from 'react';
import './home.css'
import Navbar from '../../components/navbar/Navbar';
import DoneIcon from '@mui/icons-material/Done'
import axios from 'axios'

const Home = () => {


  const [data, setData] = useState({
    english: '',
    turkmen: '',
    enTrans: '',
    tmTrans: '',
    img: '',

  })
  const [enAudio, enSetAudio] = useState()
  const [tmAudio, tmSetAudio] = useState()
  const [audio, setAudio] = useState()
  const [img,setImg] = useState()


  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const newWord = {
      ...data,
      enAudio: enAudio,
      tmAudio: tmAudio,
      img:img.name
    }
    console.log(newWord)
    try {
      await axios.post('http://localhost:8080/api/v1/words', newWord)
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    const formData = new FormData();

    formData.append('tmAudio', tmAudio);
    formData.append('enAudio', enAudio)
    formData.append('img', img)
    console.log(formData)
    try {
      await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (err) {
      console.log(err)
    }


  }
  return (
    <div className='home'>
      <Navbar />
      <div className="homeWrapper">
        <div className="newContainer">
          <p className="inputTitle">Add New Word</p>
          <form onSubmit={handleClick} method='post' className='form'>
            <div className="lang">
              <p className="en">English</p>
              <p className="tm">Turkmen</p>
            </div>
            <div className="top">
              
              <div className="leftSide">
                <div className="items">
                  <label>English</label>
                  <input type="text" className='input' id='english' onChange={handleChange} />
                </div>
                <div className="items">
                  <label>Transcription En</label>
                  <textarea type="text" className='input' id='enTrans' onChange={handleChange} />
                </div>
                <div className="files">
                  <label htmlFor='en' className='sayla' >Ses sayla(EN)</label>
                  <input type="file" id='en' style={{ display: "none" }} name='file' onChange={(e) => enSetAudio(e.target.files[0])} />
                  <span >{enAudio ? <DoneIcon /> : ''}</span>
                </div>
              </div>
              <div className="line"></div>
              <div className="leftSide">
                <div className="items">
                  <label>Turkmen</label>
                  <input type="text" className='input' id='turkmen' onChange={handleChange} />
                </div>
                <div className="items">
                  <label>Transcription Tm</label>
                  <textarea type="text" className='input' id='tmTrans' onChange={handleChange} />
                </div>
                <div className="files">
                  <label htmlFor='tm' className='sayla'>Ses sayla(TM)</label>
                  <input type="file" id='tm' style={{ display: "none" }} accept='.mp3' name='file' onChange={(e) => tmSetAudio(e.target.files[0])} />
                  <span >{tmAudio ? <DoneIcon /> : ''}</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <input type="file" onChange={(e)=>setImg(e.target.files[0])}/>
              <div className="items">
                <label >Category</label>
                <select id="category" className='select' >
                  <option value='j'>Animals</option>
                  <option value='j'>Food</option>
                  <option value='j'>Verb</option>
                  <option value='j'>Noun</option>
                </select>
              </div>
              <button className='btn' type='submit'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home;