import React , {useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
//antd 디자인 사용
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from "react-redux";


const { TextArea } = Input;
const { Title } = Typography; 

const PrivateOption = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]
const CatogoryOption = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
 ]
function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const handleChangeTitle = (e) => {
        
        setVideoTitle(e.currentTarget.value)
    }

    const handleChangeDecsription = (e) => {
         setDescription(e.currentTarget.value)
    }
    const handleChangeOne = (e) => {
        setPrivacy(e.currentTarget.value)
    }

    const handleChangeTwo = (e) => {
        setCategories(e.currentTarget.value)
    }
    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                        console.log(response.data)

                           let variable = {
                             url:response.data.url,
                             fileName:response.data.filename
                           }
                  
                   setFilePath(response.data.url)
            Axios.post('/api/video/thumbnail', variable).then(response => {
                            if(response.data.success){
                               
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                                console.log(response.data)
                                console.log(response.data.url)    
                            }else {
                                alert('썸네일 생성 실패')
                            }
                        })

                } else {
                    alert('비디오 업로드 실패')
                }
            })

    }
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Privacy,
            filePath: FilePath,
            category: Categories,       
            duration: Duration,
            thumbnil: ThumbnailPath,
        }
        Axios.post('/api/video/uploadVideo', variables).then(response => {
            if(response.data.success) {
                message.success('성공적으로 업로드 했습니댜.')
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);
                
            }else {
                alert('비디오 업로드 실패.')
            }
        })
    }
return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title lever={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* 드랍 zone*/}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={8000000}
                      >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}>                           
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                    {/* Thumbnaill*/}
           {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="썸네일" />
                        </div>
                    }

                </div>
           
                   <br /><br/>
                <label>VideoTitle</label>
                <Input  
                    onChange={handleChangeTitle}
                    value={VideoTitle}
                />
                 <br /> <br />
                <label>Description</label>
                <TextArea 
                    onChange={handleChangeDecsription}
                    value={Description}
                />
                <br /><br />
                <select onChange={handleChangeOne}>
                        {PrivateOption.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}              
                </select> 
                <br /><br />
                <select onChange={handleChangeTwo}>
                    {CatogoryOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}                   
                </select> 
                <br /><br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default VideoUploadPage
