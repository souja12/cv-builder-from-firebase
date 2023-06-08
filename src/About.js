import { db } from "./firebase-config";
import { TimelineMax, TweenMax, Elastic } from 'gsap';
import { useParams } from "react-router-dom";
import './style.scss';
import { Container, Navbar, Row, Col, Table } from "react-bootstrap";
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DynamicField from "./dynamicField";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase-config";
// import './App.css';
import moment from "moment";
import { createContext, useEffect, useState, useRef } from 'react';
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
import { Button, Dropdown, message, Tooltip, Form, Input, Space, DatePicker, Checkbox } from 'antd';
import { Link } from "react-router-dom";


export const MyContext = createContext();
const { useForm } = Form;

function About() {

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
  const [formDataList, setFormDataList] = useState([
    {
      id: 1,
      checkboxChecked: false,
      dateFieldValue: "",
      additionalDateFieldValue: "",
      textInputValue: "",
      textSecondInputValue: "",
      textThirdInputValue: ""
    }
  ]);
  const [nextId, setNextId] = useState(2);
  const [darkMode, setDarkMode] = useState(false);



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  let { Id } = useParams();

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
      newLanguage: newLanguage, createdAt: new Date(),
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

  function deleteData(id){
    const bookDoc = doc(db, 'data', id)
        return( deleteDoc(bookDoc),
        getUsers())
  }
  // const routingLink = `http://localhost:3000/view/${id}`

  const id = 'iOJ5TgJepyhG5vbck7wG';

  
  const generatePDF = async () => {
    if (!id) {
      console.error('ID is undefined'); // Log an error if ID is not defined
      return;
    }

    const routingLink = `http://localhost:3000/view/${id}`; // Concatenate the ID with the routing link

    try {
      // Fetch the HTML content of the page using the routing link
      const response = await fetch(routingLink);
      const html = await response.text();

      // Create a new div element to wrap the HTML content
      const div = document.createElement('div');
      div.innerHTML = html;

      // Create a canvas from the div element
      const canvas = await html2canvas(div);

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Add the canvas to the PDF
      pdf.addImage(canvas, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Save the generated PDF with a filename
      pdf.save('page.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };



  return (

    <div className="App">
      <Table striped bordered hover size="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map &&
            users?.map((doc, index) => {
              // console.log(doc, "doc data");
              const name = `${doc.fullName} ${doc.lastName}`;
              // console.log(name);

              // if (index === books.length - 1) {

              return (
                <>
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name} {doc.lastName}</td>
                    <td>{doc.email}</td>
                    <td>{doc?.status}</td>
                    <div >
                      <td>
                        <Link to={`/view/${doc.id}`}>
                      <Button  
                      style={{
                      backgroundColor: "blue",
                      color: "white",
                      borderColor: "black"
                    }} 
                    variant="primary" >
                      View
                      </Button>
                      </Link>
                      </td>

                      <td>
                        <Button 
                        style={{
                      backgroundColor: "red",
                      color: "black",
                      borderColor: "black"
                    }} 
                    variant="danger" 
                    onClick={(e)=>deleteData(doc.id)}>Delete
                    </Button>
                    
                    </td>
                    <td>
                        <Button 
                        style={{
                      backgroundColor: "red",
                      color: "black",
                      borderColor: "black"
                    }} 
                    variant="danger" 
                    onClick={(e) => generatePDF()}>
                      
                      Download
                    </Button>                   
                    </td>
                    </div>
                  </tr>

                </>
              );
              // }

            })}
        </tbody>
      </Table>
    </div >


  );
}

export default About;
