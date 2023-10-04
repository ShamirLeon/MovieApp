import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/components/NavBar.module.scss'

const links = [{
    label: 'Home',
    route: '/',
    icon: ''
},
{
    label: 'Search',
    route: '/search',
    icon: ''
},
{
    label: 'Favourites',
    route: '/favourites',
    icon: ''
},
{
    label: 'Series',
    route: '/series',
    icon: ''
},
{
    label: 'Profile',
    route: '/profile',
    icon: ''
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
                    links.map(({ label, route }) => (
                        <Link href={route} key={label}>
                            <li className={styles.NavBar__Li}>
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