import { useState } from 'react';
import styles from "./ContactsList.module.css";

function ContactsList()
{
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () =>
    {
        setIsHovered(true);
    };

    const handleMouseLeave = () =>
    {
        setIsHovered(false);
    };

    return(
        <main className={styles.contactContainer}>
            <header className={styles.contactContainer_title}>Contacts List</header>
            <button className={styles.contactContainer_buttonAdd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>+
            {/* If isHovered is true, then span tag is renderized, otherwise it is not */}
            {isHovered && <span className={styles.tooltip}>ADD</span>}
            </button>
            
        </main>
    );
}

export default ContactsList;