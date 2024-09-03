import { useState } from 'react';
import styles from "./ContactsList.module.css";

function ContactsList()
{
    const [selectedFile, setSelectedFile] = useState(null);
    let backgroundImage = "../../public/contactImage.png";
    const reader = new FileReader();
    //function for hanling profile picture
    const handleFileChange = (event) =>
    {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/'))
        {
            reader.onload = (e) =>
            {
                setSelectedFile(e.target.result); // Guarda la Data URL en el estado
            };
            reader.readAsDataURL(file); // Lee el archivo y genera la Data URL
        }
    };

    const [isHovered, setIsHovered] = useState(false);
    const [add, setAdd] = useState(false);//To edit a contact
    const [save, setSave] = useState(false);//To save a contact
    //useStates for inputs
    const [inputValueName, setInputValueName] = useState("");
    const [inputValuePhoneNumber, setInputValuePhoneNumber] = useState("");
    const [inputValueEmail, setInputValueEmail] = useState("");
    let phoneNumberPlaceholder = "";
    let eMailPlaceholder = "";
    let namePlaceHolder = "";


    const handleClickAdd = () =>
    {
        setAdd(true);
        setSave(true);
    };

    const handleClickSave = () =>
    {
        setSave(false);
        setTimeout(() => {
            setInputValueName(namePlaceHolder);
            setInputValuePhoneNumber(phoneNumberPlaceholder);
            setInputValueEmail(eMailPlaceholder);
            setSelectedFile(backgroundImage); // Lee el archivo y genera la Data URL
            document.getElementById('myForm').reset();
    }, 3000);
    };

    const handleMouseEnter = () =>
    {
        setIsHovered(true);
    };

    const handleMouseLeave = () =>
    {
        setIsHovered(false);
    };

    
    
    const handleChangeName = (event) =>
    {
        setInputValueName(event.target.value);
    }

    const handleChangePhoneNumber = (event) =>
    {
        setInputValuePhoneNumber(event.target.value);
    }

    const handleChangeEmail = (event) =>
    {
        setInputValueEmail(event.target.value);
    }


    return(
        <body>
            {
                add &&(
                    <div className={save ? styles.contact : styles.contact_hidden}>
                    <p className={styles.contact_title}>Add contact</p>

                    <img className={selectedFile ? styles.contactImage : ""} src={selectedFile || backgroundImage} // Usa la Data URL si existe, o el fondo predeterminado 
                    height={100} width={100}/>
                    <form id="myForm">
                    <input className={styles.userInformation_SearchPhoto}type="file" onChange={handleFileChange}
                     accept="image/*"/></form>
                    <input className={styles.userInformation_name} type="text" onChange={handleChangeName}
                    value = {inputValueName} placeholder={"Name"}/>
                    <input className={styles.userInformation_phoneNumber} onChange={handleChangePhoneNumber}
                    value = {inputValuePhoneNumber} type="text" placeholder={"Phone number"}/>
                    <input className={styles.userInformation_Email} type="text" onChange={handleChangeEmail}
                    value={inputValueEmail}
                    placeholder={"E-Mail"} />

                    
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