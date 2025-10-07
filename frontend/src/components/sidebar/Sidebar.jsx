import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ThemeToggle from "../ThemeToggle";
import { Link } from "react-router-dom";
import { MdOutlineKey } from "react-icons/md";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col text-gray-800 dark:text-gray-200'>
            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
            <div className='mt-auto flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Link 
                        to='/change-password'
                        className='tooltip' 
                        data-tip='Change Password'
                    >
                        <MdOutlineKey className='w-6 h-6 text-gray-800 dark:text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400' />
                    </Link>
                    <LogoutButton />
                </div>
                <ThemeToggle />
            </div>
        </div>
    );
};
export default Sidebar;