import Axios from 'axios'
import React, {useEffect, useState} from 'react'

function Subercibe(props) {
const [SubscribeNumber, setSubscribeNumber] = useState(0)
 const [Subscribed, setSubscribed] = useState(false)
    useEffect(() => {

        let variable = {userTo: props.userTo }
            
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if(response.data.success){
                setSubscribeNumber(response.data.subscribeNumber)
                
            }else{
                alert('구독자 수 오류')
            }
        })
        let subscribedVariable = {userTo: props.userTo, userFrom:localStorage.getItem('userId') }

        Axios.post('/api/subscribe/subscribed',subscribedVariable )
            .then(response => {
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                   
                }else{
                    alert("구독자 정보 오류")
                }
            })

    }, [])

    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if(Subscribed) {

            Axios.post('/api/subscribe/unSubscribe' ,subscribedVariable)
            .then(response => {
              if(response.data.success){
                    setSubscribeNumber(SubscribeNumber -1)
                    setSubscribed(!Subscribed)
                    console.log(subscribedVariable)
               } else {
                alert("구독취소 오류 발생")
            }
          })

        } else {          
                Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success){
                    setSubscribeNumber(SubscribeNumber +1)
                    setSubscribed(!Subscribed)
                    
                } else {
                    alert("구독취소 오류 발생")
                }
            })
        }
        
    }


    return (
        <div>
           
           <button
                 onClick={onSubscribe} 
                style={{ backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000' }`,
                borderRadius:'4px', 
                color:'white',padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'
             }}
           
           >
            {SubscribeNumber} {Subscribed ? '구독중' : '구독'}
           
           </button>
        </div>
    )
}

export default Subercibe
