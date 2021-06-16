import React , {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
//antd 디자인 사용
import Dropzone from 'react-dropzone';


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
function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")

    const handleChangeTitle = (event) => {
        
        setVideoTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
         setDescription(event.currentTarget.value)
    }
    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }
    
return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title lever={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* 드랍 zone*/}
                    <Dropzone
                        onDrop
                        multiple
                        maxSize>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}>                           
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                    {/* 썸네일 */}
                </div>
                <div>
                      <img src="" alt="" /> 
                </div>
                   <br /><br/>
                <label>Title</label>
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
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default VideoUploadPage
