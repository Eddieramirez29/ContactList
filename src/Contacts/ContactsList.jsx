import { useState, useRef, useEffect } from 'react';
import styles from "./ContactsList.module.css";
import { IoMdCloseCircle } from "react-icons/io";

let name = "";
let phoneNumber = "";
let eMail = "";

let cardInfoPosition = 20;
let idContact = 1;
let nameTag = "";
let saveInfo = false;

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
    


    const handleClickAdd = () =>
    {
        setAdd(true);
        setSave(true);

    };

    // Crear la referencia para el contenedor
  const containerCardContactRef = useRef(null);

  const handleClickSave = () => {
    setSave(false);
    setTimeout(() => {
      setInputValueName(name);
      setInputValuePhoneNumber(phoneNumber);
      setInputValueEmail(eMail);
      setSelectedFile(backgroundImage); // Asegúrate de que esto sea una URL de datos o similar
    
        // Limpiar el formulario
    const formElement = document.getElementById('myForm');
    
    if (formElement)
    {
        formElement.reset();
    }

      // Crear el nuevo elemento div
    let contact = document.createElement("div");
    contact.className = `${styles.containerCardContact} ${idContact.toString()}`;

    let nameDiv = document.createElement("label");
    nameDiv.className = `${styles.Name}`
    nameDiv.textContent = nameTag;

    contact.style.top = `${cardInfoPosition}vh`;  // Usar comillas invertidas para interpolar la variable
    nameDiv.style.top = `${cardInfoPosition + 3}vh`;  // Usar comillas invertidas para interpolar la variable

      // Adjuntar el nuevo div al contenedor
    if (containerCardContactRef.current)
    {
        containerCardContactRef.current.appendChild(contact);
        containerCardContactRef.current.appendChild(nameDiv);
        idContact = idContact + 1;
        saveInfo = true;
    }
    else
    {
        console.log("El contenedor no existe");
    }

    }, 3000);
    
    };

    // const [edit, setEdit] = useState(false);

    // const handleClickEditContact = () =>
    // {
    //     setEdit(true);
    // };


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
        name = event.target.value;
        nameTag = name;

    }

    const handleChangePhoneNumber = (event) =>
    {
        setInputValuePhoneNumber(event.target.value);
        phoneNumber = event.target.value;
    }

    const handleChangeEmail = (event) =>
    {
        setInputValueEmail(event.target.value);
        eMail = event.target.value;
    }


    function handleCloseEditContat()
    {
        setSave(false);
        const formElement = document.getElementById('myForm');
        setTimeout(() => {
            if (formElement) 
            {
                formElement.reset();
                setSelectedFile(null);
                setInputValueName("");
                setInputValuePhoneNumber("");
                setInputValueEmail("");
            }
        }, 3000); 
    }

    //To hide or close view card contact when clicking close button
    const [view, setView] = useState(false);

    function handleCloseViewContat()
    {
        setView(false);
        
        setTimeout(() =>
        {
            setSelectedFile(null);
            setInputValueName("");
            setInputValuePhoneNumber("");
            setInputValueEmail("");
        }, 3000);
    }
    const divRef = useRef(null); // Referencia al div
    
    function handleViewContact()
    {
        setView(true);
        divRef.current.style.position = 'absolute';
        divRef.current.style.top = '2vh';
        divRef.current.style.left = '70vw';
        divRef.current.style.height = '400px';
        divRef.current.style.width = '400px';
        divRef.current.style.display = 'flex';
        divRef.current.style.flexDirection = 'column'; // Alineación vertical
        divRef.current.style.justifyContent = 'center'; // Centra verticalmente
        divRef.current.style.alignItems = 'center'; // Centra horizontalmente
        divRef.current.style.color = 'white';
        divRef.current.style.backgroundColor = '#1DA1F2';
        divRef.current.style.borderRadius = '10px';
        divRef.current.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 1)';
    }
    
    

    useEffect(() =>
    {
      // Aplicar display: none; al cargar la página
        if (divRef.current)
        {
            divRef.current.style.display = 'none';
        }
    }, []); // Se ejecuta solo una vez cuando se monta el componente




    return(
        <body>
            {
                add &&(
                    <div className={save ? styles.contact : styles.contact_hidden}>
                    {/* Button to close windows */}
                        <div className = {styles.contactContainer_buttonClose}
                        onClick={handleCloseEditContat}>
                        <button className={styles.closeButton}><IoMdCloseCircle /></button>
                        </div>
                    
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

                </div>)

                

            }
        <main className={styles.contactContainer} ref={containerCardContactRef}>
        
            <header className={styles.contactContainer_title}>Contacts List</header>
        <div className="search-bar">
            <input type="text" placeholder="Search" className={styles.contactContainer_searchBar}/>
        </div>
            {/* Here is where card appears only with the name and teo button to see and edit contact element*/}

            <button className={saveInfo ? styles.editButton:styles.editButton_hidden}>Edit</button>
            <button className={saveInfo ? styles.viewButton:styles.viewButton_hidden} onClick={handleViewContact}>View</button>
            <button className={saveInfo ? styles.deleteButton:styles.deleteButton_hidden}>Delete</button>

            <button onClick={handleClickAdd}
            className={styles.contactContainer_buttonAdd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>+
            {/* If isHovered is true, then span tag is renderized, otherwise it is not */}
            {isHovered && <span className={styles.tooltip}>ADD</span>}
            </button>
        </main>

        {/* This is going to be displayed when clicking view button */}
        <div className = {view ? styles.contactViewContainer:styles.contactViewContainer_hidden} ref={divRef}>
        <div className = {styles.contactContainer_buttonClose}
                        onClick={handleCloseViewContat}>
                        <button className={styles.closeButton}><IoMdCloseCircle /></button>
                        </div>
        <p className={styles.contact_titleInformation}>Contact information</p>
        <img className={selectedFile ? styles.contactImage : ""} src={selectedFile || backgroundImage} // Usa la Data URL si existe, o el fondo predeterminado 
            height={100} width={100}/>
        
        <label className={styles.userInformation_nameTag}>
            Name: {inputValueName}
        </label>

        <label className={styles.userInformation_phoneNumberTag}>
            Phone number: {inputValuePhoneNumber}
        </label>

        <label className={styles.userInformation_EmailTag}>
            E-Mail: {inputValueEmail}
        </label>

        </div>
        </body>
    );
}

export default ContactsList;