import { useState } from 'react';
import styles from "./ContactsList.module.css";

function ContactsList()
{
    const [isHovered, setIsHovered] = useState(false);
    const [add, setAdd] = useState(false);

    const handleClick = () =>
    {
        setAdd(true);
    };

    const handleMouseEnter = () =>
    {
        setIsHovered(true);
    };

    const handleMouseLeave = () =>
    {
        setIsHovered(false);
    };

    return(
        <body>
            {add &&(
                <div className={styles.contact}>
                <p>Add contact</p>
              </div>
            )}
        <main className={styles.contactContainer}>
           
            <header className={styles.contactContainer_title}>Contacts List</header>
            
            <button onClick={handleClick}
            className={styles.contactContainer_buttonAdd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>+
            {/* If isHovered is true, then span tag is renderized, otherwise it is not */}
            {isHovered && <span className={styles.tooltip}>ADD</span>}
            </button>
        </main>
        </body>
    );
}

export default ContactsList;