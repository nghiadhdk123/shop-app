import { useState, useRef, useContext } from "react";
import moment from "moment/moment";
import "../../../scss/admin/user.scss";
import { AdminContext } from "../../../context/AdminContext";

function User() {

    const { users, handleCreateUser } = useContext(AdminContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const btnCloseModal = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        handleCreateUser(formData);
        
        e.target.reset();
        btnCloseModal.current.click();
        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className="user-page pt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="title fs-3 mb-0">
                    Nhân viên
                </h4>

                <button className="button-add-user btn text-white d-flex align-items-center px-4 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#modalAddUser">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <span className="ps-1">Thêm mới</span>
                </button>
            </div>
            <table className="bg-white w-100 mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên nhân viên</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    { users.length > 0 
                        ? users.map((value, index) => (
                                <tr key={value._id}>
                                    <td>{ ++index }</td>
                                    <td>{ value.name }</td>
                                    <td>{ value.email }</td>
                                    <td>{ value.status }</td>
                                    <td>{ moment(value.created_at).format('DD-MM-YYYY')}</td>
                                    <td>Đang cập nhật</td>
                                </tr>
                            ))
                        : <tr>
                        <td colSpan="6" className="py-2">
                            <img src="/images/no-data.png" alt="No Data" />
                            <span className="d-block text-center mt-4 py-2 fw-bold fst-italic">Không có dữ liệu</span>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>

            {/* Modal */}
           <div className="modal fade" id="modalAddUser" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="3" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Thêm nhân viên</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName" className="form-label">Họ và tên</label>
                                    <input type="text"
                                            value={name}
                                            required={true}
                                            className="form-control" 
                                            id="exampleInputName" 
                                            aria-describedby="emailHelp"
                                            onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName" className="form-label">Email</label>
                                    <input type="email"
                                            value={email}
                                            required={true}
                                            className="form-control" 
                                            id="exampleInputName" 
                                            aria-describedby="emailHelp"
                                            onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName" className="form-label">Mật khẩu</label>
                                    <input type="password"
                                            value={password}
                                            required={true}
                                            className="form-control" 
                                            id="exampleInputName" 
                                            aria-describedby="emailHelp"
                                            onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" 
                                        ref={btnCloseModal}
                                        className="btn btn-secondary" 
                                        data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" className="btn btn-primary">Tạo mới</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default User;
