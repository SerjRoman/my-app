import logoImage from './../../assets/images/logo.png'
import defaultAvatarImage from  './../../assets/images/defaultAvatar.png'
import styles from './header.module.css'
import {ReactComponent as SearchIcon} from './../../assets/svg/search.svg'
import {ReactComponent as MenuIcon} from './../../assets/svg/menu.svg'

export function Header(){

    return <header>
        <div className={styles.logoBlock}>
            <img src={logoImage} alt="Logo" />
        </div>
        <div className={styles.actionBlock}>
            <button className={styles.menuButton}>
                <MenuIcon className={styles.menuButtonIcon}></MenuIcon>
                Categories
            </button>
            <div className={styles.searchBarBlock}>
                <input type="text" placeholder='Find products...' className = {styles.searchInput}/>
                <SearchIcon className={styles.searchIcon}></SearchIcon>
            </div>
            <button className={styles.menuButton}>
                <MenuIcon className={styles.menuButtonIcon}></MenuIcon>
                Cart
            </button>
        </div>
        <div className={styles.profileBlock}>
            <p>Username</p>
            <img src={defaultAvatarImage} alt="Avatar" />
        </div>
    </header>
}
