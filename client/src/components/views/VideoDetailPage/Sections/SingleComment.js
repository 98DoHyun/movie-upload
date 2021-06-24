import React, {useState ,useEffect} from 'react'
import {Comment,Avatar,Button,Input} from 'antd';
import Axios from 'axios'

const {TextArea} = Input

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")


    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onClickOpenReply = () => {
        setOpenReply(!OpenReply)
    }

      
    const onSubmit =(event) => {
            event.preventDefault();
            
        const variables = {
        content:CommentValue,
        writer:localStorage.getItem('userId'),
        postId:props.postId,
        responseTo: props.comment._id
    }
    
       Axios.post('/api/comment/saveComment',variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setCommentValue("")
                    setOpenReply(false)
                    props.refrershFunction(response.data.result)
                }else{
                    alert("댓글 작성 오류")
                }
            })
           
    }

    const actions= [
        <span onClick={onClickOpenReply} key="comment-basic-reply-to"> 댓글 </span>
    ]

    return (
        <div>
        <Comment 
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt />}
            content={<p> {props.comment.content} </p>}
        />
{OpenReply && 
    <form style={{ display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="댓글을 입력해주세요"
               />
                <br />
                 <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>
                댓글
                 </button>
               
            </form>
             
}

    </div>
       
    )
}

export default SingleComment
