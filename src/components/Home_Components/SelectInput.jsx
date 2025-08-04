
import React, {useEffect, useState} from 'react';

// react icons
import {IoMdFootball} from 'react-icons/io';
import {MdOutlineSportsCricket, MdOutlineSportsTennis} from 'react-icons/md';
import {GiTennisRacket} from 'react-icons/gi';
import {IoChevronDown} from 'react-icons/io5';

const SelectInput = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Select Option');

    const options = [
        {
            icon: <IoMdFootball />,
            title: 'Football',
        },
        {
            icon: <MdOutlineSportsCricket />,
            title: 'Cricket',
        },
        {
            icon: <MdOutlineSportsTennis />,
            title: 'Tennis',
        },
        {
            icon: <GiTennisRacket />,
            title: 'Badminton',
        },
    ];

    // outside click to off the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            let target = event.target;

            if (!target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className=' '>
            <button
                className='w-full border border-Primary/30 rounded-md text-white justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selectedItem}
                <IoChevronDown
                    className={`${
                        isDropdownOpen ? ' rotate-[180deg]' : ' rotate-0'
                    } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                    className={`${
                        isDropdownOpen
                            ? 'z-[1] opacity-100 scale-[1] text-black'
                            : 'z-[-1] opacity-0 scale-[0.8]'
                    } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col  overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{
                        boxShadow: '0 15px 60px -15px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {options?.map((option, index) => (
                        <p
                            className='py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200 flex items-center gap-2'
                            key={index}
                            onClick={(e) => setSelectedItem(e.target.textContent)}
                        >
                            {option.icon}
                            {option.title}
                        </p>
                    ))}
                </div>
            </button>
        </div>
    );
};

export default SelectInput;
                    