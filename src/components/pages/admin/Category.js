import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import "../../../scss/admin/home.scss";
import api from "../../../api";

function Category() {

    const [name, setNameCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const btnCloseModal = useRef();
    
    const getCateogy = async () => {

        await api.getListCategories()
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch(() => {});
    }

    useEffect(() => {
        getCateogy();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);

        api.storeCategory(formData)
        .then(() => {
            e.target.reset();
            getCateogy();
            btnCloseModal.current.click();
        })
        .catch(() => {
            console.log('Error');
        })
    }

    return(
       <div className="admin-page pt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="title fs-3 mb-0">
                    Danh mục
                </h4>

                <button className="button-add-product btn text-white d-flex align-items-center px-4 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#modalAddCategory">
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
                        <th>Tên danh mục</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    { categories.length > 0
                        ? categories.map((value, index) => (
                            <tr key={value._id}>
                                <td>{ ++index }</td>
                                <td>{ value.name }</td>
                                <td>{ moment(value.created_at).format('DD-MM-YYYY') }</td>
                            </tr>
                        ))
                        : <tr>
                            <td colSpan="3" className="py-2">
                                <img src="/images/no-data.png" alt="No Data" />
                                <span className="d-block text-center mt-4 py-2 fw-bold fst-italic">Không có dữ liệu</span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            {/* Modal */}
           <div className="modal fade" id="modalAddCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="3" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Thêm sản phẩm</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName" className="form-label">Tên danh mục</label>
                                    <input type="text"
                                            value={name}
                                            required={true}
                                            className="form-control" 
                                            id="exampleInputName" 
                                            aria-describedby="emailHelp"
                                            onChange={e => setNameCategory(e.target.value)}
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

export default Category;
