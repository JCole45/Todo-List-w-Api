import React from 'react'
import { Alert } from 'antd';


const Message = ({message, type}) => {
    return (
        <div style={{margin: "0 auto", width: "50%"}}> 
            <Alert message={message} type={type} />
        </div>
    )
}

export default Message
