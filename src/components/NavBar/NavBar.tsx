import Link from 'next/link'
import Image from 'next/image'

import styles from '@/Styles/components/NavBar.module.scss'

const links = [{
    label: 'Home',
    route: '/',
    icon: 'fi fi-rr-home'
},
{
    label: 'Search',
    route: '/search',
    icon: 'fi fi-rs-search'
},
{
    label: 'Favourites',
    route: '/favourites',
    icon: 'fi fi-rr-heart'
},
{
    label: 'Series',
    route: '/series',
    icon: 'fi fi-rr-screen'
},
{
    label: 'Profile',
    route: '/profile',
    icon: 'fi fi-rs-user'
}]

const imageStyle = {
    borderRadius: '50%',
}

export default function NavBar() {
    return (
        <nav className={styles.NavBar}>
            <Link href={links[0].route}>{links[0].label}</Link>
            <ul>
                {
                    links.map(({ label, route, icon }) => (
                        <Link href={route} key={label}>
                            <li className={styles.NavBar__Li}>
                                <i className={icon}></i>
                                {label}
                            </li>
                        </Link>
                    ))
                }
            </ul>
            <Image src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' alt='User Image' width={50} height={50} style={imageStyle}></Image>
        </nav>
    )
}