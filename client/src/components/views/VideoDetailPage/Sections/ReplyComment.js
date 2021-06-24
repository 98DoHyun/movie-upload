import React,{useState,useEffect} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildcCommentNumber, setChildcCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0
        props.commentList.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber ++
            }
        })
        setChildcCommentNumber(commentNumber)
    }, [props.commentList])
const renderReplyComment = (parentCommentId) => 
    props.commentList.map((comment, index) => (
            <React.Fragment>
            {
            comment.responseTo === parentCommentId && 
            <div style={{width:'80%', marginLeft:'40px'}}>
        <SingleComment refrershFunction={props.refrershFunction} comment={comment} postId={props.videoId}/>
        <ReplyComment commentList={props.commentList} postId={props.videoId} parentCommentId={comment._id} refrershFunction={props.refrershFunction} />
        </div> 
            }
    </React.Fragment>
    ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    return (
        <div>
            {ChildcCommentNumber > 0 && 
            <p style ={{ fontSize:'14px', margin:'0',color:'gray'}} onClick={handleChange}>{ChildcCommentNumber}개의 답글보기</p>
            }  
            {OpenReplyComments &&
              renderReplyComment(props.parentCommentId)
            }       
          
        </div>
    ) 
}

export default ReplyComment
