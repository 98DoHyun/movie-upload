import React, { useEffect , useState,  } from 'react'
import {Row, Col, List , Avatar} from 'antd' ;
import Axios from 'axios';
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment';


function VideoDetailPage(props) {

    
    const videoId = props.match.params.videoId
    const Videovariable = {videoId : videoId}

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    
    
    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', Videovariable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.VideoDetail)
                                     
                   
                } else {
                    alert('비디오를 불러오지 못했습니다')
                }
            })

        Axios.post('/api/comment/getComments', Videovariable)
            .then(response => {
                if(response.data.success){
                    setComments(response.data.comments)
                    console.log(response.data.comments)
                }else{
                    alert("댓글정보를 가저오는대 실패했습니다 ")
                }
                
            })
    }, [])
    
        const refrershFunction = (newComment) => {
            setComments(Comments.concat(newComment))
        }
        if(VideoDetail.writer){
           const subscribeButton = VideoDetail.writer._id !== localStorage.getItem(`userId`) && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem(`userId`)}/>

        return (
            <Row>
                 <Col lg={18} xs={24}>
                     <div style={{width:'100%' , padding:'2rem 3rem' }}>
                        <video style={{ width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                         <List.Item                     
                             actions={[subscribeButton]}                  
                         >
                                 <List.Item.Meta            
                                     avatar={<Avatar src={VideoDetail.writer.image}/>}
                                     title={VideoDetail.writer.name}
                                     description={VideoDetail.description}
                                 />
                         </List.Item>
     
                        <Comment refrershFunction={refrershFunction} commentList={Comments} postId={videoId} />
                     </div>
                     </Col>   
                 <Col lg={6} xs={24}>
                     <SideVideo />
                     </Col>
             </Row> 
                 )
                
            }else{
                return(
                <div>로딩중</div>
                )
            }
         
    
    
   
     
   
}

export default VideoDetailPage
