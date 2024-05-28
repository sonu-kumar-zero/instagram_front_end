import React from 'react'

interface SignUpBoxProps {
}


const SignUpBox: React.FC<SignUpBoxProps> = () => {
    return (
        <>
            <form className='flex flex-col gap-1 '>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='username' className='text-xs text-[#dedede66]'>UserName</label>
                    <input type='text' placeholder='' id='username' name='username' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='email' className='text-xs text-[#dedede66]'>Email</label>
                    <input type='text' placeholder='' id='email' name='email' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='password' className='text-xs text-[#dedede66]'>Password</label>
                    <input placeholder='' type='password' id='password' name='password' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='confirmPassword' className='text-xs text-[#dedede66]'>Confirm Password</label>
                    <input placeholder='' type='confirmPassword' id='confirmPassword' name='confirmPassword' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' />
                </div>
                <div className="py-2">
                    <button className='w-full text-[#dedede] bg-[#00bfffbb] rounded py-2' onClick={
                        (e) => {
                            e.preventDefault();
                        }
                    }>Sign Up</button>
                </div>
            </form>
        </>
    )
}

export default SignUpBox
