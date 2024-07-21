import React from 'react'
import Ripple from '../Loading/Ripple'
import logo from "./../assets/images/afiacare.svg";
import logoFull from "./../assets/images/afiacare_full.svg";
import PulseCustom from '../Loading/PulseCustom';

export default function MainLoad(props) {
    return (
        <>
            <div className="bg-green-100 fixed -top-20 -left-40 w-[400px] max-sm:w-[300px] z-50 h-[300px] rounded-r-full rounded-b-full">
                <img src={logo} alt="" srcset="" className='w-[200px] max-sm:w-[160px] h-[200px] ml-auto mt-20' />
            </div>
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <Ripple />
                <div>
                    {props.title ? <>
                        <center className='text-[#3a8a44] text-xl'>Afia Care</center>
                    </> :
                        <div className='w-[180px] h-[60px] overflow-clip flex -ml-3 justify-center absolute'>
                            <img src={logoFull} alt="" srcset="" className='w-full h-full object-cover' />
                        </div>
                    }
                    <center className={`${props.title ? "mt-1 mb-2" : "mt-10 mb-1"} text-[#3a8a44] `}>{props.title ? props.title : <>Your Health Matters</>}</center>
                    <PulseCustom />
                </div>

            </div>
        </>
    )
}
