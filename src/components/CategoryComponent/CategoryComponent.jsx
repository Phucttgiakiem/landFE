import { useState,useEffect } from "react";
import { CategoryOverlay,CategoryDialog,Categoryheader,Categorybody } from "./style";
import { Input,Select } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark}from '@fortawesome/free-solid-svg-icons';
export default function CategoryComponent ({
    open,
    loading,
    onClose,
    category,
    onCreate,
    onUpdate,
}){
    const [name,setName] = useState("");
    const [typePost,setTypepost] = useState("");
    const [friendlyURL,setFriendlyURL] = useState("");
    const [errors,setErrors] = useState({});
    const isEdit = !!category;

    useEffect(() => {
        if(category) {
            setName(category.Name);
            setTypepost(category.Type || "");
            setFriendlyURL(category.NameSlug || "");
        }else {
            setName("");
            setTypepost("");
            setFriendlyURL("");
        }
    },[category]);

    const validate = () => {
        let newErrors = {};
        if(!name){
            newErrors.name = "Nhập tên danh mục"
        }
        if(!typePost){
            newErrors.typePost ="Vui lòng chọn loại danh mục tin"
        }
        if(!friendlyURL){
            newErrors.friendlyURL = "Vui lòng nhập tên miền thân thiện"
        }
        return newErrors;
    }
    const ResetModal = () => {
        setName("");
        setTypepost("");
        setFriendlyURL("");
        setErrors("")
    }

    const handleSubmit = async () => {
        const newErrors = validate();

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        setErrors({})
        const payload = {
            name,
            typePost,
            friendlyURL,
            friendlyTypePostURL: typePost === "Nhà đất bán"? "Nha-dat-ban" : "Nha-dat-cho-thue"
        };
        if (isEdit) {
            await onUpdate(category._id,payload);
        }else {
            await onCreate(payload);
        }
    };
    if(!open) return null;
    return (
        <CategoryOverlay>
            <CategoryDialog>
                <Categoryheader>
                    <h2>{isEdit ? "Chỉnh sửa danh mục" : "Tạo danh mục"}</h2>
                    <FontAwesomeIcon icon={faXmark} onClick={() =>{ResetModal(); onClose()}}/>
                </Categoryheader>
                <Categorybody>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên danh mục" size="large" />
                    {
                        errors.name && (
                            <span style={{ color: "red", marginBottom: 10 }}>
                                {errors.name}
                            </span>
                        )
                    }
                    <Select
                        value={typePost}
                        options={[
                            {value:"",label: <span>-------- Chọn loại tin --------</span>},
                            {value: "Nhà đất bán",label: <span>Bán</span>},
                            {value: "Nhà đất cho thuê",label: <span>Cho thuê</span>},
                        ]}
                        onChange={setTypepost}
                        size="large"
                        style={{width:"100%"}}
                    />
                    {
                        errors.typePost && (
                            <span style={{ color: "red", marginBottom: 10 }}>
                                {errors.typePost}
                            </span>
                        )
                    }
                    <Input value={friendlyURL} onChange={(e) => setFriendlyURL(e.target.value)} placeholder="Nhập đường dẫn thân thiện" size="large"/>
                    {
                        errors.friendlyURL && (
                            <span style={{ color: "red", marginBottom: 10 }}>
                                {errors.friendlyURL}
                            </span>
                        )
                    }
                    <ButtonComponent 
                        loading={loading}
                        size="large" 
                        className="btn-submit"
                        onClick={() => handleSubmit()} 
                        textButton={"Gửi"}
                        disabled={loading}
                    />
                </Categorybody>
            </CategoryDialog>
        </CategoryOverlay>
    )
}