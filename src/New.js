// {users.map((user, index) => {
//     if (index === users.length - 2) {

//         const name = `${user.name} ${user.lastName}`;

//         return (

//             <div ref={divRef}>

//                 <br></br>
//                 <br></br>
//                 {" "}
                
//                 <div className="full">
//                     <div className="left">
//                         <div className="image">
//                             <img src={user?.url}
//                                 style={{ width: "100px", height: "100px" }} />
//                         </div>
                        

//                         <br></br>
//                         <br></br>
//                         <div className="Contact">
//                             <h2>Contact</h2>
//                             <p><b>Email id:</b>{user.email}</p>
//                             <p><b>Mobile no :</b>{user.phone}</p>
//                         </div>
//                         <div className="Skills">
//                             <h2>Skills</h2>
//                             <ul>
//                                 <li><b>Programming Languages :
//                                     {user.program}</b></li>
                                
//                             </ul>
//                         </div>
//                         <div className="Language">
//                             <h2>Language</h2>
//                             <h6>Language&nbsp;&nbsp;Proficiency</h6>
//                             <ul>
//                                 <p>{user?.newLanguage?.fields?.[0]?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     {user?.newLanguage?.fields?.[0]?.type}</p>
//                                 <p>{user?.newLanguage?.fields?.[1]?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     {user?.newLanguage?.fields?.[1]?.type}</p>
//                                 <p>{user?.newLanguage?.fields?.[2]?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     {user?.newLanguage?.fields?.[2]?.type}</p>
//                                 <p>{user?.newLanguage?.fields?.[3]?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     {user?.newLanguage?.fields?.[3]?.type}</p>

//                             </ul>
//                         </div>
//                         <div className="Hobbies">
//                             <h2>Hobbies</h2>
//                             <ul>
//                                 <li>{user.hobbies}</li>
                               
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="right">
//                         <div className="name">

//                             <h1 id="name">
//                                 {name
//                                     .toLowerCase()
//                                     .split(" ")
//                                     .map(
//                                         (word) =>
//                                             word.charAt(0).toUpperCase() + word.slice(1)
//                                     )
//                                     .join(" ")}
//                             </h1>
                         
//                         </div>
                  
//                         <div className="Summary">
//                             <h2>Summary</h2>
//                             <p>{user.summary}
//                             </p>
//                         </div>
//                         <div className="Experience">
//                             <h2>Experience</h2>
//                             <h4>{user?.exp?.[0]?.textInputValue}</h4>
//                             <p>
//                                 {user?.exp?.[0]?.textSecondInputValue}&nbsp;&nbsp;&nbsp;&nbsp;
//                                 {user?.exp?.[0]?.dateFieldValue}&nbsp;
//                                 {user?.exp?.[0]?.additionalDateFieldValue !== "" ? user?.exp?.[0]?.additionalDateFieldValue : "(Current Company)"}
//                             </p>

//                             <h4>{user?.exp?.[1]?.textInputValue}</h4>
//                             <p>
//                                 {user?.exp?.[1]?.textSecondInputValue}&nbsp;&nbsp;&nbsp;&nbsp;
//                                 {user?.exp?.[1]?.dateFieldValue}&nbsp;
//                                 {user?.exp?.[1]?.additionalDateFieldValue !== "" ? user?.exp?.[1]?.additionalDateFieldValue : "(Current Company)"}
//                             </p>

//                             <h4>{user?.exp?.[2]?.textInputValue}</h4>
//                             <p>
//                                 {user?.exp?.[2]?.textSecondInputValue}&nbsp;&nbsp;&nbsp;&nbsp;
//                                 {user?.exp?.[2]?.dateFieldValue}&nbsp;
//                                 {user?.exp?.[2]?.additionalDateFieldValue !== "" ? user?.exp?.[2]?.additionalDateFieldValue : "(Current Company)"}
//                             </p>
//                             <h4>{user?.exp?.[3]?.textInputValue}</h4>
//                             <p>
//                                 {user?.exp?.[3]?.textSecondInputValue}&nbsp;&nbsp;&nbsp;&nbsp;
//                                 {user?.exp?.[3]?.dateFieldValue}&nbsp;
//                                 {user?.exp?.[3]?.additionalDateFieldValue !== "" ? user?.exp?.[3]?.additionalDateFieldValue : "(Current Company)"}
//                             </p>


//                         </div>
                        // <div className="Education">
                        //     <h2>Education</h2>
                        //     <table>
                        //         <tr>
                        //             <th>University/college</th>&nbsp;
                        //             <th>Passing year</th>&nbsp;
                        //             <th>percentage/cgpa</th>
                        //         </tr>
                        //         <tr>
                        //             <td>{user?.edu[0]?.first}</td>
                        //             <td>{user.edu[0]?.last}</td>&nbsp;
                        //             <td>{user.edu[0]?.third}</td>
                        //         </tr>
                        //         <tr>
                        //             <td>{user?.edu[1]?.first}</td>
                        //             <td>{user.edu[1]?.last}</td>&nbsp;
                        //             <td>{user.edu[1]?.third}</td>
                        //         </tr>
                        //         <tr>
                        //             <td>{user?.edu[2]?.first}</td>
                        //             <td>{user.edu[2]?.last}</td>&nbsp;
                        //             <td>{user.edu[2]?.third}</td>
                        //         </tr>
                        //         <tr>
                        //             <td>{user?.edu[3]?.first}</td>
                        //             <td>{user.edu[3]?.last}</td>&nbsp;
                        //             <td>{user.edu[3]?.third}</td>
                        //         </tr>
                        //         <tr>
                        //             <td>{user?.edu[4]?.first}</td>
                        //             <td>{user.edu[4]?.last}</td>&nbsp;
                        //             <td>{user.edu[4]?.third}</td>
                        //         </tr>
                        //     </table>
                        // </div>
//                         <div className="project">
//                             <ul>
//                                 <li>
//                                     <h2>Projects</h2>
//                                     <h5>{user?.pro[0]?.first}</h5>
//                                     <h6>{user?.pro[0]?.last}</h6>
//                                     <p>{user?.pro[0]?.third}</p>
//                                     <h5>{user?.pro[1]?.first}</h5>
//                                     <h6>{user?.pro[1]?.last}</h6>
//                                     <p>{user?.pro[1]?.third}</p>
//                                     <h5>{user?.pro[2]?.first}</h5>
//                                     <h6>{user?.pro[2]?.last}</h6>
//                                     <p>{user?.pro[2]?.third}</p>
//                                     <h5>{user?.pro[3]?.first}</h5>
//                                     <h6>{user?.pro[3]?.last}</h6>
//                                     <p>{user?.pro[3]?.third}</p>
//                                 </li>
                               
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

// })}