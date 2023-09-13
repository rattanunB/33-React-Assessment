import React, { useEffect, useState } from "react";
import "./homeContent.css";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const HomeContent = (prop) => {
  const secter = prop.secter;
  const [members, setMembers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", lastname: "", position: "" }); // สร้าง state สำหรับข้อมูลผู้ใช้ใหม่

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(
          "https://jsd5-mock-backend.onrender.com/members"
        );
        setMembers(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    }

    fetchMembers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsd5-mock-backend.onrender.com/member/${userId}`);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== userId));
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบผู้ใช้งาน:", error);
    }
  };

  const handleSaveUser = async () => {
    try {
      const newUserWithId = { ...newUser, id: uuidv4() }; // เพิ่ม ID สุ่มในข้อมูลผู้ใช้งานใหม่
      console.log(newUserWithId)
      
      await axios.post("https://jsd5-mock-backend.onrender.com/members", newUserWithId);
  
      // หลังจากสร้างผู้ใช้งานสำเร็จ อัปเดต state โดยเพิ่มผู้ใช้งานใหม่
      setMembers((prevMembers) => [...prevMembers, newUserWithId]);
  
      // ล้างข้อมูลใน input หลังจากสร้างผู้ใช้งานเสร็จ
      setNewUser({ name: "", lastname: "", position: "" });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้งาน:", error); 
    }
  };
  

  return (
    <div className="HomeContent">
      {secter === "User" && (
        <div>
          <table border="1" className="table">
            <thead>
              <tr>
                <th>name</th>
                <th>lastname</th>
                <th>position</th>
              </tr>
            </thead>
            <tbody>
              {members.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {secter === "Admin" && (
        <div className="infoAdmin">
          <div className="createUser">
            <h2>Create User here</h2>
            <div className="inputWrap">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Lastname"
                value={newUser.lastname}
                onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
              />
              <input
                type="text"
                placeholder="Position"
                value={newUser.position}
                onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
              />
              <button className="saveBtn" onClick={handleSaveUser}>
                Save
              </button>
            </div>
          </div>
          <table border="1" className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.position}</td>
                  <td
                      className="deleteBtn"
                      onClick={() => handleDeleteUser(employee.id)}
                    >
                      Delete

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
