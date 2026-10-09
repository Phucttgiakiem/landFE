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
            newErrors.name = "Please enter a category name";
        }
        if(!typePost){
            newErrors.typePost ="Please select a post type";
        }
        if(!friendlyURL){
            newErrors.friendlyURL = "Please enter a friendly URL";
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
            friendlyTypePostURL: typePost === "Sale"? "Sale-property" : "Rental-property"
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
                    <h2>{isEdit ? "Edit Category" : "Create Category"}</h2>
                    <FontAwesomeIcon icon={faXmark} onClick={() =>{ResetModal(); onClose()}}/>
                </Categoryheader>
                <Categorybody>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" size="large" />
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
                            {value:"",label: <span>-------- Select Post Type --------</span>},
                            {value: "Sale",label: <span>Sale</span>},
                            {value: "Rental",label: <span>Rental</span>},
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
                    <Input value={friendlyURL} onChange={(e) => setFriendlyURL(e.target.value)} placeholder="Enter friendly URL" size="large"/>
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
                        textButton={"Submit"}
                        disabled={loading}
                    />
                </Categorybody>
            </CategoryDialog>
        </CategoryOverlay>
    )
}