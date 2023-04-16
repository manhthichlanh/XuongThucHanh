import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import ToastMessage from "./untils";
import { useAppContext } from './context';
import './index.css';
import './form.css';
import axios from 'axios';


export default () => {
  const {  users, List, state, dispatch, fetchUsers, addUser, deleteUser } = useAppContext();
  const [listResult, setListResult] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [listUserWaiting, setListUserWaiting] = useState([]);
  
  // const endData = remainingData.filter(user => user._id === re)
  const [fullname, setFullname] = useState("");
  
  const [phone, setPhone] = useState("");

  const [entries,setEntries] = useState(true);

  const [result,setResult] = useState(false);

  const [gift, setGift] = useState("");

  
  const getResult = async () => {
    const res = await axios.get("http://localhost:3000/results");
    const data = res.data.data;
    setListResult(data);
    console.log(data);
  }
  

  const handleSpinClick = () => {

    if (!mustSpin) {
      const qua = prompt("Hãy nhập phần thưởng để tiếp tục!");
      if (!qua) return 0;
      setGift(qua)
      const newPrizeNumber = Math.floor(Math.random() * List.length);
      
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  const handleStopSpinning = () => {
    (async () => {
      const winner = List[prizeNumber].option;
      const id = List[prizeNumber].id
      console.log(winner);
      console.log(id)
      const data = {
        userId: id,
        gift
      }
      axios.post(`http://localhost:3000/results/`,data)
      .then(res=>{
        fetchUsers()
        ToastMessage(`Chúc mừng bạn ${winner} đã là người được chọn thưởng bạn ${gift}!`).success();
        const quest = prompt(`Bạn có muốn xóa ${winner} không? Y or N`);

        if (quest==='Y') deleteUser(id);
      })
      .catch(err=>{console.log(err)})
      
      setMustSpin(false);
    })()
   
  };
  const handleCreate = () => {
   (async () => {
    const data = {fullname, phone};
    setListUserWaiting([...listUserWaiting,data])
  })()
  }
  const handlAdd = () => {
    (async () => {
      try {
        if (listUserWaiting.length<=0) return ToastMessage(`Tạo thất bại`).error()

        const res = await axios.post(`http://localhost:3000/users/add`, {
          method: "post",
          user: listUserWaiting,
        });
        fetchUsers()

       
      } catch {
        ToastMessage("🚀Tạo Thất bại !").success();
      }
    })();

    if (listUserWaiting.length<=0) return 0

    setListUserWaiting((pre) => {
      console.log(pre);
      return [];
    });

  }

  function handleEntry() {
    setEntries(true)
    setResult(false)
  }
  function handleResult() {
    setEntries(false)
    setResult(true)
  }

  useEffect(() => {
   
      (async () => {

        fetchUsers()
        getResult();
      })();
  
  
  }, []);


  return (
    <>
      <div className="container">

      <div className="login-box">
          <h3 >User List</h3>
          <form>
            <div className="user-box">
              <input type="text" name="" required="" onChange={(e)=>{ setFullname(e.target.value);}}/>
              <label>Full name</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required=""onChange={(e)=>{ setPhone(e.target.value);}} />
              <label>Phone</label>
            </div>
            <div className="btn-group" >
              <a  className="btn btn-create" onClick={handleCreate}>
                <span>Create</span>
              </a>
              <a  className="btn btn-addnew" onClick={handlAdd}>
                <span>Add</span>
              </a>
            </div>

          </form>
              {listUserWaiting.length > 0 && (
                    <table className="listCreate">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUserWaiting.map((user, index) => (
                        <tr key={index}>
                          <td>{user.fullname}</td>
                          <td>{user.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
              )}
              
        </div>

        <div className="wheel-container" style={ {width: "445px", height: "445px"} }>

        {
          (List.length > 0) && (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={List}
              // backgroundColors={segColors}
              onStopSpinning={handleStopSpinning}
              radiusLineWidth={2}
              outerBorderWidth={5}
          />

          )

          
        }
          <button className='startSpin spin-button'  onClick={handleSpinClick} >Spin</button>
        </div>

        <div className="wrapper_list">
        <div >
          <button className="bg-button1 " onClick={handleEntry}>Entries</button>
          <button
            
            className="bg-button2 "
            onClick={handleResult}
          >
            Result
          </button>
          <button className="bg-primary">
            Gift
          </button>
        </div>
        {
          entries ?  (
            <section>
              <ul >
                {
                  users.map((user,index)=>{
                    return (
                      <li key={user._id}>
                        {user.fullname}
                      </li>
                    )

                  })
                }
             
              </ul>
            </section>
          ):(
            <section>
                 <table className="resultTbl">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Gift 🎁</th>
              <th>Time</th>
            </tr>
          
          </thead>
          <tbody>
            {
            listResult?.length > 0 && (
              listResult.map((list, index) => {
                if (list.gift.length) {
                  return list.gift.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{list.user.fullname}</td>
                        <td>{item.name}</td>
                        <td>{list.createdAt}</td>
                      </tr>
                    );
                  });
                } else {
                  return null;
                }
              })
            )
              // listResult.map((list, index) => {
              //   <h1>{list.gift.length}</h1>

              //   if ( list.gift.length > 0 )  {
              //     <h1>Cóa</h1>
              //   //  list.gift.map((item,index)=>{
              //   //     return (
              //   //       <tr key={index}>
              //   //         <td key={index}>{list.user.fullname}</td>
              //   //         <td key={index}>{list.gift.name}</td>
              //   //         <td key={index}>{list.createdAt}</td>
              //   //       </tr>
              //   //       )
              //   //   }) 
              //   }
                
              // })
              }
          </tbody>
        </table>
          </section>
          )
        }
      </div>

      </div>
    </>
  );
};