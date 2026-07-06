import React, { useReducer } from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])
    const [visiblePasswords, setVisiblePasswords] = useState({});

const getpasswords= async() => {
  
    let req=await fetch("http://localhost:3000/")
    let passwords =  await req.json()

       
            setpasswordarray((passwords))
     
}



    useEffect(() => {
        getpasswords()
        
    }, [])


    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const showpassword = () => {
        if (passwordref.current.type === "password") {
            passwordref.current.type = "text";
            ref.current.src = "icons/eye.png";
        } else {
            passwordref.current.type = "password";
            ref.current.src = "icons/eyecross.png";
        }
    };

    const copytext = (text) => {
        navigator.clipboard.writeText(text);

        toast("Text Copied!");
    }

    const savepassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            if (form.id) {
                await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            }

            const newpassword = { ...form, id: uuidv4() }

            setpasswordarray([...passwordarray, newpassword])
            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, newpassword]))
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newpassword) })

            // console.log(...passwordarray, form)
            setform({ site: "", username: "", password: "" })
        } else {
            alert("Cant save an empty password")
        }
    }
    
    const deletepassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordarray(passwordarray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editpassword = (id) => {

        console.log("Editing password with id ", id)
        setform({...passwordarray.filter(i => i.id === id)[0], id: id})
        setpasswordarray(passwordarray.filter(item => item.id !== id))

    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={true}
                pauseOnHover={false}
                theme="dark"
            />
            <div className="fixed inset-0 -z-10 h-screen w-screen bg-gray-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="mycontainer px-4 md:px-8 lg:px-12">
                <h1 className="text-4xl text font-bold text-center">
                    <span className="text-green-700">&lt;</span>

                    <span>Cipher</span>
                    <span className="text-green-700">Key/&gt;</span>
                </h1>

                <p className="text-green-900 text-lg font-semibold text-center">
                    Protecting Your Digital Keys
                </p>

                <div className="flex flex-col p-4 text-black gap-3 items-center">
                    <input
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id="site"
                        value={form.site}
                        onChange={handlechange}
                        placeholder='Enter Website URL'
                    />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                        <input
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id="username"
                            value={form.username}
                            onChange={handlechange}


                            placeholder='Enter Username'
                        />

                        <div className="relative">


                            <input
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handlechange}
                                ref={passwordref}
                                placeholder='Enter Password'
                            />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showpassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savepassword} className=' px-8 flex justify-center items-center bg-green-400 hover:bg-green-600 rounded-full py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save Password</button>
                </div >
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordarray.length === 0 && <div>No Passwords to show</div>}
                    {passwordarray.length != 0 && <div className="overflow-x-auto">
                        <table className="table-fixed w-full min-w-[700px] rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="w-[40%] py-2 px-2">Site</th>
                                    <th className="w-[25%] py-2 px-2">Username</th>
                                    <th className="w-[25%] py-2 px-2">Password</th>
                                    <th className="w-[10%] py-2 px-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="bg-green-100">
                                {passwordarray.map((item) => (
                                    <tr key={item.id}>
                                        {/* Site */}
                                        <td className="border border-white p-2 align-middle">
                                            <div className="flex items-center justify-between gap-2">
                                                <a
                                                    href={item.site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="break-all flex-1 text-center hover:text-blue-600"
                                                >
                                                    {item.site}
                                                </a>

                                                <div
                                                    className="size-7 cursor-pointer shrink-0"
                                                    onClick={() => copytext(item.site)}
                                                >
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Username */}
                                        <td className="border border-white p-2 align-middle">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="break-all flex-1 text-center">
                                                    {item.username}
                                                </span>

                                                <div
                                                    className="size-7 cursor-pointer shrink-0"
                                                    onClick={() => copytext(item.username)}
                                                >
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Password */}
                                      
                                        <td className="border border-white p-2">
                                            <div className="flex justify-center items-center gap-2">

                                                <span className="flex-1 break-all text-center">
                                                    {visiblePasswords[item.id] ? item.password : "•".repeat(item.password.length)}
                                                </span>
                                                <div className='flex gap-3'>

                                                    <img
                                                        src={visiblePasswords[item.id] ? "icons/eye.png" : "icons/eyecross.png"}
                                                        alt="toggle"
                                                        className="w-5 h-5 cursor-pointer flex-shrink-0"
                                                        onClick={() => togglePasswordVisibility(item.id)}
                                                    />

                                                    <div
                                                        className="cursor-pointer flex-shrink-0"
                                                        onClick={() => copytext(item.password)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "22px", height: "22px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>

                                                </div>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="border border-white p-2 align-middle">
                                            <div className="flex justify-center items-center gap-2">
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => editpassword(item.id)}
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>

                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => deletepassword(item.id)}
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager
