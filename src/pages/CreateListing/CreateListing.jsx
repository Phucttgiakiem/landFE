import {WrapperCreateListing,CreateListingContainer,CreateListingHeader,CreateListingBody} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useState,useEffect } from "react";
import { useMutationHook } from "../../hooks/useMutationhook";
import axios from "axios";
import { Select,Upload,Image } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {useMessage} from "../../components/Message/Message";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ListingService from "../../services/ListingService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
const getBase64 = file =>
        new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
export default function CreateListing() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [listProvince,setListProvince] = useState([]);
    const [listCommune,setListCommune] = useState([]);
    const [formdata,setFormdata] = useState({
        City:null,
        Commune: null,
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
        Type: '',
    });
    const user = useSelector(state => state.user);
    const [fileList, setFileList] = useState([]);
    const [typeListing,setTypeListing] = useState([]);
    const [errors,setErrors] = useState({});
    const message = useMessage();
    const mutation = useMutationHook(
          data => ListingService.createListing(data)
      );
    const {isPending,isError,isSuccess} = mutation;
    const navigate = useNavigate();
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
            Description: value
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
            vertical: value<0 ? 0 : value
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
            horizontal:value<0 ? 0 : value
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
            front_street: value<0 ? 0 : value
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


    const handlePreviewImage = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    }
    const handleChangeProvince = (value) => {
        setFormdata(prev => ({
            ...prev,
            City: value,
            Commune: null,   
        }));
        if (!value) {
            setListCommune([]);
        }
        if(errors.City){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.City;
                return newErrors;
            });
        }
    };
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
        if(!formdata.City){
            newErrors.City = "Vui lòng chọn đơn vị hành chính tỉnh";
        }
        if(!formdata.Commune){
            newErrors.Commune = "Vui lòng chọn đợn vị hành chính cấp địa phương";
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
        if(!formdata.Type){
            newErrors.Type = "Vui lòng chọn loại tin";
        }
        return newErrors;
    }
    const handleChangeCommune = (value) => {
        setFormdata((prev) => ({
            ...prev,
            Commune: value,
        }))
        if(errors.Commune){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Commune;
                return newErrors;
            });
        }
    }
    const handleTypeLand = (value) => {
        setFormdata((prev) => ({
            ...prev,
            Type:value
        }))
        if(errors.Type){
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors.Type;
                return newErrors;
            })
        }
    }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên các tệp hình ảnh!');
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Ảnh phải nhỏ hơn 5MB!');
            return Upload.LIST_IGNORE;
        }
        return false;
    }
    
    const handleCreateListing = () => {
        const newErrors = validate();

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        const data = new FormData();
       
        Object.keys(formdata).forEach((key) => {
            data.append(key,formdata[key]);
        });
        data.set("User", user.id);
        fileList.forEach((file) => {
            data.append("images", file.originFileObj);
        });
        mutation.mutate(data);
    }
    const resetInput = () => {
        setFormdata({
        City: null,
        Commune: null,
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
        Type:'',
    });

        setFileList([]);
    }
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
            if (formdata.City) {
                const data = await axios.get(
                    `https://production.cas.so/address-kit/2025-07-01/provinces/${formdata.City.split('-')[0]}/communes`
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
    },[formdata.City]);
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
            message.success("tạo mới thông tin bất động sản thành công !");
            resetInput();
            setTimeout(()=>{
                navigate('/manage-listing');
            },2000)
        } else if (isError) {
            message.error("tạo mới thông tin thất bại!");
        }
    },[isSuccess, isError])
    return (
        <WrapperCreateListing>
            <CreateListingContainer>
                <CreateListingHeader>
                    <h2>Tạo tin đăng mới</h2>
                    <ButtonComponent textButton={"Quay lại"} size="large" color="cyan" variant="solid" onClick={() => navigate("/manage-listing")}/>
                </CreateListingHeader>
                <Loading isLoading={isPending}> 
                    <CreateListingBody>
                        <div>
                            <span className="label">Tiêu đề bất động sản</span>
                            <InputForm placeholder="Nhập tiêu đề bất động sản" size={"large"} 
                            status={errors.Title ? "error" : ""} 
                            value={formdata.Title}
                            TypePassword={false} 
                            handleOnChange={handleChangeTitle}/>
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
                                placeholder="Nhập mô tả bất động sản"
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
                            <span className="label">Giá (đơn vị: VND)</span>
                            <InputForm type="number" placeholder="Nhập giá bất động sản" size={"large"}
                            
                            defaultValue={formdata.Price}
                            value={formdata.Price}
                            min={0}
                            status={errors.Price ? "error" : ""}
                            TypePassword={false} handleOnChange={handleChangePrice}/>
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
                            
                            defaultValue={formdata.vertical}
                            value={formdata.vertical}
                            min={0}
                            status={errors.vertical ? "error" : ""}
                            TypePassword={false} handleOnChange={handleChangeLength}/>
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
                            value={formdata.horizontal}
                            defaultValue={formdata.horizontal}
                            min={0}
                            status={errors.horizontal ? "error": ""}
                            TypePassword={false} handleOnChange={handleChangeWidth}/>
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
                            value={formdata.front_street}
                            defaultValue={formdata.front_street}
                            min={0}
                            status={errors.front_street ? "error" : ""}
                            TypePassword={false} handleOnChange={handleChangeFrontispiece}/>
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
                            value={formdata.numberhouse}
                            status={errors.numberhouse ? "error" : ""}
                            TypePassword={false} handleOnChange={handleChangeNumberHouse}/>
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
                                value={formdata.City}
                                placeholder="--- Chọn tỉnh, thành phố ---"
                                options={listProvince.map((item) => ({
                                    value: `${item.code}-${item.name}`,
                                    label: item.name,
                                }))}
                                style={{ width: '100%' }}
                                size="large"
                                onChange={handleChangeProvince}
                            />
                            {
                                errors.City && (
                                    <span style={{ color: "red", marginBottom: 10 }}>
                                        {errors.City}
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            <span className="label">Phường, xã</span>
                            <Select 
                                value={formdata.Commune}
                                placeholder="--- Chọn phường, xã ---"
                                options={listCommune.map((item) => ({
                                    value: `${item.code}-${item.name}`,
                                    label: item.name,
                                }))}
                                disabled={!formdata.City}
                                style={{ width: '100%' }}
                                size="large"
                                onChange={handleChangeCommune}
                            />
                            {
                                errors.Commune && (
                                    <span style={{ color: "red", marginBottom: 10 }}>
                                        {errors.Commune}
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            <span className="label">Số tầng</span>
                            <InputForm type="number" placeholder="Nhập số tầng bất động sản" 
                            value={formdata.floor}
                            defaultValue={formdata.floor}
                            min={0}
                            status={errors.floor ? "error" : ""}
                            size={"large"} TypePassword={false} handleOnChange={handleChangeNumberFloor}/>
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
                            status={errors.bedroom ? "error" : ""}
                            value={formdata.bedroom}
                            defaultValue={formdata.bedroom}
                            min={0}
                            size={"large"} TypePassword={false} handleOnChange={handleChangeNumberBedroom}/>
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
                            status={errors.bathroom ? "error" : ""}
                            value={formdata.bathroom}
                            defaultValue={formdata.bathroom}
                            min={0}
                            size={"large"} TypePassword={false} handleOnChange={handleChangeNumberBathroom}/>
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
                            status={errors.Toilet ? "error" : ""}
                            value={formdata.Toilet}
                            defaultValue={formdata.Toilet}
                            min={0}
                            size={"large"} TypePassword={false} handleOnChange={handleChangeNumberToilet}/>
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
                                status={errors.CatagoryProperty ? "error" : ""}
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
                                status={errors.Legal ? "error" : ""}
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
                                multiple
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                                onPreview={handlePreviewImage}
                                beforeUpload={beforeUpload}
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
                        </div>
                        <div>
                            <span className="label">Chọn loại tin đăng</span>
                            <Select 
                                placeholder="--- Chọn loại tin ---"
                                status={errors.Type ? "error" : ""}
                                style={{ width: '100%' }}
                                size="large"
                                onChange={handleTypeLand}
                            >
                                <Select.Option value="normal">Tin thường</Select.Option>
                                <Select.Option value="vip">Tin vip</Select.Option>
                            </Select>
                            {
                                errors.Type && (
                                    <span style={{ color: "red", marginBottom: 10 }}>
                                        {errors.Type}
                                    </span>
                                )
                            }
                        </div>
                        <div className="button-group">
                            <ButtonComponent textButton={"Tạo mới"} size="large" type="primary" onClick={handleCreateListing}/>
                            <ButtonComponent textButton={"Hủy"} size="large" color="default" variant="solid" onClick={resetInput}/>
                        </div>
                    </CreateListingBody>
                </Loading>
            </CreateListingContainer>
        </WrapperCreateListing>
    )
}