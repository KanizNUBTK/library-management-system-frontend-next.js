import Link from 'next/link'
import classes from './sidebar.module.css'

const SubNavList = ({ title, link }) => {

    return (
        <>
            <li className={classes.navLink1}>
                <Link href={`/${link}`}>
                    <a href="" className='text-gray-600'>{title}</a>
                </Link>
            </li>
        </>
    )
}

export default SubNavList;