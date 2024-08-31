import { useState } from 'react';
import styles from "./ContactsList.module.css";

function ContactsList()
{
    const [isHovered, setIsHovered] = useState(false);
    const [add, setAdd] = useState(false);//To edit a contact
    const [save, setSave] = useState(false);//To save a contact

    const handleClickAdd = () =>
    {
        setAdd(true);
        setSave(true);
    };

    const handleClickSave = () =>
    {
        setSave(false);
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
            {
                add &&(
                    <div className={save ? styles.contact : styles.contact_hidden}>
                    <p className={styles.contact_title}>Add contact</p>
                    <img className={styles.contactImage} src="../../public/contactImage.png" height={100} width={100} />
                    <input className={styles.userInformation_name} type="text" placeholder={"Name"}/>
                    <input className={styles.userInformation_phoneNumber} type="text" placeholder={"Phone number"}/>
                    <input className={styles.userInformation_Email} type="text" placeholder={"E-mail"} />
                    <button className={styles.saveButton}
                    onClick={handleClickSave}
                    >Save</button>
                </div>
                )
            }
        <main className={styles.contactContainer}>
        
            <header className={styles.contactContainer_title}>Contacts List</header>
            
            <button onClick={handleClickAdd}
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