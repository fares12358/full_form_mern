import React, { useEffect, useState } from 'react'
const Addresses = () => {
  const [data, setData] = useState([
    {
      name: "ad1",
      desc: "fasdee",
      phone1: "fasdee",
      phone2: "fasdee",
      city: "fasdee",
      location: "fasdee",
    }
  ]);
  const [viewAdd, setviewAdd] = useState(false);
  const [mood, setMood] = useState('add');
  const [address, setAddress] = useState(null);
  const [name, setName] = useState('');
  const [desc, setdesc] = useState('')
  const [phone1, setphone1] = useState('')
  const [phone2, setphone2] = useState('')
  const [city, setcity] = useState('')
  const [location, setlocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood === 'edit' && address !== null) {
      const updatedData = data.map((item, index) =>
        index === address.id
          ? { name, desc, phone1, phone2, city, location }
          : item
      );
      setData(updatedData);
      console.log('Updated data:', updatedData);
      setviewAdd(false);
    } else if (mood === 'add') {
      const newData = [...data, { name, desc, phone1, phone2, city, location }];
      setData(newData);
      console.log('New data added:', newData);
      setviewAdd(false);
    }
  };


  useEffect(() => {
    if (mood === 'edit') {
      setName(address.name);
      setdesc(address.desc);
      setphone1(address.phone1);
      setphone2(address.phone2);
      setcity(address.city);
      setlocation(address.location);
    } else {
      setName('');
      setdesc('');
      setphone1('');
      setphone2('');
      setcity('');
      setlocation('');
    }
  }, [mood, address])

  return (
    viewAdd ?
      <div className="w-full h-full flex flex-col items-start justify-start p-1 md:p-0 gap-1 overflow-auto">
        <img src="/svg/close-com copy.svg" alt="close" className='w-[25px] h-[25px] md:w-[30px] md:h-[30px] self-end cursor-pointer' onClick={() => { setviewAdd(false) }} />
        <form className=' w-full h-full overflow-auto md:p-5 flex flex-col items-center md:items-start justify-start gap-5 pb-5 md:pb-0'>
          <h1 className=' text-[15px] md:text-lg text-[#B6349A]'>{mood === 'add' ? 'Add A New Address' : 'Edit Address'}</h1>
          <p className='text-[12px] md:text-[15px] w-full text-start'>Address name</p>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className='focus:outline-none border border-[#B6349A] px-2 py-1 w-[400px] max-w-[100%] rounded-md text-[12px] font-extralight' />
          <p className='text-[12px] md:text-[15px] w-full text-start'>Address description</p>
          <textarea maxLength={400} value={desc} onChange={(e) => { setdesc(e.target.value) }} className='focus:outline-none border border-[#B6349A] p-1 w-[400px] min-h-[100px] max-h-[400px] max-w-[100%] rounded-md text-[12px] font-extralight' />
          <p className='text-[12px] md:text-[15px] w-full text-start'>phone numper</p>
          <input type="text" value={phone1} onChange={(e) => { setphone1(e.target.value) }} className='focus:outline-none border border-[#B6349A] px-2 py-1 w-[400px] max-w-[100%] rounded-md text-[12px] font-extralight' />
          <p className='text-[12px] md:text-[15px] w-full text-start'>another phone numper</p>
          <input type="text" value={phone2} onChange={(e) => { setphone2(e.target.value) }} className='focus:outline-none border border-[#B6349A] px-2 py-1 w-[400px] max-w-[100%] rounded-md text-[12px] font-extralight' />
          <p className='text-[12px] md:text-[15px] w-full text-start'>city</p>
          <input type="text" value={city} onChange={(e) => { setcity(e.target.value) }} className='focus:outline-none border border-[#B6349A] px-2 py-1 w-[400px] max-w-[100%] rounded-md text-[12px] font-extralight' />
          <div className="flex flex-col items-start justify-start gap-2 w-full">
          </div>
          <button className='flex w-full items-center justify-start gap-1 text-[#B6349A] text-[12px]' onClick={handleSubmit}><img src="/svg/add-com.svg" alt="add" className='w-[20px] h-[20px]' />{mood === 'add' ? 'Add' : 'Edit'}</button>
        </form>
      </div>
      :
      <div className='w-full h-full flex flex-col items-start justify-start p-1 md:p-5 gap-5 overflow-auto' >
        <h3 className='md:text-2xl'>My Addresses</h3>
        {
          data.map((item, i) => (

            <div key={i} className="h-fit w-full border border-[#F0EEF0] rounded-xl p-5 flex items-center justify-start gap-5">

              <label className="border-2 border-[#B6349A] rounded-full p-[2px] md:p-1  flex items-center self-start md:self-center cursor-pointer">
                <input type="radio" name="address" id="" className='peer hidden' />
                <div className="md:h-3 h-[5px] w-[5px] md:w-3 rounded-full peer-checked:border-[#B6349A] peer-checked:bg-[#B6349A] transition-colors"></div>
              </label>

              <div className="flex flex-col items-start">
                <h4 className='md:text-xl text-[16px] font-medium'>{item.name}</h4>
                <p className='text-[#9C939D] font-light  text-[10px] md:text-[14px] max-w-full'>{item.desc}</p>
              </div>
              <div onClick={() => { setviewAdd(true); setMood('edit'); setAddress({ id: i, ...item }); }} className="md:text-[15px] text-[8px] font-medium text-[#B6349A] ml-auto cursor-pointer flex items-center justify-center gap-1 self-start md:self-center">
                <img src="/svg/edit-com.svg" alt="edit" className='w-[16px] h-[16px] md:w-[20px] md:h-[20px]' />
                Edit
              </div>
            </div>
          ))
        }
        <div className="text-[10px] md:text-[14px] font-medium text-[#B6349A] cursor-pointer mb-10 flex items-center justify-center" onClick={() => { setviewAdd(true); setMood('add'); setAddress(null); }}>
          <img src="/svg/add-com.svg" alt="" className='w-[20px] h-[20px] md:w-[25px] md:h-[25px]' />
          Add address
        </div>
      </div>

  )
}

export default Addresses