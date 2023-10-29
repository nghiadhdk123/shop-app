import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import "../../../scss/admin/home.scss";
import api from "../../../api";
import { formatMoney } from "../../../until/helper";

function Home() {

    const [name, setNameProduct] = useState('');
    const [price, setPriceProduct] = useState('');
    const [image, setImageProduct] = useState();
    const [catergory, setCategoryProduct] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProduct] = useState([]);
    const inputFileRef = useRef();
    const btnCloseModal = useRef();

    const getProduct = async () => {
            await api.getListProduct()
            .then((res) => {
                setProduct(res.data.data)
            })
            .catch(() => {})
    }

    useEffect(() => {
        getProduct();

         api.getListCategories()
            .then(async(res) => {
                await setCategories(res.data.data);
            })
            .catch(() => {});
    }, [])

    // Xóa ảnh cũ lưu tạm khỏi bộ nhớ
    useEffect(() => {

        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])

    const handleSubmite = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', catergory);
        if (image) {
            formData.append('image', image);
        }

        api.storeProduct(formData)
            .then((res) => {
                btnCloseModal.current.click();
                getProduct();
                event.target.reset();
            })
            .catch(() => { })
    }

    const handleOpenFile = () => {
        inputFileRef.current.click();
    }

    const handlePreView = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        e.target.value = "";
        setImageProduct(file);
    }

    return (
        <div className="admin-page pt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="title fs-3 mb-0">
                    Sản phẩm
                </h4>

                <button className="button-add-product btn text-white d-flex align-items-center px-4 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#modalAddProduct">
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
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length > 0
                        ? products.map((value, index) => (
                            <tr key={value._id}>
                                <td>{ ++index }</td>
                                <td>
                                    <img src={ value.image ? process.env.REACT_APP_API_URL + '/uploads/' + value.image : '/images/not-find-it.png' } alt="" className="object-fit-cover" width="100" height="100"/>
                                </td>
                                <td>{ value.name }</td>
                                <td>{ value.categoryId ? value.categoryId.name : 'Không có danh mục' }</td>
                                <td>{ formatMoney(value.price) } đ</td>
                                <td>{ moment(value.created_at).format('DD-MM-YYYY') }</td>
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
            <div className="modal fade" id="modalAddProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="3" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Thêm sản phẩm</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="POST" onSubmit={handleSubmite}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName" className="form-label">Tên sản phẩm</label>
                                    <input type="text"
                                        value={name}
                                        required={true}
                                        className="form-control"
                                        id="exampleInputName"
                                        aria-describedby="emailHelp"
                                        onChange={e => setNameProduct(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputCategory" className="form-label">Danh mục</label>
                                    <select className="form-control"
                                        id="exampleInputCategory"
                                        onChange={e => setCategoryProduct(e.target.value)}
                                    >
                                        <option value="" >Chọn danh mục sản phẩm</option>
                                        {
                                            categories.length > 0 && categories.map(value => (
                                                <option value={value._id} key={value._id}>{value.name}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPrice" className="form-label">Giá</label>
                                    <input type="text"
                                        value={price}
                                        required={true}
                                        className="form-control"
                                        id="exampleInputPrice"
                                        onChange={e => setPriceProduct(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Ảnh</label>
                                    <div className="d-flex align-items-center">
                                        {
                                            image && (<img src={image.preview} alt="" width="150" height="150" className="me-3 object-fit-cover"/>)
                                        }
                                        <div className="preview-image" onClick={handleOpenFile}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="file"
                                        ref={inputFileRef}
                                        className="d-none"
                                        id="exampleInputPassword1"
                                        onChange={ e => handlePreView(e) }
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

export default Home;
