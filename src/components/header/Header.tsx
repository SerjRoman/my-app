
import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IMAGES, ICONS } from '../../shared';
import { SearchBar } from '../search-bar';
import { useUserContext } from '../../context';

export function Header(){
    const { user } = useUserContext()

    const navigate =useNavigate()

    return <header>
        <div className={styles.logoBlock} onClick={() => {
            navigate('/')
        }}>
            <img src={IMAGES.logo} alt="Logo" />
        </div>
        <div className={styles.actionBlock}>
            <Link to={"/products"} className={styles.menuButton}>
                <ICONS.Menu className={styles.menuButtonIcon}></ICONS.Menu>
                Categories
            </Link>
            
           <SearchBar />

            <Link to={'cart'} className={styles.menuButton}>
                <ICONS.Menu className={styles.menuButtonIcon}></ICONS.Menu>
                Cart
            </Link>
        </div>
        {user ? 
        <div className={styles.profileBlock}>
            <p>{user.username}</p>
            <img src={user.avatar ? user.avatar : IMAGES.defaultAvatar} alt="Avatar" />
        </div> : <div className={styles.links}>
            <Link to={'/sign-up'}>Sign Up</Link>
            <Link to={'/sign-in'}>Sign In</Link>
        </div>
        }
    </header>
}
