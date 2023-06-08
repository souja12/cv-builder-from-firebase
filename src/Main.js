import { db } from "./firebase-config";
import { TimelineMax, TweenMax, Elastic } from 'gsap';
import './style.scss';
import { useSpring, animated } from "react-spring";
import DynamicField from "./dynamicField";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase-config";
// import './App.css';
import moment from "moment";
import { createContext, useEffect, useState, useRef } from 'react';
import { Alert, FormGroup, ButtonGroup, ToggleButton, Button as Butt } from "react-bootstrap";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    limitToLast,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { MinusCircleOutlined, PlusOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Modal,Button, Dropdown, message, Tooltip, Form, Input, Space, DatePicker, Checkbox, Switch } from 'antd';
import { Link } from "react-router-dom";


export const MyContext = createContext();
const { useForm } = Form;
const inputStyle = {
    backgroundColor: "#f8f8f8",
    border: "1px solid #0a0a0a",
    borderRadius: "3px",
    padding: "8px 16px",
    fontSize: "16px",
    color: "#555",
    width: "100%",
    marginBottom: "10px"
};

function Main({ children }) {

    const [url, setUrl] = useState("")
    const [image, setImage] = useState("")
    const [newName, setNewName] = useState("");
    const [lastName, setLastName] = useState("")
    const [newNumber, setNewNumber] = useState(0);
    const [email, setEmail] = useState("");
    const [program, setProgram] = useState("");
    const [language, setLanguage] = useState("");
    const [newLanguage, setNewLanguage] = useState([])
    const [proficiency, setProficiency] = useState([])
    const [hobbies, setHobbies] = useState("");
    const [summary, setSummary] = useState("");
    const [experience1, setExperience1] = useState("");
    const [experience2, setExperience2] = useState("");
    const [university1, setUniversity1] = useState("");
    const [pass1, setPass1] = useState("");
    const [cgpa1, setCgpa1] = useState("");
    const [university2, setUniversity2] = useState("");
    const [pass2, setPass2] = useState("");
    const [cgpa2, setCgpa2] = useState("");
    const [users, setUsers] = useState([])
    const [project1, setProject1] = useState("");
    const [project2, setProject2] = useState("");
    const [exp, setExp] = useState({ fields: [] });
    const [edu, setEdu] = useState([]);
    const [pro, setPro] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [formDataList, setFormDataList] = useState([]);
    const [nextId, setNextId] = useState(2);
    const [darkMode, setDarkMode] = useState(false);
    const [status, setStatus] = useState("Draft");
    const [flag, setFlag] = useState(true);

    const styles = useSpring({
        from: { background: "linear-gradient(to right, #66ff66, #b3ffb3)" },
        to: { background: "linear-gradient(to left, #ccffcc, #00e600)" },
        config: { duration: 5000, friction: 100 },
        loop: true
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark")
            // document.input.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    const usersCollectionRef = collection(db, "data");
    //const q = query(usersCollectionRef,  orderBy('createdAt'))
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 4,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 20,
            },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 20,
                offset: 4,
            },
        },
    };



    const onFinish = (values) => {
        console.log('Received values of form:', values)

    };



    // const onFinishh=(values, key)=>{
    //   console.log('Received values of form:', values)
    //   console.log(newLanguage)
    // }



    const uploadImage = (e) => {
        e.preventDefault();
        if (image == null)
            return;
        const imageRef = ref(storage, '/images/' + image.name)
        //   .on("state Change",alert("success"),alert) 

        // imageRef()


        //new
        // const imageRef = ref(storage,"image")

        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url)
            }).catch((error) => {
                console.log(error.message, "erreor getting image url ");
            })
            setImage(null)
        }).catch((error) => {
            console.log(error.message,);

        })

    }

    //console.log(exp);
    //console.log(users);
    const createUser = async () => {
        // e.preventDefault()

        await addDoc(usersCollectionRef, {
            name: newName, lastName: lastName, phone: Number(newNumber), email: email, program: program,
            language: language, hobbies: hobbies, summary: summary,
            experience1: experience1, experience2: experience2,
            university1: university1, pass1: pass1, cgpa1: cgpa1,
            university2: university2, pass2: pass2, cgpa2: cgpa2,
            project1: project1, project2: project2, url: url,
            image: image, exp: exp, edu: edu, pro: pro,
            newLanguage: newLanguage, createdAt: new Date(), status: status
        });
        setSubmitted(true)
        window.location.reload(false)
    };


    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setImage(selectedFile);
            setError(null);
        } else {
            setImage(null);
            setError('Please select a valid image file (png or jpg)');
        }
    };

    const onClick = ({ key }) => {
        setProficiency(key);
    };




    //console.log(newLanguage);
    const items = [
        {
            label: '1st menu item',
            key: 'expert',
        },
        {
            label: '2nd menu item',
            key: 'modarate',
        },
        {
            label: '3rd menu item',
            key: 'beginner',
        },
    ];

    const updateUser = async (id, phone) => {
        const userDoc = doc(db, "data", id);
        const newFields = { phone: phone + 1 };
        await updateDoc(userDoc, newFields);
    };
    useEffect(() => {
        const handleCheckboxChange = (event, id) => {
            const newList = formDataList.map((formData) => {
                if (formData.id === id) {
                    return {
                        ...formData,
                        checkboxChecked: event.target.checked,
                        dateFieldValue: "",
                        additionalDateFieldValue: ""
                    };
                } else {
                    return formData;
                }
            });
            setFormDataList(newList);
        };

        const handleDateFieldChange = (event, id) => {
            const newList = formDataList.map((formData) => {
                if (formData.id === id) {
                    return { ...formData, dateFieldValue: event.target.value };
                } else {
                    return formData;
                }
            });
            setFormDataList(newList);
        };

        const handleAdditionalDateFieldChange = (event, id) => {
            const newList = formDataList.map((formData) => {
                if (formData.id === id) {
                    return { ...formData, additionalDateFieldValue: event.target.value };
                } else {
                    return formData;
                }
            });
            setFormDataList(newList);
        };

        const handleTextInputChange = (event, id) => {
            const newList = formDataList.map((formData) => {
                if (formData.id === id) {
                    return { ...formData, textInputValue: event.target.value };
                } else {
                    return formData;
                }
            });
            setFormDataList(newList);
        };

        const handleSecondTextInputChange = (event, id) => {
            const newList = formDataList.map((formData) => {
                if (formData.id === id) {
                    return { ...formData, textSecondInputValue: event.target.value };
                } else {
                    return formData;
                }
            });
            setFormDataList(newList);
        };

        const handleAddField = () => {
            setFormDataList([
                ...formDataList,
                {
                    id: nextId,
                    checkboxChecked: false,
                    dateFieldValue: "",
                    additionalDateFieldValue: "",
                    textInputValue: "",
                    textSecondInputValue: ""
                }
            ]);
            setNextId(nextId + 1);
        };

        const handleRemoveField = (id) => {
            const newList = formDataList.filter((formData) => formData.id !== id);
            setFormDataList(newList);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(formDataList);
        };
        getUsers(users)
    }, [])




    const getUsers = async () => {
        // const data = await getDocs(usersCollectionRef);
        const q = query(usersCollectionRef, orderBy("createdAt"));
        const querySnapshot = await getDocs(q);
        setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    const defaultFormItemLayout = {
        labelCol: {
            xs: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 12 }
        }
    };

    const [form] = Form.useForm();


    function handleFinish(values) {
        console.log("VALUES", values);
        setNewLanguage(values)
        //alert("Check console for values");
    }

    function emailchng(event) {
        setEmail(event.target.value);
        // Email validation regex pattern
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(pattern.test(event.target.value));
    }

    //for experiance

    const handleCheckboxChange = (event, id) => {
        const newList = formDataList.map((formData) => {
            if (formData.id === id) {
                return {
                    ...formData,
                    checkboxChecked: event.target.checked,
                    dateFieldValue: "",
                    additionalDateFieldValue: ""
                };
            } else {
                return formData;
            }
        });
        setFormDataList(newList);
    };

    const handleDateFieldChange = (date, dateString, id) => {
        const newList = formDataList.map((formData) => {
            if (formData.id === id) {
                return { ...formData, dateFieldValue: dateString };
            } else {
                return formData;
            }
        });
        setFormDataList(newList);
    };

    
    const handleAdditionalDateFieldChange = (date, dateString, id) => {
        const updatedFormDataList = formDataList.map((formData) => {
            if (formData.id === id) {
                const startDate = moment(formData.dateFieldValue, "YYYY-MM-DD");
                const endDate = moment(dateString, "YYYY-MM-DD");
                if (startDate.isValid() && endDate.isValid() && endDate.isBefore(startDate)) {
                    message.error("End date cannot be earlier than start date");                   
                    return formData;
                } else {
                    return {
                        ...formData,
                        additionalDateFieldValue: dateString,
                    };
                }
            } else {
                return formData;
            }
        });
        setFormDataList(updatedFormDataList);
    };



    const handleTextInputChange = (event, id) => {
        const newList = formDataList.map((formData) => {
            if (formData.id === id) {
                return { ...formData, textInputValue: event.target.value };
            } else {
                return formData;
            }
        });
        setFormDataList(newList);
    };

    const handleSecondTextInputChange = (event, id) => {
        const newList = formDataList.map((formData) => {
            if (formData.id === id) {
                return { ...formData, textSecondInputValue: event.target.value };
            } else {
                return formData;
            }
        });
        setFormDataList(newList);
    };

    const handleThirdTextInputChange = (event, id) => {
        const newList = formDataList.map((formData) => {
            if (formData.id === id) {
                return { ...formData, textThirdInputValue: event.target.value };
            } else {
                return formData;
            }
        });
        setFormDataList(newList);
    };

    const handleAddField = () => {
        setFormDataList([
            ...formDataList,
            {
                id: nextId,
                checkboxChecked: false,
                dateFieldValue: "",
                additionalDateFieldValue: "",
                textInputValue: "",
                textSecondInputValue: "",
                textThirdInputValue: ""
            }
        ]);
        setNextId(nextId + 1);
    };

    const handleRemoveField = (id) => {
        const newList = formDataList.filter((formData) => formData.id !== id);
        setFormDataList(newList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setExp(formDataList)
        console.log("aa", formDataList);
    };
    //console.log(exp);

    //for print


    const divRef = useRef(null);

    const handlePrint = () => {
        const printContents = divRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    };

    //for image



    return (

        <div className="App">
            <animated.div style={styles}>

            <Switch
    checked={status === "Draft"}
    onChange={(checked) => {
        setStatus(checked ? "Draft" : "Compleate");
        setFlag(!checked);
    }}
    checkedChildren="Draft"
    unCheckedChildren="Compleate"
/>

                <div>
                    {/* <div>
                <label className="switch">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                    <span className="slider round"></span>
                </label>

                <input
                    type="file"
                    placeholder="Upload Image"
                    onChange={handleChange}
                />
                <button class="btn btn-primary" onClick={uploadImage}> upload</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}

                <div style={{ margin: "1px" }}></div>


                <br></br>
                <input
                    className="aa"
                    placeholder="First Name"
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
                <input
                    placeholder="Last Name"
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
                <input
                    //type="number"
                    placeholder="number..."
                    onChange={(event) => {
                        setNewNumber(event.target.value);
                    }}
                />
                <input
                    //type="number"
                    placeholder="email..."
                    onChange={
                        emailchng
                        //setEmail(event.target.value);
                    }
                />
                <input
                    //type="number"
                    placeholder="programing language"
                    onChange={(event) => {
                        setProgram(event.target.value);
                    }}
                />

                <input
                    //type="number"
                    placeholder="hobbies"
                    onChange={(event) => {
                        setHobbies(event.target.value);
                    }}
                />
                <input
                    //type="number"
                    placeholder="summary of your ethics"
                    onChange={(event) => {
                        setSummary(event.target.value);
                    }}
                />
                </div> */}

                    <div>
                        {/* <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <input
                            type="file"
                            placeholder="Upload Image"
                            onChange={handleChange}
                            style={{ marginBottom: "16px" }}
                        />
                        <Button type="primary" className="btn btn-primary" onClick={uploadImage}>
                            Upload
                        </Button>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div> */}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <input
                                type="file"
                                placeholder="Upload Image"
                                onChange={handleChange}
                                style={{ marginTop: "10px" }}
                            />
                            <Button
                                type="primary"
                                className="btn btn-primary"
                                onClick={uploadImage}
                                style={{ border: "1px solid #0a0a0a" }}
                            >
                                Upload
                            </Button>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </div>

                        <br />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexWrap: "wrap"
                            }}
                        >
                            <div style={{ marginBottom: "16px", width: "calc(45% - 22px)" }}>
                                <input
                                    placeholder="First Name"
                                    onChange={(event) => {
                                        setNewName(event.target.value);
                                    }}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "16px", width: "calc(45% - 22px)" }}>
                                <input
                                    placeholder="Last Name"
                                    onChange={(event) => {
                                        setLastName(event.target.value);
                                    }}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "16px", width: "calc(45% - 22px)" }}>
                                <input
                                    placeholder="Number"
                                    onChange={(event) => {
                                        setNewNumber(event.target.value);
                                    }}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "16px", width: "calc(45% - 22px)" }}>
                                <input
                                    placeholder="Email"
                                    onChange={emailchng}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "16px", width: "calc(45% - 22px)" }}>
                                <input
                                    placeholder="Programming Language"
                                    onChange={(event) => {
                                        setProgram(event.target.value);
                                    }}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "16px", width: "calc(45% - 22px)" }}>
                                <input
                                    placeholder="Hobbies"
                                    onChange={(event) => {
                                        setHobbies(event.target.value);
                                    }}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "16px", width: "calc(90%)" }}>
                                <textarea
                                    placeholder="Summary of Your Ethics"
                                    onChange={(event) => {
                                        setSummary(event.target.value);
                                    }}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div style={{ display: "flex" }}>
                    <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
                        <div style={{ border: "1px dotted blue", width: "240%", marginTop: "20px", marginBottom: "20px" }}>
                            <p>Languages</p>
                            <DynamicField />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <div style={{ border: "1px dotted blue", width: "50%", marginLeft: "400px", padding: "20px" }}>
                        <p>Experience</p>
                        <form onSubmit={handleSubmit}>
                            {formDataList.map((formData) => (
                                <div key={formData.id}>
                                    <Checkbox
                                        checked={formData.checkboxChecked}
                                        onChange={(event) => handleCheckboxChange(event, formData.id)}
                                    >
                                        Currently Working Here
                                    </Checkbox>
                                    <br />
                                    <DatePicker
                                        // value={
                                        //     formData.dateFieldValue
                                        //         ? moment(formData.dateFieldValue, "YYYY-MM-DD")
                                        //         : null
                                        // }
                                        onChange={(date, dateString) =>
                                            handleDateFieldChange(date, dateString, formData.id)
                                        }
                                    />
                                    <br />
                                    <DatePicker
                                        disabled={formData.checkboxChecked}
                                        // value={
                                        //     formData.additionalDateFieldValue
                                        //         ? moment(formData.additionalDateFieldValue, "YYYY-MM-DD")
                                        //         : null
                                        // }
                                        onChange={(date, dateString) =>
                                            handleAdditionalDateFieldChange(date, dateString, formData.id)
                                        }
                                    />
                                    <br />
                                    <Input
                                        placeholder="Company Name"
                                        value={formData.textInputValue}
                                        onChange={(event) => handleTextInputChange(event, formData.id)}
                                    />
                                    <br />
                                    <Input
                                        placeholder="Job Title"
                                        value={formData.textSecondInputValue}
                                        onChange={(event) =>
                                            handleSecondTextInputChange(event, formData.id)
                                        }
                                    />
                                    <Input
                                        placeholder="Job Description"
                                        value={formData.textThirdInputValue}
                                        onChange={(event) =>
                                            handleThirdTextInputChange(event, formData.id)
                                        }
                                    />
                                    <br />
                                    <MinusCircleOutlined
                                        type="danger"
                                        onClick={() => handleRemoveField(formData.id)}
                                    >

                                    </MinusCircleOutlined>
                                    <hr />
                                </div>
                            ))}
                            <Button type="primary" onClick={handleAddField}>
                                Add Field
                            </Button>
                            <br />
                            <br />
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div> */}
                    <div style={{ display: 'flex', gap: '50px', border: '1px dotted blue' }}>
                        <div style={{ flex: 1 }}>
                            <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
                                <div style={{ padding: '20px', marginBottom: '20px' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Languages</p>
                                    <DynamicField />
                                    <Form.Item style={{ textAlign: 'center', marginTop: '-55px', marginLeft: '120px' }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                        <div class="vl" style={{ borderLeft: "1px solid blue", height: "auto", marginLeft: "-10px" }}></div>
                        <div style={{ flex: 1 }}>
                            <div style={{ padding: '20px', marginBottom: '20px' }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Experience</p>
                                
                                <form onSubmit={handleSubmit}>
                                    {formDataList.map((formData) => (
                                        <div key={formData.id} style={{ marginBottom: '10px' }}>
                                            <Checkbox
                                                checked={formData.checkboxChecked}
                                                onChange={(event) => handleCheckboxChange(event, formData.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Currently Working Here
                                            </Checkbox>
                                            <DatePicker
                                                onChange={(date, dateString) => handleDateFieldChange(date, dateString, formData.id)}
                                                style={{ marginRight: '10px', border: "1px solid #0a0a0a" }}
                                            />
                                            <DatePicker
                                                disabled={formData.checkboxChecked}
                                                onChange={(date, dateString) =>
                                                    handleAdditionalDateFieldChange(date, dateString, formData.id)
                                                }
                                                style={{ marginRight: '10px', border: "1px solid #0a0a0a" }}
                                            />
                                            <Input
                                                placeholder="Company Name"
                                                value={formData.textInputValue}
                                                onChange={(event) => handleTextInputChange(event, formData.id)}
                                                style={{ marginRight: '10px', border: "1px solid #0a0a0a" }}
                                            />
                                            <Input
                                                placeholder="Job Title"
                                                value={formData.textSecondInputValue}
                                                onChange={(event) => handleSecondTextInputChange(event, formData.id)}
                                                style={{ marginRight: '10px', border: "1px solid #0a0a0a" }}
                                            />
                                            <Input
                                                placeholder="Job Description"
                                                value={formData.textThirdInputValue}
                                                onChange={(event) => handleThirdTextInputChange(event, formData.id)}
                                                style={{ marginRight: '10px', border: "1px solid #0a0a0a" }}
                                            />
                                            <MinusCircleOutlined type="danger" onClick={() => handleRemoveField(formData.id)} />
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="primary" onClick={handleAddField} style={{ marginRight: '10px', border: "1px solid #0a0a0a" }}>
                                            Add Field
                                        </Button>
                                        <Button style={{ border: "1px solid #0a0a0a" }} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={{ display: "flex", border: "1px dotted blue" }}>
                        <div style={{ width: "40%", marginTop: "15px", marginLeft: '10px' }} >
                            <p style={{ fontWeight: 'bold' }}>Education</p>
                            <Form
                                name="dynamic_form_nest_item"
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                                autoComplete="off"
                            >
                                <Form.List name="userss"

                                    rules={[
                                        {
                                            validator: async (_, userss) => {
                                                if (!userss || userss.length < 1) {
                                                    return Promise.reject(new Error('At least 1 experience'));
                                                }
                                                setEdu(userss)
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}

                                                        name={[name, 'first']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing University',

                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{ border: "1px solid #0a0a0a" }} placeholder="University" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'last']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing passing year',
                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{ border: "1px solid #0a0a0a" }} placeholder="Passing Year" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'third']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing cgpa',
                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{ border: "1px solid #0a0a0a" }} placeholder="cgpa" />
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button style={{ border: "1px solid #0a0a0a" }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add Education
                                                </Button>
                                            </Form.Item>

                                        </>
                                    )}
                                </Form.List>
                                <Form.Item>
                                    <Button style={{ border: "1px solid #0a0a0a" }} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div class="vl" style={{ borderLeft: "1px solid blue", height: "auto", marginLeft: "110px" }}></div>
                        <div style={{ width: "40%", padding: "5px", marginLeft: "60px", marginTop: "13px" }}>
                            <p style={{ fontWeight: 'bold' }}>Projects</p>
                            <Form
                                name="dynamic_form_nest_item"
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                                autoComplete="off"

                            >
                                <Form.List name="userss"

                                    rules={[
                                        {
                                            validator: async (_, userss) => {
                                                if (!userss || userss.length < 1) {
                                                    return Promise.reject(new Error('At least 1 experience'));
                                                }
                                                setPro(userss)
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}

                                                        name={[name, 'first']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing Project Name',

                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{ border: "1px solid #0a0a0a" }} placeholder="Project Name" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'last']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing Role',
                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{ border: "1px solid #0a0a0a" }} placeholder="Your Role" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'third']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing Description',
                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{ border: "1px solid #0a0a0a" }} placeholder="Description" />
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button style={{ border: "1px solid #0a0a0a" }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add Project
                                                </Button>
                                            </Form.Item>

                                        </>
                                    )}
                                </Form.List>
                                <Form.Item>
                                    <Button style={{ border: "1px solid #0a0a0a" }} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </div>

                    <br></br>
                    <div style={{ padding: "5px" }}></div>
                    <button class="btn btn-danger" style={{ width: "100%", height: "50px" }} disabled={!validEmail} onClick={createUser}> Create CV</button>
                    <br />


                </div>
            </animated.div>
            <div ref={divRef}>
                {users.map((user, index) => {
                    if (index === users.length - 1) {

                        const name = `${user.name} ${user.lastName}`;

                        return (
                            <div class="resume-wrapper">
                                <section class="profile section-padding">
                                    <div class="container">
                                        {user?.url &&
                                            <div class="picture-resume-wrapper">
                                                <div class="picture-resume">
                                                    <span>
                                                        <img src={user?.url} alt="" />
                                                    </span>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        }
                                        <div class="name-wrapper">
                                            <h1>{user.name} <br />{user.lastName}</h1>
                                            {/* <h1 style={{}}>{user.name}{user.lastName}</h1> */}
                                        </div>
                                        <div class="clearfix" style={{ marginTop: "-40px" }}></div>
                                        <div class="contact-info clearfix" style={{ marginTop: "20px" }}>
                                            <ul class="list-titles">
                                                <p>Call</p>
                                                <p>Mail</p>
                                                {/* <li>Web</li>
                                            <li>Home</li> */}
                                            </ul>
                                            <ul class="list-content ">
                                                <li style={{ color: "#66cc99" }}><b>{user.phone}</b></li>
                                                <li style={{ color: "#66cc99" }}><b>{user.email}</b></li>
                                                {/* <li><a href="#">janderson.com</a></li>
                                            <li>Los Angeles, CA</li> */}
                                            </ul>
                                        </div>
                                        <div class="contact-presentation" style={{ marginTop: "40px" }}>
                                            <p><span class="bold">Summary</span>&nbsp;&nbsp;&nbsp;{user.summary}</p>
                                            <br />
                                            <h2 class="bold"><b>Languages</b></h2>
                                        </div>
                                        <div class="contact-social clearfix" style={{ marginTop: "-40px" }}>
                                            {user?.newLanguage?.fields && user?.newLanguage?.fields?.map((item) => {

                                                return (
                                                    <>
                                                        <ul class="list-titles">
                                                            <p>{item?.name}</p>
                                                        </ul>
                                                        <ul style={{ color: "#66cc99" }} class="list-content">
                                                            <p ><b>{item?.type}</b></p>
                                                        </ul>
                                                    </>
                                                )
                                            })}
                                            {/* <ul class="list-titles">
                                                <p>{user?.newLanguage?.fields?.[0]?.name}</p>
                                                <p>{user?.newLanguage?.fields?.[1]?.name}</p>
                                                <p>{user?.newLanguage?.fields?.[2]?.name}</p>
                                            </ul>

                                            <ul style={{ color: "#66cc99" }} class="list-content">
                                                <p>{user?.newLanguage?.fields?.[0]?.type}</p>
                                                <p>{user?.newLanguage?.fields?.[1]?.type}</p>
                                                <p>{user?.newLanguage?.fields?.[2]?.type}</p>
                                            </ul> */}
                                        </div>
                                        <div style={{ marginTop: "60px" }}></div>
                                        <div className="Education">
                                            <h2 class="bold"><b>Education</b></h2>
                                            <table style={{ margin: "15px" }}>
                                                <tr>
                                                    <th>University/college</th>
                                                    <th>Passing year</th>
                                                    <th>percentage/cgpa</th>
                                                </tr>
                                                {user?.edu && user?.edu?.map((item) => {

                                                    return (
                                                        <tr>
                                                            <td>{item?.first}</td>
                                                            <td>{item?.last}</td>
                                                            <td>{item?.third}</td>
                                                        </tr>)
                                                })}
                                                {/* <tr>
                                                    <td>{user?.edu[1]?.first}</td>
                                                    <td>{user.edu[1]?.last}</td>
                                                    <td>{user.edu[1]?.third}</td>
                                                </tr>
                                                <tr>
                                                    <td>{user?.edu[2]?.first}</td>
                                                    <td>{user.edu[2]?.last}</td>
                                                    <td>{user.edu[2]?.third}</td>
                                                </tr>
                                                <tr>
                                                    <td>{user?.edu[3]?.first}</td>
                                                    <td>{user.edu[3]?.last}</td>
                                                    <td>{user.edu[3]?.third}</td>
                                                </tr>
                                                <tr>
                                                    <td>{user?.edu[4]?.first}</td>
                                                    <td>{user.edu[4]?.last}</td>
                                                    <td>{user.edu[4]?.third}</td>
                                                </tr> */}
                                            </table>
                                        </div>
                                    </div>
                                </section>

                                <section class="experience section-padding">
                                    <div class="container">
                                        <h3 class="experience-title">Experience</h3>

                                        <div class="experience-wrapper">
                                            {Array.isArray(user?.exp) &&
                                                user?.exp.map((item) => {
                                                    return (
                                                        <>
                                                            <div class="company-wrapper clearfix">
                                                                <div class="experience-title">{item?.textInputValue}</div>
                                                                <div class="time">
                                                                    {item?.dateFieldValue}&nbsp;
                                                                    {item?.additionalDateFieldValue !== ""
                                                                        ? item?.additionalDateFieldValue
                                                                        : "(Current Company)"}
                                                                </div>
                                                            </div>

                                                            <div class="job-wrapper clearfix">
                                                                <div class="experience-title">{item?.textSecondInputValue} </div>
                                                                <div class="company-description">
                                                                    <p>{item?.textThirdInputValue}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })}


                                            {/* <div class="company-wrapper clearfix">
                                                <div class="experience-title">{user?.exp?.[1]?.textInputValue}</div>
                                                <div class="time">{user?.exp?.[1]?.dateFieldValue}&nbsp;
                                                    {user?.exp?.[1]?.additionalDateFieldValue !== "" ? user?.exp?.[1]?.additionalDateFieldValue : "(Current Company)"}</div>
                                            </div>

                                            <div class="job-wrapper clearfix">
                                                <div class="experience-title">{user?.exp?.[1]?.textSecondInputValue}</div>
                                                <div class="company-description">
                                                    <p>{user?.exp?.[1]?.textThirdInputValue}</p>
                                                </div>
                                            </div>

                                            <div class="company-wrapper clearfix">
                                                <div class="experience-title">{user?.exp?.[2]?.textInputValue}</div>
                                                <div class="time">{user?.exp?.[2]?.dateFieldValue}&nbsp;
                                                    {user?.exp?.[2]?.additionalDateFieldValue !== "" ? user?.exp?.[2]?.additionalDateFieldValue : "(Current Company)"}</div>
                                            </div>

                                            <div class="job-wrapper clearfix">
                                                <div class="experience-title">{user?.exp?.[2]?.textSecondInputValue} </div>
                                                <div class="company-description">
                                                    <p>{user?.exp?.[2]?.textThirdInputValue}</p>
                                                </div>
                                            </div> */}
                                            <h3 class="experience-title">Projects</h3>
                                            {Array.isArray(user?.pro) &&
                                                user?.pro.map((item) => {
                                                    return (
                                                        <>
                                                            <div class="company-wrapper clearfix">
                                                                <div class="experience-title">{item?.first}</div>
                                                                {/* <div class="time">
                                                                    {item?.dateFieldValue}&nbsp;
                                                                    {item?.additionalDateFieldValue !== ""
                                                                        ? item?.additionalDateFieldValue
                                                                        : "(Current Company)"}
                                                                </div> */}
                                                            </div>

                                                            <div class="job-wrapper clearfix">
                                                                <div class="experience-title">{item?.last} </div>
                                                                <div class="company-description">
                                                                    <p>{item?.third}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                        </div>

                                    </div>
                                    <div class="section-wrapper clearfix">
                                        <h3 class="section-title">Skills</h3>
                                        {/* <ul>
                                            <li>HTML / HTML5</li>
                                            <li>CSS / CSS3 / SASS / LESS</li>
                                            <li>Javascript</li>
                                            <li>Jquery</li>
                                            <li>Wordpress</li>
                                            <li>Photoshop</li>

                                        </ul> */}
                                        <p>{user?.program}</p>

                                    </div>

                                    <div class="section-wrapper clearfix">
                                        <h3 class="section-title">Hobbies</h3>
                                        <p>{user.hobbies}</p>
                                    </div>

                                </section>

                                <div class="clearfix"></div>
                            </div>
                        )
                    }
                })}
            </div>
            <br />
            <div style={{ alignItems: "center", display: "flex" }}>
                <div style={{ margin: "22px" }}>
                    <Button type="primary" onClick={handlePrint}>Print Your CV</Button>
                </div>
                <div>
                    <Button type="primary"><Link to="/about">Show History</Link></Button>
                </div>
            </div>
        </div>


    );
}

export default Main;
