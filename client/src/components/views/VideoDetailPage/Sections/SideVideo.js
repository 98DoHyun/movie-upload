import React,{useEffect, useState} from 'react'
import Axios from 'axios'


function SideVideo() {

    const [sideVideo, setsideVideo] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getvideos')
            .then(response => {
                if (response.data.success) {
                    setsideVideo(response.data.videos)
                  
                } else {
                    alert('비디오를 불러오지 못했습니다')
                }
            })
    }, [])
     const renderSideVideo = sideVideo.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

         return  <div key={index} style={{ display:'flex', marginBottm:'1rem', padding:'0 2rem'}}>
         <div style={{width:'100%', height:'100%', marginRight:'1rem',marginTop:'0.2rem'}}>
         <a href ={`/video/${video._id}`}>
             <img style={{width:'100%', height:'100%'}} src={`http://localhost:5000/${video.thumbnil}`}alt="썸네일" />
         </a>                
         </div>
         <div style={{width:'100%',marginTop:'0.1rem',padding:'0.2rem', fontSize: '0.7rem'}}>
             <a href ={`/video/${video._id}`} style={{color:'gray'}}>
                 <span style={{  color: 'black' }}>{video.title}</span><br />
                 <span>{video.writer.name}</span> <br />
                 <span>{video.views}</span><br />
                 <span>{minutes} : {seconds}</span>
             </a>
         </div>
     </div>
     })
    return (

        <React.Fragment>
            <div style={{marginTop:'3rem'}} />
                {renderSideVideo}
        </React.Fragment>
       
    )
}

export default SideVideo
