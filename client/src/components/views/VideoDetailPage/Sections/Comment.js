import Axios from 'axios'
import React,{useEffect, useState} from 'react'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {

    const videoId = props.postId
   
    const [commentValue, setcommentValue] = useState("")
    const handClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const variables = {
        content:commentValue,
        writer:localStorage.getItem('userId'),
        postId:videoId
    }

    const onSubmit =(event) => {
        event.preventDefault();
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
                setcommentValue("")
                props.refrershFunction(response.data.result)
            }else{
                alert("댓글 작성 오류")
            }
        })

    }

    return (
       <div>
            <br />
            <p>댓글</p>
            <hr />

            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment refrershFunction={props.refrershFunction} comment={comment} postId={videoId}/>
                        <ReplyComment parentCommentId={comment._id} postId={videoId} commentList={props.commentList} refrershFunction={props.refrershFunction}/>
                    </React.Fragment>
                    )
                     
             ))}

           
            


            <form style={{ display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handClick}
                    value={commentValue}
                    placeholder="댓글을 입력해주세요"
               />
                <br />
                 <button
                    style={{width:'20%', height:'52px'}}
                    onClick={onSubmit}
                >
                댓글
                 </button>
               
            </form>
       </div>
    )
}

export default Comment
