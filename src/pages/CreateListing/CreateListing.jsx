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
import {getProvinces,getCommunes} from "../../services/AddressService";
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
    const normalizeNumber = (value) => {
        
        if (value === '' || value === null) return 0;

        let num = Number(value);

        // NaN hoặc <= 0 → 0
        if (isNaN(num) || num <= 0 || !Number.isInteger(num)) return 0;

        return num;
    };
    const handleChangePrice = (value) => {
        setFormdata(prev => ({
            ...prev,
            Price: normalizeNumber(value)
        }))
    }
    const handleChangeLength = (value) => {
        setFormdata(prev => ({
            ...prev,
            vertical: normalizeNumber(value)
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
            horizontal:normalizeNumber(value)
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
            front_street: normalizeNumber(value)
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
            floor:normalizeNumber(value)
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
            bedroom:normalizeNumber(value)
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
            bathroom: normalizeNumber(value)
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
            Toilet:normalizeNumber(value)
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
            newErrors.Title = "please enter the title of the property";
        }
        if(!formdata.Description.trim()){
            newErrors.Description = "please enter the description of the property";
        }
        if(formdata.vertical == null || formdata.vertical <= 0){
            newErrors.vertical = "please enter the vertical dimension"
        }
        if(formdata.horizontal == null || formdata.horizontal <= 0){
            newErrors.horizontal = "please enter the horizontal dimension";
        }
        if(formdata.front_street == null || formdata.front_street <= 0){
            newErrors.front_street = "please enter the front street dimension"
        }
        if(!formdata.numberhouse.trim()){
            newErrors.numberhouse = "please enter the plot number"
        }
        if(!formdata.City){
            newErrors.City = "please select the province";
        }
        if(!formdata.Commune){
            newErrors.Commune = "please select the district";
        }
        if(formdata.floor == null || formdata.floor <= 0){
            newErrors.floor = "please enter the number of floors";
        }
        if(formdata.bathroom == null || formdata.bathroom <= 0 ){
            newErrors.bathroom = "please enter the number of bathrooms";
        }
        if(formdata.bedroom == null || formdata.bedroom <= 0 ){
            newErrors.bedroom = "please enter the number of bedrooms";
        }
        if(formdata.Toilet == null || formdata.Toilet <= 0){
            newErrors.Toilet = "please enter the number of toilets";
        }
        if(!formdata.CatagoryProperty.trim()){
            newErrors.CatagoryProperty = "please select the property category";
        }
        if(!formdata.Legal.trim()){
            newErrors.Legal = "please select the legal status";
        }
        if(!formdata.Type){
            newErrors.Type = "please select the listing type";
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
            <div style={{ marginTop: 8 }}>Upload Image</div>
        </div>
    );
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Image must be smaller than 5MB!');
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
            const res = await getProvinces();
            const { provinces } = res.data;
           
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
                const res = await getCommunes(formdata.City.split('-')[0]);
                const { communes } = res.data;
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

                const formattedOptions = apiData.map(group => ({
                label: group._id, 
                options: group.items.map(item => ({
                    label: item.Name,
                    value: item._id
                }))
            }));

            setTypeListing(formattedOptions);
        }
        fetchData();
    },[]);
    useEffect(() => {
        if (isSuccess) {
            message.success("successfully created new property information!");
            resetInput();
            setTimeout(()=>{
                navigate('/manage-listing');
            },2000)
        } else if (isError) {
            message.error("failed to create new property information!");
        }
    },[isSuccess, isError])
    return (
        <WrapperCreateListing>
            <CreateListingContainer>
                <CreateListingHeader>
                    <h2>Create New Listing</h2>
                    <ButtonComponent textButton={"Back"} size="large" color="cyan" variant="solid" onClick={() => navigate("/manage-listing")}/>
                </CreateListingHeader>
                <Loading isLoading={isPending}> 
                    <CreateListingBody>
                        <div>
                            <span className="label">Title</span>
                            <InputForm placeholder="Enter property title" size={"large"} 
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
                            <span className="label">Description</span>
                            
                            <SunEditor
                                setOptions={{
                                    buttonList: [
                                    ['font', 'fontSize', 'formatBlock'],
                                    ['bold', 'underline', 'italic'],
                                    ['fontColor', 'hiliteColor'],
                                    ['align', 'list'],
                                    ]
                                }}
                                placeholder="Enter property description"
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
                            <span className="label">Price (Unit: VND) / (Note: enter 0 for negotiable price)</span>
                            <InputForm type="number" placeholder="Enter property price" size={"large"}
                            
                            defaultValue={formdata.Price}
                            value={formdata.Price}
                            min={0}
                            status={errors.Price ? "error" : ""}
                            TypePassword={false} handleOnChange={handleChangePrice}/>
                            {/* {
                                errors.Price && (
                                    <span style={{ color: "red", marginBottom: 10 }}>
                                        {errors.Price}
                                    </span>
                                )
                            } */}
                        </div>
                        <div>
                            <span className="label">Length (m)</span>
                            <InputForm type="number" placeholder="Enter property length" size={"large"} 
                            
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
                            <span className="label">width (m)</span>
                            <InputForm type="number" placeholder="Enter property width" size={"large"} 
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
                            <span className="label">Front Street (m)</span>
                            <InputForm type="number" placeholder="Enter front street width" size={"large"} 
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
                            <span className="label">House Number</span>
                            <InputForm placeholder="Enter property house number" size={"large"} 
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
                            <span className="label">City, Province</span>
                            <Select 
                                value={formdata.City}
                                placeholder="--- Select City, Province ---"
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
                            <span className="label">Ward, District</span>
                            <Select 
                                value={formdata.Commune}
                                placeholder="--- Select Ward, District ---"
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
                            <span className="label">Number of Floors</span>
                            <InputForm type="number" placeholder="Enter number of floors" 
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
                            <span className="label">Number of Bedrooms</span>
                            <InputForm type="number" placeholder="Enter number of bedrooms" 
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
                            <span className="label">Number of Bathrooms</span>
                            <InputForm type="number" placeholder="Enter number of bathrooms" 
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
                            <span className="label">Number of Toilets</span>
                            <InputForm type="number" placeholder="Enter number of toilets"
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
                            <span className="label">Type of Property</span>
                            <Select 
                                placeholder="--- Select Property Type ---"
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
                            <span className="label">Type of Legal Document</span>
                            <Select 
                                placeholder="--- Select Legal Document Type ---"
                                options={[
                                    { value: null, label: '--- Select Legal Document Type ---' },
                                    { value: 'RC', label: 'Red Certificate' },
                                    { value: 'PIC', label: 'Pink Certificate' },
                                    { value: 'SC', label: 'Sales Contract' },
                                    { value: 'PEC', label: 'Pending Certificate' },
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
                            <span className="label">Select Images</span>
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
                            <span className="label">Select Listing Type</span>
                            <Select 
                                placeholder="--- Select Listing Type ---"
                                status={errors.Type ? "error" : ""}
                                style={{ width: '100%' }}
                                size="large"
                                onChange={handleTypeLand}
                            >
                                <Select.Option value="normal">Normal Listing</Select.Option>
                                <Select.Option value="vip">VIP Listing</Select.Option>
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
                            <ButtonComponent textButton={"Create New"} size="large" type="primary" onClick={handleCreateListing}/>
                            <ButtonComponent textButton={"Cancel"} size="large" color="default" variant="solid" onClick={resetInput}/>
                        </div>
                    </CreateListingBody>
                </Loading>
            </CreateListingContainer>
        </WrapperCreateListing>
    )
}