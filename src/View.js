
import { React, useState, useEffect, useRef } from 'react'
import { Divider, Space, Tag, Button, Checkbox, DatePicker, Input } from "antd";
import { useHistory, useParams, Link } from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAvpIqIQk95-o769_QaGd2ADVxOE7gz1hY",
    authDomain: "cv-crud.firebaseapp.com",
    projectId: "cv-crud",
    storageBucket: "cv-crud.appspot.com",
    messagingSenderId: "233970891260",
    appId: "1:233970891260:web:7398c43851f8e653939a79",
    measurementId: "G-JNK5PFBQ5W"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const View = () => {
    const [user, setUser] = useState([])

    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const doc = await db.collection('data').doc(id).get();
            setUser(doc.data());
        }
        fetchData();
    }, [id]);

    console.log(user);
    return (
        <div>
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
                                <li>Call</li>
                                <li>Mail</li>
                                {/* <li>Web</li>
                                            <li>Home</li> */}
                            </ul>
                            <ul class="list-content ">
                                <li>{user.phone}</li>
                                <li>{user.email}</li>
                                {/* <li><a href="#">janderson.com</a></li>
                                            <li>Los Angeles, CA</li> */}
                            </ul>
                        </div>
                        <div class="contact-presentation" style={{ marginTop: "20px" }}>
                            <p><span class="bold">Summary</span>&nbsp;&nbsp;&nbsp;{user.summary}</p>
                            <br />
                            <h2 class="bold"><b>Languages</b></h2>
                        </div>
                        <div class="contact-social clearfix" style={{ marginTop: "-60px" }}>
                            <ul class="list-titles">
                                <p>{user?.newLanguage?.fields?.[0]?.name}</p>
                                <p>{user?.newLanguage?.fields?.[1]?.name}</p>
                                <p>{user?.newLanguage?.fields?.[2]?.name}</p>
                            </ul>

                            <ul style={{ color: "#66cc99" }} class="list-content">
                                <li><a >{user?.newLanguage?.fields?.[0]?.type}</a></li>
                                <li><a >{user?.newLanguage?.fields?.[1]?.type}</a></li>
                                <li><a >{user?.newLanguage?.fields?.[2]?.type}</a></li>
                            </ul>
                        </div>
                        <div className="Education">
                            <h2 class="bold"><b>Education</b></h2>
                            <table style={{ margin: "5px" }}>
                                <tr>
                                    <th>University/college</th>
                                    <th>Passing year</th>
                                    <th>percentage/cgpa</th>
                                </tr>
                                <tr>
                                    <td>{user?.edu?.[0]?.first}</td>
                                    <td>{user.edu?.[0]?.last}</td>
                                    <td>{user.edu?.[0]?.third}</td>
                                </tr>
                                <tr>
                                    <td>{user?.edu?.[1]?.first}</td>
                                    <td>{user.edu?.[1]?.last}</td>
                                    <td>{user.edu?.[1]?.third}</td>
                                </tr>
                                <tr>
                                    <td>{user?.edu?.[2]?.first}</td>
                                    <td>{user.edu?.[2]?.last}</td>
                                    <td>{user.edu?.[2]?.third}</td>
                                </tr>
                                <tr>
                                    <td>{user?.edu?.[3]?.first}</td>
                                    <td>{user.edu?.[3]?.last}</td>
                                    <td>{user.edu?.[3]?.third}</td>
                                </tr>
                                <tr>
                                    <td>{user?.edu?.[4]?.first}</td>
                                    <td>{user.edu?.[4]?.last}</td>
                                    <td>{user.edu?.[4]?.third}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>

                <section class="experience section-padding">
                    <div class="container">
                        <h3 class="experience-title">Experience</h3>

                        <div class="experience-wrapper">
                            <div class="company-wrapper clearfix">
                                <div class="experience-title">{user?.exp?.[0]?.textInputValue}</div>
                                <div class="time">{user?.exp?.[0]?.dateFieldValue}&nbsp;
                                    {user?.exp?.[0]?.additionalDateFieldValue !== "" ? user?.exp?.[0]?.additionalDateFieldValue : "(Current Company)"}</div>
                            </div>

                            <div class="job-wrapper clearfix">
                                <div class="experience-title">{user?.exp?.[0]?.textSecondInputValue} </div>
                                <div class="company-description">
                                    <p>{user?.exp?.[0]?.textThirdInputValue}</p>
                                </div>
                            </div>

                            <div class="company-wrapper clearfix">
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
                            <p></p>

                        </div>

                        <div class="section-wrapper clearfix">
                            <h3 class="section-title">Hobbies</h3>
                            <p>{user.hobbies}</p>
                        </div>

                    </div>
                </section>

                <div class="clearfix"></div>
            </div>
        </div>
    )
}

export default View
