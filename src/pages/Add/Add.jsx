

const Add = () =>{
   const PF = 'http://localhost:8080/audio/1646931807_jelil-kelle-dali-2022.mp3'
   const img = 'http://localhost:8080/audio/about-info.jpg'
   return(
      <div className="add">
        <audio src={PF}></audio>
        <img src={img} alt="" />
      </div>
   )
}

export default Add;