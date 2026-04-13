import { useState,useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import 'suneditor/dist/css/suneditor.min.css';
import {WrapperEditListing,EditListingContainer,EditListingHeader,EditListingBody} from './style';
import { Select,Upload,Image } from "antd";
import SunEditor from 'suneditor-react';
import { PlusOutlined } from '@ant-design/icons';
import InputForm from "../../components/InputForm/InputForm";
import {useMessage} from "../../components/Message/Message";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHook } from "../../hooks/useMutationhook";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ListingService from "../../services/ListingService";
import * as ImageService from "../../services/ImageService";
const getBase64 = file =>
        new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
export default function EditListing () {
    const { id } = useParams();
    const [listProvince,setListProvince] = useState(null);
    const [listCommune,setListCommune] = useState(null);
    const [typeListing,setTypeListing] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [errors,setErrors] = useState({});
    const initialDataRef = useRef([]);
    const [formdata,setFormdata] = useState({
        CityID: null,
        CommuneID: null,
        Title: '',
        Description: '',
        Price: 0,
        vertical: 0,
        horizontal: 0,
        front_street: 0,
        numberhouse: '',
        floor: 0,
        bedroom: 0,
        bathroom: 0,
        Toilet: 0,
        CatagoryProperty: '',
        Legal: '',
        User: '',
        visibility_status: '',
    });
    const user = useSelector(state => state.user);
    const mutation = useMutationHook(
              data => ListingService.updateListing(id,data)
    );
    const message = useMessage();
    const {isPending,isError,isSuccess} = mutation;
    const navigate = useNavigate();
    const validate = () => {
        let newErrors = {};
        if(!formdata.Title.trim()){
            newErrors.Title = "Vui lòng nhập tên dự án";
        }
        if(!formdata.Description.trim()){
            newErrors.Description = "Vui lòng nhập mô tả dự án";
        }
        if(formdata.Price == null || formdata.Price <= 0){
            newErrors.Price = "Vui lòng nhập giá tài sản";
        }
        if(formdata.vertical == null || formdata.vertical <= 0){
            newErrors.vertical = "Vui lòng nhập chiều dài"
        }
        if(formdata.horizontal == null || formdata.horizontal <= 0){
            newErrors.horizontal = "Vui lòng nhập chiều rộng";
        }
        if(formdata.front_street == null || formdata.front_street <= 0){
            newErrors.front_street = "Vui lòng nhập chiều dài mặt tiền"
        }
        if(!formdata.numberhouse.trim()){
            newErrors.numberhouse = "Vui lòng nhập mã số thửa đất"
        }
        if(!formdata.CityID){
            newErrors.CityID = "Vui lòng chọn đơn vị hành chính tỉnh";
        }
        if(!formdata.CommuneID){
            newErrors.CommuneID = "Vui lòng chọn đợn vị hành chính cấp địa phương";
        }
        if(formdata.floor == null || formdata.floor <= 0){
            newErrors.floor = "Vui lòng nhập số tầng";
        }
        if(formdata.bathroom == null || formdata.bathroom <= 0 ){
            newErrors.bathroom = "Vui lòng nhập số phòng tắm";
        }
        if(formdata.bedroom == null || formdata.bedroom <= 0 ){
            newErrors.bedroom = "Vui lòng nhập số phòng ngủ";
        }
        if(formdata.Toilet == null || formdata.Toilet <= 0){
            newErrors.Toilet = "Vui lòng nhập số toilet";
        }
        if(!formdata.CatagoryProperty.trim()){
            newErrors.CatagoryProperty = "Vui lòng chọn loại bất động sản";
        }
        if(!formdata.Legal.trim()){
            newErrors.Legal = "Vui lòng chọn loại hợp đồng mua bán";
        }
        if(fileList.length === 0){
            newErrors.Images = "Vui lòng chọn ít nhất một ảnh cho bất động sản";
        }
        if(!formdata.visibility_status){
            newErrors.visibility_status = "Vui lòng chọn tình trạng bài đăng";
        }
        return newErrors;
    }
    const handleChangeTitle = (value) => {
        setFormdata(prev => ({
            ...prev,
            Title: value,
        }))
        if(errors.Title){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Title;
                return newErrors;
            });
        }
    }
    const handleChangeDescription = (value) => {
        setFormdata(prev => ({
            ...prev,
            Description: value.length === 11 ? '': value,
        }))
        if(errors.Description){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Description;
                return newErrors;
            });
        }
    }
    const handleChangePrice = (value) => {
        setFormdata(prev => ({
            ...prev,
            Price: value<0 ? 0 : value
        }))
        if(errors.Price){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Price;
                return newErrors;
            });
        }
    }
    const handleChangeLength = (value) => {
        setFormdata(prev => ({
            ...prev,
            vertical: value < 0 ? 0 : value
        }))
        if(errors.vertical){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.vertical;
                return newErrors;
            });
        }
    }
    const handleChangeWidth = (value) => {
        setFormdata(prev => ({
            ...prev,
            horizontal:value < 0 ? 0 : value
        }))
        if(errors.horizontal){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.horizontal;
                return newErrors;
            });
        }
    }
    const handleChangeFrontispiece = (value) => {
        setFormdata(prev => ({
            ...prev,
            front_street: value <0 ? 0 : value
        }))
        if(errors.front_street){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.front_street;
                return newErrors;
            });
        }
    }
    const handleChangeNumberHouse = (value) => {
        setFormdata(prev=> ({
            ...prev,
            numberhouse: value
        }))
        if(errors.numberhouse){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.numberhouse;
                return newErrors;
            });
        }
    }
    const handleChangeNumberFloor = (value) => {
        setFormdata(prev => ({
            ...prev,
            floor:value<0 ? 0 : value
        }))
        if(errors.floor){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.floor;
                return newErrors;
            });
        }
    }
    const handleChangeNumberBedroom = (value) => {
        setFormdata(prev => ({
            ...prev,
            bedroom:value<0 ? 0 : value
        }))
        if(errors.bedroom){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.bedroom;
                return newErrors;
            });
        }
    }
    const handleChangeNumberBathroom = (value) => {
        setFormdata(prev => ({
            ...prev,
            bathroom: value<0 ? 0 : value
        }))
        if(errors.bathroom){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.bathroom;
                return newErrors;
            });
        }
    }
    const handleChangeNumberToilet = (value) => {
        setFormdata(prev => ({
            ...prev,
            Toilet:value<0 ? 0 : value
        }))
        if(errors.Toilet){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Toilet;
                return newErrors;
            });
        }
    }
    const handleChangeTypeRealEstate = (value) => {
        setFormdata(prev => ({
            ...prev,
            CatagoryProperty:value
        }))
        if(errors.CatagoryProperty){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.CatagoryProperty;
                return newErrors;
            });
        }
    }
    const handleChangeTypePaper = (value) => {
        setFormdata(prev =>({
            ...prev,
            Legal:value
        }));
        if(errors.Legal){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Legal;
                return newErrors;
            });
        }
    }

    const handleChangeProvince = (value) => {
        setFormdata(prev => ({
            ...prev,
            CityID: value,
            CommuneID: null,   
        }));
        if (!value) {
            setListCommune([]);
        }
        if(errors.CityID){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.CityID;
                return newErrors;
            });
        }
    }
    const handleChangeCommune = (value) => {
        setFormdata((prev) => ({
            ...prev,
            CommuneID: value,
        }))
        if(errors.CommuneID){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.CommuneID;
                return newErrors;
            });
        }
    }
    const handlePreviewImage = async (file) => {
        if(file.url){
            setPreviewImage(file.url);
            setPreviewOpen(true);
            return;
        }
        if(!file.preview && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.preview);
        setPreviewOpen(true);
    }
    const handleChange = ({ file, fileList: newFileList }) => {
        // if oldimage is removed
        if (file.status === "removed" && file.isOld) {
            setRemovedImages(prev => [...prev, file.url]);
        }
        setFileList(newFileList);
        if(errors.Images && newFileList.length > 0){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Images;
                return newErrors;
            });
        }else if(newFileList.length === 0){
            setErrors(prev => ({
                ...prev,
                Images: "Vui lòng chọn ít nhất một ảnh cho bất động sản"
            }))
        }
    };
    const handleVisibilityStatusChange = (value) => {
        setFormdata(prev => ({
            ...prev,
            visibility_status: value
        }))
        if(value !== null && errors.visibility_status){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.visibility_status;
                return newErrors;
            });
        }
    }
    const handleUpdateListing = () => {
        const newErrors = validate();

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        // call api update listing
        const data = new FormData();
        formdata.User = user.id;
        Object.keys(formdata).forEach(key => {
            data.append(key, formdata[key]);
        })
        if(fileList.length > 0){
            fileList.forEach((file) => {
                data.append("images", file.originFileObj);
            });
        }
        /* removedImages.forEach((url) => {
            data.append("removedImages", url);
        }); */
        data.append("removedImages", JSON.stringify(removedImages));

        mutation.mutate(data);
    }
    const fetchListing = async () => {
                try {
                    // ---------------------- get Listing -----------------------
                    const res = await ListingService.getListing(id);
                    const data = res.data.data;
                    setFormdata({
                        CityID: data.Address.CityID,
                        CommuneID: data.Address.CommuneID,
                        Title: data.Title,
                        Description: data.Description,
                        Price: Number.parseInt(data.Price),
                        vertical: Number.parseInt(data.vertical),
                        horizontal: Number.parseInt(data.horizontal),
                        front_street: Number.parseInt(data.front_street),
                        numberhouse: data.Address.numberhouse,
                        floor: data.floor,
                        bedroom: data.bedroom,
                        bathroom: data.bathroom,
                        Toilet: data.Toilet,
                        CatagoryProperty: data.CatagoryProperty,
                        Legal: data.Legal,
                        User: data.User,
                        visibility_status: data.visibility_status,
                    })
                    initialDataRef.current = {
                        CityID: data.Address.CityID,
                        CommuneID: data.Address.CommuneID,
                        Title: data.Title,
                        Description: data.Description,
                        Price: Number.parseInt(data.Price),
                        vertical: Number.parseInt(data.vertical),
                        horizontal: Number.parseInt(data.horizontal),
                        front_street: Number.parseInt(data.front_street),
                        numberhouse: data.Address.numberhouse,
                        floor: data.floor,
                        bedroom: data.bedroom,
                        bathroom: data.bathroom,
                        Toilet: data.Toilet,
                        CatagoryProperty: data.CatagoryProperty,
                        Legal: data.Legal,
                        User: data.User,
                        visibility_status: data.visibility_status,
                        countImage: 0
                    };
                    // ----------------------- get image -------------------------
                    const res2 = await ImageService.getAllImage(id);

                    const images = res2.data.data

                    
                    const formatted = images.map((item,index) => ({
                        uid: `old-${index}`,
                        name: item.URL.split("/").pop(),
                        status: "done",
                        url: item.URL,
                        isOld: true
                    }))
                    setFileList(formatted);
                    
                    initialDataRef.current.countImage = images.length;
                } catch (error) {
                    console.log(error);
                }
    };
    useEffect(() => {
            fetchListing();
    }, [id]);
    useEffect(() => {
        const fetchdata = async () => {
          const data = await axios.get(
                "https://production.cas.so/address-kit/2025-07-01/provinces"
            )
            const { provinces } = data.data;
           
            const list = provinces.map((item) => {
                return {
                    code: item.code,
                    name: item.name,
                };
            });
            
            setListProvince(list);
        }
        fetchdata();
    },[]);
    useEffect(() => {
        const fetchdata = async () => {
            if (formdata.CityID) {
                const data = await axios.get(
                    `https://production.cas.so/address-kit/2025-07-01/provinces/${formdata.CityID}/communes`
                );
                const { communes } = data.data;
                const list = communes.map((item) => {
                    return {
                        code: item.code,
                        name: item.name,
                    };
                });
                setListCommune(list);
            }
        };
        fetchdata();
    },[formdata.CityID]);
    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(
                "http://localhost:3000/api/catagory_property/getAll"
            );
                const apiData = res.data.data;

                // Group theo Type
                const grouped = apiData.reduce((acc, item) => {
                if (!acc[item.Type]) {
                    acc[item.Type] = [];
                }
                acc[item.Type].push(item);
                return acc;
                }, {});

                // Convert sang format AntD Select
                const formattedOptions = Object.entries(grouped).map(
                    ([groupName, items]) => ({
                        label: groupName,
                        options: items.map(item => ({
                        label: item.Name,
                        value: item._id   // nên dùng id làm value
                        }))
                    })
                );
                setTypeListing(formattedOptions);
        }
        fetchData();
    },[]);
    useEffect(() => {
        if (isSuccess) {
            message.success("Cập nhật thông tin bất động sản thành công !");
            setTimeout(()=>{
                navigate('/manage-listing');
            },2000)
        } else if (isError) {
            message.error("Cập nhật thông tin thất bại!");
        }
    },[isSuccess, isError])
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );
    
    return (
        <WrapperEditListing>
            <EditListingContainer>
                <EditListingHeader>
                    <h2>Thông tin bất động sản chỉnh sửa</h2>
                    <ButtonComponent 
                        textButton={"Quay lại"} 
                        size="large" 
                        color="cyan" 
                        variant="solid" 
                        onClick={() => navigate('/manage-listing')}/>
                </EditListingHeader>
                <Loading isLoading={isPending}>
                    <EditListingBody>
                            <div>
                                <span className="label">Tiêu đề bất động sản</span>
                                <InputForm placeholder="Nhập tiêu đề bất động sản" size={"large"} 
                                value={formdata?.Title}
                                TypePassword={false} 
                                handleOnChange={handleChangeTitle}
                                />
                                {
                                    errors.Title && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.Title}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Mô tả bất động sản</span>
                                <SunEditor
                                    setOptions={{
                                        buttonList: [
                                        ['font', 'fontSize', 'formatBlock'],
                                        ['bold', 'underline', 'italic'],
                                        ['fontColor', 'hiliteColor'],
                                        ['align', 'list'],
                                        ]
                                    }}
                                    setContents={formdata?.Description}
                                    onChange={handleChangeDescription}
                                />
                                {
                                    errors.Description && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.Description}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Giá (đơn vị: triệu đồng)</span>
                                <InputForm type="number" placeholder="Nhập giá bất động sản" size={"large"}
                                min={0}
                                value={formdata?.Price}
                                TypePassword={false} 
                                handleOnChange={handleChangePrice}
                                />
                                {
                                    errors.Price && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.Price}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Chiều dài (m)</span>
                                <InputForm type="number" placeholder="Nhập chiều dài bất động sản" size={"large"} 
                                min={0}
                                value={formdata?.vertical}
                                TypePassword={false} 
                                handleOnChange={handleChangeLength}
                                />
                                {
                                    errors.vertical && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.vertical}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Chiều rộng (m)</span>
                                <InputForm type="number" placeholder="Nhập chiều rộng bất động sản" size={"large"} 
                                min={0}
                                value={formdata?.horizontal}
                                TypePassword={false}
                                handleOnChange={handleChangeWidth}
                                />
                                {
                                    errors.horizontal && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.horizontal}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Mặt tiền (m)</span>
                                <InputForm type="number" placeholder="Nhập mặt tiền bất động sản" size={"large"} 
                                min={0}
                                value={formdata?.front_street}
                                TypePassword={false} 
                                handleOnChange={handleChangeFrontispiece}
                                />
                                {
                                    errors.front_street && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.front_street}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Số nhà</span>
                                <InputForm placeholder="Nhập số nhà bất động sản" size={"large"}
                                value={formdata?.numberhouse} 
                                TypePassword={false}
                                handleOnChange={handleChangeNumberHouse}
                                />
                                {
                                    errors.numberhouse && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.numberhouse}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Tỉnh, thành phố</span>
                                <Select 
                                    placeholder="--- Chọn tỉnh, thành phố ---"
                                    options={listProvince?.map((item) => ({
                                        value: item.code,
                                        label: item.name,
                                    }))}
                                    value={formdata?.CityID}
                                    onChange={handleChangeProvince}
                                    style={{ width: '100%' }}
                                    size="large"
                                />
                                {
                                    errors.CityID && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.CityID}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Phường, xã</span>
                                <Select 
                                    placeholder="--- Chọn phường, xã ---"
                                    options={listCommune?.map((item) => ({
                                        value: item.code,
                                        label: item.name,
                                    }))}
                                    disabled={!formdata.CityID}
                                    value={formdata?.CommuneID}
                                    onChange={handleChangeCommune}
                                    style={{ width: '100%' }}
                                    size="large"
                                />
                                {
                                    errors.CommuneID && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.CommuneID}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Số tầng</span>
                                <InputForm type="number" placeholder="Nhập số tầng bất động sản" 
                                min={0}
                                value={formdata?.floor}
                                size={"large"} TypePassword={false} 
                                handleOnChange={handleChangeNumberFloor}
                                />
                                {
                                    errors.floor && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.floor}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Số phòng ngủ</span>
                                <InputForm type="number" placeholder="Nhập số phòng ngủ bất động sản" 
                                min={0}
                                value={formdata?.bedroom}
                                size={"large"} TypePassword={false} 
                                handleOnChange={handleChangeNumberBedroom}
                                />
                                {
                                    errors.bedroom && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.bedroom}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Số phòng tắm</span>
                                <InputForm type="number" placeholder="Nhập số phòng tắm bất động sản" 
                                min={0}
                                value={formdata?.bathroom}
                                size={"large"} TypePassword={false}
                                handleOnChange={handleChangeNumberBathroom}
                                />
                                {
                                    errors.bathroom && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.bathroom}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Số toilet</span>
                                <InputForm type="number" placeholder="Nhập số toilet bất động sản"
                                min={0}
                                value={formdata?.Toilet}
                                size={"large"} TypePassword={false}
                                handleOnChange={handleChangeNumberToilet}
                                />
                                {
                                    errors.Toilet && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.Toilet}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Loại bất động sản</span>
                                <Select 
                                    placeholder="--- Chọn loại bất động sản ---"
                                    options={typeListing}
                                    value={formdata?.CatagoryProperty}
                                    style={{ width: '100%' }}
                                    size="large"
                                    onChange={handleChangeTypeRealEstate}
                                />
                                {
                                    errors.CatagoryProperty && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.CatagoryProperty}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Loại giấy tờ</span>
                                <Select 
                                    placeholder="--- Chọn loại giấy tờ ---"
                                    options={[
                                        { value: null, label: '--- Chọn loại giấy tờ ---' },
                                        { value: 'sổ đỏ', label: 'Sổ đỏ' },
                                        { value: 'sổ hồng', label: 'Sổ hồng' },
                                        { value: 'hợp đồng mua bán', label: 'Hợp đồng mua bán' },
                                        { value: 'đang chờ sổ', label: 'Đang chờ sổ' },
                                    ]}
                                    value={formdata?.Legal}
                                    style={{ width: '100%' }}
                                    size="large"
                                    onChange={handleChangeTypePaper}
                                />
                                {
                                    errors.Legal && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.Legal}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Chọn ảnh</span>
                                <Upload
                                    listType="picture-card"
                                    accept="image/*"
                                    maxCount={8}
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onPreview={handlePreviewImage}
                                    beforeUpload={() => false}
                                    multiple
                                    >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                {
                                    previewImage && (
                                        <Image
                                            wrapperStyle={{ display: 'none'}}
                                            
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                                afterOpenChange: (visible) => !visible && setPreviewImage('')
                                            }}
                                            src={previewImage}
                                        />
                                    )
                                }
                                {
                                    errors.Images && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.Images}
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="label">Tình trạng bài đăng</span>
                                <Select 
                                    placeholder="--- Chọn tình trạng bài đăng ---"
                                    options={[
                                        { value: null, label: '--- Chọn tình trạng bài đăng ---' },
                                        { value: 'công khai', label: 'Công khai' },
                                        { value: 'ẩn', label: 'Ẩn' },
                                        { value: 'hết hạn', label: 'Hết hạn',disabled: true },
                                        { value: 'bị khóa', label: 'Bị khóa',disabled: true },
                                    ]}
                                    value={formdata?.visibility_status}
                                    style={{ width: '100%' }}
                                    size="large"
                                    disabled={formdata?.visibility_status === 'hết hạn' || formdata?.visibility_status === 'bị khóa'}
                                    onChange={handleVisibilityStatusChange}
                                />
                                {
                                    errors.visibility_status && (
                                        <span style={{ color: "red", marginBottom: 10 }}>
                                            {errors.visibility_status}
                                        </span>
                                    )
                                }
                            </div>
                            <div className="button-group">
                                {
                                    (Object.keys(formdata).some(
                                        key => formdata[key] !== initialDataRef.current[key]
                                    // eslint-disable-next-line no-mixed-operators
                                    ) || initialDataRef.current.countImage !== fileList.length || removedImages.length > 0) &&
                                    <>
                                        <ButtonComponent 
                                            textButton={"Hủy"} 
                                            size="large" 
                                            color="default" 
                                            variant="solid"
                                            onClick={() => {fetchListing()}}
                                        />
                                        <ButtonComponent textButton={"Cập nhật"} size="large" type="primary" onClick={handleUpdateListing}/>
                                    </>
                                }
                            </div>
                    </EditListingBody>
                </Loading>
            </EditListingContainer>
        </WrapperEditListing>
    )
}