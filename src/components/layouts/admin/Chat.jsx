import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import moment from "moment/moment";
import { AdminContext } from "../../../context/AdminContext";
import api from "../../../api";
import "../../../scss/admin/chat.scss";
const host = process.env.REACT_APP_API_URL;

function Chat() {

    const scrollMessage = useRef();

    const { user, users } = useContext(AdminContext);
    const [show, setShow] = useState(false);
    const [userChat, setUserChat] = useState({});
    const [chatId, setChatId] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const [textMessage, setTextMessage] = useState('');

    useEffect(() => {
        scrollMessage.current?.scrollTo({
            top: scrollMessage.current?.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages])

    useEffect(() => {
        if (chatId === null) return;

        api.findChat(chatId)
            .then((res) => {
                setMessages(res.data.data);
            })
            .catch(() => { })

        return () => { }
    }, [chatId])

    //Socket
    useEffect(() => {
        const newSocket = socketIOClient.connect(host);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {

        if (socket === null) return;
        socket.emit("addOnlineUser", user?._id);
        socket.on("getOnlineUser", data => {
            setOnlineUser(data);
        });

        return () => {
            socket.off("getOnlineUser");

        }
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;

        socket.on("sendDataFromServer", data => {
            if (data.chatId === chatId) {
                setMessages((preState) => {
                    data.createdAt = moment().format();

                    return [...preState, data];
                });
            }
        });

        return () => {
            socket.off("sendDataFromServer");
        }
    }, [socket, chatId]);

    const handleFindUserChat = async (e, userId) => {
        e.preventDefault();

        const u = users.find((data) => data._id === userId);
        setUserChat(u);

        let data = {
            firstId: user._id,
            secondId: userId,
        }

        await api.storeChat(data)
            .then((res) => {
                setChatId(res.data.data._id);
            })
            .catch(() => { })
    }

    //Hàm gửi tin nhắn
    const handleSendMessage = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (e.target.value === '') return false;

            //chatId: id cuộc hội thoại
            //senderId: id người gửi tin nhắn
            //recipientId: id người nhận tin nhắn
            //message: nội dung tin nhắn

            let data = {
                chatId: chatId,
                senderId: user?._id,
                recipientId: userChat?._id,
                message: textMessage,
            }

            setTextMessage('');

            api.sendMessage(data)
                .then(() => { })
                .catch(() => { })

            setMessages((preState) => {
                return [...preState, data];
            });

            socket.emit("sendDataFromClient", data);
        }
    }

    return (
        <div className="main-chat">
            <div className="chat py-4">
                <h3 className="title px-4 mb-4">Người liên hệ</h3>
                <ul className="list-user-chat list-style-none p-0 m-0">
                    {users && users.filter((data) => data._id !== user._id).map((user) => (
                        <li key={user._id} className="user-chat fw-bold cursor-pointer px-4 py-2 w-100">
                            <Link to={`/to/${user._id}`}
                                className="text-decoration-none text-black d-flex align-items-center"
                                onClick={(e) => {
                                    handleFindUserChat(e, user._id)
                                    setShow(true)
                                }}
                            >
                                <div className={
                                    onlineUser?.some((data) => data?.userId === user._id) ? 'wrapper-avater-user online-user' : 'wrapper-avater-user'
                                }
                                >
                                    <img src="https://upload.tienganh123.com/note_normal/141368391557552.jpg"
                                        alt=""
                                        className="avatar-user" />
                                </div>

                                <h5 className="name-user mb-0 ms-2">{user.name}</h5>
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>

            {show && <div className="wrapper-chat">
                <div className="wrapper-chat-header d-flex align-items-center justify-content-between px-2">
                    <div className="info-user d-flex align-items-center">
                        <img src="https://upload.tienganh123.com/note_normal/141368391557552.jpg"
                            alt=""
                            className="avatar-user" />
                        <div className="ms-2">
                            <h5 className="name-user mb-0">{userChat?.name}</h5>
                            {onlineUser?.find((data) => data.userId === userChat?._id) && (
                                <span className="dot d-block">Đang hoạt động</span>
                            )}
                        </div>
                    </div>
                    <div className="action">
                        <button className="btn-close-chat bg-transparent border-0 d-flex align-items-center justify-content-center text-primary fw-bold"
                            onClick={() => {
                                setShow(false)
                                setUserChat({})
                                setChatId(null)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="wrapper-chat-middle" ref={scrollMessage}>
                    {/* <div className=" h-100 "> */}
                    <ul className="list-content-chat list-message m-0 list-style-none p-3 w-100 h-auto">
                        {messages.length > 0 && (
                            messages.map((data, index) => (
                                <li key={index} className="content-item">
                                    <p className={"content mb-2 " + (data.senderId === user?._id ? "content-me" : "content-you")}>
                                        {data.message}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>
                    {/* </div> */}
                </div>
                <div className="wrapper-chat-footer">
                    <textarea name="" id=""
                        className="input-enter-chat w-100 h-100 border-0 outline-none"
                        placeholder="Aa...."
                        value={textMessage}
                        onChange={e => setTextMessage(e.target.value)}
                        onKeyDown={e => handleSendMessage(e)}
                    ></textarea>
                </div>
            </div>}

        </div>
    )
}

export default Chat;