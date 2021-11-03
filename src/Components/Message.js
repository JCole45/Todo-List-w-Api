import React from 'react'
import { Alert } from 'antd';


const Message = ({message, type}) => {
    return (
        <div className="message-alert"> 
            <Alert message={message} type={type} />
        </div>
    )
}

export default Message
